
$(document).ready(allTheThings);

function allTheThings(){
    attachClickHandlers();
    changeButtonTextAndApplyClickHandler()
};

function attachClickHandlers(){
    $(".recipeTabButton").on("click", backToCupcakePage);
    $(".vidTabButton").on("click", callVideoPage);
    $(".decoTabButton").on("click", callDecoPage);
    $(".restartButton").on("click", startOver);
}
function changeButtonTextAndApplyClickHandler(){
    $(".selectQ").text("How are you feeling today?");
    $(".selectBox1").text("Happy").on("click", choosyMoody );
    $(".selectBox2").text("Sad").on("click", choosyMoody);
}
function choosyMoody(){
    const mood = $(this).text().toLowerCase();
    getMap();
    bakeOrBuy(mood);
};

function bakeOrBuy(mood){
    clickReset();
   
    if (mood === "happy"){
        $(".selectQ").text("We're so glad! How about a cupcake to celebrate?");
    } else if (mood === "sad"){
        $(".selectQ").text("We're sorry you're having a bad day. How about a cupcake to cheer you up?");
    };

    $(".selectBox1").text("I'm baking my own today!").on("click", function(){
        bakeCupcakes(mood);
    });
    $(".selectBox2").text("I'd rather go find one!").on("click", function(){
        findCupcakes(mood);
        $(".selectBox1").remove();
        $(".selectBox2").remove();
        createMapElements();
    });
    return mood;
    console.log("bakeOrBuy clicked!")
};

function findCupcakes(mood){
    clickReset();

    $(".selectQ").text("Then let's find a bakery nearby!");
    
    console.log("finding cupcakes!", mood);
};

function bakeCupcakes(mood){
    clickReset();
    let flavor = null;
    $(".selectQ").text("How fun! Which flavor sounds tastiest?");

    if (mood === "happy"){
        $(".selectBox1").text("Sweet!").on("click", function(){
            flavor = "sweet";
            callCupcakePage(mood, flavor);
        });
        $(".selectBox2").text("Salty!").on("click", function(){
            flavor = "salty";
            callCupcakePage(mood, flavor);
        });
    }
    if (mood === "sad"){
        $(".selectBox1").text("Sweet").on("click", function(){
            flavor = "sweet";
            callCupcakePage(mood, flavor);
        });
        $(".selectBox2").text("Salty").on("click", function(){
            flavor = "salty"
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
    $(".row1").prepend(adddiv1)
    $(".tab").css("display", "block");
    $(".selectQ").addClass("cakeName").removeClass("selectQ").text('');
    $(".selectBox1").addClass("cakeImg").removeClass("selectBox1").text('');
    $(".selectBox2").addClass("allergyBar").removeClass("selectBox2").text('');
    let adddiv2 = $("<div>").addClass("recipeBox");
    $(".cakePage").append(adddiv2);

    cupcakeChooser(mood, flavor);

    $(".restartButton").css("display", "block");
};

//---------------------------------Randomizer based on mood here------------------------------------

function cupcakeChooser(mood, flavor){
    console.log("Mood is: "+mood+" Flavor is: "+flavor);
};

//--------------------------------------------------------------------------------------------------

function callVideoPage(){
    $(".cakePage").css("display", "none");
    $(".decoPage").css("display", "none");
    $(".vidPage").css("display", "block");
};

function callDecoPage(){
    $(".cakePage").css("display", "none");
    $(".vidPage").css("display", "none");
    $(".decoPage").css("display", "block");
};

function backToCupcakePage(){
    $(".decoPage").css("display", "none");
    $(".vidPage").css("display", "none");
    $(".cakePage").css("display", "block");
}

// function callMapPage(){
//     $(".cakePage").css("display", "none");
//     $(".vidPage").css("display", "none");
//     $(".decoPage").css("display", "none");
//     $(".mapPage").css("display", "block");
//  };

function startOver(){
    location.reload();
}

function clickReset(){
    $(".selectBox1, .selectBox2").off("click");
};