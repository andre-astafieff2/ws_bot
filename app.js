const express = require('express');
const venom = require('venom-bot');
const cors = require('cors');
//const uploads = require('./upload.js')
const { initVenom } = require('./venom_helper');
const uploads = require('./upload')
const {
  getQR,
  getStatus,
  sendImageMessage,
  getContacts
} = require("./controller");

const app = express();
app.use(express.json()); //parser used for requests via post,
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

/*
venom
  .create(
    //session
    'sessionName', //Pass the name of the client you want to start the bot
    //catchQR
    (base64Qrimg, asciiQR, attempts, urlCode) => {
      console.log('Number of attempts to read the qrcode: ', attempts);
      console.log('Terminal qrcode: ', asciiQR);
      console.log('base64 image string qrcode: ', base64Qrimg);
      console.log('urlCode (data-ref): ', urlCode);
    },
    // statusFind
    (statusSession, session) => {
      console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
      //Create session wss return "serverClose" case server for close
      console.log('Session name: ', session);
    },
    // options
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

    // BrowserInstance
    (browser, waPage) => {
      console.log('Browser PID:', browser.process().pid);
      //waPage.screenshot({ path: 'screenshot.png' });
    }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });




function start(client) {
  //inicializa a api

  app.get('/status', (req, res)=>{
    return res.status(200).json({
        "qr_code":client.urlCode,
        "conectado":client.statusSession
    })
})

  app.get('/contatos', async (req, res) => {
    try {
      const dados = await client.getAllContacts();
      console.log('chmou contatos')
      return res.status(200).json(dados)
    } catch (error) {
      console.error(error)
      res.status(500).json({ status: "error", message: error })
    }
  })



  client.onStateChange((state) => {
    console.log('Mudança de status: ', state);
    if ('CONFLICT'.includes(state)) client.useHere();
    if ('UNPAIRED'.includes(state)) console.log('logout');
  });

}

*/

initVenom("WZQuitandinha");

app.get('/sts', getStatus)
app.post('/imageMessage', sendImageMessage)
app.get("/contatos", getContacts);
app.get("/qr", getQR);

app.post('/file', uploads.single('file'),  (req, res)  => {
  try {
      //res.send('Arquivo enviado com sucesso: ' + req.file.filename);
      //return res.status(200).json({status: "ok", arquivo: req.file.filename})
  } catch (error) {
      //console.log(error);
  }
})
//mudança de porta
app.listen(5000, () => {
  console.log('subiu')
})
