function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	
	//Calculates date span
	tweet_dates = tweet_array.map(function(tweet) {
		return tweet.time;
	});

	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	tweet_dates_sorted = (tweet_dates).sort((twtA, twtB) => Number(twtA.date) - Number(twtB.date));
	
	lastDate = tweet_dates_sorted[0];
	lastDate_ = weekdays[lastDate.getDay()] + ", " + months[lastDate.getMonth()] + " " + lastDate.getDate().toString() + ", " + lastDate.getFullYear().toString();	

	firstDate = tweet_dates_sorted[tweet_dates.length-1];
	firstDate_ = weekdays[firstDate.getDay()] + ", " + months[firstDate.getMonth()] + " " + firstDate.getDate().toString() + ", " + firstDate.getFullYear().toString();	


	//Calculates categories
	completed_events = 0
	achievements = 0
	live_events = 0
	miscellaneous = 0

	for (var i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].source == "completed_event") {
			completed_events += 1
		}
		else if (tweet_array[i].source == "achievement") {
			achievements += 1
		}
		else if (tweet_array[i].source == "live_event") {
			live_events += 1
		}
		else if (tweet_array[i].source == "miscellaneous") {
			miscellaneous += 1
		}

	}
	
	completed_events_percent = ((completed_events/tweet_array.length)*100).toFixed(2).toString() + "%";
	live_events_percent = ((live_events/tweet_array.length)*100).toFixed(2).toString() + "%";
	achievements_percent = ((achievements/tweet_array.length)*100).toFixed(2).toString() + "%";
	miscellaneous_percent = ((miscellaneous/tweet_array.length)*100).toFixed(2).toString() + "%";
	
	//Calculates written tweets

	written_tweets = 0

	for (var i = 0; i < tweet_array.length; i++) {
		if ((tweet_array[i].written == true)) {
			written_tweets += 1
		}
		else {
		}	

	}

	written_tweets_percent = ((written_tweets/completed_events)*100).toFixed(2).toString() + "%";


	

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	document.getElementById('firstDate').innerText = firstDate_;
	document.getElementById('lastDate').innerText = lastDate_;
	document.getElementsByClassName('completedEvents')[0].innerText = completed_events;
	document.getElementsByClassName('liveEvents')[0].innerText = live_events;
	document.getElementsByClassName('achievements')[0].innerText = achievements;
	document.getElementsByClassName('miscellaneous')[0].innerText = miscellaneous;
	document.getElementsByClassName('completedEventsPct')[0].innerText = completed_events_percent;
	document.getElementsByClassName('liveEventsPct')[0].innerText = live_events_percent
	document.getElementsByClassName('achievementsPct')[0].innerText = achievements_percent;
	document.getElementsByClassName('miscellaneousPct')[0].innerText = miscellaneous_percent;
	document.getElementsByClassName('completedEvents')[1].innerText = completed_events;
	document.getElementsByClassName('written')[0].innerText = written_tweets;
	document.getElementsByClassName('writtenPct')[0].innerText = written_tweets_percent;
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});