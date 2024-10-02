// import * as path from "path";
// import * as fs from "fs/promises"
// import * as http from "http";
// import { dirname } from "node:path"

let path = require("path");
let fs = require("fs/promises");
let http = require("http")
function  serverfile(filepath, res) {
    let ext = path.extname(filepath).toLowerCase();

    let content_type = "text/plain";

    if(ext === ".txt") content_type = "text/plain";
    if(ext === ".html") content_type = "text/html";
    if(ext === ".js") content_type = "application/javascript";

    fs.readFile(filepath, "utf-8").then((data) => {
        // console.log("1", filepath)
        res.writeHead(200, {"Content-Type": content_type} )
        res.end(data);
    }).catch(err =>{
        res.writeHead(404, {"Content-Type": content_type})
        res.end("page not found");
        // console.log(err)
    })
}

let server = http.createServer((req, res) => {

    let filepath = path.join( __dirname , "public", req.url === "/" ? "index.html" : req.url);
    // console.log("2 d", __dirname)
    // console.log("3",filepath)
    serverfile(filepath, res);
    // console.log("4",filepath)
}).listen(3000, "localhost", () => console.log("http://localhost:3000"));