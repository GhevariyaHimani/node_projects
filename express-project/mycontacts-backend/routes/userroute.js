//2
const express = require("express");
const { registeruser, loginuser, currentuser } = require("../controllers/usercontroller");
const validetoken = require("../middelware/validatetokenhandler");
const router = express.Router();

router.post("/register", registeruser)  //from usercontroller

router.post("/login", loginuser)

router.get("/current", validetoken , currentuser)

module.exports = router;