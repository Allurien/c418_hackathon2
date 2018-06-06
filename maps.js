$(document).ready(initializeApp);

let map;
let infowindow;
let results; 
function initializeApp(){
    //   createMapElements();
      $("#submit").on("click", onlyNumbers);
}
function createMapElements() {
      var mapLayout = $("<div>", {
            class: "mapLayout"
      });
      var zipCodeLabel = $("<label>", {
            class: "zipLayout",
            text: "Please enter a 5 digit zip code: "
      });
      var zipCodeInput = $("<input>", {
            id: "zipcode",
            type: "text",
            maxLength: "5"
      });
      var submitButton = $("<button>", {
            id: "submit",
            text: "Submit"
      });
      var mapArea = $("<div>", {
            id: "map"
      });
      $(zipCodeLabel).append(zipCodeInput);
      $(mapLayout).append(zipCodeLabel, submitButton, mapArea);
      $("body").append(mapLayout);
}


function onlyNumbers() {
      var convertZip = $("#zipcode").val();
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
    
    infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: currentLocation,
        radius: 5000,
        type: ["bakery"],
        openNow: true,
        keyword: "bakery"
    }, callback);
}

function callback(mapResults, status) {
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
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
}

