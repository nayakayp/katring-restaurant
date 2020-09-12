const express = require("express");
const path = require("path");
const router = express.Router();

// FRONTEND ROUTES //

// GET Homepage
router.get("/", function (req, res) {
  res.render("home.ejs");
});

// GET Menu
router.get("/menu", function (req, res) {
  res.render("menu.ejs", {});
});

// GET Profil
router.get("/profil", function (req, res) {
  res.render("profil.ejs", {});
});

// GET Hubungi Kami
router.get("/hubungi-kami", function (req, res) {
  res.render("hubungi-kami.ejs", {});
});

// GET Cart
router.get("/keranjang", function (req, res) {
  res.render("keranjang.ejs", {});
});

// GET Detail Produk
router.get("/menu/produk", function (req, res) {
  res.render("detail-produk.ejs", {});
});
module.exports = router;
