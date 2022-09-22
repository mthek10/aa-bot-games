const NUMBER_CASES = 5;

// OLD PORTAL BUTTON
document.getElementById('oldPortalLogin').onclick = function (){
    window.open('../../OldPortal/login.html', '_blank');

};

// NEW PORTAL BUTTON
document.getElementById('newPortalLogin').onclick = function (){
    window.open('../../ModernPortal/login.html', '_blank');
};

// FORM HANDLER
const form = document.getElementById('formSubmission')
form.addEventListener('submit', event => {
    event.preventDefault();
    axios.get('https://pixiebrix-demo-api.herokuapp.com/submissions/'+document.getElementById("inputSubmissionId").value).then(
        function(response) {
            let score = response.data.score * (100/NUMBER_CASES);
            if (score == 100) {
                document.querySelector('#success-title').textContent = 'Congrats! You got them all right!';
                document.querySelector('#shareonsocial').innerHTML = '<h5 class="mx-auto mb-4" style="text-align: center;"> Take a screenshot and <a href="http://twitter.com/intent/tweet?text=I+just+completed+the+%40AutomationAnywh+Auction+Sniper+RPA+Challenge+as+a+part+of+%23BotGames+Season+2%21+Can+you+complete+the+challenge%3F+Try+it+here%3A+https%3A%2F%2Fbit.ly%2F3vOv8ce+%23RPA+%23CloudRPA+%23100DaysofCode+%23Developer+%23RPApril" target="_blank" rel="noopener noreferrer"> share your accomplishment </a> on social media!</h5>';
                document.querySelector('.material-icons').innerHTML = '&#xE876;';
            } else {
                document.querySelector('#success-title').textContent = 'A few of the records were incorrectly migrated. Try Again!';
                document.querySelector('.material-icons').innerHTML = 'error_outline';
            }
            //Show Results
            document.querySelector('#processing-time').textContent = '0.0';
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
                challengeName: "Swivel Chair Workflow Processing",
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
    ).catch(error => console.log(error));
})

// SET VALIDATE FORM FIELD w/ LOCAL STORAGE
// DISABLE VALIDATE BUTTON IF NO SUBMISSION ID FOUND
localStorage.getItem('submissionId') ? document.getElementById('inputSubmissionId').value = localStorage.getItem('submissionId') :document.getElementById('validateButton').setAttribute('disabled', '');

