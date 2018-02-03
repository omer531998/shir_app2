var formidable = require('formidable');
var fs = require('fs');
var http = require("http");
var request = require("request");

const SERVER_PORT = 8080;

function get_output_file(file, end_point) {
    end_point = end_point.replace("create_video_session", "create_video_spec");
    var file_data = fs.readFile(file.path, function(err, data){
        if(err){
            console.log("Error opening file: " + file.path);
        } else {
            return data;
        }
    });

    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     end_point,
        body:    file_data
    }, function(error, response, body){
        console.log(body);
    });
    return body;
}


function main() {
    http.createServer(function (req, res) {
        if (req.url === '/file_upload') {
            var form = new formidable.IncomingForm();
            form.multiples = true;
            form.parse(req, function (err, fields, form_files) {
                var input_files = form_files.files_to_upload;
                var end_point = fields.end_point;
                var output_files = input_files.map(function(input_file) {
                    return get_output_file(input_file, end_point);
                });
                // TODO: add all files to a rar file
                res.end();
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readFile("index.html", function(err, data){
                if(err){
                    res.statusCode = 500;
                    res.end('Error getting the file: ' + err);
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
}

main()
