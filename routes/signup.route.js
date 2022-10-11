const express = require("express");
const router = express.Router();
const signupController = require("../controller/signup.controller.js");
const verifyToken = require("../middleware/verifyToken.js");


router.post("/signup", signupController.signup);
router.get("/signup/confirmation/:token", signupController.getTokenUser);

router.post("/login", signupController.login);


router.get("/me", verifyToken, signupController.getMe);


module.exports = router;