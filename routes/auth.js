const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getCustomerData", authMiddleware.verifyToken, authController.getCustomerData);

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/changePassword", authMiddleware.verifyToken, authController.changePassword);

module.exports = router;