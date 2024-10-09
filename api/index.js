const express = require("express")
const bodyparser = require("body-parser")
const path = require("path")
const app = express();

app.use(express.urlencoded({extended : true}))
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "form.html"));
})

let items = []; 
app.post("/add", (req, res) => {
    const {userId, name , item} = req.body;
    items.push({userId, name, item});
    res.send("item added...");
})

app.get("/items", (req, res) => {
    res.json(items);
})

app.delete("/items/:id", (req, res) => {
    res.json(items);
})
app.listen(3000, () => console.log("http://localhost:3000"));