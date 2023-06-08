const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';
const APP_ID = '2e8cdc2e';
const APP_KEY = '6cae5cc63f68c24e9078130dc79e588e';

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector('input').value;
  console.log(searchQuery);
  fetchAPI();
})

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  console.log(data);
  generateHTML(data.hits);
}

function generateHTML(results) {
  container.classList.remove('initial');
  let generatedHTML = '';
  results.map(result => {
    generatedHTML +=
    `
    <div class="item">
      <img src="${result.recipe.image}" alt="">
      <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
      </div>
      <p class="item-data">Calories: ${Math.round(result.recipe.calories)}</p>
      <p class="item-data">Diet Label(s): ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No diet information available.'}</p>
      <p class="item-data">Health Label(s): ${result.recipe.healthLabels}</p>
    </div>
    `
  })
  searchResultDiv.innerHTML = generatedHTML;
}