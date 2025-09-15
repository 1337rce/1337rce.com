---
sidebar_position: 30
---
# Networking Basics

Networking Basics: Understanding How the Web Works

**Basics of Computer Networking**

*   A **computer network** is a collection of interconnected devices that share resources and information. These devices can include computers, servers, printers, and other hardware. Networks enable the efficient exchange of data, supporting applications like email, file sharing, and internet browsing.
*   The basic building blocks of a computer network are **Nodes** and **Links**.
    *   **Nodes** are devices connected to a network, such as computers, servers, printers, routers, switches, and other devices.
    *   A **Link** in computer networks can be defined as wires, cables, or the free space of wireless networks.
*   Networks allow sending and receiving data via links using rules or **protocols**.
*   Computer networks first developed in the 1950s for military and defense purposes, primarily sending data through telephone lines. Today, they are essential for businesses, offering flexibility, automation, and security.
*   Modern computer networks can:
    *   **Work Virtually:** Physical networks can be divided into smaller virtual networks where devices are connected and can send data through multiple physical routes.
    *   **Connect on a Large Scale:** They link many smaller, spread-out networks into one large system, managed by automation and monitoring tools.
    *   **Adapt Quickly:** Many are software-controlled, allowing quick changes via a digital dashboard.
    *   **Keep Data Secure:** Built-in security features like encryption and access control protect data, and additional protections like antivirus software, firewalls, and malware protection can be added.
*   Understanding the basics of computer networking is essential in today’s interconnected world.

**Basic Terminologies & Concepts**

*   **Network:** A collection of computers and devices connected for communication and data exchange.
*   **Nodes:** Devices connected to a network.
*   **Protocol:** A set of rules and standards that govern how data is transmitted over a network.
*   **Topology:** The physical and logical arrangement of nodes on a network.
*   **Service Provider Networks:** Networks that lease network capacity and functionality, including Wireless Communications and Data Carriers.
*   **IP Address:** A unique numerical identifier assigned to every device on a network, used to identify devices and enable communication. Also known as the Logical Address.
*   **DNS:** The Domain Name System, a protocol used to translate human-readable domain names (like www.google.com) into IP addresses that computers understand. DNS is a critical component for seamless navigation on the internet.
*   **Firewall:** A security device used to monitor and control incoming and outgoing network traffic, protecting networks from unauthorized access and security threats.
*   **Open System:** A system connected to the network and ready for communication.
*   **Closed System:** A system not connected to the network and unable to be communicated with.
*   **Socket:** The unique combination of an IP address and a Port number.

**Types of Networks (Scope)**

*   **LAN (Local Area Network):** Covers a small area like an office or home, typically connecting devices within a building or campus.
*   **WAN (Wide Area Network):** Covers a large geographic area like a city, country, or the world, used to connect LANs together for long-distance communication.
*   **Cloud Networks:** Can be visualized with a WAN, hosted on public or private cloud providers, available on demand, and consist of Virtual Routers, Firewalls, etc.

**Network Architecture**

*   **Client-Server Architecture:** Nodes are either Servers or Clients, where the server node can manage the client node behavior.
*   **Peer-to-Peer (P2P) Architecture:** No central server; each device can function as either client or server.

**Network Devices**

*   An interconnection of multiple devices (hosts) is connected using multiple paths for sending/receiving data. Devices and mediums that help communication between two different devices are known as **Network devices**.
*   Network devices include **routers, switches, hubs, and bridges**.
    *   **Switches:** Act as a controller connecting computers, printers, and servers to a network in a building or campus. They are the foundation of most business networks. Switches allow devices on your network to communicate with each other and with other networks. Types include managed on-premises and cloud-managed switches. A switch forwards data *within* a network.
    *   **Routers:** Connect multiple networks together, including connecting computers on those networks to the Internet. A router acts as a dispatcher, analyzing data and choosing the best route for it to travel. Routers understand the IP format and forward packets *between* networks. They can also include features like a firewall, VPN, or IP communications system.
    *   **Wireless Access Points:** Allow devices to connect to the wireless network without cables. An access point extends the bandwidth provided by a router to support many devices and allow access from farther away. Access points support different IEEE standards. Wireless networks can use centralized, converged, or cloud-based deployments.
    *   Modems are also equipment for data communication.

**Network Topology**

*   Network Topology is the layout arrangement of devices in a network. Common types include:
    *   **Bus Topology:** All devices connected to a single central cable (bus). Simple and cheap, but the whole network fails if the main cable fails.
    *   **Star Topology:** All devices connected to a central node (hub or switch). If one device fails, the rest are unaffected, but if the central hub fails, the whole network stops working.
    *   **Ring Topology:** Devices connected in a circular loop, with data traveling in one direction. A failure in one device can affect the whole network.
    *   **Mesh Topology:** Every device is connected to every other device, providing multiple paths for data.
    *   **Tree Topology:** A combination of star and bus topology, good for organizing large networks and allowing easy expansion.
    *   **Hybrid Topology:** A combination of two or more different topologies (like star and mesh), flexible and customizable.

**OSI Model**

*   OSI (Open Systems Interconnection) is a reference model that specifies standards for communications protocols and the functionalities of each layer.
*   Developed by the International Organization For Standardization, it is a 7-layer architecture. Each layer has different functions and protocols.
*   The 7 layers are:
    1.  **Physical Layer:** The physical infrastructure to transport data, representing the signaling allowing bits and bytes to transfer via radio or signals over a cable. Examples include CAN Bus, Ethernet Physical Layer, and Bluetooth Physical Layer. Typically implemented in hardware.
    2.  **Data Link Layer:** Responsible for which physical devices packets should go to. Responsible for moving data from physical over to logical (to the network layer). Protocols include Ethernet, Wi-Fi (IEEE 802.11.xx), and NDP (for IPv6). Typically implemented in hardware.
    3.  **Network Layer:** Responsible for which path packets should travel on a network. A layer responsible for routing packets between networks via routers. Protocols include IP (IPv4, IPv6), ICMP, and IPSec. Typically implemented in hardware.
    4.  **Transport Layer:** Data is forwarded to a service capable of handling requests. The layer which allows applications to be represented on the network. Protocols include TCP, UDP, and QUIC. Connects the software with the hardware layers.
    5.  **Session Layer:** Capable of maintaining connections. Responsible for handling connections between the application and lower layers, involving establishing, maintaining, and terminating connections (sessions). Protocols include SOCKS, NetBIOS, and SIP. Typically implemented in software.
    6.  **Presentation Layer:** Ensures data is in a usable format. An unseen layer responsible for adapting, transforming, and translating data so applications and lower layers can understand each other. Involves Encoding Schemes (ASCII, UTF), Encryption (SSL, TLS), and Compression (GZip). Typically implemented in software.
    7.  **Application Layer:** Where humans process data and information. The business logic and functionality of the application. Most developers create applications on this layer. Examples include HTTP, FTP, and SNMP. Typically implemented in software.
*   SDN (Software Defined Networking) allows more hardware layers to be implemented via software.

**Unique Identifiers**

*   **Hostname:** A unique device name associated with each device in the network. Can be displayed by typing "hostname" in the command prompt.
*   **IP Address (Internet Protocol address):** A unique numerical identifier for each device on a network, used to identify devices and enable communication. The Internet Assigned Numbers Authority (IANA) assigns IPV4 addresses as unique identifiers.
    *   **IPv4:** Has a length of 32 bits, providing 2^32 addresses.
    *   **IPv6:** The latest standard, using 128 bits to support more addresses. IPv6 addresses use 8 groups of 4 hexadecimal numbers. IPv6 addresses can be shortened by removing leading 0s and using double colons (::) to represent consecutive 0s.
    *   You can find your IP address on Windows using `ipconfig` and on Linux using `ip addr show` or `ifconfig`.
*   **Netmask:** An extra piece of information together with the IP address that dictates how large a network is and which packet is routed within or outside the network. Can be represented via decimal numbers or slash notation (e.g., /24).
*   **RFC1918 Addresses:** IP addresses reserved for only internal organizational use and should not be routed on the Internet (e.g., 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16).
*   **Broadcast Address:** A reserved address in each network for broadcasting traffic to every host. It is always the last IP address in the network segment (e.g., 192.168.0.255 in a 192.168.0.0/24 network).
*   **Localhost Address:** 127.0.0.1, a /8 network used for traffic needing to be sent back to the host (e.g., for communication between applications). In IPv6, the localhost can be reduced to ::1 and ::.
*   **MAC Address (Media Access Control address):** The unique identifier of each host, associated with its NIC (Network Interface Card). Also known as the physical address. Assigned to the NIC at manufacturing. The length is 12-nibble/6 bytes/48 bits. The first three octets represent the manufacturing organization (OUI). You can find your MAC address on Windows using `ipconfig /all`. MAC addresses can be changed if you have administrator rights.
*   **Port:** A logical channel through which data can be sent/received to an application. Any host may have multiple applications running, each identified by a port number.
    *   A port number is a 16-bit integer.
    *   There are 2^16 (65,536) ports available, ranging from 0 to 65535.
    *   Ports are categorized as: Well known Ports (0 – 1023), Registered Ports (1024 – 49151), and Ephemeral Ports (49152 - 65535).
    *   You can list ports being used by typing `netstat -a` in the command prompt.
*   **Default Gateway:** When a computer needs to communicate outside its LAN, it sends traffic to the default gateway, a router capable of forwarding traffic to the destination IP address.

**Network Protocols**

*   A **protocol** is a set of rules or algorithms defining how two entities communicate across a network. Different protocols are defined at each layer of the OSI model.
*   Examples of protocols include TCP, IP, UDP, ARP, DHCP, FTP, and others.
*   **TCP/IP (Transmission Control Protocol/Internet Protocol):** The foundational protocol suite of the internet.
    *   **TCP (Transmission Control Protocol):** Enables reliable communication, ensuring data is delivered reliably and in order. Used for many applications, ensuring stability, control of data flow, reliability, and more. Uses ports. Uses a three-way handshake (SYN, SYN/ACK, ACK) to establish communication, relying on Pseudo Random Number Generator (PRNG) numbers for security. Offers some resiliency against packet spoofing.
    *   **IP (Internet Protocol):** Routes data packets to their destination based on IP addresses. Used to communicate across networks. Packets have headers describing details like Source and Destination IP addresses.
*   **HTTP (Hypertext Transfer Protocol) and HTTPS (HTTP Secure):** Protocols used for transmitting web pages. HTTP communication is unsecured, while HTTPS uses SSL/TLS encryption for secured communication. Enables access to web applications.
*   **SMTP (Simple Mail Transfer Protocol):** Protocol used to send email. Works with protocols like POP3 and IMAP for email retrieval.
*   **FTP (File Transfer Protocol):** Protocol used for transferring files between computers. Includes commands for uploading, downloading, and managing files on a remote server.
*   **DHCP (Dynamic Host Configuration Protocol):** Automatically assigns IP addresses to devices on a network. Reduces manual configuration and IP address conflicts. Allows easy management of clients joining and leaving a network. Can provide IP address, network range, default gateway, and DNS servers configuration.
*   **DNS (Domain Name System):** Translates human-friendly domain names into IP addresses. Ensures seamless navigation on the internet. When a user enters a domain name, the device sends a DNS query to a DNS resolver. The resolver checks its cache or forwards the request through a hierarchy of servers (root, TLD, authoritative) until the IP address is found. The authoritative DNS server gives the definitive answer. DNS answers can be cached for a certain Time To Live (TTL). DNS lookups can be done using `nslookup` (Windows) or `dig` (Linux) commands.
*   **ICMP (Internet Control Message Protocol):** Used by network devices and operators to diagnose network connections or for devices to send/respond to error conditions. Often associated with Ping and Traceroute. Can be used for ICMP Timestamp requests to synchronize time. Attackers may use Ping Sweeps to find active systems. ICMP Time Exceeded packets are used by routers in tracerouting.
*   **ARP (Address Resolution Protocol):** Used to convert an IP address to its corresponding physical address (MAC Address). Used by the Data Link Layer to identify the receiver’s MAC address. Systems check their ARP cache before communicating with an IP address on the LAN. The `arp -a` command can show the ARP cache.
*   **RARP (Reverse Address Resolution Protocol):** Provides the IP address given a physical address (MAC Address) as input. RARP has become obsolete since DHCP.
*   **QUIC (Quick UDP Internet Connections):** A protocol designed for faster connections, used by modern applications often with security built into higher OSI layers.
*   **SNMP (Simple Network Management Protocol):** Protocol to read and update network device configurations.
*   **SOCKS:** A protocol for sending packets through a proxy server.
*   **NetBIOS:** An older Windows protocol for establishing sessions and resolving names.
*   **SIP (Session Initiation Protocol):** Used for engaging in VOIP (Voice Over IP) communications.
*   **IPSec (Internet Protocol Security):** Allows encrypted and secure connections between two network devices.
*   **Ethernet:** An essential protocol used by most operating systems when connecting to networks using a physical cable. Ethernet Physical Layer specifies how signals are sent.
*   **Wi-Fi (Wireless Fidelity):** Uses the IEEE 802.11.xx family of protocols for accessing networks via radio signals.
*   **NDP (Neighbor Discovery Protocol):** Used by IPv6 on the Link Layer to gather information needed for IPv6 communication.
*   **CAN Bus (Controller Area Network):** Used in microcontrollers and other devices to communicate, often in Industrial Control Systems (ICS).

**Packet Transmission Concepts**

*   **Spoofing:** Creating packets with desired values in the headers, allowing attackers to send traffic on behalf of others. Easier to spoof protocols like UDP and ICMP than TCP. Typically requires root/system capabilities.
*   **Switched Networks:** Systems are connected to a LAN through a Switch, which uses MAC addresses for addressing and forwards traffic within the LAN.
*   **VLAN (Virtual LAN):** A way for a Switch to embed tags (VLAN ID) within the Frame, allowing systems on the LAN to communicate only with other systems with the same VLAN ID.
*   **NAT (Network Address Translation):** Allows a system accepting connections on a public IP address to map those requests to an internal RFC 1918 IP address or vice versa. Typically implemented by firewalls and routers. Common implementations include using an external IP as a front for multiple internal IPs (mapping requests based on destination port) or allowing internal IPs to access the internet with an external IP.
*   **Traceroute:** A way to determine which routers are involved in sending a packet from system A to B. Routers guide the packet towards the destination. Traceroute identifies these routers and tells you how far they are in milliseconds.
    *   The **IPv4 TTL (Time To Live)** and **IPv6 Hop Limit** headers have the same function. Every router decrements this value by 1; if it reaches 0, the packet is discarded, and an ICMP Time Exceeded packet is returned to the sender.
    *   Tools like `tracert` (Windows) and `traceroute` (Linux) work by sending packets with increasing TTL values until the destination is reached.

**Network Security**

*   Ensuring network security is crucial to protect data and resources from unauthorized access and attacks.
*   Key aspects of network security include Firewalls, Encryption, Intrusion Detection Systems (IDS), Access Control, and Regular Updates and Patching.
*   **Firewalls:** Devices or software that monitor and control incoming and outgoing network traffic based on security rules. They are designed to keep out all network traffic except allowed traffic.
    *   **Layer 4 Firewall:** Traditional firewalls operating on Layer 4 (Transport Layer), typically controlling TCP and UDP access. Features include NAT, Routing, Blocking/Allowing traffic, tracking active connections, and supporting VPN connections. Typically cheaper and offer more throughput than NGFWs.
    *   **NGFW (Next-Generation Firewalls):** Modern firewalls operating on all layers of the OSI model, including Layer 7 (Application Layer). Capabilities range wider than Layer 4 firewalls, typically focusing on security features. Can track active network connections, locations, users, applications, sessions, ports, and IP addresses. Other features include identifying and controlling applications, virtualization, intuitive management, protecting against known threats (via IPS), detecting/preventing unknown threats (via sandboxing), managing unknown traffic, and terminating/inspecting encrypted traffic. Can control users, not just systems via IP addresses. Features often depend on purchased licenses and hardware capacity.
    *   **WAF (Web Application Firewall):** A more specialized firewall for countering threats on the HTTP protocol. Allows more HTTP-specific features than a regular firewall. Provides useful utilities like building redundancy, enforcing security rules (encryption, multi-factor authentication), and acting as a single front for multiple web servers.
    *   Firewalls can be administered via proprietary management applications or web browsers. Management ports should ideally be segmented away from regular user access.
    *   **Segmentation:** Firewalls can segment traffic between hosts and systems into zones. Each segment holds services allowed to communicate. Connections to/from a segment are controlled by the firewall. Smaller segments offer more segregation but require more management. Without segmentation, users and systems can talk directly (a flat network). Segmentation can be based on services or functions.
    *   The best and most secure kind of segmentation is **zero-trust architecture**, requiring explicit permission for all system communication.
    *   Managing firewall rules is eased by connecting management to the organization's user directory (like Microsoft's Active Directory). This allows user-based policy control based on employee responsibilities.
    *   Traffic entering a network is **ingress traffic**; traffic leaving is **egress traffic**.
    *   Some traffic (e.g., proprietary applications) cannot be fully understood by the firewall and may be categorized as Unknown. Blocking such traffic may be considered.
*   **Encryption:** The process of encoding data to prevent unauthorized access. Commonly used in VPNs, HTTPS, and secure email. Many firewalls support installing certificates to decrypt traffic for inspection (ingress or egress), though some traffic (healthcare, financial) may be avoided due to privacy concerns. Decryption requires distributing keys to clients.
*   **Intrusion Detection Systems (IDS):** Tools that monitor network traffic for suspicious activity and potential threats.
*   **Intrusion Prevention Systems (IPS):** Systems positioned to detect and block threats. Often rely on frequent updates of new signatures from vendors and inspection of encrypted traffic.
*   IDS and IPS systems have signatures, algorithms, and heuristics to detect attacks. They are sometimes stand-alone but often included in NGFWs. An IDS/IPS on a host is a HIDS (Host Intrusion Detection System). The terms IDS and IPS are often used interchangeably, with the difference sometimes just being configuration.
*   **Access Control:** Mechanisms that restrict access to network resources based on user identity and role.
*   **Content and Application Filtering:** Firewalls can attempt to understand applications and content traversing the network.
    *   **URL Filtering:** NGFWs can protect content accessed via HTTP by looking up domains in a database with categories (e.g., news allowed, gambling not). Domain age and validity can also be checked. Instead of blocking, a firewall can redirect to a captive web portal for warnings or policy violation notices. Categories include hacking, nudity, violence, phishing, dating, messaging, entertainment, and anonymizing services.
    *   **Applications:** Firewalls can try to determine the application in use beyond just the protocol (e.g., identifying specific applications within HTTP) by decoding network streams on Layer 4 and determining content on Layer 7.
    *   **Content Control:** As applications are identified, firewalls can try to reveal specific content within them, such as documents, executables, source code, or scripts. They can identify malware or confidential information within these files. This can apply to protocols like HTTP, SMB, FTP, IMAP & POP3, and SMTP.
*   **Sandboxing:** A platform to execute potentially malicious files in an isolated environment. The sandbox records and monitors the file's activity to determine if it's malicious. NGFWs can forward executable files to a sandbox, preventing downloads until a verdict is made. Modern sandboxes can run files in multiple platforms (Windows, Android, Linux). Files that can perform malicious actions include ZIP files, Office documents, PDF files, Java applications, JavaScript, and screensavers. Public and installable sandboxes are available.
*   **VPN (Virtual Private Network):** Enables two systems to establish encrypted communication. Many use a client-server architecture. VPNs hosted by a workplace can provide access to internal resources. Some VPN services are designed for user privacy and encrypting data in transit, effectively masquerading the user's IP address online. Using VPNs for secure communication is generally good practice, but caution is advised with free services, which can be malicious.

**Benefits of Computer Networks**

*   **Fast and Easy Communication:** Enable digital communication like emails, messaging, file sharing, video calls, and streaming.
*   **More Storage Space:** Provide storage for data, reducing the need for physical files.
*   **Easier Sharing of Information:** Make it simpler for users and teams to share resources and information, facilitating collaboration.
*   **Better Security:** Well-designed networks are reliable and offer options for keeping data safe, with built-in features like encryption and access controls.