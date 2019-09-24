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
  myMovie.genres = movie.genres;
  myMovie.theater = movie.showtimes[0].theatre.name;
  myMovie.fandango = movie.showtimes[0].ticketURI

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
    var showDiv = $(".p");
    var showImage = $("<img>");

    var p = $("<p>").html("Title:" + myMovie.title + "<br>" + "Rating: " + myMovie.rating +"<br>"+ "Genre: "+ myMovie.genres+ "<br>" + "Theater:" + myMovie.theater + "<br>" + "Buy Tickets:" + "<a href=" + myMovie.fandango + ">" + "fandango");
    showImage.attr("src", myMovie.poster)


    // showImage.attr("src", staticSrc);

    showDiv.append(p);
    showDiv.append(showImage);
    // showDiv.append(showDango);

  });

}
