// Recipe API Data
let selectAndCallRecipe = (mood, flavor) => {
    // Mood Object
    // Needs to store a sweet array and a salty array for each mood
    // Needs to store random meme array for each mood
let moodChoice = {
    happy: {
        // Arrays hold prechosen spoonacular id's for the selected array
        sweet: [
            {
                "id": 537588,
            }
        ],
        salty: [
            {
                "id": 228778,
            }
        ],
        memes: [],
        sounds: {},
    },
    sad: {
        // Arrays hold prechosen spoonacular id's for the selected array
        sweet: [
            {
                "id": 592834,
            }
        ],
        salty: [
            {
                "id": 618651,
            }
        ],
        memes: [],
        sounds: {},
    }, 

}
let cupcakes = moodChoice[mood][flavor];
let memes = moodChoice[mood].memes;

    
    
    randomizer =  (cupcakes) => {
        let randomFlavor = Math.floor(Math.random() * cupcakes.length);
        console.log(cupcakes[randomFlavor].id);
        let chosenCupcake =  cupcakes[randomFlavor].id;
        getRecipesById(chosenCupcake);
    };
    randomizer(cupcakes);

};
// Spoonacular Get Data by ID Call
let getRecipesById = (recipeID) => {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${recipeID}/information`,
        "method": "GET",
        "headers": {
          "X-Mashape-Key": "G0IPHpFlIZmsh6Dz5xUk6tR1dZ2Op1JozqAjsnaGyvKIrjwvgC",
          "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
          "Cache-Control": "no-cache",
        },
        "success": (results) => {
            // Process AJAX call and pass relevant properties into a saved object for use later
            let displayIngredients = [];
            let markerList = [];
            getIngredients = () => {
                let ingredientList = results.extendedIngredients;
                ingredientList.forEach((recipe) => {
                    let ingredientData = recipe.original;
                    displayIngredients.push(ingredientData);
                });
                console.log(displayIngredients); 
            };
            let recipeData = {
                "name": results.title,
                "image": results.image,
                "source": results.sourceUrl,
                "ingredients": displayIngredients,
                "markers": [
                    {"vegetarian": results.vegetarian},
                    {"vegan": results.vegan},
                    {"glutenFree": results.glutenFree},
                    {"dairyFree": results.dairyFree},
                ],
                "smartPoints": results.weightWatcherSmartPoints,
                "instructions": results.instructions,
                "winePairing": results.winePairing,
                "readyInMinutes": results.readyInMinutes,
                "servings": results.servings,
            }
            searchString = recipeData.name;
            getIngredients();
            processMarkers = () => {
                let markersToProcess = recipeData.markers;
                markersToProcess.forEach((marker) => {
                    for (let key in marker) {
                        let markerToEvaluate = (marker[key]);
                        if (markerToEvaluate){
                            markerList.push(marker);
                        }
                    }
                });
            };
            processMarkers();
            // Passes recipeData into the appropriate DOM elements
            addRecipeToDOM = () => {
                $('.recipeLoader').remove();
                $('.cakeName').append($("<h2>").text(recipeData.name).addClass('recipe'));
                $('.cakeImg').append(`<img src= "${recipeData.image}" alt= ${recipeData.name}/>`);
                addMarkers = () => {
                    if(markerList.length === 0){
                        $('.allergyBar').css('display', 'none');
                    } else {
                    
                        let markersToAdd = markerList;
                        markersToAdd.forEach((marker) => {
                            for(let key in marker)
                                switch (key){
                                    case 'vegetarian':
                                        $('.allergyBar').append(`<img src= "images/vegetarian.png" alt= ${marker.key}/>)`);
                                        break;
                                    case 'vegan':
                                        $('.allergyBar').append(`<img src= "images/vegan.png" alt= ${marker.key}/>)`);
                                        break;
                                    case 'glutenFree':
                                        $('.allergyBar').append(`<img src= "images/noGluten.png" alt= ${marker.key}/>)`);
                                        break;
                                    case 'dairyFree':
                                        $('.allergyBar').append(`<img src= "images/noDairy.png" alt= ${marker.key}/>)`);
                                        break;
                                }
                        });
                    };
                };
                addMarkers();
                $('.recipeBox').append($("<h2>").text('Ingredients').addClass('recipe'));
                $('.recipeBox').append($("<p>").text(recipeData.ingredients).addClass('recipe'));
                $('.recipeBox').append($("<h2>").text('Instructions').addClass('recipe'));
                $('.recipeBox').append($("<p>").text(recipeData.instructions).addClass('recipe'));
                appendRestart();
                             
            };
            addRecipeToDOM(); 
        },
    };    
    $.ajax(settings);
}
