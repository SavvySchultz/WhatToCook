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
    name: "Cheesy Omelette",
    ingredients: ["eggs", "cheese", "milk", "butter", "salt", "pepper"],
    time: "10 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1510693206972-df0920c1f1b8?auto=format&fit=crop&w=900&q=80",
    description: "A quick, fluffy omelette that feels like breakfast magic.",
    instructions: [
      "Beat eggs with a splash of milk.",
      "Melt butter in a skillet over medium heat.",
      "Pour in eggs and cook gently.",
      "Add cheese, fold, and serve warm."
    ],
    link: "https://www.allrecipes.com/recipe/272448/classic-omelette/"
  },
  {
    name: "Grilled Cheese Delight",
    ingredients: ["bread", "cheese", "butter"],
    time: "12 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    description: "Golden, melty, and cozy — a classic comfort food.",
    instructions: [
      "Butter one side of each bread slice.",
      "Place cheese between the unbuttered sides.",
      "Cook in a pan until both sides are golden brown."
    ],
    link: "https://www.allrecipes.com/recipe/23891/grilled-cheese-sandwich/"
  },
  {
    name: "Simple Pasta Boost",
    ingredients: ["pasta", "tomato sauce", "garlic", "olive oil", "salt", "pepper"],
    time: "20 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=900&q=80",
    description: "A cozy pasta bowl that turns pantry basics into dinner.",
    instructions: [
      "Cook pasta according to the package.",
      "Warm olive oil and garlic in a pan.",
      "Add tomato sauce and season.",
      "Mix with pasta and enjoy."
    ],
    link: "https://www.bbcgoodfood.com/recipes/collection/pasta-recipes"
  },
  {
    name: "Quick Fried Rice",
    ingredients: ["rice", "egg", "soy sauce", "onion", "carrot", "oil"],
    time: "15 min",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
    description: "Fast, filling, and perfect for leftover rice.",
    instructions: [
      "Scramble the egg in a pan and set aside.",
      "Cook onion and carrot in oil.",
      "Add rice and soy sauce.",
      "Stir in the egg and serve."
    ],
    link: "https://www.allrecipes.com/recipe/23037/quick-and-easy-fried-rice/"
  }
];

const encouragementMessages = [
  "You’re doing amazing — tiny ingredients can still make a great meal 💙",
  "Cooking doesn’t have to be fancy to be delicious ✨",
  "Look at you, creating dinner out of detective work 😄",
  "One step at a time — you’ve got this 💜",
  "Your fridge is full of possibilities!"
];

const btn = document.getElementById("findRecipeBtn");
const input = document.getElementById("ingredientsInput");
const results = document.getElementById("results");
const encouragement = document.getElementById("encouragement");

function normalizeList(text) {
  return text
    .toLowerCase()
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
}

function getMatchCount(recipeIngredients, userIngredients) {
  return recipeIngredients.filter(ingredient =>
    userIngredients.includes(ingredient.toLowerCase())
  ).length;
}

function renderRecipes(userIngredients) {
  const matchedRecipes = recipes
    .map(recipe => {
      const matchCount = getMatchCount(recipe.ingredients, userIngredients);
      const matchScore = Math.round((matchCount / recipe.ingredients.length) * 100);
      return { ...recipe, matchCount, matchScore };
    })
    .filter(recipe => recipe.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);

  if (matchedRecipes.length === 0) {
    results.innerHTML = `
      <div class="empty-state">
        <h4>No perfect match yet — but that’s okay!</h4>
        <p>Try ingredients like eggs, cheese, bread, rice, pasta, or tomatoes.</p>
      </div>
    `;
    return;
  }

  results.innerHTML = matchedRecipes.map(recipe => `
    <article class="recipe-card">
      <img class="recipe-image" src="${recipe.image}" alt="${recipe.name}">
      <div class="recipe-body">
        <h3>${recipe.name}</h3>
        <div class="match">${recipe.matchCount} match${recipe.matchCount > 1 ? "es" : ""} • ${recipe.matchScore}%</div>
        <p>${recipe.description}</p>
        <p><strong>Time:</strong> ${recipe.time} • <strong>Level:</strong> ${recipe.difficulty}</p>

        <strong>Ingredients:</strong>
        <ul>
          ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join("")}
        </ul>

        <strong>Quick steps:</strong>
        <ol>
          ${recipe.instructions.map(step => `<li>${step}</li>`).join("")}
        </ol>

        <div class="recipe-actions">
          <a class="link-btn open" href="${recipe.link}" target="_blank" rel="noopener noreferrer">Open full recipe</a>
          <a class="link-btn stay" href="#home" onclick="showPage('home', document.querySelector('.tab-btn.active'))">Stay in app</a>
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
