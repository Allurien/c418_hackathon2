
$(document).ready(allTheThings);

function allTheThings(){
    attachClickHandlers();
    choosyMoody();
    // changeButtonTextAndApplyClickHandler()
    $('#getTabDom').on('click', generateTabDom);
    //event delegation
    $('.tabContainer').on('click','.videoTabButton', function(){
        getVideoData(searchString);
    });
};

var searchString = null;

function attachClickHandlers(){
    $(".recipeTabButton").on("click", backToCupcakePage);
    $(".videoTabButton").on("click", callVideoPage);
    $(".decorateTabButton").on("click", callDecoPage);
    $(".restartButton").on("click", startOver);
}

function choosyMoody(){
    $(".qText").text("How are you feeling today?");
    let mood = null;

    $(".ansText1").text("Happy").on("click", function(){
        mood = "happy";
        bakeOrBuy(mood);
    });
    $(".ansText2").text("Sad").on("click", function(){
        mood = "sad";
        bakeOrBuy(mood);
    });

};

function bakeOrBuy(mood){
    clickReset();
    if (mood === "happy"){
        $(".qText").text("We're so glad! How about a cupcake to celebrate?");
    } else if (mood === "sad"){
        $(".qText").text("We're sorry you're having a bad day. How about a cupcake to cheer you up?");
    };

    $(".ansText1").text("I'm baking my own today!").on("click", function(){
        bakeCupcakes(mood);
    });
    $(".ansText2").text("I'd rather go find one!").on("click", function(){
        findCupcakes(mood);
        $(".selectBox1").remove();
        $(".selectBox2").remove();
        getMap();
        createMapElements();
    });
    return mood;
    console.log("bakeOrBuy clicked!")
};

function findCupcakes(mood){
    clickReset();
    $(".qText").text("");
    $('.selectBox1, .selectBox2 ').css('display', 'none');
    $('.cakePage').css('height', '40%');
    $('.selectQ').css('height', '100%');
    // callMapPage();
    console.log("finding cupcakes!", mood);
};

function bakeCupcakes(mood){
    clickReset();
    let flavor = null;
    $(".qText").text("How fun! Which flavor sounds tastiest?");

    if (mood === "happy"){
        $(".ansText1").text("Sweet!").on("click", function(){
            flavor = "sweet";
            selectAndCallRecipe(mood, flavor);
            callCupcakePage(mood, flavor);
        });
        $(".ansText2").text("Salty!").on("click", function(){
            flavor = "salty";
            selectAndCallRecipe(mood, flavor);
            callCupcakePage(mood, flavor);
        });
    }
    if (mood === "sad"){
        $(".ansText1").text("Sweet").on("click", function(){
            flavor = "sweet";
            selectAndCallRecipe(mood, flavor);
            callCupcakePage(mood, flavor);
        });
        $(".ansText2").text("Salty").on("click", function(){
            flavor = "salty";
            selectAndCallRecipe(mood, flavor);
            callCupcakePage(mood, flavor);
        });
    }
    return flavor;
    console.log("baking cupcakes!", mood);
};

function callCupcakePage(mood, flavor){
    clickReset();
    
    
//--------------------------------Creating the page here---------------------------------------
    let adddiv1 = $("<div>").addClass("cakeHeader");
    $(".tab").prepend(adddiv1);
    $(".tab").css("display", "block");
    generateTabDom();
    $(".selectQ").addClass("cakeName").removeClass("selectQ").text('').appendTo("#recipeTab");
    $(".selectBox1").addClass("cakeImg").removeClass("selectBox1").text('').appendTo("#recipeTab");
    $(".selectBox2").addClass("allergyBar").removeClass("selectBox2").text('').appendTo("#recipeTab");
    let adddiv2 = $("<div>").addClass("recipeBox");
    $("#recipeTab").append(adddiv2);
    cupcakeChooser(mood, flavor);

    $(".row").css("display", "block");
};

//---------------------------------Randomizer based on mood here------------------------------------

function cupcakeChooser(mood, flavor){
    console.log("Mood is: "+mood+" Flavor is: "+flavor);
};

//--------------------------------------------------------------------------------------------------

function callVideoPage(){
    $(".mapPage").css("display", "none");
    $(".cakePage").css("display", "none");
    $(".decoPage").css("display", "none");
    $(".vidPage").css("display", "block");
};

function callDecoPage(){
    $(".mapPage").css("display", "none");
    $(".cakePage").css("display", "none");
    $(".vidPage").css("display", "none");
    $(".decoPage").css("display", "block");
};

function callMapPage(){
    $(".cakePage").css("display", "block");
    $(".vidPage").css("display", "none");
    $(".decoPage").css("display", "none");
    $(".mapPage").css("display", "block");
};

function backToCupcakePage(){
    $(".mapPage").css("display", "none");
    $(".decoPage").css("display", "none");
    $(".vidPage").css("display", "none");
    $(".cakePage").css("display", "block");
}

function startOver(){
    location.reload();
}

function clickReset(){
    $(".ansText1, .ansText2").off("click");
};

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
                $('.recipeBox').append($("<p>").text(recipeData.ingredients).addClass('recipe'));
                
            };

            addRecipeToDOM();
            
        },

    };    
    $.ajax(settings);
}
