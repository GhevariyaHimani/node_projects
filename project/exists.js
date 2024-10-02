const http = require('http');
const fs = require('fs');
const path = require('path');

let dirname = path.join(__dirname, "public");

let server = http.createServer((req, res) => {
    let filename = path.join(dirname, req.url === "/" ? "index.html" : req.url);
    // console.log(filename)

    if(!filename.startsWith(dirname)){
        res.writeHead(401, {"Content-Type" : "text/plain"});
        res.end("access denied...");
        return;
    }

    fs.stat(filename, (err,stats) => {
        if(err || !stats.isFile()){
            res.writeHead(404, {"Content-Type" : "text/plain"})
            res.end("file not found...");
            return;
        }

    fs.readFile(filename, (err,data) => {
        if(err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end("server error..")
            return; 
        }

        const exename = path.extname(filename).toLowerCase();
        let contenttype = "text/plain";

        switch(exename){
            case ".html" : 
                contenttype = "text/html";
                break;
            case ".txt" :
                contenttype = "text/plain";
                break;
            case ".jpg":
            case ".jpeg":
                contentType = "image/jpeg";
                break;
        }
        
        res.writeHead(200, {"Content-Type" : contenttype})
        res.end(data)
        });
    });
}).listen(5000, "localhost", () => console.log("http://localhost:5000"))