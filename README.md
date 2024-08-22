
![gitnotion](https://github.com/user-attachments/assets/079fdd2e-ba20-4a5b-9801-58448e81d8b9)




# Charlie's Angels' Resume Maker
**Charlie's Angels' Resume Maker** turns your GitHub activity into a sleek, professional resume. Just authorize GitHub access to the app, enter your GitHub username, and get a customized resume featuring your contributions, repositories, stars, and followers. Perfect for showcasing your coding journey effortlessly!
## Team members
1. [Kenz E S](https://github.com/tzzkenz)
2. [Shezma Bijumon](https://github.com/shezmabijumon)
3. [Sooryajith R S](https://github.com/sooryajithrs)
4. [Prathith Chivukula](https://github.com/prethith)
## Link to product walkthrough
[link to video](Link Here)
## How Does it Work?
### The boring theory version
1. **Authenticate Your Session:**\
Log in to GitHub and a personal access token is created by GitHub, which is then accessed by a proxy server through API calls after exchanging the client ID and client secret. This token is used to securely access your data. \
2.**Enter Your GitHub Username:** Input your GitHub username into GitResume.
3. **Fetch Data:** GitResume uses the GitHub API to pull data related to your contributions, repositories, stars, and followers.

4. **Generate Resume:** The app formats the retrieved data into a professional resume.
### The awesome video version
embed video link here
## Libraries used
| Library name    | Version |
| -------- | ------- |
| npm  | 10.8.2    |
| Node.js | v21.7.3     |
| React    | 18.3.1    |
| Express.js | 4.19.2 | 
| react-dom | 18.3.1 | 
| react-router-dom | 6.26.0 | 
| Chart.js | 4.4.3 | 
| react-chartjs-2 | 5.2.0 | 
| axios | 1.7.3 | 
| cors | 2.8.5 | 

## How to configure
You can clone the repository to your system using the web URL, a password-protected SSH key or using the GitHub CLI. 

#### Clone the repository using HTTPS: 
```bash
git clone https://github.com/tzzkenz/Charlies-angels.git
```
#### Clone the repository using SSH: 
```bash
git clone git@github.com:tzzkenz/Charlies-angels.git
```
**Note**: You need a [public key](https://github.com/settings/ssh/new) for this method. 

#### Clone the repository using GitHubCLI: 
```bash
gh repo clone tzzkenz/Charlies-angels
```
---
## How to Run
**Note:** Since `node_modules` is not included in this repository, the following steps to install npm modules are essential.  
<br>
Once you clone the repository, switch to the directory and run: 
```bash
npm install
```
This will install all the necessary packages and modules. Additionally, change directory into the `client/` directory and do the same:
```bash
cd client/
npm install
```
To start the server, outside the `client/` directory (but within the main directory), run: 
```bash
npm start
```
If the server is running successfully, you should see the following message: 
```
Server running on port 5000
```
If not, ensure that all the necessary packages are installed. 

Once the server is running, run the following command from within the `client/` directory: 
```bash
npm run dev
```
Click the link then generated to view the web application running on your system. 
