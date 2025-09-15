---
sidebar_position: 10
---
# Setting up VMware

Setting Up VMware Workstation Pro: Bug Bounty Playground  


## To set up VMware Workstation Pro 
You generally need to **download the installer**, then **install it** on your host system. If you have an existing version, you might be looking to **upgrade**.

For **downloading VMware Workstation Pro**, you need to log in to the Broadcom Support Portal at https://support.broadcom.com. After logging in, you can access the downloads via a specific link, expand the desired version for your operating system (like "VMware Workstation Pro for Windows"), and select the version you want. Additional information on downloading can be found in the article "Downloading VMware Workstation Pro".

Before **installing** VMware Workstation Pro, it's important to review the latest release notes and ensure your physical machine meets the required processor requirements, host OS support, and other specifications listed in the Workstation Documentation Site. You should uninstall any previous versions before performing a new installation, but if you are upgrading, refer to the "Upgrading VMware Workstation Pro" article.

The **installation process** differs slightly depending on whether your host system is Windows or Linux.
- On **Windows**, you typically log in as an Administrator, locate the downloaded installer file (like `VMware-workstation-full-####-####.exe`), right-click it, and select "Run as Administrator". You can choose between a **Typical** setup, which installs standard features, or a **Custom** setup, which allows you to select features and modify installation directories. After following the on-screen instructions, you will need to restart the host machine. Further documentation for Windows installation is available via the link "Install Workstation Pro on a Windows Host".
- On **Linux**, you usually log in with the desired user account, open a terminal, change to root, and navigate to the directory containing the installer bundle file (like `VMware-workstation-Full-####-####.architecture.bundle`). You run the installer file using commands like `sh VMware-workstation-Full-####-####.architecture.bundle` with potential options like `--gtk` for a GUI wizard, `--console` for a terminal interface, or `--custom` to customize directories. You will need to accept the license agreement and follow the prompts. After installation, you should restart the Linux host. Further documentation for Linux installation is available via the link "Install Workstation Pro on a Linux Host".

After installation, you can start VMware Workstation Pro from the Start Menu on Windows or via command line (`vmware &`) or System Tools menu on Linux. The first time you start it, you will need to accept the End User License Agreement.

If you are **upgrading VMware Workstation Pro**, ensure your physical machine meets system requirements, your virtual machines are on a compatible version, and you shut down your virtual machines before starting. You might be prompted for an upgrade when starting Workstation, or you can manually check via **Help > Software Updates**. Downloading the full installer and running it is another way to perform the upgrade. After the upgrade is complete, it is recommended to upgrade the virtual machine hardware version and update VMware Tools within each virtual machine. More detailed steps for upgrading can be found in the article "Upgrading VMware Workstation Pro".  

---


# VirtualBox

VirtualBox: https://www.virtualbox.org/wiki/Downloads

### Extension Setup virtualbox:

VirtualBox > Preferences > Extension >> click (+) sign >> select That Downloaded Extension Pack >> Install > Finish.
