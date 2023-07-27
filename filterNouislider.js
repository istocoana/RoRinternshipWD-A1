document.addEventListener("DOMContentLoaded", function () {
  let uislider = document.getElementById("uislider");
  let min = document.getElementById("min-slider");
  let max = document.getElementById("max-slider");

  noUiSlider.create(uislider, {
    start: [5, 25],
    connect: true,
    range: {
      min: 0,
      max: 50,
    },
  });

  uislider.noUiSlider.on("update", function (values) {
    min.textContent = "$" + values[0];
    max.textContent = "$" + values[1];
  });

  uislider.noUiSlider.on("update", filterFood);
});

function filterFood() {
  const priceRange = uislider.noUiSlider.get();
  const minPrice = parseFloat(priceRange[0]);
  const maxPrice = parseFloat(priceRange[1]);

  const foodItems = document.getElementsByClassName("food-item");

  Array.from(foodItems).forEach((foodItem) => {
    const foodPrice = parseFloat(foodItem.dataset.price);

    if (foodPrice >= minPrice && foodPrice <= maxPrice) {
      foodItem.style.display = "block";
    } else {
      foodItem.style.display = "none";
    }
  });
}
