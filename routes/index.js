const express = require("express");
// const Resultpages = require("./resultpages"); 
// const Surveypages = requrie("./surveypages");
const Users = require("./users");
const router = express.Router();


// router.use("/resultpages",Resultpages)
// router.use("/surveypages",Surveypages)
router.use("/users", Users);



module.exports = router;