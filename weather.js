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
            return "<h3><strong>Temperature</strong>: " + data.main.temp + "&deg;C</h3>" +
                "<h3><strong>MaximumTemperature</strong>: " + data.main.temp_max + "&deg;C</h3>" +
                "<h3><strong>MinimumTemperature</strong>: " + data.main.temp_min + "&deg;C</h3>" +
                "<h3><strong>Pressure</strong>: " + data.main.pressure + "hPa</h3>" +
                "<h3><strong>WindSpeed</strong>: " + data.wind.speed + "m/s</h3>" +
                "<h3><strong>Humidity</strong>: " + data.main.humidity + "%</h3>";

        }