
const api_url = "https://developers.zomato.com/api/v2.1/search?q=bbq%2C%20barbecue&lat=40.7128&lon=-74.0060&radius=100000";

$.ajax({
    url       : api_url,
    method    : "GET",
    dataType  : "JSON",
    beforeSend: setHeader

}).done(function(response) {
    const restaurants = [];
    console.log(response);


});

function setHeader(xhr) {
    xhr.setRequestHeader('user-key', 'b4a3b5d555f0d53017007003d4445c87');
}

$.ajax({
    url: "https://api-gate2.movieglu.com/filmsComingSoon/?n=10",
    method: "GET",
    dataType: "json",
    headers: {
        'api-version': "v200",
        'authorization': "Basic VFlGVzo1Z201MXJZUGZnaGQ=",
        'x-api-key': "0ZX6GGUcgC3troqj2GfJxq8AZtazYLO32vIqSkk7",
        'device-datetime': "2018-11-27T13:26:30.147Z",
        // 'geolocation': "" + userPosition + "",
        'territory': "US",
        'client': "BUSI"
    }
}).then(function(response) {
    console.log(response)
});
