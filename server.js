const express = require("express")
const puppeteer = require("puppeteer");
const crypto = require("crypto");
const app = express();
const port = process.env.PORT || 3000;

app.get('/', async function(req, res) {
    if(req.query.q){
        const browser = await puppeteer.launch({
            executablePath: '/workspace/node_modules/puppeteer/.local-chromium/linux-938248/chrome-linux'
        });
        const page = await browser.newPage();
        await page.goto("https://www.nummerplade.net/nummerplade/" + req.query.q + ".html");
        const maerke = await page.waitForSelector("#maerke");
        const model = await page.waitForSelector("#model");
        const variant = await page.waitForSelector("#variant");
        const type = await page.waitForSelector("#art");
        const anvendelse = await page.waitForSelector("#anvendelse");
        const nummerplade = await page.waitForSelector("#regnr");
        const stelnr = await page.waitForSelector("#stelnr");
        res.send({
            mærke: await maerke.evaluate(el => el.textContent),
            model: await model.evaluate(el => el.textContent),
            variant: await variant.evaluate(el => el.textContent),
            type: await type.evaluate(el => el.textContent),
            anvendelse: await anvendelse.evaluate(el => el.textContent),
            nummerplade: await nummerplade.evaluate(el => el.textContent),
            stelnummer: await stelnr.evaluate(el => el.textContent),
        });
        await browser.close();
    }
    else {
        res.send({
            status: "ok",
            version: "1.0.0",
            serverID: crypto.randomUUID()
        })
    }
    async function carInfo(plate) {
        
    }
})

app.listen(port, () => {
  console.log(`Deployed at port ${port}`)
})