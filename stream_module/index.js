let fs = require("fs");
let http = require("http");
// const { pipeline } = require("stream");

// Read file using stream
const server = http.createServer();
server.on("request", (req, res) => {
    let rstream = fs.createReadStream("read.txt");
    rstream.on("data", (chunk) => {
        res.write(chunk);
    });
    rstream.on("end", () => {
        res.end();
    })
    rstream.on("error", (err) => {
        console.log(err);
        res.end("file not found..");

        // rstream.pipel(res);  // with pipe
    })
}).listen(3000, "localhost", () => console.log("http://localhost:3000"));

// let server = http.createServer((req, res) => {
//     let wstream = fs.createWriteStream("write.txt");
//     let data = "hello add text by createWriteStream";
    
//     wstream.write(data, "utf-8");
//     wstream.end();

//     wstream.on('finish', function() {
//         console.log("Write completed.");
//     });
//     wstream.on("error", (err) => {
//         console.log(err);
//         res.end("file not found..");
//     })

// }).listen(3000, "localhost", () => console.log("http://localhost:3000"));