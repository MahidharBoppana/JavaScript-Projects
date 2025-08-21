document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("products")) || [];
  let container = document.getElementById("cart-items");
  let totalAmount = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  function renderCart() {
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      container.innerHTML = `<h1>The cart is empty 🛒</h1>`;
      totalAmount.textContent = 0;
      return;
    }

    cart.forEach((item, index) => {
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
      <img src="${item.image}" alt="product" />
      <p class="productdesc">${item.productDesc}</p>
      <p><span class="price">Total Price :</span>  ₹${item.price}</p>
      <button onClick="removeItem(${index})">Remove</button>
      `;

      container.appendChild(card);
      total += item.price;
    });
    totalAmount.textContent = total;
  }

  function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    savedProducts();
    renderCart();
  }

  function updateCartCount() {
    localStorage.setItem("cartCount", cart.length);
  }

  function savedProducts() {
    localStorage.setItem("products", JSON.stringify(cart));
  }
  window.removeItem = removeItem;
  renderCart();
});
