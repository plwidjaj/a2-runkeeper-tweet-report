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
	const text_filter_field = document.getElementById("textFilter")
	const table = document.getElementById("tweetTable")
	text_filter_field.addEventListener("input", () => {
		table.innerHTML = ""
		document.getElementById('searchText').innerText = document.getElementById("textFilter").value;
		var relevant_tweets = $.grep(written_array, function (f) {
			return f.text.includes(document.getElementById("textFilter").value)
		})
		document.getElementById('searchCount').innerText = relevant_tweets.length
		for (var i = 0; i < relevant_tweets.length; i++) {
			var row = table.insertRow(i)
			//relevant_tweets[i].getHTMLTableRow(i)
			var number = row.insertCell(0);
			var activity = row.insertCell(1);
			var tweet = row.insertCell(2)
			const url = /(https:\/\/t.co\/([a-zA-Z0-9]){10})/
			tweet_url = relevant_tweets[i].text.match(url)[0]

			number.innerHTML = i.toString();
			activity.innerHTML = relevant_tweets[i].activityType	
			tweet.innerHTML = relevant_tweets[i].text	

		}


	}
	)




}



//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});