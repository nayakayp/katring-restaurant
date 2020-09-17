const express = require("express");
const axios = require("axios");
const path = require("path");
const router = express.Router();
let snaptoken;

const app = express();

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

// POST Cart
router.post("/keranjang", function (req, res) {
  console.log(req.body);
  let {
    item_details,
    totalprice,
    tanggal,
    waktu,
    nama,
    email,
    perusahaan,
    alamat,
    kodepos,
    telpon,
  } = req.body;

  axios({
    method: "post",
    url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic " +
        Buffer.from("SB-Mid-server-642FX_es-JcgwUeuaXoits14").toString(
          "base64"
        ),
    },
    data: {
      transaction_details: {
        order_id: "katring-order-" + Math.round(new Date().getTime() / 1000),
        gross_amount: totalprice,
      },
      item_details: item_details,
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: nama,
        email: email,
        phone: telpon,
        shipping_address: {
          first_name: perusahaan,
          address: alamat,
          postal_code: kodepos,
        },
      },
    },
  }).then((response) => {
    snaptoken = response.data.token;
    res.redirect("/pembayaran");
  });
});

router.get("/pembayaran", function (req, res) {
  res.render("pembayaran.ejs", { token: snaptoken });
});

// GET Detail Produk
router.get("/menu/produk", function (req, res) {
  res.render("detail-produk.ejs", {});
});

module.exports = router;
