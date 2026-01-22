document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  let products = [];
  let loading = true;

  const categoryMap = {
    "men's clothing": "men's clothing",
    "women's clothing": "women's clothing",
    electronics: "electronics",
    jewelery: "others",
  };

  function setLoading(state) {
    loading = state;
  }

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      // products = data;
      products.push(...data);
      populateCategories();
      displayProducts(products);
      console.log(products);

      setLoading(false);
    } catch (error) {
      productList.innerHTML = "<h1>Error loading products</h1>";
      console.error(error);
      setLoading(true);
    }
  }

  function populateCategories() {
    const categories = new Set(
      products.map((product) => categoryMap[product.category] || "others"),
    );

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category.toUpperCase();
      categoryFilter.appendChild(option);
    });
  }

  function displayProducts(list) {
    productList.innerHTML = "";

    if (list.length === 0) {
      productList.innerHTML = "<p>No products found</p>";
      return;
    }

    console.log("Product sample:", list[0]);

    list.forEach((product) => {
      const div = document.createElement("div");
      div.className = "product";

      const priceInRupees = Math.round(product.price * 80);

      div.innerHTML = `
    <img src="${product.image}" width="100" />
      <h3>${product.title}</h3>
      <p>Category: ${categoryMap[product.category] || "others"}</p>
      <p class="price">₹${priceInRupees}</p>`;
      productList.appendChild(div);
    });
  }

  function filterProducts() {
    setLoading(true);

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;

    const filtered = products.filter((product) => {
      const normalizedCategory = categoryMap[product.category] || "others";
      const priceInRupees = Math.round(product.price * 80);

      const matchSearch = product.title.toLowerCase().includes(searchText);

      const matchCategory =
        selectedCategory === "all" || normalizedCategory === selectedCategory;

      const matchPrice =
        selectedPrice === "all" ||
        (selectedPrice === "low" && priceInRupees < 1500) ||
        (selectedPrice === "high" && priceInRupees >= 1500);

      return matchPrice && matchCategory && matchSearch;
    });
    displayProducts(filtered);
    setLoading(false);
  }

  if (loading) {
    productList.innerHTML = "<h3>Loading products please wait...</h3>";
  }

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);
  priceFilter.addEventListener("change", filterProducts);

  fetchData();
});
