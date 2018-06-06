let map;
let mapWindow;

function createMapElements() {
    const zipCodeLabel = $("<label>", {
        class: "zipLayout",
        text: "Please enter a 5 digit zip code: "
    });
    const zipCodeInput = $("<input>", {
        id: "zipcode",
        type: "text",
        maxLength: "5"
    });
    const submitButton = $("<button>", {
        id: "submit",
        text: "Submit"
    });
    const restartButton = $("<div>", {
        class: "restartButton",
        text: "Restart",
        on: {
            click: startOver
        }
    });
    $("#map").css("height", "50vh");
    $(restartButton).css("display", "block").css("margin", "auto");
    $(zipCodeLabel).append(zipCodeInput);
    $(".mapLayout").prepend(zipCodeLabel, submitButton);
    $(".mapLayout").append(restartButton);
    $("#submit").on("click", onlyNumbers);
}

function onlyNumbers() {
      const convertZip = $("#zipcode").val();
      if (isNaN(convertZip) || convertZip.length !==5) {
            alert("Please enter 5 numbers");
            return;
      } else {
            getZipCodeLatLon();
      }
}

function getZipCodeLatLon() {
      const zipCode = $("#zipcode").val();
      const apiKey = "AIzaSyA1IdZ7v8vp2cRJO5et2ynz2tEcllfxPtE";
      const settings = {
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${apiKey}`,
            method: "GET",
            dataType: "JSON",
            success: function(response) {
                  const mapCoordinates = response.results[0].geometry.location;
                  results = getMap(mapCoordinates);
            },
            failure: function(error) {
                  console.log("error");
            }
      }
      $.ajax(settings);
}

function getMap(coords) {
//Initial location is LearningFuze
    let currentLocation = coords ? coords : {lat: 33.634875, lng: -117.740481};
    map = new google.maps.Map(document.getElementById("map"), {
        center: currentLocation,
        zoom: 12
    });
    
    mapWindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: currentLocation,
        radius: 5000,
        type: ["bakery"],
        openNow: true,
        keyword: "bakery"
    }, mapCallback);
}

function mapCallback(mapResults, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let place = 0; place < mapResults.length; place++) {
            createMarker(mapResults[place]);
        }
    }
}

function createMarker(place) {
    const placeLoc = place.geometry.location;

    const image = {
      url: "https://i.imgur.com/rRKHpfe.png",
      scaledSize: new google.maps.Size(30, 30)
      };

    const cupcakeMarker = new google.maps.Marker({
      map: map,
      icon: image,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    });
      google.maps.event.addListener(cupcakeMarker, 'click', function() {
      mapWindow.setContent(place.name);
      mapWindow.open(map, this);
    });
}

