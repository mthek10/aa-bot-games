//Get random number for time left on auction between 15 and 60 seconds
var timer_is_on = 0;
var startTime, endTime, recordedTimeDifference;
var setStart = false;
var c=0;
var score = 0;

//Starts the timer
function startCount() {
  if (setStart == false) {
      setStart = true;
      startTime = Date.now();
  }
}


function validate() {

  //End Timer
  endTime = Date.now();
  recordedTimeDifference = (Math.abs(endTime - startTime) / 1000).toFixed(3);

  //Disable submit button
  document.getElementById('submitbutton').disabled = true;

  //Validate inputs
  var points = 0;
  var totalPoints = 3;
  if(document.querySelector('#field1').value == 1){
    points++;
  } else {
    console.log("field 1 Failed...")
  }

  if(document.querySelector('#field2').value == 2){
    points++;
  }

  if(document.querySelector('#exampleCheck1').checked){
    points++;
  }

  //Tally Score
  score = (points / totalPoints * 100).toFixed(2);


  if (score == 100) {
    document.querySelector('#success-title').textContent = 'Congrats! You got them all right!';
    document.querySelector('#shareonsocial').innerHTML = '<h5 class="mx-auto mb-4" style="text-align: center;"> Take a screenshot and <a href="http://twitter.com/intent/tweet?text=I+just+completed+the+%40AutomationAnywh+Auction+Sniper+RPA+Challenge+as+a+part+of+%23BotGames+Season+2%21+Can+you+complete+the+challenge%3F+Try+it+here%3A+https%3A%2F%2Fbit.ly%2F3vOv8ce+%23RPA+%23CloudRPA+%23100DaysofCode+%23Developer+%23RPApril" target="_blank" rel="noopener noreferrer"> share your accomplishment </a> on social media!</h5>';
    document.querySelector('.material-icons').innerHTML = '&#xE876;';    
  } else {
    document.querySelector('#success-title').textContent = 'You missed at least one field! Try Again!';
    document.querySelector('.material-icons').innerHTML = 'error_outline';
  }
  //Show Results
  document.querySelector('#processing-time').textContent = recordedTimeDifference;
  document.querySelector('#accuracy').textContent = score + '%';


  //Show Modal
  $('#myModal').modal()

  // new code start
  var api_result;
  if (score == 100) {
    api_result = "success";
  } else {
    api_result = "failure";
  }

  //Submit result to API
  submitResult({
    challengeName: "Example Challenge",
    result: api_result,
    accuracy: parseFloat(score),
    timeTaken: parseFloat(recordedTimeDifference)
  }).then(function ({ data }) {
    // success callback
    document.querySelector('#GUID').innerHTML = '<span class="material-icons text-info" title="Submission Verified">verified</span>' + " " + data.data.guid;
  }).catch(function (err) {
    // log error callback
    console.log(err.response);
  });
  // new code end
}






