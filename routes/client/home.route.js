const express = require("express");
const router = express.Router();

const controll = require("../../controllers/client/home.controller");

router.get("/", controll.index);
module.exports = router;