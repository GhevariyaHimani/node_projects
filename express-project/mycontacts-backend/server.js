const express = require("express");
const errorhandle = require("./middelware/errorhandler");
const { connect } = require("mongoose");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

connectDb();

//body parser
app.use(express.json());
//midellware
app.use("/api/contacts", require("./routes/contactroute"));
app.use("/api/user", require("./routes/userroute"));
app.use(errorhandle);

app.listen(port, "localhost", () => console.log(`http://localhost:${port}`))