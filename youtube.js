function generateTabDom() {
    var tab = $('<div>', {
        class: 'tab'
    });

    var categoryArr = ['recipeTab', 'videoTab'];
    for (var i = 0; i < 2; i++) {
        var tabButton = $('<div>', {
            class: `tablinks  ${categoryArr[i]}Button`,
            // text: categoryArr[i],

        });
        tab.append(tabButton);
        //use clousur
        function showCategory(evt, category) {
            console.log('inside showCategory func');
            tabButton.on('click', function (e) {
                console.log('click it ', category);
                e.preventDefault();

                //when button active, content display block
                let tabcontent, tablinks;
                tabcontent = $(".tabcontent");
                tabcontent.hide();

                tablinks = $(".tablinks");
                $(".tablinks.active").removeClass('active')

                $("#category").hide();
                $(evt.currentTarget).addClass('active');
                $("#" + category).show();
            });
        }

        showCategory(event, categoryArr[i]);
        $('.tabContainer').append(tab);
    } //end for

    var recipeTab = $('<div>', {
        id: 'recipeTab',
        class: 'tabcontent',
        'h3': 'Recipe'
    });

    var videoTab = $('<div>', {
        id: 'videoTab',
        class: 'tabcontent',
        'h3': 'Video'
    });

    var youtubeContainer = $('<div>', {
        class: 'youtubeContainer'
    });
    // var youtubeButton = $('<button>', {
    //     id: 'getYoutube',
    //     class: 'btn btn-outline-primary',
    //     text: 'Get youtube'
    // });
    // var i = $('<i>', {
    //     class: "fa fa-youtube"
    // });
    // youtubeButton.append(i);
    //youtubeContainer.append(youtubeButton);
    videoTab.append(youtubeContainer);

    var decorateTab = $('<div>', {
        id: 'decorateTab',
        class: 'tabcontent',
        h3: 'Decorate'
    });

    $('#cakePage').append(recipeTab);
    $('.vidPage').append(videoTab);
    // $('.tabContainer').append(decorateTab);

} // end generateTabDom()

function getVideoData(searchTerm) {
    $('#videoTab').addClass('videoLoaded').append($('<img src= "images/loaderCupcake.gif" alt = "Waiting for sweetness!" class = "videoLoader"/>'));
    let url = 'https://s-apis.learningfuze.com/hackathon/youtube/search.php';
    let q = searchTerm;
    let type = 'video'
    let maxResult = 6;
    $.ajax({
        url: url,
        method: 'post',
        dataType: 'json',
        data: {
            q: q,
            maxResults: maxResult,
            type: type
        },
        success: function (response) {
            if (response.success) {
                console.log('server success');
                console.log('response is ', response.video);
                generateVideoDOM(response.video);
            } else {
                console.log('got wrong response');
            }
        },
        error: function (response) {
            console.log('server not work');
        }
    });
} //end getData()

function generateVideoDOM(videoList) {

    console.log('inside generateDom video ', videoList);
    //{title: "Cupcake Decorating Ideas | FUN and Easy Cupcake Recipes by So Yummy", 
    //    id: "YsxtAMlWfj8"}
    $('.videoLoader').remove();
    for (let i = 0; i < videoList.length; i++) {
        let videoID = videoList[i].id;
        console.log('video id ', videoID);
        //var url = `https://www.youtube.com/watch?v=${videoID}`;
        //console.log('url for each video ', url);

        let showURL = `https://www.youtube.com/embed/${videoID}?rel=0`;
        let iframe = $('<iframe>', {
            src: showURL,
            'allowfullscreen': true
        });
        
        $('.youtubeContainer').append(iframe);
    } //end for loop

} //end generateDOM()


function showModal() {
    $('#modelShadow').css('display', 'block');
   
}// end showWinModal()

function hideModal() {
    $('#modelShadow').css('display', 'none');
}