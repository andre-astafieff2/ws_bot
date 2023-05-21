const venom = require("venom-bot");
const fs = require("fs");

async function initVenom(sessionName) {
    if (global.WA_CLIENT) {
      await global.WA_CLIENT.logout();
      fs.rmdirSync("tokens", {
        recursive: true
      });
    }
  
    global.WA_CLIENT = null;
    global.WA_QR = null;
    global.WA_STATUS = null;
  
    await venom
      .create(
        sessionName,
        (base64Qrimg) => {
          global.WA_QR = base64Qrimg;
        },
        (statusSession, session) => {
          global.WA_STATUS = statusSession;
          //Create session wss return "serverClose" case server for close
          console.log("Session name: ", session);
        },
        {
            folderNameToken: 'tokens', //folder name when saving tokens
            mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
            headless: 'new', // Headless chrome
            devtools: false, // Open devtools by default
            debug: false, // Opens a debug session
            logQR: true, // Logs QR automatically in terminal
            browserWS: '', // If u want to use browserWSEndpoint
            browserArgs: [''], // Original parameters  ---Parameters to be added into the chrome browser instance
            addBrowserArgs: [''], // Add broserArgs without overwriting the project's original
            puppeteerOptions: {}, // Will be passed to puppeteer.launch
            disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
            disableWelcome: true, // Will disable the welcoming message which appears in the beginning
            updatesLog: true, // Logs info updates automatically in terminal
            autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
            createPathFileToken: false, // creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
            addProxy: [''], // Add proxy server exemple : [e1.p.webshare.io:01, e1.p.webshare.io:01]
            userProxy: '', // Proxy login username
            userPass: '' // Proxy password
          },
      )
      .then((client) => {
        global.WA_CLIENT = client;

        // start(client);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

module.exports = { initVenom };