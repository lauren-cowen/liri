// var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var twitterKeys = require('./key.js');

var spotify = new Spotify({
    id: "0fcdf9d307ab48f283fac51f6492a717",
    secret: "4bf10ba9a7aa49658a28f2da238a3ee9"
});


var userInput = process.argv;
var entry = process.argv[2];
var searchTerm = "";
for (i = 3; i < process.argv.length; i++) {
    searchTerm += process.argv[i] + " ";
}
console.log(searchTerm);

if (entry === "my-tweets") {

} 

else if (entry === "spotify-this-song") {
    if (searchTerm === "") {
        searchTerm = "The Sign";
        spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log("Artist: " + data.tracks.items[5].album.artists[0].name);
                console.log("Album: " + data.tracks.items[5].album.name);
                console.log("Title: " + data.tracks.items[5].name);
                console.log("Preview on Spotify: " + data.tracks.items[5].preview_url);
            });
            

        }
    else {
    	spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Title: " + data.tracks.items[0].name);
                console.log("Preview on Spotify: " + data.tracks.items[0].preview_url);

            });
    }
} 

        else if (entry === "movie-this") {

        } else if (entry === "do-what-it-says") {

        } else {
            console.log("invalid entry");
        }