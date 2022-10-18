const http = require('http');
const fs = require('fs');
const deepai = require('deepai');
const sleep = require('sleep-promise');
let prompt;
const Stream = require('stream').Transform;
const {uploadfiles} = require("./uploads/upload");
let fileNames = [];
var fileName;
const deepai_api_key = require("./api-key/deep_ai_key.js")//TODO Replace this with your DeepAI API key


http.createServer(function (req, res, input) {

    prompt = req.url.replace("/", "");
    fileName = './images/' + prompt + ".jpg"
    getRequest(req, res)
        .then(() => res.writeHead(200, {'Content-Type': 'json'}))

}).listen(8181);

async function getRequest(req, res) {
    req.method = 'GET';
    await callDeepAI(res)//TODO: find a better way to wait for the image to be downloaded
        .then(() => sleep(3000)
            .then(() => res = uploadfiles(res, fileName)))
    return res;
}

deepai.setApiKey(deepai_api_key);

async function callDeepAI(res) {
    var resp = await deepai.callStandardApi("text2img", {
        text: prompt, name: fileName,
    });
    console.log("Response", resp);
    await callDownloadImageFromURL(resp.output_url.replace("https://", "http://"))

    console.log(resp);
    return resp;
}


async function callDownloadImageFromURL(output_url) {
    await downloadImageFromURL(output_url);
}

var downloadImageFromURL = (output_url, callback) => {
    var client = http;
    client.request(output_url, function (response) {
        var data = new Stream();

        response.on('data', function (chunk) {
            data.push(chunk);
            fileNames.push(fileName);

        });

        response.on('end', function () {
            fs.writeFileSync(fileName, data.read());
        });
    }).end()

};

