
$(document).ready(allTheThings);

function allTheThings(){
    attachClickHandlers();
    clickUpdater();
};

function attachClickHandlers(){
    $(".selectQ").on("click", choosyMoody);
};

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

    console.log("bakeOrBuy clicked!")
    console.log(mood)
};