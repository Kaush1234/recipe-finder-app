const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const recipeList = document.getElementById("recipeList");

const API_KEY = "50eeb53003d94deca85487c75fedf6ce"; // Replace with your real key

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      recipeList.innerHTML = "";

      data.results.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Fetch actual source URL using recipe ID
        fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`)
          .then(res => res.json())
          .then(info => {
            const sourceUrl = info.spoonacularSourceUrl;

            card.innerHTML = `
              <a href="${sourceUrl}" target="_blank" style="text-decoration: none; color: inherit;">
                <img src="${recipe.image}" alt="${recipe.title}" />
                <h3>${recipe.title}</h3>
              </a>
            `;

            recipeList.appendChild(card);
          });
      });
    })
    .catch(error => {
      recipeList.innerHTML = "<p>Something went wrong. Please try again.</p>";
      console.error("Error:", error);
    });
});
