
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
