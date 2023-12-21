// This page is to show the details of the Random recipe which is selected by the user

// This will get the unique id of the Random recipe selected by the users which is fetched from the local storage just to avoid re-rendering
const randomRecipeid = localStorage.getItem("random")
fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomRecipeid}`)
    .then(response=>{
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    })
    .then(data =>{
        const ingredientContents = document.getElementById("ingredients")
        const Ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = data.meals[0]['strIngredient'+i];
          if (ingredient && ingredient.trim() !== "") {
            Ingredients.push(ingredient);
          } else {
            break;
          }
        }
        // details of the selected recipe will be shown by this following codes
        ingredientContents.innerText=Ingredients
        const instruction = document.getElementById("instruction")
        instruction.innerText=data.meals[0].strInstructions
        const recipeImg = document.querySelector(".recipie-img")
        var imageUrl = data.meals[0].strMealThumb
        recipeImg.innerHTML=`<img id="recipie-img" src=${imageUrl} alt="">`
        var videoLink = document.getElementById("link-container")
        videoLink.innerHTML=`<a href=${data.meals[0].strYoutube}>Watch Video</a>   <img src="./Asserts/YouTube.png" id="youtube" alt="">`
        // <a href="">Watch Video</a>
        console.log(data.meals[0].strYoutube)
    })
    .catch(error=>{
        console.error('Fetch error:', error);
    })


// If the search button is clicked, then the following functionalities will come into play
// Giving event listener to the search button
const searchButton = document.getElementById("search-button")
searchButton.addEventListener("click",fetchCategory)

// The funtion will be called when the search button is clicked
function fetchCategory(){
  var SearchInput = document.getElementById("search-input").value
  fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchInput}`)
    .then(response=>{
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
      console.log(data);
      //To display category name
      const CategoryName = document.getElementById("category-name")
      CategoryName.innerText= `Here is the list of recipes on: ${SearchInput}`
      // To show the list of recipe from the API 
      const mealslist = data.meals || [];
      mealslist.forEach((meal, index) => {

          const div = document.createElement('div');
          div.id = `img1`;

          const tryIt = document.createElement('button')
          tryIt.innerText='Try It'
          tryIt.id = 'trybtn'

          const img = document.createElement('img');
          img.id = 'image';
          img.src = meal.strMealThumb;
          
          const recipeName = document.createElement('div');
          recipeName.id = 'recipiename';
          recipeName.textContent = meal.strMeal;
          const row = document.querySelector(".row1")
          // Appending parent tags for each elements
          div.appendChild(img);
          div.appendChild(recipeName);
          div.appendChild(tryIt)
          row.appendChild(div);
          // If the try it button on the recipe element is clicked, then the following function will happen
          tryIt.addEventListener('click',function(){
            console.log("clicked",meal.idMeal)
            var mealId = meal.idMeal
            localStorage.setItem('mealid',mealId)
            location.href="./recipiepage.html"
          })
      });
      // If the search button is clicked, the page will redirect to this location in the webpage
      
  })
  // Manipulating the errors
  .catch(error => console.error('Error fetching data:', error));
  }

