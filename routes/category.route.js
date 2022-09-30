const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller.js");

router.route("/")
    .get(categoryController.getCategory)
    .post(categoryController.saveCategory)


router.route("/:id")
    .get(categoryController.getCategoryById)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)


module.exports = router;