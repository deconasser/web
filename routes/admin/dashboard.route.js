const express = require("express");
const router = express.Router();

const controll = require("../../controllers/admin/product.controller");

router.get("/", controll.index);
module.exports = router;