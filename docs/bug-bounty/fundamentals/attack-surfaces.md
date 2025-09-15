---
sidebar_position: 40
---
# Attack Surfaces

Attack Surfaces: Mapping the Landscape of Web Vulnerabilites

In bug bounty hunting, an "attack surface" refers to all the points where an unauthorized user can try to enter data to or extract data from an environment, and where the system could potentially be vulnerable. For web applications, this includes every input, output, and access point that could be manipulated.

## Key Web Attack Surfaces:

### User-Facing Components (Direct Interaction)
**Forms & Input Fields**: Login forms, registration, search bars, comment sections, contact forms, feedback forms, profile updates.  

**URL Parameters**: Any values passed in the URL (e.g., `https://example.com/user?id=123`).  

**Cookies & Session Tokens**: Data stored in your browser by the website to maintain state and user sessions.
-   **HTTP Headers**: Information sent with every request and response (e.g., `User-Agent`, `Referer`, `Host`).
-   **File Upload Functionality**: Any feature allowing users to upload images, documents, or other files.

### Backend & Server-Side Interaction
**API Endpoints**: REST, SOAP, GraphQL, or any custom API that the client-side (or other services) interacts with. These are often less visible but critical.  

**Database Interactions**: Any part of the application that queries or modifies the backend database.  

**Server Configuration**: Web servers (Apache, Nginx, IIS), application servers (Tomcat, Node.js), and their configurations.  

**Operating System Commands**: Any functionality that executes commands on the underlying server operating system.  

### Hidden & Less Obvious Areas
**Subdomains & Associated Assets**: Other websites or applications owned by the target (e.g., `dev.example.com`, `api.example.com`, `blog.example.com`).  

 **Old/Deprecated Functionality**: Unused or forgotten endpoints, old API versions, backup files (e.g., `.bak`, `.zip`).  

 **Admin Panels/Unlinked Pages**: Pages or directories not readily visible from the main application but accessible if discovered.  

 **Error Messages**: Verbose error messages that might reveal internal system paths, database queries, or technology versions.  

**Publicly Exposed Files**: Configuration files, log files, `.git` directories, or other sensitive files left accessible.  


### External Integrations
**Third-Party Services**: Payment gateways, social media logins (OAuth), analytics services, cloud storage.  

**Email Functionality**: Password reset flows, notification emails, verification emails.  
