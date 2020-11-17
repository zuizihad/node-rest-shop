const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const OrderController = require("../controllers/orders");

router.get("/", checkAuth, OrderController.GetAllOrder);

router.post("/", checkAuth, OrderController.CreateOrder);

router.get("/:orderId", checkAuth, OrderController.GetSingleOrder);

router.delete("/:orderId", checkAuth, OrderController.DeleteSingleOrder);

module.exports = router;
