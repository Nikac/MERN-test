const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.post("/login", userController.login);
router.get("/home", auth, userController.home);

module.exports = router;
