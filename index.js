function toggle(spanElement, arrowId) {
  var arrow = document.getElementById(arrowId);

  if (arrow.classList.contains("bi-caret-down-fill")) {
    arrow.classList.remove("bi-caret-down-fill");
    arrow.classList.add("bi-caret-up-fill");
  } else {
    arrow.classList.remove("bi-caret-up-fill");
    arrow.classList.add("bi-caret-down-fill");
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  let foodData =
    '{ "foods" : [' +
    '{ "name": "Spaghetti Bolognese", "description": "Second Course", "price": 12.99 , "image": "images/bolognese.png" },' +
    '{ "name": "Caesar Salad" , "description": "Salads" , "price": 10.50 , "image" : "images/salad.png" },' +
    '{ "name": "Chicken Parmesan " , "description": "Main Courses" , "price": 9.55 , "image" : "images/pui.png" },' +
    '{ "name": "Beef Stroganoff " , "description": "Main Courses" , "price": 15.00 , "image" : "images/beef.png" },' +
    '{ "name": "Fish " , "description": "Main Courses" , "price": 20.99 , "image" : "images/fish.png" },' +
    '{ "name": "Soup " , "description": "Main Courses" , "price": 18.90 , "image" : "images/soup.png" },' +
    '{ "name": "Salad " , "description": "Main Courses" , "price": 12.03 , "image" : "images/salad.png" },' +
    '{ "name": "Alfredo Pasta " , "description": "Main Courses" , "price": 6.50 , "image" : "images/bolognese.png" }]}';

  let foodObject;
  try {
    foodObject = JSON.parse(foodData);
  } catch (error) {
    console.error("Parsing error:", error);
  }
  const menuDiv = document.getElementById("menu");
  const template = document.getElementById("food-item-template");
  const cartItemsList = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  const cart = [];

  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length.toString();
    cartCount.style.display = cart.length > 0 ? "block" : "none";
  }

  function addToCart(food) {
    cart.push(food);
    updateCartCount();
    updateCart();
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
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

  foodObject.foods.forEach((food) => {
    const foodItem = template.content.cloneNode(true);

    const img = foodItem.querySelector(".food-image");
    const name = foodItem.querySelector(".food-name");
    const description = foodItem.querySelector(".food-description");
    const price = foodItem.querySelector(".food-price");
    const addToCartButton = foodItem.querySelector(".add-to-cart");

    img.src = food.image;
    name.textContent = food.name;
    description.textContent = food.description;
    price.textContent = "Price: $" + food.price.toFixed(2);
    addToCartButton.addEventListener("click", () => addToCart(food));

    menuDiv.appendChild(foodItem);
  });
});

function showCart() {
  document.getElementById("cart-container").style.display = "block";
}

function hideCart() {
  document.getElementById("cart-container").style.display = "none";
}

function filterFood() {
  let priceValue = document.getElementById("price-input");
  let inputValue = document.getElementById("price-filter");

  priceValue.style.display = "inline";
  priceValue.innerHTML = "$" + inputValue.value;

  const priceFilterValue = parseFloat(
    document.getElementById("price-filter").value
  );
  const foodItems = document.getElementsByClassName("food-item");

  for (let i = 0; i < foodItems.length; i++) {
    const foodPriceElement = foodItems[i].querySelector(".food-price");
    const foodPrice = parseFloat(
      foodPriceElement.textContent.replace("Price: $", "")
    );

    if (foodPrice <= priceFilterValue) {
      foodItems[i].style.display = "block";
    } else {
      foodItems[i].style.display = "none";
    }
  }
}
