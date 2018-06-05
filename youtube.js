$(document).ready(init);

function init() {
    //alert('youtube hi');
    $('button').on('click', getData);

}


function getData() {
    let url = 'https://s-apis.learningfuze.com/hackathon/youtube/search.php';
    let q = 'salt chocolate  cupcake';
    //let q = $('input').val()
    let type = 'video'
    let maxResult = 3;
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
                generateDOM(response.video);
            } else {
                console.log('got wrong response');
            }
        },
        error: function (response) {
            console.log('server not work');
        }
    });
} //end getData()

function generateDOM(videoList) {
    console.log('inside generateDom video ', videoList);
    //{title: "Cupcake Decorating Ideas | FUN and Easy Cupcake Recipes by So Yummy", 
    //    id: "YsxtAMlWfj8"}

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

        $('.container').append(iframe);
    } //end for loop

} //end generateDOM()