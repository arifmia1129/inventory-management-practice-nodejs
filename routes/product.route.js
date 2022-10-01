const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller.js");
const uploader = require("../middleware/uploader.js");

router.post("/file-upload", uploader.array("image"), productController.fileUpload)

router.route("/bulk-update")
    .patch(productController.bulkUpdateProduct)
router.route("/bulk-delete")
    .delete(productController.bulkDeleteProduct)


router.route("/")
    .get(productController.getProduct)
    .post(productController.createProduct)

router.route("/:id")
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router;