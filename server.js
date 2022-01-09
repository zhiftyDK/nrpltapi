const express = require("express")
const crypto = require("crypto");
const request = require('request')
const { JSDOM } = require("jsdom");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

var corsOptions = {
    origin: '*',
    methods: "GET"
}

app.use(cors(corsOptions));

app.get('/', async function(req, res) {
    if(req.query.q){
        request("https://www.nummerplade.net/nummerplade/" + req.query.q + ".html", (error, response, body) => {
            if (error) return console.log(error);
            let dom = new JSDOM(body);
            let result = {
                mærke: dom.window.document.querySelector("#maerke").textContent,
                model: dom.window.document.querySelector("#model").textContent,
                variant: dom.window.document.querySelector("#variant").textContent,
                type: dom.window.document.querySelector("#art").textContent,
                anvendelse: dom.window.document.querySelector("#anvendelse").textContent,
                nummerplade: dom.window.document.querySelector("#regnr").textContent,
                stelnr: dom.window.document.querySelector("#stelnr").textContent
            }
            res.send(result);
        })
    }
    else {
        res.send({
            status: "ok",
            version: "1.0.0",
            serverID: crypto.randomUUID()
        })
    }
})

app.listen(port, () => {
  console.log(`Deployed at port ${port}`)
})