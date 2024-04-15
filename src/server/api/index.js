const express = require("express");
const router = express.router;

router.use("/users", require("./users"));
router.use("cars", require("./cars"));

module.exports = router;
