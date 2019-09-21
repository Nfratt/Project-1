

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

}
