function getQR(req, res) {
    try {
      if (global.WA_STATUS) {
        switch (global.WA_STATUS) {
          case "chatsAvailable":
          case "CONNECTED":
          case "qrReadSuccess":
            return res.status(200).send({ message: "already connected to chat" });
          default:
            break;
        }
      }
      if (!global.WA_QR) {
        //return res.status(404).send({ error: "QR not found / not generated" });
      } else {
        const im = global.WA_QR.split(",")[1];
  
        const img = Buffer.from(im, "base64");
  
        res.writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": img.length,
        });
  
        res.end(img);
        return res.status(200).send(global.WA_QR);
      }
    } catch (e) {
      return res
        .status(400)
        .send({ status: "unable to start instance", error: e });
    }
  }
  
  async function getStatus(req, res) {
    try {
      let status = global.WA_STATUS
      if (global.WA_CLIENT) {
        status = await global.WA_STATUS 
        //console.log("global.WA_CLIENT.getConnectionState()", await global.WA_CLIENT.getConnectionState())
      }
      //return res.status(200).send({ status: status });
      return res.status(200).json(status)
    } catch(e){
      return res.status(400).send({ status: 'error while getting status', error: e });
    }
  }

  async function getContacts(req, res) {
    try {
        let contatos = null
        //if(global.WA_CLIENT){
            contatos = await global.WA_CLIENT.getAllContacts()
        //}
        return res.status(200).send(contatos)
    }catch(e){
        return res.status(400).send({status:"ERR", erro: e})
    }
  }
  

  
  async function sendImageMessage(req, res) {
    try {
      const { contact, name, image, label } = req.body;
      //console.log(req.body)
      const imagePath = './uploads/'+image;
      //if (!contact || !label) {
      //  return res
      //    .status(404)
      //    .send({ error: "phone / message is missing " });
     // }
     // if (!global.WA_CLIENT) {
     //   return res.status(404).send({ error: "Client not found, please init" });
     // }
     // //await global.WA_CLIENT.sendText(`${phone}@c.us`, message)
      await global.WA_CLIENT.sendImage(contact, imagePath,image,label)
        .then((result) => {
          return res.status(200).send({ result: result });
        })
        //.catch((err) => {
        //  return res.status(400).json({ error: err });
        //});
    } catch (e) {
      return res.status(400).send({ status: "unable to send message", error: e });
    }
  }

  async function Status(req, res){

  }
  
  module.exports = {
    getQR,
    getStatus,
    sendImageMessage,
    getContacts,
  };
  