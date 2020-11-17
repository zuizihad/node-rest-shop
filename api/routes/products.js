const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controllers/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", ProductController.GetAllProduct);

router.post("/", checkAuth, ProductController.CreateProduct);

router.get("/:productId", ProductController.GetSingleProduct);

router.patch("/:productId", checkAuth, ProductController.UpdateProduct);

router.delete("/:productId", checkAuth, ProductController.DeleteSingleProduct);

module.exports = router;
