function toggleDropdownMenu(arrowId) {
  var arrow = document.getElementById(arrowId);

  if (arrow.classList.contains("bi-caret-down-fill")) {
    arrow.classList.remove("bi-caret-down-fill");
    arrow.classList.add("bi-caret-up-fill");
  } else {
    arrow.classList.remove("bi-caret-up-fill");
    arrow.classList.add("bi-caret-down-fill");
  }
}

window.onscroll = function () {
  stickyBar();
};

var bar = document.getElementById("bar-scroll");
var sticky = bar.offsetTop;

function stickyBar() {
  if (window.pageYOffset >= sticky) {
    bar.style.position = "fixed";
    bar.style.top = "0";
    bar.style.width = "100%";
    bar.style.zIndex = "100";
  } else {
    bar.style.position = "";
    bar.style.top = "";
    bar.style.width = "";
    bar.style.zIndex = "";
  }
}
