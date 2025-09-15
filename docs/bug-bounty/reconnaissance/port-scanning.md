---
sidebar_position: 60
---
# Port Scanning

Port scanning involves sending requests to a target host to identify which ports are open, what services are running on them, and often, the version of that software and the underlying operating system. This process provides a low-level view of a target's network attack surface.

## Information Gained from Port Scanning:

*   **Open Ports**: Indicates active network services.
*   **Running Services**: Identifies specific applications listening on ports (e.g., HTTP on 80/443, SSH on 22, FTP on 21).
*   **Service Versions**: Crucial for cross-referencing with known vulnerabilities (CVEs).
*   **Operating System Fingerprinting**: Helps infer the target's OS, further guiding attack strategies.
*   **Firewall Rules**: Observing scan behavior can reveal firewall or IDS presence.

---

## Installation:

Ensure you have the necessary package managers for your system.

### Nmap
    ```bash
    # For Debian/Ubuntu-based systems
    sudo apt update
    sudo apt install nmap

    # For Fedora/CentOS
    sudo yum install nmap

    # For macOS with Homebrew
    brew install nmap
    ```
### Naabu (Requires Go installed)
    ```bash
    go install -v github.com/projectdiscovery/naabu/v2/cmd/naabu@latest
    ```
### Masscan
    ```bash
    # For Debian/Ubuntu (may need to build from source for latest features)
    sudo apt install masscan

    # Building from source (recommended for latest, follow instructions on GitHub)
    git clone https://github.com/robertdavidgraham/masscan
    cd masscan
    make
    sudo make install
    ```
### Netcat (`nc`)
    ```bash
    # Often pre-installed, or for Debian/Ubuntu
    sudo apt install netcat-traditional # or netcat-openbsd
    # For macOS with Homebrew
    brew install netcat
    ```

---

## Practical Tools & Techniques:

## Nmap (Network Mapper)
The industry-standard tool for network discovery and security auditing. It offers extensive capabilities for port scanning, service detection, OS detection, and vulnerability scripting.  
### Basic Scan (TCP Connect Scan)
        ```bash
        nmap example.com
        ```
**`nmap <target>`**: Default scan is a TCP Connect scan (`-sT`) on the 1000 most common ports. This is detectable as it completes the 3-way handshake.

### SYN Scan (Stealth Scan)
        ```bash
        sudo nmap -sS example.com
        ```
        *   **`-sS`**: Performs a SYN "half-open" scan. It sends a SYN packet and if a SYN/ACK is received, it infers the port is open but does not complete the handshake, making it less detectable by some firewalls. Requires root privileges.

### UDP Scan
        ```bash
        sudo nmap -sU example.com
        ```
        *   **`-sU`**: Scans for open UDP ports. UDP scans are often slower and less reliable as open ports may not respond, and closed ports may generate ICMP port unreachable messages. Requires root privileges.

### Service Version Detection
        ```bash
        nmap -sV example.com
        ```
        *   **`-sV`**: Attempts to determine the service and version number of applications running on open ports. This is highly valuable for finding known vulnerabilities.

### Operating System Detection
        ```bash
        sudo nmap -O example.com
        ```
        *   **`-O`**: Attempts to determine the operating system of the target host. Requires root privileges.

### Aggressive Scan (Combines common options)
        ```bash
        sudo nmap -A example.com
        ```
        *   **`-A`**: Enables OS detection (`-O`), version detection (`-sV`), script scanning (`-sC`), and traceroute. It's a comprehensive, but noisier, scan.

### Scan Specific Ports/Ranges
        ```bash
        nmap -p 21,22,80,443 example.com
        nmap -p 1-1024 example.com
        ```
        *   **`-p <port(s)>`**: Scans only the specified ports or ranges.

### All Ports Scan
        ```bash
        sudo nmap -p- example.com # Scans all 65535 ports
        ```
        *   **`-p-`**: Scans all 65535 ports. This takes a very long time without aggressive timing.

### Nmap Scripting Engine (NSE)
        ```bash
        nmap -sC example.com # Run default scripts
        nmap --script http-enum -p 80,443 example.com # Run a specific script
        nmap --script "vuln" example.com # Run scripts in the 'vuln' category
        ```
        *   **`-sC`**: Runs a set of default Nmap scripts. These scripts perform various tasks like vulnerability detection, advanced discovery, and backdoor detection.
        *   **`--script <script_name|category|directory|expression>`**: Specifies scripts to run. NSE scripts greatly extend Nmap's capabilities.

### Timing Templates (Speed vs. Stealth)
        ```bash
        nmap -T4 example.com # Default: aggressive (T3-T4 common)
        nmap -T5 example.com # Insane: faster, potentially less accurate
        nmap -T0 example.com # Paranoid: slowest, most stealthy
        ```
**`-T<0-5>`**: Sets the timing template. Higher numbers are faster but noisier.
*   `T0 (Paranoid)`: Very slow, bypasses IDS.
*   `T1 (Sneaky)`: Slow, still stealthy.
*   `T2 (Polite)`: Slows down to use less bandwidth, less likely to crash hosts.
*   `T3 (Normal)`: Default, balanced speed.
*   `T4 (Aggressive)`: Fast, assumes good network.
*   `T5 (Insane)`: Very fast, for targets on fast networks.

### Output Formats
        ```bash
        nmap -oN normal.txt -oX xml.xml -oG grepable.txt example.com
        ```
*   **`-oN <file>`**: Normal output to a file.
*   **`-oX <file>`**: XML output to a file (machine-readable).
*   **`-oG <file>`**: Grepable output to a file (easy for scripting).

## Naabu (by ProjectDiscovery)
 A fast port scanner designed for reliability and simplicity. It's excellent for quickly identifying open ports across many targets. 

#### Basic Usage
    ```bash
    naabu -host example.com
    naabu -list targets.txt -o naabu_results.txt
    ```
*   **`-host <target>`**: Specify a single target.
*   **`-list <file>`**: Provide a list of targets (IPs or domains).
*   **`-o <file>`**: Output results to a file.  

#### Key Flags
*   `-p <ports>`: Scan specific ports (e.g., `-p 80,443,8080`).
*   `-tp <ports>`: Scan top N common ports (e.g., `-tp 100` for top 100).
*   `-exclude-cdn`: Exclude CDN-hosted IPs from the scan.
*   `-s`: Perform a SYN scan (requires root).
*   `-rate <num>`: Set the rate limit (packets per second).
*   `-c <concurrency>`: Number of concurrent goroutines.
*   `-silent`: Only display results, no banners.
*   `-v`: Verbose output.
#### Integration
 Naabu is often piped into `httpx` to check for live web services on discovered open ports.
    ```bash
    naabu -host example.com -tp 100 | httpx -silent -status-code -title
    ```

## Masscan
An incredibly fast, internet-scale port scanner. It can scan the entire internet in minutes. Best used for finding *any* open port on a large number of hosts, rather than detailed service detection.  

#### Basic Usage
    ```bash
    sudo masscan -p80,443 example.com/24 --rate 1000 -oL masscan_results.txt
    ```
*   **`-p<ports>`**: Specify ports (e.g., `-p80`, `-p80,443`, `-p1-65535`).
*   `<target>`: IP address, CIDR range, or list of targets.
*   `--rate <packets/sec>`: Controls scan speed. Set higher for speed, lower for stealth.
*   `-oL <file>`: Output results to a list file.
#### Key Flags
*   `--ping`: Perform a simple ICMP echo request.
*   `--banners`: Attempt to grab banners (adds overhead, slows down).
*   `--source-ip <ip>`: Spoof source IP (use with extreme caution).
*   `--exclude <ip/range>`: Exclude specific IPs or ranges.
*   `--wait <seconds>`: Time to wait for responses after sending all probes.

## Netcat (`nc`)
A simple yet powerful utility for reading from and writing to network connections using TCP or UDP. Useful for basic port checks and banner grabbing.  

#### Basic Usage (TCP connect)
        ```bash
        nc -zv example.com 80
        nc -zv example.com 1-1000
        ```
*   **`-zv`**: Verbose scan, zero-I/O mode (don't send data), for a single port or range.
#### Banner Grabbing
        ```bash
        echo "GET / HTTP/1.0\r\n\r\n" | nc example.com 80
        ```  

Connects to port 80 and sends a basic HTTP GET request, often revealing server software and version in the response headers.

---

## Advanced Considerations:

### Firewall/IDS Evasion
*   **Packet Fragmentation (`nmap -f`)**: Sends fragmented IP packets to bypass simple packet filters.
*   **Decoy Scans (`nmap -D RND:10`)**: Sends scan packets from spoofed IP addresses mixed with your real IP, making it harder to pinpoint the scanner.
*   **Bad Checksums (`nmap --badsum`)**: Sends packets with invalid TCP/UDP checksums; some firewalls may drop these, others may pass them to the target.
*   **Spoofing MAC Address (`nmap --spoof-mac <MAC>`)**: Changes the MAC address used for scanning.
*   **Source Port Manipulation (`nmap --source-port 80`)**: Sends packets from a specific source port (e.g., port 80 or 443), which might be allowed through firewalls.  

### Rate Limiting & Timing 
Adjust scan rates (`--rate` for Masscan, `-T` for Nmap, `-rate` for Naabu) to avoid detection or overwhelming the target. Be respectful of target infrastructure.
### Target Specification 
Combine lists of subdomains with IP addresses and CIDR ranges obtained from other reconnaissance phases for comprehensive coverage.
### Output Management 
Always save scan results (`-oX`, `-oN`) for later analysis, especially when dealing with large targets.

## Workflow Recommendation:

1.  **Fast Initial Scan (Naabu/Masscan)**: Use `naabu` or `masscan` on your collected list of subdomains/IPs to quickly identify all open ports.
2.  **Detailed Nmap Scan**: Take the open ports identified by `naabu` or `masscan` and run targeted `nmap` scans with service/version detection (`-sV`), OS detection (`-O`), and default scripts (`-sC`) on only those specific ports. This is more efficient and less noisy than a full Nmap scan.
    ```bash
    # Example pipeline:
    cat targets.txt | naabu -silent -p - | nmap -sV -O -sC -iL -
    ```
3.  **Manual Verification/Banner Grabbing**: For interesting ports, use `netcat` or `curl` to grab banners or interact manually for further verification.
4.  **Analyze Nmap Scripts Output**: Pay close attention to the output of NSE scripts, as they often flag common vulnerabilities or interesting information directly.