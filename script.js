const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "Fetching Recipes...";

    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";

        if (!response.meals) {
            recipeContainer.innerHTML = "<p>No recipes found.</p>";
            return;
        }

        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <h3>${meal.strArea}</h3>
                <h3>${meal.strCategory}</h3>
            `;
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = "<p>Error fetching recipes. Try again later.</p>";
        console.error(error);
    }
};

// 🔄 Add event listener to the Search Button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (searchInput) {
        fetchRecipes(searchInput);
    }
});
