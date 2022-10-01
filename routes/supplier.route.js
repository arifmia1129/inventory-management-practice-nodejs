const express = require("express");
const router = express.Router();
const supplierController = require("../controller/supplier.controller.js");

router.route("/")
    .get(supplierController.getSupplier)
    .post(supplierController.saveSupplier)


router.route("/:id")
    .get(supplierController.getSupplierById)
    .patch(supplierController.updateSupplier)
    .delete(supplierController.deleteSupplier)


module.exports = router;