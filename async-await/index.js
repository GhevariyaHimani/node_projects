let path = require("path");
let http = require("http");
let fs = require("fs/promises");

async function serverfile(filepath, contenttype, res) {
    try{
        const data = await fs.readFile(filepath, "utf-8");
        res.writeHead(200, {"content-type" : contenttype});
        res.end(data);
    }catch(err) {
        console.log("error : ", err);
        res.writeHead(404, {"content-type" : contenttype});
        res.end("page not found");
    }
}

let servar = http.createServer(async (req, res) => {
    let filepath = path.join( __dirname, "public", req.url === "/" ? "home.html" : req.url);
    let ext = path.extname(filepath);
    let contenttype = "text/plain";

    if(ext === ".html") contenttype = "text/html";
    if(ext === ".txt") contenttype = "text/plain";
    if(ext === ".js") contenttype = "application/javascript";

    await serverfile(filepath, contenttype, res);
}).listen(3000, "localhost" , () => console.log("http://localhost:3000"));