const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs")
const PORT = 3000;

// //middleware - plugin
// app.use(express.urlencoded({extended : false}));

// app.get("/users" ,(req, res) => {
//     const html = `
//     <ul>
//         ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
//     </ul>`
//     res.send(html);
// })

//REST API

app.get("/api/users" ,(req, res) => {
    return res.json(users);
})

// create a route
app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = parseInt(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);  
    })
    // .patch((req, res) => {
    //     //  TODO : edit a user with id
    //     const idd = parseInt(req.params.id);
    //     const user = users.find(user => user.id === id);

    //     res.json({status : "pending"})
    // })
    .delete((req, res) => {
        //  TODO : delete a user with id
        // const idd = parseInt(req.params.id);
        // // console.log(id)
        // const user = users.find(user => {
        //     user.id === idd;
        //     // console.log(idd)
        // });
        // if(!user)  console.error("user Not Found!!");
        // const index = users.indexOf(user);
        // users.splice(index, 1);
        // res.send(user);
    })

app.post("/api/users" ,(req, res) => {
    //  TODO : create a new user
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status : "success", id: users.length})
    })
    // console.log("body" ,  body)
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

     