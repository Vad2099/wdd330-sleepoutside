import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const productList = document.querySelector(".product-list");
const cartFooter = document.querySelector(".cart-footer");
const cartTotalElement = document.querySelector("#cartTotal");

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  // Si no hay elementos o no es un array, mostrar mensaje vacío
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    productList.innerHTML = `<li><p>Your cart is empty.</p></li>`;
    hideCartFooter();
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate).join("");
  productList.innerHTML = htmlItems;

  showCartFooter();
  updateCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const color = item.Colors?.[0]?.ColorName || "No color specified";
  const quantity = item.quantity || 1;

  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#"><h2 class="card__name">${item.Name}</h2></a>
      <p class="cart-card__color">${color}</p>
      <p class="cart-card__quantity">qty: ${quantity}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

function calculateCartTotal(items) {
  return items.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.FinalPrice * quantity;
  }, 0);
}

function updateCartTotal(items) {
  const total = calculateCartTotal(items);
  cartTotalElement.textContent = total.toFixed(2);
}

function showCartFooter() {
  cartFooter?.classList.remove("hide");
}

function hideCartFooter() {
  cartFooter?.classList.add("hide");
}


//function calculateCartTotal() {
  //const cartItems = getLocalStorage('so-cart');
  //const total = cartItems.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
  //document.querySelector('#total').textContent = `$${total.toFixed(2)}`;
//}

//calculateCartTotal();

renderCartContents();
