const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/order");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://zuizihad:" +
    process.env.MONGO_ATLAS_PW +
    "@node-shop.ukiuc.mongodb.net/super-shop?retryWrites=true&w=majority"
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS Error handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-COntrol-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-COntrol-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//Middleware
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

//handling error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
