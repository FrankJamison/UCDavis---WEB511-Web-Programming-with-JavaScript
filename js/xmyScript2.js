/***********************************************/
/* GLOBAL VARIABLES                            */
/***********************************************/
var watchTime = 0;			// Current stopwatch time
var watchRunning = false;	// Stopwatch running flag
var timerStartTime = 0;		// Timer start time
var timerTime = 0;			// Current timer time
var timerRunning = false;	// Timer running flag



/***********************************************/
/* START COUNTDOWN TIMER                       */
/***********************************************/
function startTimer() {
	
	var startTime = document.getElementById("timeEntered").value;  				// Input start time
	var validStartTime = false;													// valid start time flag
	
	if (startTime != "") {
		timerStartTime = 0;
	}
	
	if (!timerRunning) {
		
		if (timerStartTime == 0) {
			// Validate the timer start time
			validStartTime = validateStartTime(startTime);
		}
		
		else {
			validStartTime = true;
		}
		
		// If the start time is valid...
		if (validStartTime) {
			timerRunning = true;	// Start the timer
			timeDecrement();		// Run the timeDecrement function
		} 
	}
		
	// Else stop the timer from running
	else {
		timerStartTime = timerTime;
		timerRunning = false;
	}
}



/***********************************************/
/* VALIDATE START TIME                         */
/***********************************************/
function validateStartTime(startTime) {
	
	var regex = /^([0][0-9]:[0-5][0-9]:\d{2})|([1][0]:[0][0]:[0][0])$/;				// RegEx time validation
	
	// If the start time is valid...
	if (regex.test(startTime)) {
		
		// Reset the time alert error
		document.getElementById("timeAlert").innerHTML = "<p>&nbsp;</p>";
		
		// Set the timer time
		timerTime = setTimerTime(startTime);
		
		// Clear user input field
		document.getElementById("timeEntered").value = "";
		
		return true;
	}
	
	// Else if the start time is invalid...
	else {
		document.getElementById("timeAlert").innerHTML = "<p>Invalid time entered. Please make sure it's in the format mm:ss:hh and not more than 10 minutes.</p>";
		return false;
	}
}



/***********************************************/
/* SET TIMER TIME IN HUNDREDTHS OF SECONDS     */
/***********************************************/
function setTimerTime(startTime) {
	var timeParts = startTime.split(":");				// Split time in to parts
	var minutes = parseInt(timeParts[0]) * 60 * 100;	// Minutes in hundredths of seconds
	var seconds = parseInt(timeParts[1]) * 100;			// Seconds in hundredths of seconds
	var hundredths = parseInt(timeParts[2]);			// Hundredths of seconds
	
	return minutes + seconds + hundredths;
}



/***********************************************/
/* DECREMENT TIMER TIME                        */
/***********************************************/
function timeDecrement() {
	
	// If the timer is running...
	// Decrement the timer in hundredths of seconds, display the timer time, and run recursively
	if (timerRunning) {
		// Set timer time interval to a hundredth of a second
		setTimeout(function () {
			if (timerTime == 0) {
				document.getElementById("timeAlert").innerHTML = "<p>Time is up!</p>";
				timerStartTime = 0;
				timerRunning = false;
				return;
			}
			
			else {
				timerTime--;									// Increment watch time
				timeOutput(timerTime, "countdownTimerOutput");	// Display current timer time
				timeDecrement();								// Run recursively
			}
		},10);
	}
}



/***********************************************/
/* DISPLAY TIME OUTPUT                         */
/***********************************************/
function timeOutput(timeInput, display) {
	
	// Set innerHTML of specified display
	document.getElementById(display).innerHTML = [
		Math.floor(timeInput/100/60 % 60),			// Calculate minutes
		Math.floor(timeInput/100 % 60),				// Calculate seconds
		timeInput % 100								// Calculate hundredths of seconds
	].map(formatNumber).join(':');					// Format the time display
}



/***********************************************/
/* FORMAT TIME OUTPUT WITH LEADING ZEROS       */
/***********************************************/
function formatNumber(n){
	
	// If the time section is less than 10, add a leading zero
	return (n < 10 ? "0" : "") + n;
}



