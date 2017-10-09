var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var twitterKeys = require('./key.js');
var fs = require("fs");

var spotify = new Spotify({
    id: "0fcdf9d307ab48f283fac51f6492a717",
    secret: "4bf10ba9a7aa49658a28f2da238a3ee9"
});

var client = new Twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret,
});


var userInput = process.argv;
var entry = process.argv[2];
var searchTerm = "";
for (i = 3; i < process.argv.length; i++) {
    searchTerm += process.argv[i] + " ";
}


if (entry === "my-tweets") {
	getTweets();
 

} else if (entry === "spotify-this-song") {
	spotifyThisSong(searchTerm);
    
} else if (entry === "movie-this") {
	movieThis(searchTerm);
	

} else if (entry === "do-what-it-says") {
	fs.readFile('random.txt', 'utf8', function (err, data) {	
  if (err) throw err;
  var arrayOfStrings = data.split(",");
  // entry = arrayOfStrings[0];
  // searchTerm = arrayOfStrings[1];
  if(arrayOfStrings[0]==="spotify-this-song") {
  	spotifyThisSong(arrayOfStrings[1]);
  }
});

} else {
    console.log("invalid entry");
}

function getTweets() {
	var params = { count: 20 };
    client.get("statuses/user_timeline", params, function(error, data) {
        for (i = 0; i < data.length; i++) {
            console.log("Time: " + data[i].created_at);
            console.log("Tweet: " + data[i].text)
            console.log("----------------------------------------------------------------------")
        }
    });
}

function spotifyThisSong(song) {
	if (song === "") {
        song = "The Sign";
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Artist: " + data.tracks.items[5].album.artists[0].name);
            console.log("Album: " + data.tracks.items[5].album.name);
            console.log("Title: " + data.tracks.items[5].name);
            console.log("Preview on Spotify: " + data.tracks.items[5].preview_url);
        });


    } else {
        spotify.search({ type: 'track', query: song }, function(err, data) {
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

function movieThis(movie) {
	if(movie==="") {
		movie = "Mr. Nobody";
	}

    request('http://www.omdbapi.com/?t=' + movie + ' &y=&plot=short&apikey=40e9cece', function(error, response, body) {
       
        if(!error&&response.statusCode === 200) {
        	console.log("Movie Title: " + JSON.parse(body).Title);
        	console.log("Year: " + JSON.parse(body).Year);
        	console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        	console.log("Country: " + JSON.parse(body).Country);
        	console.log("Language: " + JSON.parse(body).Language);
        	console.log("Plot: " + JSON.parse(body).Plot);
        	console.log("Actors: " + JSON.parse(body).Actors);

        
        }
     
    });
}