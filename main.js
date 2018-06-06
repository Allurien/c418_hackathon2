
$(document).ready(allTheThings);

function allTheThings(){
    attachClickHandlers();
    choosyMoody();
    // changeButtonTextAndApplyClickHandler()
};

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
            callCupcakePage(mood, flavor);
        });
        $(".ansText2").text("Salty!").on("click", function(){
            flavor = "salty";
            callCupcakePage(mood, flavor);
        });
    }
    if (mood === "sad"){
        $(".ansText1").text("Sweet").on("click", function(){
            flavor = "sweet";
            callCupcakePage(mood, flavor);
        });
        $(".ansText2").text("Salty").on("click", function(){
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
    $(".tab").prepend(adddiv1);
    $(".tab").css("display", "block");
    generateTabDom();
    $(".tabContainer").css("display", "block");
    $(".selectQ").addClass("cakeName").removeClass("selectQ").text('').appendTo("#recipeTab");
    $(".selectBox1").addClass("cakeImg").removeClass("selectBox1").text('').appendTo("#recipeTab");
    $(".selectBox2").addClass("allergyBar").removeClass("selectBox2").text('').appendTo("#recipeTab");
    let adddiv2 = $("<div>").addClass("recipeBox");
    let addspacer = $("<div>").addClass("col-xs-1");
    $("#recipeTab").append(adddiv2).addClass('cakePage');
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