function toggleCart() {
  if (document.getElementById("cart-container").style.display == "none") {
    document.getElementById("cart-container").style.display = "block";
  } else {
    document.getElementById("cart-container").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  const menuDiv = document.getElementById("menu");
  const template = document.getElementById("food-item-template");
  const cartItemsList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  let cart = [];

  const storedCart = JSON.parse(localStorage.getItem("cart"));
  if (storedCart) {
    cart = storedCart;
    updateCartCount();
    updateCart();
  }

  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length.toString();
    cartCount.style.display = cart.length > 0 ? "block" : "none";
  }

  function addToCart(food) {
    cart.push(food);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateCart();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateCart();
  }

  function updateCart() {
    cartItemsList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((food, index) => {
      const li = document.createElement("li");
      const removeButton = document.createElement("button");
      removeButton.textContent = "Delete";
      removeButton.addEventListener("click", () => removeFromCart(index));
      li.textContent = food.name + " ($" + food.price.toFixed(2) + ")";
      li.appendChild(removeButton);
      cartItemsList.appendChild(li);

      totalPrice += food.price;
    });

    if (cart.length > 0) {
      totalPriceElement.textContent = "Total price: $" + totalPrice.toFixed(2);
    } else {
      totalPriceElement.textContent = "";
    }
  }

  foodData.foods.forEach((food) => {
    const foodItem = template.content.cloneNode(true);
    const img = foodItem.querySelector(".food-image");
    const name = foodItem.querySelector(".food-name");
    const description = foodItem.querySelector(".food-description");
    const price = foodItem.querySelector(".food-price");
    const addToCartButton = foodItem.querySelector(".add-to-cart");

    foodItem.querySelector(".food-item").dataset.price = food.price;

    img.src = food.image;
    name.textContent = food.name;
    description.textContent = food.description;
    price.textContent = "Price: $" + food.price.toFixed(2);
    addToCartButton.addEventListener("click", () => addToCart(food));
    menuDiv.appendChild(foodItem);
  });
});
