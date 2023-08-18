const express = require("express");
const router = new express.Router();

const AuthController = require("../Controllers/AuthController");
const authenticate = require('../Middleware/Authenticate')

router.post("/user/register", AuthController.userRegister);

router.post("/user/login", AuthController.userLogin);

router.get("/user/logout", authenticate, AuthController.userLogout);

module.exports = router;
