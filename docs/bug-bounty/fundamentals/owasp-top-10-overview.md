---
sidebar_position: 50
---
# OWASP Top 10 Overview

Owasp Top 10: The Most Critical Web Application Security Risks


The OWASP Top 10 isn't a list of every web vulnerability; it's a powerful awareness document outlining the most critical security risks to web applications. OWASP (Open Worldwide Application Security Project) updates this list periodically, reflecting the current threat landscape. As a bug bounty hunter, understanding these categories helps you focus your efforts and identify common, high-impact flaws.

Here's a breakdown of the current OWASP Top 10 (2021):

---

### 1. A01:2021 – Broken Access Control

This category means a user gains more privileges than intended. The application fails to properly enforce restrictions on what authenticated users can do. Attackers can exploit these flaws to access sensitive data, modify other users' information, or perform administrative functions.  

**Example**: A user changes an ID in the URL from `id=123` to `id=124` and can view another user's private data. Or, a regular user accesses an admin panel by navigating directly to `/admin`.

### 2. A02:2021 – Cryptographic Failures (Previously Sensitive Data Exposure)

Applications often fail to properly protect sensitive data at rest or in transit. This includes improper encryption, weak algorithms, or storing data in plain text. When attackers exploit other vulnerabilities, these failures expose the sensitive data directly.  

**Example**: A website stores user passwords in plain text or uses an outdated, easily crackable hashing algorithm. An API transmits credit card numbers without encryption.

### 3. A03:2021 – Injection

Injection flaws occur when an application sends untrusted data to an interpreter as part of a command or query. Attackers "inject" malicious code or commands into input fields, tricking the application into executing their hostile instructions. This is a very common and dangerous vulnerability.  

**Example**: An attacker inputs `' OR '1'='1` into a login form's username field, bypassing authentication by manipulating the SQL query. Or, they inject a malicious command into a text field, causing the server to execute it.

### 4. A04:2021 – Insecure Design

This new category highlights risks related to design flaws and architectural weaknesses. It's about vulnerabilities that exist because of how the application was planned and built, not just coding errors. It emphasizes the need for threat modeling and secure design patterns.  

**Example**: An application lacks proper rate limiting on a password reset function, making it vulnerable to brute-force attacks by design. An account recovery process relies solely on user-provided, easily guessable information.

### 5. A05:2021 – Security Misconfiguration

This covers security issues arising from improper setup of a server, application, framework, database, or other components. Default credentials, open ports, verbose error messages, and unpatched systems all fall under this umbrella.  

**Example**: A web server is configured to list directory contents, exposing sensitive files. The application uses default, easily guessable administrative passwords. Security headers like Strict-Transport-Security (HSTS) are missing.  

### 6. A06:2021 – Vulnerable and Outdated Components

Using components (libraries, frameworks, other software modules) with known vulnerabilities is a significant risk. Attackers often exploit publicly disclosed flaws in these third-party components because many applications neglect to update them.  

**Example**: An application uses an old version of a JavaScript library with a known Cross-Site Scripting (XSS) vulnerability. The server runs an outdated version of Apache with known exploits.

### 7. A07:2021 – Identification and Authentication Failures

Applications often implement identity and authentication functions incorrectly. This allows attackers to compromise user accounts, assume identities, or bypass authentication mechanisms. This includes weak password policies, improper session management, or flawed multi-factor authentication.  

**Example**: The application allows weak, easily guessable passwords. Session IDs remain valid indefinitely, even after logout. There's no rate limiting on login attempts, enabling brute-force attacks.

### 8. A08:2021 – Software and Data Integrity Failures (New)

This category focuses on issues related to code and infrastructure integrity. It covers situations where applications rely on software updates, critical data, or CI/CD pipelines without verifying their integrity. Insecure deserialization also moved here.  

**Example**: An application automatically downloads and runs unverified updates from untrusted sources. An attacker manipulates a serialization stream, executing arbitrary code when the application deserializes the data.

### 9. A09:2021 – Security Logging and Monitoring Failures (Previously Insufficient Logging & Monitoring)

When applications lack proper logging and monitoring, attackers can operate undetected. Insufficient or missing logs make it incredibly difficult to detect, investigate, or recover from a breach. Attackers value stealth, and poor logging provides it.  

**Example**: Critical security events, like failed login attempts or access control failures, are not logged. Logs exist but are not regularly reviewed or integrated into an incident response system.

### 10. A10:2021 – Server-Side Request Forgery (SSRF) (New)

SSRF is a vulnerability where a web application fetches a remote resource without validating the user-supplied URL. An attacker can trick the application into making requests to internal resources within the organization's network, or to external systems it shouldn't access, often bypassing firewalls.  

**Example**: An image import feature allows users to provide a URL for an image. An attacker provides a URL pointing to an internal server's metadata endpoint (e.g., `http://169.254.169.254/latest/meta-data/`), retrieving sensitive cloud credentials.
