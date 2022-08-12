const express = require("express");
// const Resultpages = require("./resultpages");
// const Surveypages = requrie("./surveypages");
const AuthRouter = require("./auth.routes");
const router = express.Router();

// router.use("/resultpages", Resultpages);
// router.use("/surveypages", Surveypages);
router.use("/", AuthRouter);

module.exports = router;
