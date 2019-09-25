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
      $.ajax({
          url: queryURL,
          method: "GET"
      }).then(function (response) {

          // Log the resulting object
          //console.log(response);
          console.log('-----WEATHER-----')

          var windMPH = Math.floor(response.wind.speed * 2.237);
          var tempF = Math.floor(response.main.temp);


          // Transfer content to HTML
          //  $(".city").html("<h1>" + response.name + " Weather Details</h1>");
          //  $(".wind").text("Wind Speed: " + response.wind.speed);
          //  $(".humidity").text("Humidity: " + response.main.humidity);
          //  $(".temp").text("Temperature (F) " + response.main.temp);

          // Log the data in the console as well
          console.log("Temperature (F): " + tempF);
          console.log("Wind Speed: " + windMPH);
          console.log("Humidity: " + response.main.humidity + ' %');

          var weatherDiv = $('<div>');
          var pTemp = $('<p>').append("Temperature: " + tempF + 'F');
          var pWind = $('<p>').append("Wind Speed: " + windMPH + 'mph');
          var pHumidity = $('<p>').append("Humidity: " + response.main.humidity + '%');

          weatherDiv.append(pTemp);
          weatherDiv.append(pWind);
          weatherDiv.append(pHumidity);
          $('#weather').append(weatherDiv);

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
          var events = response._embedded.events;
          console.log('-----EVENTS-----')
          for (var i = 0; i < events.length; i++) {
              console.log(events[i].name);
              console.log(events[i].dates.start.localDate);
              try {
                  console.log(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
              } catch (err) {
                  console.log(err);
              }
              console.log(events[i].url);

              var eventDiv = $('<div>');
              var pEventName = $('<p>').append(events[i].name);
              var pEventDate = $('<p>').append(events[i].dates.start.localDate);
              var pEventVenue = $('<p>').append(events[i]._embedded.venues[0].name);
              var pEventCity = $('<p>').append(events[i]._embedded.venues[0].city.name);
              var pEventTickets = $('<p>').append(events[i].url);

              eventDiv.append(pEventName);
              eventDiv.append(pEventDate);
              eventDiv.append(pEventVenue);
              eventDiv.append(pEventCity);
              eventDiv.append(pEventTickets);
              eventDiv.append($('<hr>'));
              $('#eventResults').append(eventDiv);
          }
      });
  };
  ;
  displayResultsEvents();


  function displayResultsFood() {

      var queryURL = 'https://opentable.herokuapp.com/api/restaurants?city=' + city + '&state=' + state;

      // Here we run our AJAX call to the OpenWeatherMap API
      $.ajax({
          url: queryURL,
          method: 'GET'
      }).then(function (response) {
          console.log('-----RESTAURANTS-----')

          var restaurants = response.restaurants;
          for (var i = 0; i < restaurants.length; i++) {
              console.log(response.restaurants[i].image_url);
              console.log(response.restaurants[i].name);
              console.log(response.restaurants[i].address);
              console.log(response.restaurants[i].city);
              console.log(response.restaurants[i].phone);
              console.log(response.restaurants[i].reserve_url);

              var restDiv = $('<div>');
              var pRestName = $('<p>').append(response.restaurants[i].name);
              var pRestAddress = $('<p>').append(response.restaurants[i].address);
              var pRestCity = $('<p>').append(response.restaurants[i].city);
              var pRestPhone = $('<p>').append(response.restaurants[i].phone);
              var pRestReserve = $('<p>').append(response.restaurants[i].reserve_url);

              restDiv.append(pRestName);
              restDiv.append(pRestAddress);
              restDiv.append(pRestCity);
              restDiv.append(pRestPhone);
              restDiv.append(pRestReserve);
              restDiv.append($('<hr>'));
              $('#restResults').append(restDiv);
          };
      });
  };

  displayResultsFood();




  $.ajax({
      url: "http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-09-24&zip=06901&api_key=jx28yp3s6ukdynup5javhjmn",
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
      }).done(function (resp) {
          var res = resp;
          myMovie.poster = res.Poster;
          // console.log(results);
          console.log(myMovie);
          // add movie to DOM
          var movieDiv = $('<div>');
            var movieName = $('<p>').append(myMovie.title);
            var movieGenre = $('<p>').append(myMovie.genres);
            var movieTheater = $('<p>').append(myMovie.theater);
            var movieRating = $('<p>').append(myMovie.rating);
            var showImage = $("<img>");
              showImage.attr("src", myMovie.poster)


            movieDiv.append(movieName);
            movieDiv.append(movieGenre);
            movieDiv.append(movieTheater);
            movieDiv.append(movieRating);
            movieDiv.append(showImage);

            movieDiv.append($('<hr>'));
            $('#movieResults').append(movieDiv);
      });

  };

});
