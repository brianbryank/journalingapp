document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.sampleapis.com/recipes/recipes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const recipesContainer = document.getElementById('recipesContainer');
        data.forEach(recipe => {
          const recipeElement = createRecipeElement(recipe);
          recipesContainer.appendChild(recipeElement);
        });
      })
      .catch(error => console.error('Error fetching recipes:', error));
  });
  
  function createRecipeElement(recipe) {
    const div = document.createElement('div');
    div.classList.add('recipe');
  
    const img = document.createElement('img');
    img.src = recipe.image;
    img.alt = recipe.title;
    div.appendChild(img);
  
    const h2 = document.createElement('h2');
    h2.textContent = recipe.title;
    div.appendChild(h2);
  
    const p = document.createElement('p');
    p.textContent = recipe.description;
    div.appendChild(p);
  
    return div;
  }
  