fetch('https://www.thecocktaildb.com/api.php').then(res => {
  return res.json()
}).then(data => {
  return data.cocktailData;
}).then(cocktails => {
  cocktails.forEach(cocktail => {
    const mainContainer = document.createElement('div');
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe-container');
    
  })
})