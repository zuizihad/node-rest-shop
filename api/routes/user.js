const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/user");

router.post("/signup", UserController.SingUp);

router.post("/login", UserController.SingIn);

router.delete("/:userId", checkAuth, UserController.DeleteUser);

module.exports = router;
