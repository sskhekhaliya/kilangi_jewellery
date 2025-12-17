// Data for Bestseller Tabs
import { Bestsellers } from "../data/bestsellers.js";
import { RecentViewed } from "../data/recentViewed.js";
import { Collection } from "../data/collection.js";
import { reviewsData } from "../data/review.js";

// Tab Switching Logic
const tabBtns = document.querySelectorAll(".tab-btn");
const productGrid = document.getElementById("bestseller-product-grid");

function renderProducts(category) {
  const bestseller_products = Bestsellers[category];

  productGrid.innerHTML = bestseller_products
    .map((product, index) => {
      const colorDots =
        product.colors.length > 0
          ? `
            <div class="color-options">
              ${product.colors
                .map(
                  (color, i) => `
                  <span 
                    class="color-dot ${color} ${i === 0 ? "active" : ""}"
                    data-img="${product.images[i]}"
                  ></span>
                `
                )
                .join("")}
            </div>
          `
          : "";

      return `
        <div class="product-card fade-in" style="animation-delay:${
          index * 100
        }ms">
          <div class="product-image-wrapper">
            <img src="${product.images[0]}" alt="${product.title}">
            <button class="wishlist-btn"><i class="ph ph-heart"></i></button>
            <button class="add-to-cart-btn">Add to Cart</button>
          </div>

          <h3 class="product-title">${product.title}</h3>

          <p class="product-price">
            ${product.price}
            <span class="product-mrp">${product.mrp}</span>
          </p>

          ${colorDots}
        </div>
      `;
    })
    .join("");

  attachColorEvents();
}

function attachColorEvents() {
  document.querySelectorAll(".color-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const card = dot.closest(".product-card");
      const img = card.querySelector("img");

      // update image
      img.src = dot.dataset.img;

      // active state
      dot.parentElement
        .querySelectorAll(".color-dot")
        .forEach((d) => d.classList.remove("active"));

      dot.classList.add("active");
    });
  });
}

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all
    tabBtns.forEach((b) => b.classList.remove("active"));

    // Add active class to clicked
    btn.classList.add("active");

    // Render content
    const target = btn.getAttribute("data-target");
    renderProducts(target);
  });
});

// Initialize with Rings
renderProducts("rings");

// Rendering Recent Viewed Products
const recentViewedGrid = document.getElementById(
  "recently-viewed-product-grid"
);
recentViewedGrid.innerHTML = RecentViewed.map(
  (product) => `<div class="product-card">
        <div class="product-image-wrapper">
          <img src="${product.image}" alt="${product.title}" />

          <button class="wishlist-btn">
            <i class="ph ph-heart"></i>
          </button>

          <button class="add-to-cart-btn">Add to Cart</button>
        </div>

        <h3 class="product-title">${product.title}</h3>

        <p class="product-price">
          ${product.price}
          <span class="product-mrp">${product.mrp}</span>
        </p>
      </div>`
).join("");

// Rendering Collection Cards
const collectionGrid = document.getElementById("collection-grid");
collectionGrid.innerHTML = Collection.map(
  (item) => `<div class="product-card zoom-hover">
        <a href="${item.link}">
        <div class="product-image-wrapper mb-0">
          <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="product-title text-center bb-1">${item.name}</div>
        </a>
      </div>`
).join("");

// review.js
const reviewGrid = document.getElementById("review-grid");

reviewGrid.innerHTML = reviewsData
  .map(
    (review) => `
      <div class="product-card review-card">
        <div class="product-image-wrapper">
          <img src="${review.image}" alt="Customer Review" />
        </div>

        <div class="review-stars">
          ${generateStars(review.rating)}
        </div>

        <h3>
          "${review.title}"
        </h3>

        <p class="p-desc txt-dark mb-1">
          ${review.description}
        </p>

        <p class="reviewer-name">
          ${review.reviewer}
        </p>
      </div>
    `
  )
  .join("");

function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? "★" : "☆";
  }
  return stars;
}

// Call this after DOM is loaded
document.addEventListener("DOMContentLoaded", renderReviews);

// Sticky Header Effect
const header = document.getElementById("main-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
