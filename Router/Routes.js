const express = require("express");
const router = new express.Router();

const AuthController = require("../Controllers/AuthController");

router.post("/user/register", AuthController.userRegister);

router.post("/user/login", AuthController.userLogin);

module.exports = router;
