var formidable = require('formidable');
var fs = require('fs');
var http = require("http");

const SERVER_PORT = 8080;

function get_video_url(file_path, end_point) {
    return "http://im_a_url.look.at_me"
}

http.createServer(function (req, res) {
    if (req.url === '/file_upload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var file_path = files.file_to_upload.path;
            var end_point = fields.end_point;
            console.log("File uploaded to path:", file_path);
            var url = get_video_url(file_path, end_point);
            res.write("video url: "); // Or return a file
            res.write(url);
            res.end();
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile("index.html", function(err, data){
            if(err){
                res.statusCode = 500;
                res.end('Error getting the file: ${err}.');
            } else {
                res.write(data);
                res.end();
            }
        });

    }
}).listen(SERVER_PORT);

console.log("Server listening on port: " + SERVER_PORT);

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

