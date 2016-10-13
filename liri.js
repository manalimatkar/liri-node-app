//Include keys.js 
var keysNeeded = require('./keys.js');
var request = require('request');
var spotify = require('spotify');
var fs = require("fs");


var searchValue = "";
var actionToDo = "";

//console.log(keysNeeded);

//Get Keys and store it in variables

var consumer_key_twr = keysNeeded.twitterKeys.consumer_key;
var consumer_secret_twr = keysNeeded.twitterKeys.consumer_secret;
var access_token_key_twr = keysNeeded.twitterKeys.access_token_key;
var access_token_secret_twr = keysNeeded.twitterKeys.access_token_secret;



// Take in the command line arguments
var nodeArgs = process.argv;

// console.log(nodeArgs);

//If length of arguments is more then three assign both values else assign todo

if(nodeArgs.length > 2){
	actionToDo = nodeArgs[2];
	//check if the search value is one word or more than one word
	if(nodeArgs.length > 4){
		//construct the string from the argument
		for(i=0; i < nodeArgs.length-3;i++){
		searchValue = searchValue + process.argv[i+3] + " ";
		 
	    }
	}else{
		searchValue = nodeArgs[3];		
	}	
	// console.log("todo::::" + actionToDo + "Search For:::" + searchValue);
}else{
	actionToDo = nodeArgs[2];	
}

console.log("todo::::" + actionToDo);
console.log("search value ::" + searchValue);

//Select the action to perform based on the actiontodo value

if (actionToDo == "my-tweets"){
	
		console.log("Inside my tweets action execution command");	

}else if(actionToDo == "spotify-this-song"){

	if(searchValue == undefined){

		console.log("Inside spotify action execution command with no searchValue");
	}else{

		findSongInfo();
		
	}

}else if(actionToDo == "movie-this"){

	if(searchValue == undefined){

		 	searchValue = "Mr Nobody";		 	
		 	findMovieInfo();
			console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/" + 
				"\n" + "It's on Netflix!");
	}else{
			
			findMovieInfo();					
	}

}else if (actionToDo == "do-what-it-says"){

		fs.readFile("random.txt", "utf-8", function(err,data){

			var dataReturned = data.split(",");

			for (var i = dataReturned.length - 1; i >= 0; i--) {
				console.log(dataReturned[i]);
			}

		});

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