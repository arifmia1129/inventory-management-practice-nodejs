const express = require("express");
const router = express.Router();
const stockController = require("../controller/stock.controller.js");


router.route("/bulk-update")
    .patch(stockController.bulkUpdateStock)
router.route("/bulk-delete")
    .delete(stockController.bulkDeleteStock)


router.route("/")
    .get(stockController.getStock)
    .post(stockController.createStock)

router.route("/:id")
    .get(stockController.getStockById)
    .patch(stockController.updateStock)
    .delete(stockController.deleteStock)

module.exports = router;