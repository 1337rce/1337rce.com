---
sidebar_position: 10
---
# Intro to Recon

Reconnaissance, or "recon," is the crucial initial phase of bug bounty hunting. It involves gathering as much information as possible about your target before actively looking for vulnerabilities. The goal is to understand the target's entire digital footprint, identify potential entry points, and expand the attack surface.

### What is Reconnaissance?

**Information Gathering**: Systematically collecting data about the target.  

**Attack Surface Mapping**: Identifying all assets, subdomains, endpoints, and technologies associated with the target.  

**Passive vs. Active**:
-   **Passive Recon**: Gathering information without direct interaction with the target (e.g., public records, search engines).  
-   **Active Recon**: Interacting with the target system, but typically in a non-intrusive way (e.g., port scanning).  

### Why is Recon Important?

**Expand Scope**: Discover hidden assets, legacy systems, or less-monitored applications.  

**Identify Technologies**: Understand the tech stack to narrow down potential vulnerability types.  

**Find Entry Points**: Pinpoint parameters, forms, APIs, and other inputs that an attacker could interact with.  

**Contextual Understanding**: Gain insights into the business logic and functionality, which helps in identifying subtle flaws.  

**Efficiency**: Focus your efforts on the most promising areas, rather than blindly searching.  

### Key Information Sought During Recon:

**Subdomains & Associated Domains**  
**IP Addresses & CIDR Blocks**  
**Open Ports & Running Services**  
**Web Technologies & Versions (CMS, frameworks, libraries)**  
**Endpoints, Directories, & Files**  
**API Endpoints**  
**Employee Information (for phishing, social engineering)**  
**Sensitive Data Exposure (e.g., leaked credentials)**  
**Historical Data (Wayback Machine)**  
**Third-Party Integrations**  
  