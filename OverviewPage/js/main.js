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
            alert(response.data.score);
        }
    ).catch(error => console.log(error));
})

// SET VALIDATE FORM FIELD w/ LOCAL STORAGE
document.getElementById('inputSubmissionId').value = localStorage.getItem('submissionId')