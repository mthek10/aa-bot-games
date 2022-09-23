var loginBtn = document.getElementById("loginBtn");
var usernameField = document.getElementById('username');
var passwordField = document.getElementById('password');
loginBtn ? loginBtn.onclick = function (){

    if (usernameField.value==="douglass@arcadia-fin.com" && passwordField.value === "aabotgames2022") {
        location.href="/OldPortal/index.html"
    } else {
        alert("Incorrect username and password combination. Please try again.");

    }
} : '';