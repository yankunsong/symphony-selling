document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      filterAndSortItems(category);
    });
  });
  filterAndSortItems("all"); // Initialize page with sorted 'All' category
});

function filterAndSortItems(category) {
  const gallery = document.querySelector(".gallery");
  let photos = Array.from(document.querySelectorAll(".photo"));

  // Sort photos by timestamp
  photos.sort((a, b) =>
    b
      .getAttribute("data-timestamp")
      .localeCompare(a.getAttribute("data-timestamp"))
  );

  // Filter and display photos based on category
  photos.forEach((photo) => {
    if (category === "all") {
      photo.style.display = "block";
    } else if (category === "latest") {
      const currentDate = new Date();
      const photoDate = new Date(
        photo.getAttribute("data-timestamp").substring(0, 4),
        photo.getAttribute("data-timestamp").substring(4, 6) - 1,
        photo.getAttribute("data-timestamp").substring(6, 8)
      );
      const diffTime = Math.abs(currentDate - photoDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      photo.style.display = diffDays <= 2 ? "block" : "none";
    } else if (photo.classList.contains(category)) {
      photo.style.display = "block";
    } else {
      photo.style.display = "none";
    }
  });

  // Remove all photos from the gallery and re-append sorted
  gallery.innerHTML = "";
  photos.forEach((photo) => {
    gallery.appendChild(photo);
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
