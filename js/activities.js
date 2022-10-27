function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});


	//Calculate activity types
	let activities = new Map()
	let all_activities = new Array()

	for (var i = 0; i < tweet_array.length; i++) {
		if (!(/\d/).test(tweet_array[i].activityType) && !tweet_array[i].activityType == ("") && !tweet_array[i].activityType.includes("the") && !tweet_array[i].activityType.includes("goal") && !tweet_array[i].activityType.includes("Health") && !tweet_array[i].activityType.includes("Gym")) {
			all_activities.push(tweet_array[i].activityType)
			if (!activities.has(tweet_array[i].activityType)) {
				activities.set(tweet_array[i].activityType, 1)
			}
			else {
				activities.set(tweet_array[i].activityType, (activities.get(tweet_array[i].activityType)) + 1)
			}
		}

	}

	console.log(all_activities)

	sorted_activities = new Map([...activities].sort((a, b) => b[1] - a[1]));

	firstMost = Array.from(sorted_activities.keys())[0]
	secondMost = Array.from(sorted_activities.keys())[1]
	thirdMost = Array.from(sorted_activities.keys())[2]

	//Calculate longest & distance


	top1_distances = new Array()
	top2_distances = new Array()
	top3_distances = new Array()
	all_avg = new Map()



	for (var i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].activityType == firstMost) {
			top1_distances.push(tweet_array[i].distance)
		}
		if (tweet_array[i].activityType == secondMost) {
			top2_distances.push(tweet_array[i].distance)
		}
		if (tweet_array[i].activityType == thirdMost) {
			top3_distances.push(tweet_array[i].distance)
		}
	}

	const initial1 = 0
	const sum1 = top1_distances.reduce(
		(previous, current) => previous + current, initial1
	);
	top1_avg = sum1.toFixed(2)/top1_distances.length

	
	const initial2 = 0
	const sum2 = top2_distances.reduce(
		(previous, current) => previous + current, initial2
	);
	top2_avg = sum2.toFixed(2)/top2_distances.length

	const initial3 = 0
	const sum3 = top3_distances.reduce(
		(previous, current) => previous + current, initial3
	);
	top3_avg = sum3.toFixed(2)/top3_distances.length


	all_avg.set(top1_avg, firstMost)
	all_avg.set(top2_avg, secondMost)
	all_avg.set(top3_avg, thirdMost)

	const sorted_all_avg = new Map([...all_avg].sort((a, b) => b[0] - a[0]));

	longestActivityType = sorted_all_avg.get(Array.from(sorted_all_avg.keys())[0])
	shortestActivityType = sorted_all_avg.get(Array.from(sorted_all_avg.keys())[2])

	//Calculate whether longer activities tend to be on weekends or weekdays

	weekend_distances = new Array()
	weekday_distances = new Array()
	weekend_and_weekday = new Map ()

	const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	for (var i = 0; i < tweet_array.length; i++) {
		if (weekdays[tweet_array[i].time.getDay()] == "Sunday" || weekdays[tweet_array[i].time.getDay()] == "Saturday") {
			weekend_distances.push(tweet_array[i].distance)
		}
		else {
			weekday_distances.push(tweet_array[i].distance)
		}
	}

	const initial_weekend = 0
	const sum_weekend = weekend_distances.reduce(
		(previous, current) => previous + current, initial_weekend
	);
	weekend_avg = sum_weekend.toFixed(2)/weekend_distances.length


	const initial_weekday = 0
	const sum_weekday = weekday_distances.reduce(
		(previous, current) => previous + current, initial_weekday
	);
	weekday_avg = sum_weekday.toFixed(2)/weekday_distances.length
 
	weekend_and_weekday.set(weekend_avg, "weekends")
	weekend_and_weekday.set(weekday_avg, "weekdays")

	const sorted_weekend_and_weekday = new Map([...weekend_and_weekday].sort((a, b) => b[0] - a[0]));

	weekdayOrWeekendLonger = sorted_weekend_and_weekday.get(Array.from(sorted_weekend_and_weekday.keys())[0])



	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	const sorted_activity_types = Array.from(sorted_activities.keys())
	const sorted_activity_amounts = Array.from(sorted_activities.values())

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "width": 700,
	  "data": {
	    "values": all_activities
	  },
	  "mark": "bar",
	  "encoding": { 
		"x": {"field": "data", "type": "nominal"},
		"y": {"aggregate": "count", "type": "quantitative"}
	  }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.

	document.getElementById('numberActivities').innerText = sorted_activities.size;	
	document.getElementById('firstMost').innerText = firstMost;
	document.getElementById('secondMost').innerText = secondMost;
	document.getElementById('thirdMost').innerText = thirdMost;
	document.getElementById('longestActivityType').innerText = longestActivityType;
	document.getElementById('shortestActivityType').innerText = shortestActivityType;
	document.getElementById('weekdayOrWeekendLonger').innerText = weekdayOrWeekendLonger;
	document.getElementById('aggregate').onclick = function() { showChart()}

	function showChart() {
		console.log("hi")
		activity_vis_spec = {
			"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
			"description": "A graph of the number of Tweets containing each type of activity.",
			"width": 700,
			"data": {
			  "values": all_activities
			},
			"mark": "bar",
			"encoding": { 
			  "x": {"field": "data", "type": "nominal"},
			  "y": {"aggregate": "count", "type": "quantitative"}
			}
			//TODO: Add mark and encoding
		  };
		  vegaEmbed('#activityVis', activity_vis_spec, {actions:false});
	
	}


}



//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
loadSavedRunkeeperTweets().then(parseTweets);
});
	

	

