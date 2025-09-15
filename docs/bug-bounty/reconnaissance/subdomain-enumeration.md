---
sidebar_position: 40
---
# Subdomain Enumeration

Subdomain enumeration is a critical reconnaissance technique in bug bounty hunting. It involves discovering all possible subdomains associated with a target domain. This process significantly expands your attack surface, revealing potentially forgotten, misconfigured, or less-monitored assets that might host vulnerabilities. A thorough subdomain list is often the key to finding high-impact bugs.

## Why Subdomain Enumeration is Crucial:

*   **Expanded Scope**: Uncover hidden or legacy applications, staging environments, or internal services.
*   **Unique Vulnerabilities**: Older or less-maintained subdomains often run outdated software with known vulnerabilities.
*   **Different Access Controls**: Subdomains might have weaker security policies or different authentication mechanisms than the main domain.
*   **Diverse Technologies**: Various subdomains can run on different tech stacks, offering a wider array of potential attack vectors.

## Types of Subdomain Enumeration:

###   Passive Enumeration: 
Gathers information from publicly available sources without sending direct traffic to the target's servers. This is stealthier and generally safer.
### Active Enumeration
Involves sending direct requests to DNS servers or the target itself. This can be faster but is more detectable.

---

## Common Techniques & Practical Tools:

Here are popular tools and methods for effective subdomain enumeration, focusing on practical usage and API integration:

### Passive Enumeration Tools (Leveraging APIs for Depth)

These tools query various public data sources, often requiring API keys for optimal results.

#### Subfinder (by ProjectDiscovery)

A fast and versatile subdomain discovery tool that collects subdomains from multiple passive sources. It's known for its speed and comprehensive results.  

**Installation Commands**: `go install -v github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest`  

**Basic Usage**: `subfinder -d example.com -o example_subdomains.txt`  

**Key Flags**:
*   `-d <domain>`: Specify the target domain. (e.g., `subfinder -d example.com`)  
*   `-o <file>`: Output results to a file. (e.g., `subfinder -d example.com -o subs.txt`)  
*   `-r <resolvers.txt>`: Use a custom list of DNS resolvers for faster or more reliable lookups.  
*   `-nW`: Exclude subdomains that are identified as wildcard resolutions.  
*   `-sC`: Silent mode, only output subdomains.  
*   `-v`: Verbose output, showing sources and progress.   
*   `-es <source1,source2>`: Exclude specific data sources from the scan.  
*   `-all`: Use all configured sources, including those requiring API keys.  
    
**API Integration**: `subfinder` supports API keys for services like Shodan, Censys, Virustotal, GitHub, and more.  
*   **Setup**: Create a configuration file, typically located at `~/.config/subfinder/config.yaml`.
*   **Example `config.yaml` entry**:
            ```yaml
            virustotal: ["YOUR_VIRUSTOTAL_API_KEY"]
            shodan: ["YOUR_SHODAN_API_KEY"]
            censys: ["YOUR_CENSYS_ID", "YOUR_CENSYS_SECRET"]
            github: ["YOUR_GITHUB_TOKEN"]
            ```
*   **Benefit**: Integrating APIs significantly increases the number and quality of subdomains found by querying proprietary databases.

#### Amass (by OWASP)
A powerful and in-depth attack surface mapping and asset discovery tool. It leverages various techniques, including scraping, brute-forcing, and data source integration, for comprehensive results.  

**Installation Commands**: `sudo apt install amass` (kali/parrot)  

**Basic Usage**: `amass enum -d example.com -o amass_results.txt`  

**Key Flags**:
*   `enum -d <domain>`: Enumerate subdomains for the target. (e.g., `amass enum -d example.com`)
*   `-dir <directory>`: Specify a directory for output and configuration files.
*   `-config <file>`: Use a custom configuration file.
*   `-passive`: Run in passive mode only, using public data sources.
*   `-active`: Run in active mode, which includes DNS brute-forcing and scraping (use with caution and explicit permission).
*   `-ip`: Resolve IP addresses for the discovered subdomains.
*   `-v`: Enable verbose output.

**API Integration**: `Amass` uses a configuration file, usually at `~/.config/amass/config.ini`.
*   **Setup**: Edit `config.ini` to add API keys for various services like AlienVault, Censys, Cloudflare, Farsight, FullHunt, Google, Open Threat Exchange, Shodan, Virustotal, etc.
*   **Example `config.ini` entry**:
            ```ini
            [data_sources.virustotal]
            apikey = YOUR_VIRUSTOTAL_API_KEY

            [data_sources.shodan]
            apikey = YOUR_SHODAN_API_KEY
            ```
*   **Benefit**: Amass becomes exceptionally powerful with API keys, drawing from a vast network of intelligence sources.

#### Assetfinder (by Tomnomnom)
A simple and fast tool for finding subdomains from various sources, including Certificate Transparency logs and public DNS records.  

**Installation Commands**: `go get -u github.com/tomnomnom/assetfinder`  

**Basic Usage**: `assetfinder example.com > assetfinder_subs.txt`  

**Key Flags**:
*   `--subs-only`: Only output subdomains, no other domain types.
*   `--include-subdomains`: Include subdomains of discovered subdomains in the output.  

**API Integration**: Assetfinder typically doesn't directly integrate with external APIs in the same way `Subfinder` or `Amass` do. Its strength lies in its speed and simplicity, often used as part of a larger pipeline.

#### Findomain
 A fast subdomain enumerator that leverages certificate transparency logs, DNS lookups, and various public sources. It's written in Rust and known for its speed.  

 **Installation Commands**: 

    ```bash
    # For Linux (check their GitHub for the latest release/architecture)
    wget https://github.com/findomain/findomain/releases/latest/download/findomain-linux.zip
    chmod +x findomain-linux
    sudo mv findomain-linux /usr/local/bin/findomain
    ```  
(Alternatively, if you have Rust installed: `cargo install findomain`)  

**Basic Usage**: `findomain -t example.com -o findomain_subs.txt`  

**Key Flags**:
*   `-t <domain>`: Specify the target domain.
*   `-o <file>`: Output results to a text file.
*   `--output <format>`: Specify output format (e.g., `json`, `csv`).
*   `-u`: Update the internal data sources used by Findomain.
*   `--resolvers <file>`: Use a custom list of resolvers.
*   `--exclude-sources <source1,source2>`: Exclude specific sources.  

**API Integration**: Findomain supports API keys via its configuration file, typically `~/.config/findomain/config.toml`.
*   **Setup**: Edit the `config.toml` file.
*   **Example `config.toml` entry**:
            ```toml
            [virustotal]
            token = "YOUR_VIRUSTOTAL_API_KEY"

            [shodan]
            token = "YOUR_SHODAN_API_KEY"
            ```
*   **Benefit**: Like other tools, API keys enable Findomain to query more extensive and often private datasets for subdomains.

### Direct Certificate Transparency Log Querying**

#### `crt.sh`
A public service that monitors Certificate Transparency logs. Every time an SSL/TLS certificate is issued for a domain, it's logged publicly. These logs are a goldmine for subdomains. 

**Installation** jq (for parsing JSON output, e.g., from crt.sh): `sudo apt install jq`  

**Basic Usage (Web)**: Visit `https://crt.sh/` and search for `%` followed by your domain (e.g., `%example.com`). The `%` acts as a wildcard.  

**Basic Usage (CLI with `curl` and `jq`)**:
        ```bash
        curl -s "https://crt.sh/?q=%25.example.com&output=json" | \
        jq -r '.[].common_name' | \
        grep 'example.com' | \
        sort -u | \
        sed 's/^\*\.//'
        ```
*   **Explanation**:
    *   `curl -s "..."`: Fetches the JSON output silently from `crt.sh`.
    *   `jq -r '.[].common_name'`: Parses the JSON and extracts the `common_name` field, which contains the domain or subdomain.
    *   `grep 'example.com'`: Filters results to only include your target domain.
    *   `sort -u`: Sorts the unique subdomains.
    *   `sed 's/^\*\.//'`: Removes any leading `*.` wildcard characters.

### Historical Data & Archived URLs

#### Waybackurls / GAU (GetAllUrls by ProjectDiscovery)**:
These tools fetch known URLs, including subdomains, from the Wayback Machine (archive.org), Common Crawl, and other archiving services. This can reveal old subdomains no longer active but still useful for reconnaissance.  

**Installation Commands**: 
* Waybackurls: `go install -v github.com/tomnomnom/waybackurls@latest`  
* GAU: `go install -v github.com/lc/gau/v2/cmd/gau@latest`  

**Basic Usage**:
        ```bash
        echo example.com | waybackurls > wayback_subs.txt
        echo example.com | gau > gau_subs.txt
        ```
**Key Flags (for `gau`)**:
*   `-subs`: Include subdomains in the output.
*   `-o <file>`: Output to a file.
*   `-t <threads>`: Number of concurrent threads.
*   `--blacklist <ext1,ext2>`: Exclude URLs with specific extensions (e.g., `png,jpg,gif`).
*   `--providers <provider1,provider2>`: Specify which providers to query (e.g., `wayback,commoncrawl,otx`).

### Resolving and Probing Live Subdomains (`httpx`)**

After gathering a large list of subdomains, many may not be active or reachable. You need to resolve them to IP addresses and then check for live HTTP/HTTPS services.

#### `httpx` (by ProjectDiscovery)
A fast and versatile HTTP client that can probe a list of URLs for live web servers, status codes, titles, and more.  

**Installation Commands**: `go install -v github.com/projectdiscovery/httpx/cmd/httpx@latest`  

**Basic Usage**: `cat subdomains.txt | httpx -silent -status-code -title -o live_targets.txt`  

**Key Flags**:
*   `-silent`: Suppress verbose output.
*   `-status-code`: Display HTTP status code.
*   `-title`: Display page title.
*   `-o <file>`: Output live URLs to a file.
*   `-probe`: Probe for alive hosts and follow redirects.
*   `-ports <port1,port2>`: Specify custom ports to probe (e.g., `80,443,8080`).
*   `-threads <num>`: Set the number of concurrent goroutines (threads) for faster scanning.
*   `-random-agent`: Use a random user-agent.
*   `-tech-detect`: Detect underlying web technologies.

---

**Workflow Recommendation:**

1.  **Run multiple passive tools** (Subfinder, Amass, Findomain, Assetfinder) with all your configured API keys.
2.  **Query `crt.sh` directly** via CLI for additional findings.
3.  **Use `waybackurls` or `gau`** to fetch historical subdomains.
4.  **Combine all results** into a single, de-duplicated list:
    ```bash
    cat subs_subfinder.txt subs_amass.txt subs_findomain.txt subs_assetfinder.txt subs_crtsh.txt subs_gau.txt | sort -u > all_subdomains.txt
    ```
5.  **Pass the consolidated list to `httpx`** to identify live, accessible web applications:
    ```bash
    cat all_subdomains.txt | httpx -silent -status-code -title -ports 80,443,8080,8443 -random-agent -tech-detect -o live_web_assets.txt
    ```
