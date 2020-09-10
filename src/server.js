const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const frontendRouter = require("./routes/frontendRouter");

const app = express();

// Middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", frontendRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
