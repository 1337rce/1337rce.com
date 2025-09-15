---
sidebar_position: 50
---
# Directory Enumeration

Directory enumeration (also known as content discovery or brute-forcing directories and files) is a fundamental reconnaissance technique. It involves systematically searching for hidden or unlinked files and directories on a web server. This process often uncovers sensitive information, forgotten functionalities, administrative interfaces, and misconfigurations that can lead to critical vulnerabilities.

## Why Directory Enumeration is Crucial:
**Uncover Hidden Functionality**: Discover administrative panels, API endpoints, staging environments, or internal tools not publicly advertised.  

**Expose Sensitive Data**: Find backup files (`.zip`, `.bak`, `.tar.gz`), configuration files (`.env`, `config.php`), log files, or source code repositories (`.git`, `.svn`).  

**Identify Legacy/Vulnerable Code**: Older, forgotten directories might run outdated software with known exploits.  

**Gain Deeper Insight**: Map the application's structure and understand its functionalities beyond the visible user interface.  

**Expand Attack Vectors**: The discovery of new endpoints can lead to vulnerabilities like LFI, RCE, IDOR, or SQL injection.  

## Key Information Sought During Directory Enumeration:

*   **Admin or Management Interfaces**: `/admin`, `/dashboard`, `/panel`, `/cpanel`
*   **Backup Files/Directories**: `website.zip`, `backup.tar.gz`, `old/`, `dev/`
*   **Configuration Files**: `.env`, `web.config`, `config.inc.php`
*   **Source Code Repositories**: `.git`, `.svn`, `.hg` directories
*   **Log Files**: `access.log`, `error.log`
*   **API Endpoints**: `/api/v1/`, `/graphql`
*   **Test/Staging Environments**: `test.php`, `dev.html`
*   **Sensitive Upload Directories**: `/uploads`, `/files`
*   **Web Server Default Pages**: `server-status`, `phpinfo.php`

---

## Installation:

Most of these tools are written in Go or Python. Ensure you have Go and Python (with pip) installed on your system.

#### Go Installation (If not already installed)
    ```bash
    # For Debian/Ubuntu-based systems
    sudo apt update
    sudo apt install golang-go

    # For macOS with Homebrew
    brew install go
    ```
    (Ensure your Go environment variables are set up, typically `export PATH=$PATH:$(go env GOPATH)/bin` in your shell profile.)

#### FFUF
    ```bash
    go install -v github.com/ffuf/ffuf/v2@latest
    ```
#### Dirsearch
    ```bash
    pip3 install dirsearch
    # Or clone the repository for the latest version
    # git clone https://github.com/dirsearch/dirsearch.git
    # cd dirsearch
    # pip3 install -r requirements.txt
    ```
#### Gobuster
    ```bash
    go install github.com/OJ/gobuster/v3@latest
    ```
#### Katana
    ```bash
    go install -v github.com/projectdiscovery/katana/cmd/katana@latest
    ```
#### SecLists (Wordlists)
    ```bash
    git clone https://github.com/danielmiessler/SecLists.git
    # Common web content wordlists are in SecLists/Discovery/Web-Content/
    ```

---

## Common Techniques & Practical Tools:

The effectiveness of directory enumeration heavily relies on using comprehensive wordlists. `SecLists` is an excellent resource for this.

### FFUF (Fuzz Faster U Fool)
A very fast and flexible web fuzzer written in Go. It's excellent for brute-forcing URLs, parameters, headers, and data.  

**Basic Usage**:
     ```bash
     ffuf -u https://example.com/FUZZ -w /path/to/SecLists/Discovery/Web-Content/common.txt
     ```
*   **Explanation**: `FUZZ` is the placeholder for where wordlist entries will be injected.  

**Key Flags**:
*   `-u <URL>`: Target URL. Use `FUZZ` as a placeholder. (e.g., `https://example.com/FUZZ`)
*   `-w <wordlist>`: Specify the wordlist file.
*   `-mc <codes>`: Match HTTP status codes (e.g., `200,301,403`). Use `all` for all codes.
*   `-ms <sizes>`: Match response sizes. Useful for filtering out boilerplate pages.
*   `-mr <regex>`: Match responses by regular expression.
*   `-H <header>`: Add custom HTTP headers (e.g., `-H "User-Agent: FFUF-Hunter"`).
*   `-X <method>`: Specify HTTP method (e.g., `-X POST`).
*   `-recursion`: Perform recursive fuzzing.
*   `-recursion-depth <num>`: Set recursion depth.
*   `-e <extensions>`: Add file extensions to each word (e.g., `-e php,html,bak`).
*   `-timeout <seconds>`: Set HTTP request timeout.
*   `-rate <requests/sec>`: Limit requests per second.

### Dirsearch
A powerful command-line tool designed to brute-force directories and files on web servers. Written in Python.  

**Basic Usage**:
    ```bash
    dirsearch -u https://example.com/ -w /path/to/SecLists/Discovery/Web-Content/common.txt -e php,html,js,bak
    ```  

**Key Flags**:
*   `-u <URL>`: Target URL.
*   `-w <wordlist>`: Path to the wordlist file.
*   `-e <extensions>`: Specify file extensions to test (e.g., `php,asp,html,bak,zip`). Use `all` for a comprehensive list.
*   `-t <threads>`: Number of concurrent threads.
*   `-r`: Perform recursive scanning.
*   `--recursion-depth <num>`: Set recursion depth.
*   `--full-url`: Show full URL in results.
*   `--status <codes>`: Filter results by status codes (e.g., `--status 200,301`).
*   `--exclude-status <codes>`: Exclude status codes.
*   `--user-agent <agent>`: Set custom User-Agent.

### Gobuster
A brute-force tool for various tasks, including DNS, Virtual Host, and Directory/File enumeration. Written in Go.  

**Basic Usage (Directory Mode)**:
    ```bash
    gobuster dir -u https://example.com/ -w /path/to/SecLists/Discovery/Web-Content/common.txt -x php,html,txt
    ```  

**Key Flags (for `dir` mode)**:
*   `dir -u <URL>`: Specify the target URL.
*   `-w <wordlist>`: Path to the wordlist.
*   `-x <extensions>`: File extensions to add (e.g., `php,txt,bak,zip`).
*   `-t <threads>`: Number of concurrent threads.
*   `-k`: Don't validate TLS certificates.
*   `-r`: Follow redirects.
*   `-v`: Verbose output.
*   `-f`: Append a `/` to each request.
*   `-P <proxy>`: Use a proxy server (e.g., `http://127.0.0.1:8080`).

### Katana (for URL & Endpoint Discovery within Web Content)
While primarily a web crawler, Katana excels at extracting links, files, and endpoints from discovered pages, including those embedded in JavaScript. This complements directory enumeration by finding paths that wordlists might miss.  

**Basic Usage**:
    ```bash
    echo https://example.com | katana -jc -kf ip,host -o discovered_endpoints.txt
    ```  

**Key Flags**:
*   `-jc`: Enable JavaScript crawling to extract URLs from JS files.
*   `-kf <field>`: Filter discovered URLs by specific fields (e.g., `ip`, `host`, `path`).
*   `-known-files`: Scans for known files (e.g., `robots.txt`, `sitemap.xml`).
*   `-d <depth>`: Max crawling depth.
*   `-xhr`: Include XMLHttpRequest requests.
*   `-fs <filter-scope>`: Filter URLs based on scope.

---

## Workflow Recommendation:

1.  **Start with common wordlists**: Begin with smaller, fast wordlists (e.g., `common.txt` from SecLists) with tools like FFUF or Dirsearch.
2.  **Broaden with extensions**: Use the `-e` or `-x` flags to include common file extensions (`php,asp,html,bak,zip,old,tar.gz,log`).
3.  **Go recursive**: If initial findings reveal interesting directories, run a recursive scan (`-recursion`, `-r`) on those specific paths with a deeper depth.
4.  **Combine tools**: Use multiple tools as they have different wordlists, logic, and can find different paths.
5.  **Analyze JavaScript**: Pipe active web assets into Katana to find additional endpoints hidden in client-side code.
6.  **Filter Results**: Always filter the output by status codes (e.g., `200`, `301`, `302`, `403` if you suspect potential access control bypass) and response sizes to identify valid resources and eliminate false positives.
