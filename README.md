<img src="https://kibocommerce.com/wp-content/uploads/header-logo.svg" alt="Kibo Logo" width="100"/> 

# eCommerce Application Template

### Prerequisites
1. Mozu Dev Center account.
2. Access to at least one developer account.
3. Familiarity with Javascript and the Node.js runtime environment.

### Dependencies
1. [Express](https://expressjs.com/) - lightweight Node.js framework for creating a web server.
2. [Cron](https://www.npmjs.com/package/cron) - NPM package for scheduling jobs on a timer.
3. [Nunjucks](https://mozilla.github.io/nunjucks/) - template language to make creating the configuration UI simpler.  Syntax is very similar to the HYPR templates used in theme development.
4. [Mozu Node SDK](https://github.com/Mozu/mozu-node-sdk) - SDK for communicating with Kibo eCommerce API.

### Instructions

1. Create an application record in Dev Center.
2. Install ngrok from [here](https://ngrok.com/download).  If you use a Mac and Homebrew, you can run `brew cask install ngrok` in your terminal.  If you download from the website, make sure to add ngrok to your PATH variable so that you can run it from any folder.  Installing ngrok via Homebrew will do this step automatically.
3. Download or clone this repository.
4. From the root of this project, install dependencies by running `npm install`.
5. Create a `mozu.config.json` file in the root of your project using your application key and secret from dev center.
6. Start dev server by running `npm run start`.  Nodemon will watch the folder for changes and automatically restart itself when it sees changes.  The server uses port 8080 by default.
7. In a separate terminal, run `ngrok http -host-header=localhost 8080` to create an endpoint to which you can link in Dev Center.  Depending on how you installed it, you may need to run this command from the directory ngrok was installed in.  This will generate a URL which will serve your configuration UI with HTTPS.
8. From your application screen in Dev Center, under the packages tab, enter the HTTPS URL from ngrok in the box and hit save.
9. Install your application in a sandbox.

Note: This template uses ngrok because it's easy to set up and can serve HTTPS.  The downside to this is that every time you restart ngrok you will have to enter the new URL in your app in dev center for both your configuration and your event subscriptions, and then reinstall the application to make the changes take hold.

### Resources
* [Mozu API documentation](https://www.mozu.com/docs/api/index.htm)
* [Mozu Events](https://www.mozu.com/docs/Developer/applications/event-subscription.htm)
* [Node Documentation](https://nodejs.org/en/docs/)