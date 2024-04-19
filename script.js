document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      filterItems(this.getAttribute("data-category"));
    });
  });
});

function filterItems(category) {
  const photos = document.querySelectorAll(".photo");
  photos.forEach((photo) => {
    if (category === "all" || photo.classList.contains(category)) {
      photo.style.display = "block";
    } else {
      photo.style.display = "none";
    }
  });
  updateActiveTab(category);
}

function updateActiveTab(category) {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    if (tab.getAttribute("data-category") === category) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}
