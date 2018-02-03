var formidable = require('formidable');
var fs = require('fs');
var http = require("http");
var request = require("request");
var archiver = require('archiver');
var path = require("path");

const SERVER_PORT = 8080;

/*
function get_output_json(file, end_point) {
    end_point = end_point.replace("create_video_session", "create_video_spec");
    fs.readFile(file.path, "utf8", function(err, file_data){
        if(err){
            console.log("Error opening file: " + file.path);
        } else {
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     end_point,
                body:    file_data
            }, function(error, response, body){
                console.log(body);
                return body;
            });
        }
    });
}
*/

function get_output_json(file, end_point) {
    end_point = end_point.replace("create_video_session", "create_video_spec");
    var file_data = fs.readFileSync(file.path, function(err, data){
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
        return body;
    });
}

function getCompressedFilePath(outputs, compressedFolderPath) {
    var compressedFilePath = path.join(compressedFolderPath, "output.zip")
    var compressedFile = fs.createWriteStream(path.join(compressedFilePath, "output.zip"));
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });

    compressedFile.on('close', function() {
        console.log("Compressed: " + archive.pointer() + ' total bytes');
        console.log('Finished compression');
        return compressedFilePath
    });

    archive.on('error', function(err) {
        throw err;
    });

    outputs.forEach(function (output) {
        archive.append(output[1], { name: output[0] });
    });

    archive.finalize();
}

function main() {
    http.createServer(function (req, res) {
        if (req.url === '/file_upload') {
            var form = new formidable.IncomingForm();
            form.multiples = true;
            form.parse(req, function (err, fields, form_files) {
                var input_files = form_files.files_to_upload;
                var end_point = fields.end_point;
                var outputs = input_files.map(function(input_file) {
                    var j = get_output_json(input_file, end_point);
                    console.log(j);
                    return [input_file.name,  j];
                });
                try {
                    res.sendFile(getCompressedFilePath(outputs, form.uploadDir));
                }
                catch(err) {
                    res.write(err);
                }
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
}

main();