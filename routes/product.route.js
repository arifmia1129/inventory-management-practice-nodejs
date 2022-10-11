const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller.js");
const auth = require("../middleware/auth.js");
const uploader = require("../middleware/uploader.js");
const verifyToken = require("../middleware/verifyToken.js");

router.post("/file-upload", uploader.array("image"), productController.fileUpload)

router.route("/bulk-update")
    .patch(productController.bulkUpdateProduct)
router.route("/bulk-delete")
    .delete(productController.bulkDeleteProduct)


router.route("/")
    .get(verifyToken, auth("buyer"), productController.getProduct)
    .post(productController.createProduct)

router.route("/:id")
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router;