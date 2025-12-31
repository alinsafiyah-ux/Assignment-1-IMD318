function magnify(imgID, zoom) {
  const img = document.getElementById(imgID);
  
  // Create glass element
  const glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  
  // Insert glass
  img.parentElement.insertBefore(glass, img);
  
  // Set background of glass to the image
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  
  const bw = 3;
  const w = glass.offsetWidth / 2;
  const h = glass.offsetHeight / 2;

  // Show glass on hover, hide when leaving
  img.addEventListener("mouseenter", () => { glass.style.display = "block"; });
  img.addEventListener("mouseleave", () => { glass.style.display = "none"; });

  // Move glass
  img.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    let pos, x, y;
    e.preventDefault();
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;

    // Prevent glass from going outside image
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}

    // Set glass position
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";

    // Set background position of the glass
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    let a, x = 0, y = 0;
    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

// Start the function after the window loads
window.onload = function() {
  magnify("myimage", 3); // 3 is the zoom level
};

/* Gallery Section */
document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("imagePopup");
    const popupImg = document.getElementById("popupImg");
    const closeBtn = document.querySelector(".close");
    const galleryImages = document.querySelectorAll(".gallery-item img");

    // Open popup when clicking an image
    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            popup.style.display = "flex";
            popupImg.src = img.src;
        });
    });

    // Close popup when clicking the (x)
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Close popup when clicking outside the image
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });
});

