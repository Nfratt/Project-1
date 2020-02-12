$(document).ready(function () {

        let urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams.get("location"));
        let location = urlParams.has("location") ? urlParams.get("location") : "";
        let city = urlParams.has("city") ? urlParams.get("location") : "";
        let state = urlParams.has("state") ? urlParams.get("state") : "";
        let date = urlParams.has("date") ? urlParams.get("date") : "";
        console.log(date);
        let startDate = date + 'T01:01:01Z'
        let endDate = date + 'T23:00:00Z'
        console.log(startDate);
        console.log(endDate);

        let zip = urlParams.has("zip") ? urlParams.get("zip") : "";
        $("#startbtn").on("click", function (event) {
            event.preventDefault();

            location = $("#inputLocationCity").val().trim();
            city = location;
            state = $("#inputLocationState").val().trim();
            date = $("#inputDate").val().trim();
            zip = $('#zip-code').val().trim();

            //Input validation happening here...
            if (state === '' || date === '' || city === '' || zip === '') {
                let inputError = $('<p>').addClass('text-white').text('All fields are required');
                $('#inputError').html(inputError);
            }
            else {
                // Load the next page
                window.location.href = `D8nite.html?location=${location}&city=${city}&zip=${zip}&date=${date}&state=${state}`;
            };
        });

        //Display user input criteria on results page
        function displayCriteria() {
            $('#userLocation').html(city + ', ' + state);
            $("#userZip").html(zip);
            $("#userDate").html(date);
        }
        displayCriteria();

        function displayResultsWeather() {
//                 process.env.Weather_API
            let APIKey = "YOUR_KEY_HERE";

            // Here we are building the URL we need to query the database
            let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
                "q=" + location + "&units=imperial&appid=" + APIKey;

            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                // Log the resulting object
                console.log('-----WEATHER-----')

                let windMPH = Math.floor(response.wind.speed * 2.237);
                let tempF = Math.floor(response.main.temp);

                // Log the data in the console as well
                console.log("Temperature (F): " + tempF);
                console.log("Wind Speed: " + windMPH);
                console.log("Humidity: " + response.main.humidity + ' %');

                let weatherDiv = $('<div>');
                let pTemp = $('<p>').append("Temperature: " + tempF + 'F');
                let pWind = $('<p>').append("Wind Speed: " + windMPH + 'mph');
                let pHumidity = $('<p>').append("Humidity: " + response.main.humidity + '%');

                weatherDiv.append(pTemp);
                weatherDiv.append(pWind);
                weatherDiv.append(pHumidity);
                $('#weatherResults').append(weatherDiv);
            });
        };

        function displayResultsEvents() {
//                 const APIkey= process.env.Events_API
            // Here we are building the URL we need to query the database
            let queryURL = 'https://app.ticketmaster.com/discovery/v2/events?apikey=YOUR_KEY_HERE&locale=*&city=' + city + '&stateCode=' + state + '&startDateTime=' + startDate + '&endDateTime=' + endDate

            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                let events = response._embedded.events;
                console.log('-----EVENTS-----')

                for (let i = 0; i < events.length; i++) {
                    console.log(events[i].name);
                    console.log(events[i].dates.start.localDate);
                    try {
                        console.log(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
                    } catch (err) {
                        console.log(err);
                    }
                    console.log(events[i].url);

                    let eventCard = $('<div>').addClass('card');
                    let pEventName = $('<h5>').addClass('card-title');
                    pEventName.append(events[i].name);

                    let pEventDate = $('<h6>').addClass('card-text')
                    pEventDate.append(events[i].dates.start.localDate);

                    let pEventVenue = $('<p>').addClass('card-text');
                    pEventVenue.append(events[i]._embedded.venues[0].name + ' , ' + events[i]._embedded.venues[0].city.name);

                    let pEventTickets = $('<a href=' + events[i].url + '>').addClass('btn btnbook btn-primary').text('Get Tickets')

                    eventCard.append(pEventName);
                    eventCard.append(pEventDate);
                    eventCard.append(pEventVenue);
                    eventCard.append(pEventTickets);
                    $('#eventResults').append(eventCard);
                }

            });
        };

        function displayResultsFood() {
            let queryURL = 'https://opentable.herokuapp.com/api/restaurants?city=' + city + '&state=' + state + '&per_page=5';
            // Here we run our AJAX call to the OpenTable API
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).then(function (response) {
                console.log('-----RESTAURANTS-----')

                let restaurants = response.restaurants;
                for (let i = 0; i < restaurants.length; i++) {
                    console.log(response.restaurants[i].image_url);
                    console.log(response.restaurants[i].name);
                    console.log(response.restaurants[i].address);
                    console.log(response.restaurants[i].city);
                    console.log(response.restaurants[i].phone);
                    console.log(response.restaurants[i].reserve_url);

                    let restCard = $('<div>').addClass('card');
                    let pRestName = $('<h5>').addClass('card-title');
                    pRestName.append(response.restaurants[i].name);
                    let pRestimg =$('img').addClass('img');
                    pRestimg.append(response.restaurants[i].image_url.image);

                    let pRestAddress = $('<h6>').addClass('card-text')
                    pRestAddress.append(response.restaurants[i].address + ' , ' + response.restaurants[i].city);

                    let pRestPhone = $('<p>').addClass('card-text');
                    pRestPhone.append(response.restaurants[i].phone);

                    let pRestReserve = $('<a href=' + response.restaurants[i].reserve_url + '>').addClass('btn btnbook btn-primary').attr('id', 'reserveBtn').text('Reserve Now')

                    restCard.append(pRestName);
                    restCard.append(pRestimg);
                    restCard.append(pRestAddress);
                    restCard.append(pRestPhone);
                    restCard.append(pRestReserve);
                    $('#restResults').append(restCard);
                };
            });
        };

// const APIKEY= process.env.TMS_API

        let apiURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + date + "&zip=" + zip + "&api_key=YOUR_KEY_HERE";

        $.ajax({
            url: apiURL,
            method: "GET"
        }).then(handleMovies).catch((req, res, error) => {
            console.log(error);
        });

        function handleMovies(response) {
            let results = response;
            // debugger;
            results.forEach(getMovieInfo);
            console.log(results);
        }

        function getMovieInfo(movie) 
//         const APIkey= process.env.OMDB_API
            let myMovie = {};
            myMovie.title = movie.title;
            myMovie.genres = movie.genres[0];
            myMovie.theater = movie.showtimes[0].theatre.name;
            myMovie.fandango = movie.showtimes[0].ticketURI
            myMovie.rating = '';
            if (movie.ratings) {
                myMovie.rating = movie.ratings[0].code;
            }

            $.ajax({

                url: "https://www.omdbapi.com/?t=" + encodeURI(movie.title) + "&apikey=YOUR_KEY_HERE",
                method: "GET"

            }).done(function (resp) {
                let res = resp;
                myMovie.poster = res.Poster;
                console.log(myMovie);
                // add movie to DOM
                let movieDiv = $('<div>').addClass('card');
                let movieName = $('<h5>').addClass('card-title')
                movieName.append(myMovie.title);
                let movieGenre = $('<h6>').addClass('card-text')
                movieGenre.append(myMovie.genres);
                let movieTheater = $('<p>').addClass('card-text')
                movieTheater.append(myMovie.theater);
                let movieDango = $('<a href=' + myMovie.fandango + '>').addClass('btn btnbook btn-primary').attr('id', 'dangoBtn').text('Buy Now');

                let movieRating = $('<p>').append(myMovie.rating);
                let showImage = $(" <img class='poster'>");
                showImage.attr("src", myMovie.poster)

                movieDiv.append(movieName);
                movieDiv.append(movieGenre);

                movieDiv.append(movieTheater);
                movieDiv.append(movieRating);

                movieDiv.append(showImage);

                movieDiv.append(movieDango);
                $('#movieResults').append(movieDiv);
            });

        };
        displayResultsWeather();
        displayResultsFood();
        displayResultsEvents();

        handleMovies();
        handleMovies();

    });
