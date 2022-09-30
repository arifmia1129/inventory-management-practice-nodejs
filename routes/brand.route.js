const express = require("express");
const router = express.Router();
const brandController = require("../controller/brand.controller.js");

router.route("/")
    .get(brandController.getBrands)
    .post(brandController.createBrand)


router.route("/:id")
    .get(brandController.getBrandById)
    .patch(brandController.brandUpdate)

module.exports = router;