$(document).ready(function() {
    $('#submitweather').click(function() {
        var city = $("#city").val();
        if (city != '') {
            $.ajax({

                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=248a8f723196ff7ffb7e6415ac07d252",
                type: "GET",
                dataType: "jsonp",
                success: function(data) {
                    var widget = show(data);

                    $("#show").html(widget);
                    $("#city").val('');

                    //console.log(data);
                }
            });

        } else {

            $("#error").html("Ce champ ne doit pas rester vide");
        }
    });
});

function show(data) {
    return "<h1 style='text-align:center; font-size:50px;'> " + data.main.temp + "&deg;C</h1>" +
        "<h4>Max Temperature: " + data.main.temp_max + "&deg;C</h4>" +
        "<h4>Min Temperature: " + data.main.temp_min + "&deg;C</h4>" +
        "<h4>Pression: " + data.main.pressure + "hPa</h4>" +
        "<h4>Vent: " + data.wind.speed + "m/s</h4>" +
        "<h4>Humidité: " + data.main.humidity + "%</h4>";
}