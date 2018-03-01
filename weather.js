moment.locale("fr");
$("#date").text(moment().format('LL'));


$(document).ready(function() {
    $('#submitweather').click(function() {
        var city = $("#city").val();
        if (city != '') {
            $.ajax({

                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=248a8f723196ff7ffb7e6415ac07d252",
                type: "GET",
                dataType: "jsonp",
                success: function(data) {
                    var temperature = tempactu(data);
                    var widget = show(data);
                    var donnee = coordo(data);

                    $("#tempactu").html(temperature);
                    $("#show").html(widget);
                    $("#coordo").html(donnee);
                    $("#city").val('');

                    //console.log(data);
                }
            });

        } else {

            $("#error").html("Ce champ ne doit pas rester vide");
        }
    });
});

function tempactu(data) {
    return "<h1> " + data.main.temp + "&deg;C</h1>";
}
function show(data) {
    return "<h4>Max Temperature: " + data.main.temp_max + "&deg;C</h4>" +
        "<h4>Min Temperature: " + data.main.temp_min + "&deg;C</h4>" +
        "<h4>Pression: " + data.main.pressure + "hPa</h4>" +
        "<h4>Vent: " + data.wind.speed + "km/h</h4>" +
        "<h4>Humidité: " + data.main.humidity + "%</h4>";
}

function coordo(data) {
    return "<h4>Longitude: " + data.coord.lon + "</h4>" +
        "<h4>Latitude : " + data.coord.lat + "</h4>";
}

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: { lat: 43.1148, lng: 1.608 }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });
}

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Géolocalisation ne fonctionne pas pour la raison suivante: ' + status);
        }
    });
}