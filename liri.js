//Include required packages
var keysNeeded = require('./keys.js');
var request = require('request');
var spotify = require('spotify');
var Twitter = require('twitter');
var fs = require("fs");

//Set global variables
var searchValue = "";
var actionToDo = "";

//Get Keys for user access and store it in variables
var consumer_key_twr = keysNeeded.twitterKeys.consumer_key;
var consumer_secret_twr = keysNeeded.twitterKeys.consumer_secret;
var access_token_key_twr = keysNeeded.twitterKeys.access_token_key;
var access_token_secret_twr = keysNeeded.twitterKeys.access_token_secret;

//Create Twitter Client
var clientM = new Twitter({
  consumer_key: consumer_key_twr,
  consumer_secret: consumer_secret_twr,
  access_token_key: access_token_key_twr,
  access_token_secret: access_token_secret_twr
});

// Take in the command line arguments
var nodeArgs = process.argv;

//Set values for actionToDo and searchValue based on the number of arguments passed
if(nodeArgs.length > 2){
	actionToDo = nodeArgs[2];
	//check if the search value is one word or more than one word
	if(nodeArgs.length > 4){
		//construct the string from the argument for multiword value
		for(i=0; i < nodeArgs.length - 3; i++){
			searchValue = searchValue + process.argv[i+3] + " ";		 
	    }
	}else{
		// set the word at index 3 as searchValue
		searchValue = nodeArgs[3];		
	}	
}else{
	actionToDo = nodeArgs[2];	
}

console.log("todo::::" + actionToDo);
console.log("search value ::" + searchValue);

//Select the action to perform based on the actiontodo value

if (actionToDo == "my-tweets"){
//Tweets Starts 
// Login user and get the latest tweets from dashboard using the API call
		var params = {screen_name: 'matsey_man'};
		clientM.get('statuses/user_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	for (var i = tweets.length - 1; i >= 0; i--) {
		  		console.log("-----------------------------------------------");
			    console.log(tweets[i].text);
			    console.log("-----------------------------------------------");
			  }
		  	}
		  	
		});
//Tweets Ends
}else if(actionToDo == "spotify-this-song"){
//spotify starts
	if(searchValue == undefined){
		searchValue = "The Sign";
		findSongInfo();		
	}else{
		findSongInfo();		
	}
//spotify ends
}else if(actionToDo == "movie-this"){
// movie search starts
	if(searchValue == undefined){
		 	searchValue = "Mr Nobody";		 	
		 	findMovieInfo();
			console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/" + 
				"\n" + "It's on Netflix!");
	}else{			
			findMovieInfo();					
	}
//movie search ends
}else if (actionToDo == "do-what-it-says"){
// do what it says starts
		//Read the file
		fs.readFile("random.txt", "utf-8", function(err,data){

			var dataReturned = data.split(",");
			//split text and store values in action todo and search value
			for (var j = 0; j < dataReturned.length ;) {
				console.log(dataReturned[j]);

				actionToDo = dataReturned[j];
				searchValue = dataReturned[j+1];

				if (actionToDo == "spotify-this-song") {
					if (searchValue != undefined) {
						findSongInfo();
					}else{
						searchValue = "The Sign";
						findSongInfo();
					}
				} else if (actionToDo == "movie-this") {
					if (searchValue != undefined) {
						findMovieInfo();
					}else{
						searchValue = "Mr Nobody";
						findMovieInfo();
					}
				}else if (actionToDo == "my-tweets") {
					var params = {screen_name: 'matsey_man'};
					clientM.get('statuses/user_timeline', params, function(error, tweets, response) {
					  if (!error) {
					  	for (var i = tweets.length - 1; i >= 0; i--) {
					  		console.log("-----------------------------------------------");
						    console.log(tweets[i].text);
						    console.log("-----------------------------------------------");
						  }
					  	}
					  	
					});
				}

				j=j+2;
			}

		});
//do what t says ends
}else {

	console.log("Please enter a command");
}

function findMovieInfo(){
	console.log("INSIDE FINDMOVIE :::"+ searchValue);
	// Then run a request to the OMDB API with the movie specified
		request("http://www.omdbapi.com/?t="+ searchValue +"&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {

			// If the request is successful (i.e. if the response status code is 200)
			if (!error && response.statusCode == 200) {				
				// Parse the body of the site and recover just the imdbRating
				// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it). 
				console.log("Movie Name:: " + JSON.parse(body)["Title"] + "\n" +
						"Year Of Release :: " + JSON.parse(body)["Year"] + "\n" +
						"IMDB Rating :: " + JSON.parse(body)["imdbRating"] + "\n" +
						"Country Movie Was Produced :: " + JSON.parse(body)["Country"] + "\n" +
						"Language :: " + JSON.parse(body)["Language"] + "\n" +
						"Plot Of Movie :: " + JSON.parse(body)["Plot"] + "\n" +
						"Actors in the movie :: " + JSON.parse(body)["Actors"] + "\n" +
						"Rotten Tomatoes Rating :: " + JSON.parse(body)["tomatoRating"] + "\n" +
						"Rotten Tomatoes URL :: " + JSON.parse(body)["tomatoURL"]);
			}
		});

}

function findSongInfo(){

	console.log("INSIDE FINDSONG :::"+ searchValue);
	spotify.search({ type: 'track', query: searchValue }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	    	var songInfo = data.tracks.items[0];
		    console.log("NAME:::" + songInfo.artists[0].name);
		    console.log("Song Name:::" + songInfo.name);
		    console.log("AlbumName :::" + songInfo.album.name);
		    console.log("Song Preview URL"+ songInfo.preview_url);
		    
	    }
	});
}