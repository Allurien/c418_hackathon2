function showRecipePICModel(image) {

    // debugger;
    $('#recipePICModelShadow').css('display', 'block');
    var imageToAppend = $("<img>", {
        'class': 'modelPIC',
        'src': image,
    });
    $("#recipePICModelBody").append(imageToAppend);
    $('#recipePICModelBody').on('click', hideRecipePICModel);
} // end showWinModal()

function hideRecipePICModel() {
    $('.modelPIC').remove();
    //$('#recipePICModelShadow').remove();
    $('#recipePICModelShadow').css('display', 'none');
}


function showIngredientModel(ingredients) {
    var ingredStr = ingredients.toString();
    var ingredientToAppend = $('<p>', {
        "class": "ingredient",
        "text": ingredStr
    });
    $('#recipeIngredientModelBody').append(ingredientToAppend);
    $('#recipeIngredientModelBody').on('click', hideIngredientModel);
    $("#recipeIngredientModelShadow").show();
}

function hideIngredientModel() {
    $('.ingredient').remove();
    $('#recipeIngredientModelShadow').css('display', 'none');
}