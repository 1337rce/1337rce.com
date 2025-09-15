---
sidebar_position: 40
---
# Linux Basics

Linux Basic: Your Bug Bounty Hunting Command Center  

### Introduction to Linux Basics

**Linux is a family of free and open-source operating systems based on the Linux kernel**. Operating systems based on Linux are known as **Linux distributions or distros**. Examples include Debian, Ubuntu, Fedora, CentOS, Gentoo, Arch Linux, and many others. **Kali Linux, for instance, is a specialized Debian-based distribution geared towards ethical hacking and penetration testing**, providing a comprehensive set of pre-installed tools for security assessments. The Linux kernel has been under active development since 1991 and is very versatile. Today, Linux powers a significant portion of the world's computing infrastructure, including web servers, smartphones, and cloud infrastructure.

Newcomers to Linux may find it different from Windows or MacOS, particularly due to its filesystem structure and heavy reliance on the command line interface (CLI) rather than graphical interfaces. This introduces basic command line concepts and skills.

### The Terminal, Shell, and Command Line Interface

The terms "terminal," "shell," and "command line interface" are often used interchangeably, but they have subtle differences.
*   A **terminal** is an input and output environment that presents a text-only window running a shell.
*   A **shell** is a program that exposes the computer's operating system to a user or program. In Linux, the shell presented in a terminal is a command line interpreter. It translates commands entered by the user into a language understood by the kernel. Examples include C Shell, Bourne Shell, and Korn Shell.
*   A **command line interface** is a user interface (managed by a command line interpreter) which processes commands to a computer program and outputs the results.

Becoming comfortable with using a terminal is essential for administrative tasks in Linux, such as file manipulation, package installation, and user management. When accessing a cloud server, you'll most often do so through a terminal shell. The terminal is interactive; you type commands into the prompt and press `ENTER` to execute them.

### The Filesystem Hierarchy Standard (FHS)

**Nearly all Linux distributions comply with the Filesystem Hierarchy Standard (FHS)**, a universal standard for filesystem directory structure. The FHS defines specific directories, each serving a special function.

*   The **forward slash (/) indicates the root directory** in the FHS hierarchy. It is the base directory, and you cannot navigate further back from it.
*   The `/home/` directory contains the home directories for regular users. When a user logs in to the shell, they are typically brought to their own user directory within `/home/`. This is referred to as the user's **home directory**. For example, `/home/sammy` would be the home directory for the user `sammy`.
*   The **`root` user** has its own home directory specified by the FHS, located at `/root/`. Note that this is different from the root directory `/`.

The FHS simplifies file organization by function due to its standardized layout and purpose-driven directories.

### Navigation Commands

Linux filesystems are based on a directory tree structure, where directories (folders) can contain other directories and files.

To see your current working directory:
```bash
pwd
```
The `pwd` command stands for "print working directory" and outputs the path to your current location, such as `/home/sammy`.

To list files and directories in your current working directory:
```bash
ls
```
The `ls` command displays the names of items in your current directory. To list detailed information, including hidden files (those starting with a dot), use the `-la` option:
```bash
ls -la
```
This shows permissions, ownership, size, and modification time. The `-R` option lists items inside subfolders, and `-a` shows hidden content. You can get help for commands like `ls` using the `--help` flag or the `man` command.

To change your current working directory:
```bash
cd [path_or_directory]
```
The `cd` command stands for "change directory". You can navigate into a directory within your current location by specifying its name.
*   To move one level up the directory hierarchy, use `cd ..`.
*   To return to your home directory, use `cd` or `cd ~`. The tilde (~) is shorthand for the current user's home directory.
*   You can navigate to any directory by specifying its full path, regardless of your current location.

To create one or more new directories:
```bash
mkdir directory_name1 directory_name2
```
The `mkdir` command stands for "make directory". You can create a directory in another location by specifying the full path.

To remove an empty directory:
```bash
rmdir directory_name
```
The `rmdir` command removes an empty directory. It won't work if the directory contains files.

### File Manipulation Commands

You cannot use `cd` to interact with files, only directories.

To create a new empty file:
```bash
touch file.txt
```
The `touch` command creates a new empty file or updates the timestamp of an existing one.

To rename or move a file or directory:
```bash
mv old_name.txt new_name.txt
mv file.txt /path/to/new_location/
```
The `mv` command stands for "move". It can rename a file/directory or move it to a different location.

To copy a file:
```bash
cp file.txt new_file.txt
cp file.txt /path/to/destination/
```
The `cp` command stands for "copy". It copies a file to a new location, optionally giving it a new name. Use the `-R` option to copy a directory and its contents.

To delete files or directories:
```bash
rm file.txt
rm -r directory_name
```
The `rm` command stands for "remove" and deletes files. The `-d` flag can delete empty directories. The `-r` flag recursively deletes a directory and its contents, including files and subdirectories. Use `-i` for a confirmation prompt before deletion, or `-f` to force deletion without confirmation. **Caution:** Using `rm -r` is permanent.

To view the contents of a file:
```bash
cat file.txt
less file.txt
```
The `cat` command prints the entire contents of a specified file to the terminal output. For long files, `cat` can be unwieldy. The `less` command allows you to view file contents one terminal page at a time, using spacebar to advance and arrow keys to scroll, and `q` to quit.

To create or edit files using text editors:
```bash
nano file.txt
```
Editors like `nano`, `vim`, `emacs`, `pico`, `jed`, and `mousepad` allow you to add, modify, and save text within files. `nano` is considered beginner-friendly. If the file doesn't exist, these commands will create a new one.

Using `echo` for output and file redirection:
```bash
echo "Hello, world!"
echo "Hello" > greeting.txt
echo "World!" >> greeting.txt
```
The `echo` command displays text or variables as output.
*   The `>` symbol redirects the output of a command (like `echo`) to a file, **overwriting** the file if it exists.
*   The `>>` symbol appends the output to an existing file or creates a new one if it doesn't exist. This is useful for logging or building lists in scripts.

Other file utilities include `file` to check a file type, `zip` and `unzip` to compress/extract files, and `tar` to bundle files into archives.

### Users and Privileges

Linux is a multiuser system. In the `ls -la` output, file and directory permissions are shown for three entities: the owner, the group, and other users. Each has three permission categories: read (r), write (w), and execute (x).
*   **Read (r):** Allows viewing file contents or listing directory contents.
*   **Write (w):** Allows modifying a file or adding/deleting/renaming files in a directory.
*   **Execute (x):** Allows running a file or entering a directory.

Permissions are displayed as nine characters after the file type (`-` for file, `d` for directory, `l` for link). The first three characters are for the owner, the next three for the group, and the last three for others. A hyphen (`-`) indicates a permission is not granted.

To change permissions:
```bash
chmod [options] [permission] [file_or_directory]
```
The `chmod` command ("change mode") changes the permissions of a file or directory. Permissions can be set using symbolic notation (e.g., `+x` to add execute permission) or numeric (octal) notation.

**chmod Numeric Permissions**

| Permission | Numeric Value |
| :--------- | :------------ |
| read (r)   | 4             |
| write (w)  | 2             |
| execute (x)| 1             |
| no perm (-) | 0             |

Combinations add up:
*   Read + Write + Execute (`rwx`) = 4 + 2 + 1 = 7
*   Read + Execute (`r-x`) = 4 + 0 + 1 = 5
*   Read + Write (`rw-`) = 4 + 2 + 0 = 6
*   Read only (`r--`) = 4 + 0 + 0 = 4

Numeric permissions are specified for owner, group, and others, respectively. For example, `chmod 754 file.txt` sets owner permissions to read, write, and execute (7), group permissions to read and execute (5), and others permissions to read only (4). `chmod 777 file.txt` gives read, write, and execute permissions to everyone.

To change the ownership of files or directories:
```bash
chown [options] newowner:newgroup file1 file2
```
The `chown` command changes the owner and/or group of a file or directory.

To create, manage, or delete users:
```bash
useradd new_username
passwd new_username
userdel new_username
su [username]
whoami
```
The `useradd` command creates a new user account. `passwd` sets or changes a user's password. `userdel` removes a user account. The `su` command ("switch user") allows you to switch to another user account, prompting for that user's password. `whoami` prints the currently logged-in user.

**The `sudo` Command**
```bash
sudo your_command
```
The `sudo` command ("superuser do") allows a user with appropriate privileges to execute commands as the **superuser** (`root`) or another user. It is commonly used for administrative tasks requiring elevated privileges. When you run a command with `sudo`, you are typically prompted for your user's password. This provides elevated access only for that specific command or for a limited time.

Not any user can use `sudo`; the user must be part of the `sudoers` file or a group permitted in that file (like the `sudo` group in Kali Linux). The `sudoers` file contains configuration information for `sudo` access and permissions. You can view the commands a user is allowed to run with `sudo` using `sudo -l`.

Running commands as the `root` user directly (which has ultimate privileges) is generally not best security practice; using `sudo` allows for running specific commands with elevated privileges while staying as a regular user.

### Common Network Commands

Linux provides various commands for network troubleshooting, configuration, and information gathering.

To display network interfaces and IP addresses:
```bash
ip a
ifconfig
```
The `ip a` command shows network interfaces, IP addresses (IPv4 and IPv6), MAC addresses, and other details. `ifconfig` is an older command that provides similar information.

To display wireless network interface configuration:
```bash
iwconfig
```
The `iwconfig` command shows details like signal strength, frequency, and encryption for wireless interfaces.

To display the Neighbor Table (IP-to-MAC mappings) or ARP cache:
```bash
ip n
arp -a
```
`ip n` shows IP-to-MAC address mappings for devices recently communicated with. `arp -a` displays the ARP (Address Resolution Protocol) cache, which also maps IP addresses to MAC addresses. This protocol is used to identify the MAC address associated with an IP address on the local network.

To display the routing table:
```bash
ip r
route
```
`ip r` and `route` show the routing table, including destination networks, gateway IP addresses, and network interfaces. Understanding the routing table is important for knowing how your traffic is directed and identifying potential access to other networks.

To check network connectivity:
```bash
ping [hostname_or_IP_address]
```
The `ping` command sends ICMP echo requests to a target to check connectivity and measure round-trip time. By default, `ping` often sends packets indefinitely until stopped with `Ctrl + C`. The `-c` option specifies the number of packets to send. A successful response indicates the host is alive, though some machines may block ICMP traffic.

Other network commands include `netstat` to display network configuration and connections, `traceroute` to track packet paths, `nslookup` and `dig` to query DNS servers.

### Starting and Stopping Services

Services are processes that run in the background to provide functionality, like web servers or SSH.

To start or stop a service using the `service` command (common in older distros):
```bash
sudo service service_name start
sudo service service_name stop
```
For example, `sudo service apache2 start` starts the Apache web server service. You typically need `sudo` privileges to manage services.

To start a simple HTTP server from the current directory using Python:
```bash
python3 -m http.server 80
```
This command starts a basic web server on the specified port, hosting files from the directory it's run in.

To enable or disable a service from starting automatically on system boot using `systemctl` (common in newer distros):
```bash
sudo systemctl enable service_name
sudo systemctl disable service_name
```
For example, `sudo systemctl enable ssh` configures the SSH service to start automatically at boot.

### Package Management

Linux distributions use package managers to install, update, and remove software packages from online repositories.

In Debian-based systems like Ubuntu and Kali Linux, the `apt` (Advanced Package Tool) command is used.
```bash
sudo apt update
sudo apt upgrade
sudo apt install package_name
sudo apt remove package_name
```
`sudo apt update` updates the list of available packages from repositories. `sudo apt upgrade` upgrades installed packages to their latest versions. `sudo apt install` installs a specified package. `sudo apt remove` removes a package.

`git clone` is used to download code repositories, commonly from platforms like GitHub.
```bash
git clone [repository_url]
```
This is often used to obtain custom tools or scripts.

### Other Useful Commands

*   **`man command_name`**: Displays the manual pages for a command, providing detailed usage information, options, and examples.
*   **`locate keyword`**: Searches for files by name in a prebuilt database. Run `updatedb` to update this database.
*   **`find path options expression`**: Searches for files or directories in a specific path in real-time.
*   **`grep options keyword file`**: Searches for specific lines containing a keyword within a file or from other command output (often used with pipes `|`).
*   **`cut options file`**: Extracts specific sections from lines in a file based on delimiters, bytes, or characters.
*   **`head file_name` / `tail file_name`**: Display the first (head) or last (tail) lines of a file or piped output. By default, they show 10 lines; the `-n` option changes this.
*   **`history`**: Shows a list of previously executed commands.
*   **`alias name='string'`**: Creates a shortcut (alias) for a command or string. `unalias` removes an alias.
*   **`watch options command_name`**: Runs a command repeatedly at intervals, useful for monitoring.
*   **`jobs options Job_ID`**: Lists active jobs or processes running in the current shell.
*   **`kill Process_ID`**: Terminates a process using its process ID (PID).
*   **`shutdown options time message`**: Shuts down or restarts the system.
*   **`wget URL`**: Downloads files from the internet.
*   **`curl options URL`**: Transfers data from or to a server, useful for downloading files or testing APIs.
*   **`scp options source destination`**: Securely copies files between systems over a network.
*   **`rsync options source destination`**: Syncs files or folders between two locations.
*   **`cal options month year`**: Displays a calendar.

### Basic Bash Scripting Concepts

Bash scripting allows for automating tasks by writing sequences of commands. Key concepts include:
*   **Shebang**: The line `#!/bin/bash` at the beginning of a script declares it as a bash script.
*   **Variables and Arguments**: Variables store data. Script arguments can be accessed using `$1`, `$2`, etc., where `$1` is the first argument passed to the script, `$0` is the script name itself.
*   **Pipes (`|`)**: Redirect the standard output of one command to be the standard input of another command, chaining utilities together.
*   **Loops (`for`)**: Execute a block of code repeatedly, often iterating over a list or sequence. A common structure is `for variable in [list]; do [commands]; done;`.
*   **Conditional Statements (`if`)**: Execute commands only if a specified condition is met. A basic structure is `if [ condition ]; then [commands]; else [commands]; fi;`.
*   **Backgrounding (`&`)**: Running a command followed by `&` executes it in the background. This can allow multiple instances of a command or script to run concurrently.

Understanding these basics is foundational for navigating, managing, and interacting with Linux systems, whether for general use or specialized tasks like ethical hacking.  