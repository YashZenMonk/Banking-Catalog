const express = require("express");
const cors = require("cors");
const path = require("path");
const bankCatalogRouter = require("./routes/bankCatalogRouter");

let app = express();

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Enabling CORS for all routes
app.use(cors());

//USING ROUTES
app.use("/bank-catalog", bankCatalogRouter);

// Define a middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).render("404");
});

module.exports = app;
