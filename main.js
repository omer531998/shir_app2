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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});

var server = app.listen(3000, function(){
    console.log('Server listening on port 3000');
});

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

console.log("Express app running on port 3000");

module.exports = app;