
$(document).ready(allTheThings);

function allTheThings(){
    // attachClickHandlers();
    choosyMoody();
};

// function attachClickHandlers(){
//     $(".selectQ").on("click", choosyMoody);
// };

// function clickUpdater(){
//     let question = $(".selectQ")

//     if (question.hasClass("QMood")){
//         choosyMoody();
//     }
// }

function choosyMoody(){
    $(".selectQ").text("How are you feeling today?");
    var mood = null;

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
            recommendCupcakes(mood);
        });
        $(".selectBox2").text("Salty!").on("click", function(){
            recommendCupcakes(mood);
        });
    }
    if (mood === "sad"){
        $(".selectBox1").text("Sweet").on("click", function(){
            recommendCupcakes(mood);
        });
        $(".selectBox2").text("Salty").on("click", function(){
            recommendCupcakes(mood);
        });
    }

    console.log("baking cupcakes!", mood);
};

function recommendCupcakes(mood){
    clickReset();

    console.log("recommending cupcakes for ", mood)
};

function clickReset(){
    $(".selectBox1, .selectBox2").off("click");
};