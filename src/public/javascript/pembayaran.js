const totalPrice = document.querySelector(".price");
const quantities = document.querySelectorAll('input[name="product-quantity"]');
const productPrices = document.querySelectorAll(".product-price");
const products = document.querySelectorAll(".product-wrapper");
const productsName = document.querySelectorAll(".product-name");
const plusButtons = document.querySelectorAll(".add-quantity");
const minusButtons = document.querySelectorAll(".reduce-quantity");
const prosesOrderButton = document.querySelector(".proses-order");

let finalPrice;
let item_details = [];

updateTotalPrice();

plusButtons.forEach((button) =>
  button.addEventListener("click", updatePricePlus)
);
minusButtons.forEach((button) =>
  button.addEventListener("click", updatePriceMinus)
);
quantities.forEach((quantity) =>
  quantity.addEventListener("input", updatePriceQuantity)
);
prosesOrderButton.addEventListener("click", prosesOrder);

function updatePricePlus(e) {
  e.preventDefault();
  counter = Number(
    e.explicitOriginalTarget.parentElement.previousElementSibling.value
  );
  counter = counter + 1;
  e.explicitOriginalTarget.parentElement.previousElementSibling.value = String(
    counter
  );
  updateTotalPrice();
}

function updatePriceMinus(e) {
  e.preventDefault();
  counter = Number(
    e.explicitOriginalTarget.parentElement.nextElementSibling.value
  );
  if (counter == 0) {
    e.explicitOriginalTarget.parentElement.nextElementSibling.value = "0";
  } else {
    counter = counter - 1;
    e.explicitOriginalTarget.parentElement.nextElementSibling.value = String(
      counter
    );
  }
  updateTotalPrice();
}

function updatePriceQuantity(e) {
  e.preventDefault();
  updateTotalPrice();
}

function updateTotalPrice() {
  finalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    finalPrice =
      finalPrice +
      Number(
        productPrices[i].textContent.replace("Rp", "").replace(".", "").trim()
      ) *
        Number(quantities[i].value);

    if (Number(quantities[i].value) > 0) {
      item_details.push({
        name: productsName[i].textContent,
        price: Number(
          productPrices[i].textContent.replace("Rp", "").replace(".", "").trim()
        ),
        quantity: Number(quantities[i].value),
      });
    }
  }
  totalPrice.textContent = String(
    `Rp ${new Intl.NumberFormat(["ban", "id"]).format(finalPrice)}`
  );
}

async function prosesOrder(e) {
  e.preventDefault();
  //   Selector
  const tanggal = document.querySelector('input[name="tanggal"]').value;
  const waktu = document.querySelector('select[name="waktu"]').value;
  const nama = document.querySelector('input[name="nama"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const perusahaan = document.querySelector('input[name="perusahaan"]').value;
  const alamat = document.querySelector('input[name="alamat"]').value;
  const kodepos = document.querySelector('input[name="kodepos"]').value;
  const telpon = document.querySelector('input[name="telpon"]').value;

  const data = {
    item_details: item_details,
    totalprice: finalPrice,
    tanggal: tanggal,
    waktu: waktu,
    nama: nama,
    email: email,
    perusahaan: perusahaan,
    alamat: alamat,
    kodepos: kodepos,
    telpon: telpon,
  };

  const response = await fetch("/keranjang", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
  await window.location.assign("/pembayaran");
}
