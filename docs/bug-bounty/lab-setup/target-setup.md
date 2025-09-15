---
sidebar_position: 40
---
# Target Setup

Target Setup: Building Bug Bounty Traning Ground  

## Target Setup for Bug Bounty Practice

To effectively learn and practice bug bounty hunting, setting up deliberately vulnerable web applications on your local machine is essential. This creates a safe, legal, and controlled environment to hone your skills.

### Prerequisites

Ensure you have the following installed on your system. It's highly recommended to perform all setups within a dedicated virtual machine (VM) for isolation and security.

1.  **Virtualization Software**:
    *   **VMware Workstation/Player** or **Oracle VirtualBox** (For creating an isolated lab environment).
2.  **Web Server Environment (Optional, depending on target)**:
    *   **XAMPP (Windows/Linux/macOS)** or **LAMP Stack (Linux)** (For PHP/MySQL-based applications).
3.  **Docker (Recommended for many modern targets)**:
    *   Install Docker Desktop for your operating system.

---

### Popular Vulnerable Targets

Several well-maintained, intentionally vulnerable applications are perfect for practice:

*   **OWASP Juice Shop**: A modern and sophisticated insecure web application built with Node.js, Express, and Angular, covering a wide array of current vulnerabilities.
*   **Damn Vulnerable Web Application (DVWA)**: A PHP/MySQL application designed with common web vulnerabilities like SQL Injection, XSS, and CSRF, featuring multiple security levels.
*   **OWASP WebGoat**: A long-standing J2EE (Java) application focused on teaching server-side application flaws through guided lessons.
*   **bWAPP (buggy Web Application)**: A free and open-source PHP application packed with over 100 web vulnerabilities, including all major OWASP Top 10 risks.
*   **OWASP Mutillidae II**: Another free, open-source, and deliberately vulnerable web application offering dozens of vulnerabilities with built-in hints and tutorials.

---

### How to Set Up Your Targets

The setup method often depends on the type of application. Here are the most common approaches:

**1. Docker-Based Deployment (e.g., OWASP Juice Shop)**

Docker simplifies the deployment process by packaging applications with all their dependencies. This is often the quickest way to get modern applications running.

*   **Steps**:
    1.  Install **Docker Desktop** on your system.
    2.  Open your terminal or command prompt.
    3.  **Pull the Docker image**: `docker pull bkimminich/juice-shop` (replace `bkimminich/juice-shop` with the appropriate image for your target).
    4.  **Run the container**: `docker run --rm -p 3000:3000 bkimminich/juice-shop` (adjust port mapping as needed).
    5.  Access the application via `http://localhost:3000` (or your chosen port).

**2. XAMPP/LAMP Stack Deployment (e.g., DVWA, bWAPP, Mutillidae II)**

This method is typical for applications built using PHP and MySQL.

*   **Steps**:
    1.  Install **XAMPP** (for Windows/macOS/Linux) or configure a **LAMP stack** (for Linux). Ensure Apache and MySQL services are running.
    2.  Download the source code of your chosen vulnerable application.
    3.  Extract the application files into your web server's document root directory (e.g., `C:\xampp\htdocs\` or `/var/www/html/`).
    4.  Access **phpMyAdmin** (usually `http://localhost/phpmyadmin/`) to create a new database.
    5.  Follow the application's specific instructions to import its database schema (often an `.sql` file) and configure its database connection details.
    6.  Access the application in your web browser (e.g., `http://localhost/dvwa/`).

**3. Pre-built Virtual Machine (e.g., bWAPP - bee-box, Metasploitable)**

Some vulnerable applications are distributed as ready-to-use virtual machine images, simplifying the setup process significantly.

*   **Steps**:
    1.  Install **VMware Workstation/Player** or **Oracle VirtualBox**.
    2.  Download the pre-built VM image (e.g., `.ova`, `.vmdk`) for your target.
    3.  **Import the VM**: Use your virtualization software's import function (e.g., `File > Import Appliance...` in VirtualBox).
    4.  Start the imported virtual machine. It will boot up with the vulnerable application pre-installed and running. Refer to the VM's documentation for default credentials and access details.

---

**Important Note on Isolation:** Always set up and operate these vulnerable applications within an isolated virtual machine or Docker environment. This critical step protects your host operating system and network from any unintended consequences during your ethical hacking practice.

---