// This is the main JS file where the functionalities of the main page(hoome page) is written

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
            // fetching the meal id from the object
            var mealId = meal.idMeal
            // Storing the meal id to the local storage
            localStorage.setItem('mealid',mealId)
            location.href="./recipiepag2.html"
          })
      });
      // If the search button is clicked, the page will redirect to this location in the webpage
      location.href="index.html#list"
  })
  // Manipulating the errors
  .catch(error => console.error('Error fetching data:', error));
  }


  // This is to fetch the random meal from the API
fetch ("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response=>{
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    })
    .then(data =>{
        // console.log(data);
        const recipieName = document.getElementById("recipe-name")
        // The ingredients will be in this array
        const Ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = data.meals[0]['strIngredient'+i];
          if (ingredient && ingredient.trim() !== "") {
            Ingredients.push(ingredient);
          } else {
            break;
          }
        }
        console.log(Ingredients);
        var imgSrc=data.meals[0].strMealThumb
        recipieName.innerText=data.meals[0].strMeal
        // the image of the random recipie come here
        const randomRecipie = document.getElementById("recipie-img")
        randomRecipie.innerHTML=`<img id="recipie-img1" src="${data.meals[0].strMealThumb}" alt="">`
        localStorage.setItem('random',data.meals[0].idMeal)
    })
    // Manipulating the errors
    .catch(error=>{
        console.error('Fetch error:', error);
    })

// this try button is for the random recipie.
const TryBtn = document.getElementById("try-btn")
TryBtn.addEventListener("click",function(){
  setTimeout(() => {
    location.href="./recipiepage.html"
  }, 300);
})
// if the trybutton is clicked , then the fork image will be toggled to the animation 
const tryBtn = document.getElementById("try-btn")
const fork = document.getElementById("fork")
tryBtn.addEventListener("click",function(){
    fork.style.animation='fork 0.5s linear'
})

const togglebtn = document.getElementById("toggle")
togglebtn.addEventListener("click",function(){
  if (document.getElementById('a').style.display=='inherit'){
    document.getElementById('a').style.display='none'
    document.getElementById('b').style.display='none'
    document.getElementById('c').style.display='none'
  } else{
    document.getElementById('a').style.display='inherit'
    document.getElementById('b').style.display='inherit'
    document.getElementById('c').style.display='inherit'
  }
  
})