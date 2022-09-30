const express = require("express");
const router = express.Router();
const storeController = require("../controller/store.controller.js");

router.route("/")
    .get(storeController.getStores)
    .post(storeController.saveStore)


router.route("/:id")
    .patch(storeController.updateStore)
    .delete(storeController.deleteStore)

module.exports = router;