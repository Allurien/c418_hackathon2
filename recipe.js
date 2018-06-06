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
                    debugger;
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
                $('.cakeName').append($("<h2>").text(recipeData.name));
                $('.cakeImg').append(`<img src= "${recipeData.image}" alt= ${recipeData.name}/>`);
                addMarkers = () => {
                    let markersToAdd = markerList;
                    markersToAdd.forEach((marker) => {
                        for(let key in marker)
                            switch (key){
                                case 'vegetarian':
                                    $('.allergyBar').append(`<img src= "images/cupcakeicon2.png" alt= ${marker.key}/>)`);
                                    break;
                                case 'vegan':
                                    $('.allergyBar').append(`<img src= "images/cupcakeicon2.png" alt= ${marker.key}/>)`);
                                    break;
                                case 'glutenFree':
                                    $('.allergyBar').append(`<img src= "images/cupcakeicon2.png" alt= ${marker.key}/>)`);
                                    break;
                                case 'dairyFree':
                                    $('.allergyBar').append(`<img src= "images/cupcakeicon2.png" alt= ${marker.key}/>)`);
                                    break;
                            }
                    });
                };
                addMarkers();
                $('.recipeBox').append($("<h2>").text('Ingredients'));
                $('.recipeBox').append($("<p>").text(recipeData.ingredients));
                $('.recipeBox').append($("<h2>").text('Instructions'));
                $('.recipeBox').append($("<p>").text(recipeData.instructions));
                $('.recipeBox').append($("<p>").text(recipeData.ingredients));
            };

            addRecipeToDOM();
        },

    };    
    $.ajax(settings);
}