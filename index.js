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

function showMinValue() {
  document.getElementById("min").innerHTML =
    "$" + document.getElementById("range-1a").value;
}

function showMaxValue() {
  document.getElementById("max").innerHTML =
    "$" + document.getElementById("range-1b").value;
}
