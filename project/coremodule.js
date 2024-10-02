let path = require("path");
let fs = require("fs")
let http = require("http")

// let htmlfile = (__dirname , "index.html");
// let logfile = (__dirname, "log.txt")

let htmlfile = path.resolve(__dirname , "public")
let logfile = path.resolve(__dirname , "public", "log.txt")
// console.log(htmlfile)


const server = http.createServer((req, res) => {
    let filepath = path.join(htmlfile, req.url === "/" ? "index.html" : req.url)
    let log = (`${filepath}  time is ${Date().toString()} \n`)
    // console.log(req.url)

    fs.appendFile(logfile, log, (err) => {
        if(err) {
            console.log("error in write in file", err)
        }
    })

    fs.readFile(filepath, (err, data) => {
        if(err) {
            res.writeHead(404, {"content-type" : "text/plain"})
            res.end("404 page not found");
        } else {
            res.writeHead(200, {"content-type" : "text/html"})
            res.end(data)
        }
    })
}).listen(3000, console.log(`server started.. http://localhost:3000`))


// let pathname = (__dirname);
// console.log(pathname)
