var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var http = require("http");

var app = express();

var inputfiles = [];
var endpoint;

function getEndpoint(inputEndpoint, parameters){ //TODO
    var endpoint = inputEndpoint;
    if(inputEndpoint.includes("create_video")){


    }
}

function setReqOptions(endpoint, inputfile) { //TODO
    var url = endpoint.substring(0, endpoint.indexOf("create_video")) + "create_video_spec";

    var options = {
        url: url,
        method: "POST",
        body: inputfile
    };
    return options;
}

function get_video_url(file_path) {
    return "http://im_a_url.look.at_me"
}

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var file_path = files.filetoupload.path;
            console.log("File uploaded to path:", file_path);
            var url = get_video_url();
            res.write("video url: ");
            res.write(url);
            res.end();
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);

console.log("Server listening on port 8080");

/*
//make request for JSON
inputfiles.forEach(function(inputfiles){
    var reqOptions = setReqOptions(endpoint, inputfile);
    var req = app.request(reqOptions, function(res){

    });
});


//send files to user
app.get('/img/bg.png', function(req, res) {
    res.sendFile('public/img/background.png')
})

*/

