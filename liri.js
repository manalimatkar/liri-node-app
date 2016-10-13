//Include keys.js 
var keysNeeded = require('./keys.js');

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
		// console.log("Multiple Word search value ::" + searchValue);
	    }
	}else{
		searchValue = nodeArgs[3];
		// console.log("One Word search value ::" + searchValue);
	}	
	// console.log("todo::::" + actionToDo + "Search For:::" + searchValue);
}else{
	actionToDo = nodeArgs[2];
	// console.log("todo::::" + actionToDo);
}

//Select the action to perform based on the actiontodo value

if (actionToDo == "my-tweets"){
	
		console.log("Inside my tweets action execution command");	

}else if(actionToDo == "spotify-this-song"){

	if(searchValue == ""){

		console.log("Inside spotify action execution command with no searchValue");
	}else{
		console.log("Inside spotify action execution command with searchValue");
	}

}else if(actionToDo == "movie-this"){

	if(searchValue == ""){
		console.log("Inside movie action execution command with no searchValue");
	}else{
		console.log("Inside movie action execution command with searchValue");
	}

}else if (actionToDo == "do-what-it-says"){

	if(searchValue == ""){
		console.log("Inside do do-what-it-says action execution command with no searchValue");
	}else{
		console.log("Inside do-what-it-says action execution command with searchValue");
	}

}else {

	console.log("Please enter a command");
}