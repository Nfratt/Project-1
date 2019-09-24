

$(document).ready(function () {

    var location = 'Seymour,Connecticut';  //change to user input once identified
    var city = 'Stamford'
    var state = 'CT'
    var date;


    function displayResultsWeather() {
        var APIKey = "166a433c57516f51dfab1f7edaed8413";

        // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + location + "&units=imperial&appid=" + APIKey;

        // Here we run our AJAX call to the OpenWeatherMap API
        //writing in comment
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            //  $(".city").html("<h1>" + response.name + " Weather Details</h1>");
            //  $(".wind").text("Wind Speed: " + response.wind.speed);
            //  $(".humidity").text("Humidity: " + response.main.humidity);
            //  $(".temp").text("Temperature (F) " + response.main.temp);

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
        });

    };
    displayResultsWeather();

    function displayResultsEvents() {
        // Here we are building the URL we need to query the database
        var queryURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=R6DhROIJxrsIGyZyaj1qzfCpwqb7IsA9&locale=*&&city=' + city + '&stateCode=' + state

        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data._embedded.events;
            for (var i = 0; i < results.length; i++) {
                var eventName = results[i].name;

                // Log the queryURL
                console.log(queryURL);

                // Log the resulting object
                console.log(response);

                // Transfer content to HTML
                //  $(".city").html("<h1>" + response.name + " Weather Details</h1>");
                //  $(".wind").text("Wind Speed: " + response.wind.speed);
                //  $(".humidity").text("Humidity: " + response.main.humidity);
                //  $(".temp").text("Temperature (F) " + response.main.temp);

                // Log the data in the console as well
                console.log("Event: " + eventName);

            };

        });

    };
    displayResultsEvents();



$.ajax({
  url: "http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-09-21&zip=06901&api_key=jx28yp3s6ukdynup5javhjmn",
  method: "GET"
}).done(handleMovies);

function handleMovies(response) {
  var results = response;
  results.forEach(getMovieInfo);
  console.log(results);


}

function getMovieInfo(movie) {
  var myMovie = {};
  myMovie.title = movie.title;
  myMovie.genres = movie.genres[0];
  myMovie.theater = movie.showtimes[0].theatre.name;

  // var poster = results[i].preferredImage
  // console.log(poster);
  myMovie.rating = '';
  if (movie.ratings) {
    myMovie.rating = movie.ratings[0].code;
  }

  $.ajax({
    url: "http://www.omdbapi.com/?t=" + encodeURI(movie.title) + "&apikey=698e080b",
    method: "GET"
  }).done(function(resp) {
    var res = resp;
    myMovie.poster = res.Poster;
    // console.log(results);
    console.log(myMovie);
    // add movie to DOM
  });

};






});
