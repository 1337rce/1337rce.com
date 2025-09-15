---
sidebar_position: 30
---
# OSINT for Bug Hunting

OSINT (Open Source Intelligence) is the practice of collecting and analyzing information from publicly available sources. In bug bounty hunting, OSINT is a critical reconnaissance phase, helping you map a target's entire digital footprint and uncover hidden assets, forgotten code, or misconfigurations that often lead to vulnerabilities.

## Why Use OSINT in Bug Hunting?

**Expand Attack Surface**: Discover subdomains, forgotten applications, or IP ranges not explicitly listed in scope.  
**Identify Leaked Information**: Find credentials, API keys, or sensitive documents left exposed online.  
**Understand Infrastructure**: Gain insight into the target's technology stack, cloud providers, and development practices.  
**Find Employee Information**: Identify employees, their roles, and potential social engineering vectors.  
**Uncover Historical Data**: Access archived versions of websites that might contain old, vulnerable code or sensitive information.  

## Key OSINT Categories & Techniques:

### Search Engines (Google, Bing, DuckDuckGo, Shodan)
#### Google Dorking
Use advanced search operators to find specific file types, directories, subdomains, or error messages on a target.  

**Example**: `site:example.com intitle:"index of"`, `site:example.com filetype:log`, `site:example.com inurl:admin`

#### Shodan/Censys
Search engines for internet-connected devices. Identify exposed servers, services, open ports, and vulnerable configurations.  

**Usage**: Search for your target's IP ranges or domain to see exposed services.

### Subdomain Enumeration (Passive Sources)
#### Certificate Transparency Logs (e.g., crt.sh, Censys)
SSL/TLS certificates often list all subdomains they secure. These logs are public records.  

**Usage**: Visit `crt.sh` and search for your target domain.

#### PublicDNS/DNS Dumpster 
Websites that gather and display DNS records, often revealing subdomains.  

#### Wayback Machine / Archive.org 
Historical snapshots of websites. Old versions might show subdomains that are no longer active but still resolvable or contain forgotten content.  

### Code Repositories (GitHub, GitLab, Bitbucket)
#### Search for Leaked Credentials
Developers sometimes inadvertently commit API keys, database credentials, or sensitive configuration files to public repositories.
 
 **Tools**: Use specialized tools like `Gitrob`, `GitLeaks`, or `shhgit` to monitor public repositories for your target's keywords and sensitive patterns.  
**Example**: Search GitHub for `org:example-company "api_key"`, `org:example-company "password"`.  

### Social Media & Professional Networks (LinkedIn, Twitter, Facebook)**:
#### Employee Information
Identify employees, their positions, and email patterns. This helps for targeted phishing or understanding internal structures.
#### Public Announcements
Company social media might announce new features, acquisitions, or technology choices, expanding your scope.

### WHOIS Records
#### Domain Ownershi
 Get information about domain registrants, including names, organizations, and sometimes contact details, which can reveal related entities or past ownership.

### Cloud Storage Buckets (AWS S3, Google Cloud Storage)**:
**Misconfigured Buckets**: Companies often store data in cloud buckets that are inadvertently left publicly accessible, exposing backups, images, or confidential documents.  

**Tools**: Use tools like `lazys3` or `s3scanner` to find and check bucket permissions.

### Paste Sites & Dumps (Pastebin, Ghostbin)**:
**Data Leaks**: Monitor these sites for any pastes containing your target's sensitive information, such as credentials, configuration files, or internal code snippets.  

**Tools**: Search manually or use specialized OSINT tools that monitor these platforms.  

### Practical OSINT Tools:

*   **`theHarvester`**: Gathers emails, subdomains, hosts, employee names, and banners from various public sources.
*   **`OSINT-Framework.com`**: A comprehensive collection of OSINT tools and resources categorized by type.
*   **ProjectDiscovery Tools**: `subfinder`, `assetfinder`, `katana` are excellent for automated subdomain and asset discovery.
*   **`Knockpy`**: Python tool to enumerate subdomains.
