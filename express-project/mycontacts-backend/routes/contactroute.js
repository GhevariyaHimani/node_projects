const express = require("express");
const app = express();
const router = express.Router()
const { getcontacts, createcontacts, getcontact, updatecontacts, deletecontacts } = require("../controllers/contactcontroller");
const validetoken = require("../middelware/validatetokenhandler");

router.use(validetoken); // all routes ae private route
router.route("/").get(getcontacts).post(createcontacts);    // Express. Router module is used to create modular and mountable route handlers.

router.route("/:id").get(getcontact).put(updatecontacts).delete(deletecontacts)
 
module.exports = router;