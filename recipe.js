// Mood Object
// Needs to store a sweet array and a salty array for each mood
// Needs to store random meme array for each mood
let mood = 'happy';
let flavor = 'sweet';
let moodChoice = {
    happy: {
        // Arrays hold prechosen spoonacular id's for the selected array
        sweet: [
            {
                "name": "choice1",
            },{
                "name": "choice2",
            },{
                "name": "choice3",
            }
        ],
        salty: [
            {
                "name": "choice1",
            },{
                "name": "choice2",
            },{
                "name": "choice3",
            }
        ],
        memes: [
            {
                "name": "meme1",
            },{
                "name": "meme2",
            },{
                "name": "meme3",
            }
        ],
        sounds: {},
    },
    sad: {
        // Arrays hold prechosen spoonacular id's for the selected array
        sweet: [
            {
                "name": "choice1",
            },{
                "name": "choice2",
            },{
                "name": "choice3",
            }
        ],
        salty: [
            {
                "name": "choice1",
            },{
                "name": "choice2",
            },{
                "name": "choice3",
            }
        ],
        memes: [1,2,3],
        sounds: {},
    }, 

}
let cupcakes = moodChoice[mood][flavor];
let memes = moodChoice[mood].memes;
randomizer =  (cupcakes) => {
    let randomFlavor = Math.floor(Math.random() * cupcakes.length);
    console.log(cupcakes[randomFlavor].name);
    return cupcakes[randomFlavor].name;
};

// Spoonacular Get Data by ID Call
let getRecipesById = (recipeID) => {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/494313/information`,
        "method": "GET",
        "headers": {
          "X-Mashape-Key": "G0IPHpFlIZmsh6Dz5xUk6tR1dZ2Op1JozqAjsnaGyvKIrjwvgC",
          "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
          "Cache-Control": "no-cache",
        //   "Postman-Token": "d7b37c77-38ec-4045-8b49-672b86cd1442"
        },
        "success": (results) =>{
            let displayIngredients = [];
            getIngredients = () => {
                let ingredientList = results.extendedIngredients;
                ingredientList.forEach((recipe) => {
                    debugger;
                    let ingredientData = recipe.original;
                    displayIngredients.push(ingredientData);
                })
                console.log(displayIngredients); 
            }
            let recipeData = {
                "name": results.title,
                "image": results.image,
                "source": results.sourceUrl,
                "ingredients": displayIngredients,
                "markers": {
                    "vegetarian": results.vegetarian,
                    "vegan": results.vegan,
                    "glutenFree": results.glutenFree,
                    "dairyFree": results.dairyFree,
                    "smartPoints": results.weightWatcherSmartPoints,
                },
                "instructions": results.instructions,
                "winePairing": results.winePairing,
                "readyInMinutes": results.readyInMinutes,
                "servings": results.servings,
            }
            getIngredients();
            // recipeData.ingredients();
            console.log(recipeData);

    
                 

            // let addRecipeToDOM = $('<div>').addClass('recipe').append($('<h2>').text('blah'));
            // console.log(recipesToDisplay);
        },
        // failure: 'Bad things happened. You should check on that.',
    };    
    $.ajax(settings);
}