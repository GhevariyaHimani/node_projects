let fs = require("fs");;
let path = require("path");
let http = require("http")

let dirpath = (__dirname, "public");
// console.log(dirpath)

let server = http.createServer((req,res) => {
   
    let filepath = path.join(dirpath, req.url === "/" ? "index.html" : req.url);
    // console.log(filepath)
    // console.log(req.url)
    const exenm = path.extname(filepath)
    let contenttype = "text/plain"
    if(exenm === ".html")  contenttype = "text/html"
    if(exenm === ".txt")   contenttype = "text/plain"

    fs.readFile(filepath, (err, data) => {
        if(err){
            if(err.code === "ENOENT"){
                res.writeHead(404, {"content-type" : contenttype})
                res.end("404 not found");
            } else {
                res.writeHead(500, {"content-type" : contenttype})
                res.end(`server error ${err.message}`)
            }
        } else {
            res.writeHead(200, {"content-type" : contenttype})
            res.end(data)
        }
    })
}).listen(4000, console.log(`server started.. http://localhost:4000`))
