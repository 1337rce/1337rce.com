---
sidebar_position: 70
---
# Google Dorking

Google Dorking, also known as Google Hacking, leverages advanced search operators in Google (and other search engines) to find specific, often sensitive, information about a target. This powerful reconnaissance technique uncovers misconfigurations, leaked data, hidden files, or vulnerable endpoints that regular browsing might miss. As a bug bounty hunter, mastering Google Dorking provides a low-interaction, highly effective way to expand your attack surface.

## Core Google Dork Operators:

**`site:`**: Restrict your search to a specific domain or subdomain.  
*Example*: `site:example.com`  

**`inurl:`**: Find pages with specific text appearing in the URL.  
*Example*: `inurl:admin`  

**`intitle:`**: Find pages with specific text appearing in the page's title.  
*Example*: `intitle:"index of"`  

**`intext:`**: Find pages with specific text appearing anywhere in the page's body.  
*Example*: `intext:"password"`  

**`filetype:`**: Search for specific file extensions.  
*Example*: `filetype:pdf`, `filetype:env`  

**`cache:`**: Display Google's cached version of a page.  
*Example*: `cache:example.com`  

**`-` (minus sign)**: Exclude a specific term or site from results.  
*Example*: `site:example.com -www`  

**`OR`**: Combine search terms, finding results that match either one or the other.  
*Example*: `site:example.com login OR admin`  

**`AND`**: Combine search terms, finding results that match both. (Often implied, but can be explicit).  

**`" "` (quotation marks)**: Search for an exact phrase.  
*Example*: `intitle:"Welcome to our website"`  

**`*` (asterisk)**: A wildcard that matches any word or phrase.  
*Example*: `intext:"api_key = *"`  

---

## Common Google Dorks for Bug Bounty:

Apply these dorks by replacing `example.com` with your target domain.

### Finding Subdomains & Related Assets

*   `site:*.example.com`
*   `site:example.com -www`
*   `inurl:example.com -site:example.com` (Find mentions of the target on other sites)
*   `site:example.com inurl:dev | inurl:staging | inurl:test | inurl:qa`
*   `site:example.com intitle:"test" OR intitle:"development"`

### Finding Sensitive Files & Open Directories

*   `site:example.com intitle:"index of" "parent directory"`
*   `site:example.com intitle:"index of" config | database | backup`
*   `site:example.com inurl:.git/HEAD`
*   `site:example.com inurl:.svn/entries`
*   `site:example.com inurl:wp-content/uploads` (for WordPress sites)
*   `site:example.com inurl:backup | inurl:old | inurl:temp | inurl:dev`
*   `site:example.com intitle:"phpinfo()" inurl:phpinfo`
*   `site:example.com filetype:log | filetype:txt | filetype:bak | filetype:old`

### Finding Configuration & Backup Files

*   `site:example.com filetype:env`
*   `site:example.com filetype:sql`
*   `site:example.com filetype:yml | filetype:yaml`
*   `site:example.com filetype:conf | filetype:cfg`
*   `site:example.com filetype:xml intext:"password"`
*   `site:example.com intitle:"configuration" filetype:php`
*   `site:example.com inurl:web.config`

### Finding Login Pages & Admin Panels

*   `site:example.com inurl:admin | inurl:login | inurl:panel`
*   `site:example.com intitle:"login" | intitle:"admin" | intitle:"dashboard"`
*   `site:example.com inurl:wp-admin | inurl:user/login` (for CMS-specific paths)
*   `site:example.com intext:"administrator login" | intext:"control panel"`

### Finding Error Messages & Debug Information

*   `site:example.com intext:"SQL syntax near" | intext:"supplied argument is not a valid MySQL"`
*   `site:example.com intext:"stack trace" | intext:"error report"`
*   `site:example.com intext:"Warning: mysql_fetch_array()"`
*   `site:example.com intext:"Fatal error:"`
*   `site:example.com intext:"Parse error:"`
*   `site:example.com intext:"A PHP Error was encountered"`

### Finding Specific Vulnerability Indicators

*   `site:example.com inurl:redir= | inurl:url= | inurl:link= | inurl:target=` (Potential Open Redirect)
*   `site:example.com inurl:view.php?id=` (Potential SQLi or LFI)
*   `site:example.com inurl:search.php?query=` (Potential XSS)
*   `site:example.com inurl:cmd=` (Potential Command Injection)
*   `site:example.com inurl:file= | inurl:page=` (Potential LFI)

### Finding Leaked Credentials & API Keys

*   `site:example.com intext:"api_key =" | intext:"API_KEY =" | intext:"api-key ="`
*   `site:example.com intext:"password=" | intext:"passwd="`
*   `site:example.com intext:"client_secret" | intext:"auth_token"`
*   `site:example.com intext:"Authorization: Bearer"`
*   `site:example.com intext:"BEGIN RSA PRIVATE KEY" | intext:"BEGIN OPENSSH PRIVATE KEY"`
*   `site:example.com intext:"ssh-rsa"`

### Finding Employee Information & Emails

*   `site:example.com intext:"@example.com" filetype:pdf | filetype:doc | filetype:xlsx`
*   `site:linkedin.com "example.com" "email"`
*   `site:example.com intext:"contact us"`

### Finding Information on Third-Party Services

*   `site:github.com "example.com" password | api_key | secret`
*   `site:trello.com "example.com"`
*   `site:pastebin.com example.com`
*   `site:s3.amazonaws.com "example.com"` (for AWS S3 buckets)
*   `site:docs.google.com "example.com"`
*   `site:firebaseio.com "example.com"`

### General Reconnaissance

*   `site:example.com "Powered by" | "CMS by"` (Identify underlying technologies)
*   `site:example.com intext:"confidential" | intext:"internal use only"`
*   `site:example.com inurl:test | inurl:staging`
*   `site:example.com inurl:php`

