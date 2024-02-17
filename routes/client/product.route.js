const express = require("express");
const router = express.Router();
const controll = require("../../controllers/client/product.controller");
router.get("/", controll.index);    
router.get("/:slug", controll.detail);
module.exports = router;