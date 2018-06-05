
$(document).ready(allTheThings);

function allTheThings(){
    choosyMoody();
};

function choosyMoody(){
    $(".selectQ").text("How are you feeling today?");
    let mood = null;

    $(".selectBox1").text("Happy").on("click", function(){
        mood = "happy";
        bakeOrBuy(mood);
    });
    $(".selectBox2").text("Sad").on("click", function(){
        mood = "sad";
        bakeOrBuy(mood);
    });
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

    $(".selectQ").text("How fun! Which flavor sounds tastiest?");

    if (mood === "happy"){
        $(".selectBox1").text("Sweet!").on("click", function(){
            mood += "Sweet";
            callCupcakePage(mood);
        });
        $(".selectBox2").text("Salty!").on("click", function(){
            mood += "Salty";
            callCupcakePage(mood);
        });
    }
    if (mood === "sad"){
        $(".selectBox1").text("Sweet").on("click", function(){
            mood += "Sweet";
            callCupcakePage(mood);
        });
        $(".selectBox2").text("Salty").on("click", function(){
            mood += "Salty"
            callCupcakePage(mood);
        });
    }

    console.log("baking cupcakes!", mood);
};

function callCupcakePage(mood){
    clickReset();
//--------------------------------Creating the page here---------------------------------------
    $(".selectQ").addClass("cakeHeader").removeClass("selectQ").text('');
    $(".selectBox1").addClass("cakeNav").removeClass("selectBox1").text('');
    $(".selectBox2").addClass("cakeName").removeClass("selectBox2").text('');
    let adddiv1 = $("<div>").addClass("cakeImg");
    let adddiv2 = $("<div>").addClass("allergyBar");
    let adddiv3 = $("<div>").addClass("recipeBox");
    $(".col-xs-10").append(adddiv1, adddiv2, adddiv3);
    cupcakeChooser();

    console.log("recommending cupcakes for ", mood)
};

//---------------------------------Randomizer based on mood here------------------------------------

function cupcakeChooser(mood){

};

//--------------------------------------------------------------------------------------------------

function clickReset(){
    $(".selectBox1, .selectBox2").off("click");
};