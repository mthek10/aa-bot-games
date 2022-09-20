// OLD PORTAL BUTTON
document.getElementById('oldPortalLogin').onclick = function (){
    window.location.href = '../../OldPortal/login.html'
};

// NEW PORTAL BUTTON
document.getElementById('newPortalLogin').onclick = function (){
    window.location.href = '../../ModernPortal/login.html'
};

// FORM HANDLER
const form = document.getElementById('formSubmission')
form.addEventListener('submit', event => {
    event.preventDefault();
    axios.get('https://pixiebrix-demo-api.herokuapp.com/submissions/'+document.getElementById("inputSubmissionId").value).then(
        function(response) {
            alert(response.data.score);
        }
    ).catch(error => console.log(error));
})

// SET VALIDATE FORM FIELD w/ LOCAL STORAGE
document.getElementById('inputSubmissionId').value = localStorage.getItem('submissionId')