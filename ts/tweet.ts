class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        
        if ((this.text).toLowerCase().includes("just")) {
            return "completed_event"
        } 
        else if ((this.text).toLowerCase().includes("achieved")) {
            return "achievement"
        }
        else if ((this.text).toLowerCase().includes("right now")) {
            return "live_event"
        }     
        else {
            return "miscellaneous";
        }
        
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written

        if ((this.text).includes("Check it out!")) {

            return false
        }
        
        return true;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet

        else {

            const url = /(https:\/\/t.co\/([a-zA-Z0-9]){10})/

            let stripped_text = (this.text).replace("#Runkeeper", "")
            let stripped_text2 = stripped_text.replace(url, "")
            let stripped_text3 = stripped_text2.split("-")
            

            return stripped_text3[1].trim();

        }
        
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        const url = /(https:\/\/t.co\/([a-zA-Z0-9]){10})/;
        let activity = this.text.split(" ")[5];
        
        if (activity.includes("in") || activity.includes("on") || activity.includes('with')) {
            activity = this.text.split(" ")[4];
        }
        if (activity.includes("workout")) {
            activity = this.text.split(" ")[3];
        }
        if (activity.includes("MySports") || activity.includes("group")) {
            activity = this.text.split(" ")[6];
        }
        if (activity.includes("practice") || activity.includes("session")) {
            activity = this.text.split(" ")[3];
        }
        let stripped_activity = activity.replace(url, "");
        let stripped_activity2 = stripped_activity.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        return stripped_activity2;
    }

    get distance():number {
        var final_distance = 0;
        if (this.source != 'completed_event') {
            return 0;
        }
        //TODO: parse the distance from the text of the tweet
        var num = /\d+(\.\d+)?/;
        var distance = this.text.match(num);
        if (distance == null) {
        }
        else if (typeof distance[0] == 'string') {
            var distance1 = distance[0];
            const array = this.text.split(" ");
            const index = array.indexOf(distance1);
            const final_index = index + 1


            if (array[final_index] == "km") {
                final_distance = parseFloat(distance1) * 0.621;
                return final_distance;
            }
            else {
                return parseFloat(distance1);
            }
        }
        return 0;

      
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr> </tr>";
    }
}