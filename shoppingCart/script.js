document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCount = document.getElementById("cart-count");

  let cart = JSON.parse(localStorage.getItem("products")) || [];
  cartCount.textContent = localStorage.getItem("cartCount") || 0;

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      const productCard = button.closest(".Product-card");
      const image = productCard.querySelector("img").getAttribute("src");
      const productDesc = productCard.querySelector(".product-desc").innerText;
      const productPrice =
        productCard.querySelector(".product-price").innerText;
      const price = parseInt(productPrice.replace("₹", ""));

      const product = {
        Id: Date.now() + index,
        image,
        productDesc,
        price,
      };

      cart.push(product);
      updateCartCount();
      saveProducts();
    });

    function updateCartCount() {
      cartCount.textContent = cart.length;
      localStorage.setItem("cartCount", cart.length);
    }

    function saveProducts() {
      localStorage.setItem("products", JSON.stringify(cart));
    }
  });
  document.getElementById("open-cart").addEventListener("click", () => {
    window.location.href = "cart_page.html";
  });
});
