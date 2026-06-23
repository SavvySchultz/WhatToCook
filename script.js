function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  const buttons = document.querySelectorAll(".nav-btn");

  pages.forEach(page => page.classList.remove("active"));
  buttons.forEach(btn => btn.classList.remove("active"));

  document.getElementById(pageId).classList.add("active");

  if (pageId === "home") {
    document.querySelectorAll(".nav-btn")[0].classList.add("active");
  } else if (pageId === "nutrition") {
    document.querySelectorAll(".nav-btn")[1].classList.add("active");
  }
}

const btn = document.getElementById("findRecipeBtn");
const input = document.getElementById("ingredientsInput");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
  const ingredients = input.value
    .split(",")
    .map(item => item.trim())
    .filter(item => item !== "");

  if (ingredients.length === 0) {
    result.innerHTML = "<p>Please enter at least one ingredient.</p>";
    return;
  }

  const searchQuery = ingredients.join(" ") + " recipe";
  const pinterestUrl = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(searchQuery)}`;

  result.innerHTML = `
    <h2>Searching Pinterest for:</h2>
    <p><strong>${searchQuery}</strong></p>
    <p>Opening Pinterest recipes in a new tab...</p>
  `;

  window.open(pinterestUrl, "_blank");
});
