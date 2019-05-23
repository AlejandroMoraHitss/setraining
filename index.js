require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

const corsOption = {
    origin: '*'
};

app.use(cors(corsOption));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.send("Succesful credit card");
});

app.post("/", async function (req, res) {
    var config = {
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`
        }
    };
    var body = {
        to: req.body.user,
        body: "Card approves",
        subject: "Credit card",
    };
    var respuesta = await axios.post("https://hitss.modyo.cloud/api/v1/messaging/notifications", body, config).then(function(r){
        return r;
    }).catch(err =>{
       return err;
    });
    res.status(respuesta.status || respuesta.response.status).send("enviada");
});

app.listen(process.env.PORT, () => {
    console.log("Esta escuchando");
});