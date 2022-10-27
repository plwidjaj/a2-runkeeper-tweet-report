function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	written_array = new Array();

	for (var i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].written) {
			written_array.push(tweet_array[i])
		}
		else {
		}
	}

	
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	var userInput = document.getElementById("textFilter").value;

	userInput.onkeyup = function() {
		document.getElementById('searchCount').innerText = userInput.value;
	}



}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});