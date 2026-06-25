function showPage(pageId, clickedButton) {
  const pages = document.querySelectorAll(".page");
  const buttons = document.querySelectorAll(".tab-btn");

  pages.forEach(page => page.classList.remove("active"));
  buttons.forEach(btn => btn.classList.remove("active"));

  document.getElementById(pageId).classList.add("active");
  clickedButton.classList.add("active");
}

const recipes = [
  {
    name: "Egg Toast",
    ingredients: ["eggs", "bread", "butter", "salt", "pepper"],
    description: "A quick breakfast or snack using just a few basics.",
    instructions: ["Toast the bread.", "Cook the eggs.", "Put eggs on toast and season lightly."],
    link: "https://www.allrecipes.com/"
  },
  {
    name: "Cheese Sandwich",
    ingredients: ["bread", "cheese", "butter"],
    description: "A simple comfort food that’s warm and melty.",
    instructions: ["Butter the bread.", "Add cheese.", "Cook until golden brown."],
    link: "https://www.allrecipes.com/"
  },
  {
    name: "Butter Rice",
    ingredients: ["rice", "butter", "salt"],
    description: "Soft, simple rice with a little flavor boost.",
    instructions: ["Cook the rice.", "Stir in butter.", "Add a pinch of salt and serve."],
    link: "https://www.allrecipes.com/"
  },
  {
    name: "Pasta Bowl",
    ingredients: ["pasta", "butter", "cheese", "salt", "pepper"],
    description: "Easy pasta when you want something filling fast.",
    instructions: ["Cook pasta.", "Add butter and cheese.", "Season and mix well."],
    link: "https://www.allrecipes.com/"
  },
  {
    name: "Veggie Omelette",
    ingredients: ["eggs", "spinach", "onion", "tomatoes", "cheese"],
    description: "A fresh, colorful meal that feels like a win.",
    instructions: ["Whisk eggs.", "Cook veggies.", "Add eggs and cheese, then fold."],
    link: "https://www.allrecipes.com/"
  }
];

const btn = document.getElementById("findRecipeBtn");
const input = document.getElementById("ingredientsInput");
const results = document.getElementById("results");
const encouragement = document.getElementById("encouragement");

const encouragementMessages = [
  "You’re doing amazing — you already have enough to start 💙",
  "Simple food can still be really good ✨",
  "You’ve got this. Let’s make dinner easier 💜",
  "A few ingredients is all it takes to begin!"
];

function normalizeList(text) {
  return text
    .toLowerCase()
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
}

function renderRecipes(userIngredients) {
  const matchedRecipes = recipes
    .map(recipe => {
      const matches = recipe.ingredients.filter(ingredient =>
        userIngredients.includes(ingredient.toLowerCase())
      );

      const isValid = matches.length > 0 && recipe.ingredients.every(ingredient =>
        userIngredients.includes(ingredient.toLowerCase())
      );

      return {
        ...recipe,
        matches,
        isValid
      };
    })
    .filter(recipe => recipe.isValid)
    .sort((a, b) => b.matches.length - a.matches.length);

  if (matchedRecipes.length === 0) {
    results.innerHTML = `
      <div class="empty-state">
        <h4>No recipe matches yet</h4>
        <p>Try a few common items like eggs, bread, rice, pasta, cheese, butter, spinach, or tomatoes.</p>
      </div>
    `;
    return;
  }

  results.innerHTML = matchedRecipes.map(recipe => `
    <article class="recipe-card">
      <div class="recipe-body">
        <h3>${recipe.name}</h3>
        <div class="match">Uses only your ingredients</div>
        <p>${recipe.description}</p>

        <strong>Ingredients used:</strong>
        <ul>
          ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <strong>Quick steps:</strong>
        <ol>
          ${recipe.instructions.map(step => `<li>${step}</li>`).join("")}
        </ol>

        <div class="recipe-actions">
          <a class="link-btn open" href="${recipe.link}" target="_blank" rel="noopener noreferrer">Learn more</a>
        </div>
      </div>
    </article>
  `).join("");
}

btn.addEventListener("click", () => {
  const userIngredients = normalizeList(input.value);

  if (userIngredients.length === 0) {
    results.innerHTML = `
      <div class="empty-state">
        <h4>Please type at least one ingredient</h4>
        <p>Example: eggs, cheese, bread</p>
      </div>
    `;
    return;
  }

  const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
  encouragement.innerHTML = `<p>${randomMessage}</p>`;

  renderRecipes(userIngredients);
});
