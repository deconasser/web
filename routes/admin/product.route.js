const express = require("express");
const router = express.Router();
const control = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({storage: storageMulter()});

router.get( "/", control.index);
router.patch("/change-status/:status/:id", control.changeStatus);
router.patch("/change-multi", control.changeMulti);
router.patch("/delete-item/:id", control.delete);
router.get("/create", control.create);
router.post("/create", 
    upload.single("thumbnail"), 
    validate.createPost,
    control.createPost
);
router.get("/edit/:id", control.edit);
router.patch("/edit/:id", upload.single("thumbnail"), control.editPatch);

module.exports = router;