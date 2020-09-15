const totalPrice = document.querySelector(".price");
const quantities = document.querySelectorAll('input[name="product-quantity"]');
const productPrices = document.querySelectorAll(".product-price");
const products = document.querySelectorAll(".product-wrapper");
const plusButtons = document.querySelectorAll(".add-quantity");
const minusButtons = document.querySelectorAll(".reduce-quantity");

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
  console.log(e);
  updateTotalPrice();
}

function updateTotalPrice() {
  let finalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    finalPrice =
      finalPrice +
      Number(
        productPrices[i].textContent.replace("Rp", "").replace(".", "").trim()
      ) *
        Number(quantities[i].value);
  }
  totalPrice.textContent = String(
    `Rp ${new Intl.NumberFormat(["ban", "id"]).format(finalPrice)}`
  );
}
