var formidable = require('formidable');
var fs = require('fs');
var http = require("http");


function get_video_url(file_path, end_point) {
    return "http://im_a_url.look.at_me"
}

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var file_path = files.file_to_upload.path;
            var end_point = fields.end_point;
            console.log("File uploaded to path:", file_path);
            var url = get_video_url(file_path, end_point);
            res.write("video url: ");
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

