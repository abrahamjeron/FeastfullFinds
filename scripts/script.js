const tryBtn = document.getElementById("try-btn")
const fork = document.getElementById("fork")
tryBtn.addEventListener("click",function(){
    fork.style.animation='fork 0.5s linear'
})

fetch ("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response=>{
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    })
    .then(data =>{
        console.log(data);
        const recipieName = document.getElementById("recipe-name")
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
        const randomRecipie = document.getElementById("recipie-img")
        randomRecipie.innerHTML=`<img id="recipie-img1" src="${data.meals[0].strMealThumb}" alt="">`
    })
    .catch(error=>{
        console.error('Fetch error:', error);
    })
    // 