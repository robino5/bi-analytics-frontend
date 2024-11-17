# How to Deploy this project on Windows Server 2019
## Prerequisites
- **[Node.js](https://nodejs.org/en)**
- **[Apache 2.4](https://www.apachelounge.com/download/)**
- **[pm2](https://pm2.keymetrics.io/)**

# Nodejs Installation Guide for Windows Server
This guide will walk you through the steps to install Nodejs on a Windows Server machine.

## Step 1: Download Node.js Installer

1. Visit the official Node.js website at [nodejs](https://nodejs.org).

2. On the homepage, you'll see the "Downloads" section. Click on the "LTS" tab to download the Long-Term Support (LTS) version, which is recommended for most users.

3. Choose the appropriate installer for your system architecture (32-bit or 64-bit). If you're unsure, you can check your system architecture by right-clicking on "This PC" or "My Computer" and selecting "Properties".

## Step 2: Run the Node.js Installer

1. Once the installer is downloaded, double-click on it to run.
2. In the setup wizard, click "Next" to begin the installation process.
3. Read and accept the license agreement, then click "Next".
4. Choose the destination folder where Node.js will be installed. The default location is usually fine for most users. Click "Next" to proceed.
5. Select the components you want to install. The default components are typically sufficient for most users. Click "Next".
6. Choose the Start Menu folder where shortcuts for Node.js will be created. Click "Next".
7. Finally, click "Install" to start the installation process.


## Step 3: Check if the installation is successfull
1. Once the installation is complete, open Command Prompt by searching for "cmd" in the Start menu.
2. Type the following command and press Enter:

```bash
node --version
```
This command will display the version of Node.js installed on your system.
3. Additionally, you can check if npm (Node Package Manager) was installed by typing:
```bash
npm --version
```
This command will display the version of npm installed on your system.

## Step 4: Update npm (Optional)

1. Although npm is installed along with Node.js, it's a good idea to update it to the latest version. Run the following command in Command Prompt:
```bash
npm install npm@latest -g
```
This command will update npm to the latest version globally.

Congratulations! You have successfully installed Node.js on your Windows Server machine.

# Installing Apache HTTP Server 2.4 from Apache Lounge
This guide will help you install Apache HTTP Server 2.4 on your Windows Server machine from Apache Lounge, a popular source for precompiled Apache binaries.
## Step 1: Download Apache Binary
1. Visit the Apache Lounge website at [https://www.apachelounge.com/download/](https://www.apachelounge.com/download/).
2. Scroll down to the "Apache 2.4" section.
3. Choose the appropriate version of Apache 2.4 based on your system architecture (32-bit or 64-bit).
4. Click on the download link to save the Apache binary file to your local machine.
## Step 2: Extract Apache Files
1. Once the download is complete, navigate to the location where the Apache binary file was saved.
2. Right-click on the file and select "Extract All..." to extract its contents.
3. Choose a destination folder(preferred `C:/Apache24`) for the extracted files and click "Extract".
## Step 3: Configure Apache
1. Navigate to the folder where Apache was extracted and navigate to bin folder.
2. Run command `httpd.exe -k install` to install the apache2 service for windows.
3. add new httpd configuration by navigating to the installed location of the `apache24` in '/extra/conf/httpd-frontend.conf'.
4. Edit the `httpd-frontend.conf` file using a text editor like Notepad using reference as given in `apache-vshosts.conf` file config in this project.
5. Configure Apache according to your requirements, such as specifying server settings, listening ports, and document root directory.
6. Add the 4 no step named file (httpd-frontend.conf) file in the root httpd.conf located in `apache24/conf` at the end by giving below line

```
Include conf/extra/httpd-frontend.conf
```

## Step 4: Start Apache Server
1. Open Command Prompt with administrative privileges by searching for "cmd" in the Start menu, right-clicking on it, and selecting "Run as administrator".
2. Navigate to the "bin" folder within the Apache directory using the `cd` command.
3. Run the following command to start Apache:
```bash
httpd.exe -k start
```

# FOR FRONTEND

## Install pm2 (Required for Final Deployment)
1. Install the PM2 package using the [link](https://pm2.keymetrics.io/docs/usage/quick-start/).

# Steps to Complete for Frontend

### Step 1: place the given `apache-vhosts.conf` file given in `frontend` directory.
### Step 2: navigate into the frontend directory and run below commands.
```bash
npm i
pm2 start pm2.json
```
### Step 3: Restart the Apache Service with below Command
```bash
httpd.exe -k restart
```

Now, the project has been succefully deployed to the server.


## Getting Started for Development
navigate to the project root directory and follow below.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```