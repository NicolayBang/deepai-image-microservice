
async function uploadfiles(response, fileName) {
    const req = require("request");
    const fs = require("fs");
    const postUrl = "http://localhost:31221/images"

    let headers = {
        contentType: 'multipart/form-data', contentLength: '2000000', filename: fileName
    }
    let request = req;
    request.headers = headers;
    let formData = {
        'image': {
            value: fs.createReadStream(fileName), options: {
                filename: fileName,
                contentType: 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                typeEncoding: 'chunked',
            }
        }
    };
    await request.post({url: postUrl, formData: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {

            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
        response.end(JSON.parse(JSON.stringify(body)))
        fs.unlink(fileName, function (err) {
            if (err) {
                console.log("Error deleting file", err);
            }
            console.log('File deleted!');
        });
        console.log(fileName);
    });

}

exports.uploadfiles = uploadfiles;
