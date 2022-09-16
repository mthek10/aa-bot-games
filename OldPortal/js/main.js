var _globalData;

function genRandomFinancialAdvisor(){
  let firstName =  ["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter","Emily","Hannah","Madison","Ashley","Sarah","Alexis","Samantha","Jessica","Elizabeth","Taylor","Lauren","Alyssa","Kayla","Abigail","Brianna","Olivia","Emma"];
  let lastName =  ["Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler" ];

  return firstName[genRand(0,firstName.length,0)] + " " + lastName[genRand(0,lastName.length,0)];
}
function genRand(min, max, decimalPlaces) {
  var rand = Math.random()*(max-min) + min;
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand*power) / power;
}

function genRandomTransactionType(){
  let rand = genRand(0,2,0);
  switch (rand) {
    case 0:
      return "Credit";
    case 1:
      return "Debit";
  }
}

function genRandomAccountType(){
  let rand = genRand(0,3,0);
  switch (rand) {
    case 0:
      return "Checking";
    case 1:
      return "Savings";
    case 2:
      return "Loan"
  }
}

function genRandomDate() {
  let randomDate = new Date(new Date() - Math.random()*(1e+12));
  return randomDate.getFullYear()+"-"+("0" + (randomDate.getMonth() + 1)).slice(-2)+"-"+("0" + randomDate.getDate()).slice(-2);
}

function generateAccounts() {
  // // GENERATE ACCOUNT DATA
  // let clientData = [];
  // for (let i = 0; i < 10; i++) {
  //   clientData.push({
  //     id: Math.floor(Math.random() * 100000),
  //     SSN:Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+"-"+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+"-"+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString(),
  //     transactionDate:genRandomDate(),
  //     transactionType: genRandomTransactionType(),
  //     accountType:genRandomAccountType(),
  //     transactionAmount:"$"+genRand(1000,1000000,2),
  //     financialAdvisor:genRandomFinancialAdvisor()
  //   });
  // }
  //

  axios.post('https://pixiebrix-demo-api.herokuapp.com/submissions/').then(
      response => {
        let clientData = response.data.cases;
        _globalData = response.data.cases;
        // DISPLAY ACCOUNT DATA
        clientData.forEach(
          function(curClientData, index){
            document.getElementById("caseId"+index).innerText = curClientData.id.toString();
            document.getElementById("SSN"+index).innerText = curClientData.customer_ssn.toString();

            // setting value to show and innertext for reader
            document.getElementById("transDate"+index).value = curClientData.transaction_date;
            document.getElementById("transDate"+index).innerText = curClientData.transaction_date;

            // document.getElementById("transType"+index).value = curClientData.transactionType;
            // document.getElementById("transType"+index).innerText = curClientData.transactionType;

            document.getElementById("transTypeText"+index).value = curClientData.transaction_type;
            document.getElementById("transTypeText"+index).innerText = curClientData.transaction_type;

            // document.getElementById("accountType"+index).value = curClientData.accountType;
            // document.getElementById("accountType"+index).innerText = curClientData.accountType;

            document.getElementById("accountTypeText"+index).value = curClientData.account_type;
            document.getElementById("accountTypeText"+index).innerText = curClientData.account_type;

            // set button id for easy viewing
            document.getElementById("viewModal"+index).id = "viewModal-" + curClientData.id.toString();

          });

          document.getElementById('submissionId').innerText = response.data.id;

      }
  ).catch(error => {console.log(error)});



  return null;

}

function removeData(){
  // remove 3 financial advisors
  let randomIdx1 = genRand(0,10,0);
  let randomIdx2 = genRand(0,10,0);
  let randomIdx3 = genRand(0,10,0);
  _globalData[randomIdx1].financialAdvisor="";
  _globalData[randomIdx2].financialAdvisor="";
  _globalData[randomIdx3].financialAdvisor="";
  _globalData[randomIdx3].financialAdvisor="";

}

function lookupIndexByID(id) {
  for (i=0;i<_globalData.length;i++){
    if (_globalData[i].id==id) {
      return i;
    }
  }
}

/*BEGIN -  MODAL HANDLING FOR ACCOUNT DETAILS */

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementById("btnModalClose");

function fillAndShowPopupModal(buttonName) {
  let index = lookupIndexByID(Number.parseInt(buttonName.replace("viewModal-","")));
  document.getElementById("modalCaseId").innerText = _globalData[index].id;
  document.getElementById("modalSSN").innerText = _globalData[index].customer_ssn;
  document.getElementById("modalTransDate").innerText = _globalData[index].transaction_date;
  document.getElementById("modalTransType").innerText = _globalData[index].transaction_type;
  document.getElementById("modalAccountType").innerText = _globalData[index].account_type;
  document.getElementById("modalTransAmount").innerText = _globalData[index].transaction_amount;
  document.getElementById("modalFinAdvisor").innerText = _globalData[index].financial_advisor;

  modal.style.display = "block";
}

// // When the user clicks on the button, open the modal
// btn.onclick = function(index) {
//
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* END - MODAL HANDLING FOR ACCOUNT DETAILS */

/* BEGIN - LOGIN PAGE HANDLING */
var loginBtn = document.getElementById("loginBtn");
var usernameField = document.getElementById('username');
var passwordField = document.getElementById('password');
loginBtn ? loginBtn.onclick = function (){

  if (usernameField.value==="mark@pixiebrix.com" && passwordField.value === "aabotgames2022") {
    location.href="/OldPortal/index.html"
  } else {
    alert("Incorrect username and password combination. Please try again.");

  }
} : '';
/* END - LOGIN PAGE HANDLING */

/* BEGIN - View button handling */

var viewMoreButtons = document.querySelectorAll("button[id*='viewModal']");
// for (var elem in viewMoreButtons) {
//   elem.onclick = fillAndShowPopupModal(this.id);
// }

viewMoreButtons.forEach(function(node){node.onclick = (elem => fillAndShowPopupModal(node.id))});

/* END - View button handling */

/* BEGIN - On Load Polling */
window.addEventListener('load'      ,  async function (){
  alert('starting polling');

  const poll = async function (fn, fnCondition, ms) {
    let result = await fn();
    while (fnCondition(result)) {
      await wait(ms);
      result = await fn();
    }
    return result;
  };

  const wait = function (ms = 1000) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  };

  let fetchReport = () => axios.get('https://pixiebrix-demo-api.herokuapp.com/submissions/'+document.getElementById("submissionId").innerText);
  let validate = function (result) {
    // TODO: Replace this with a polling search for SCORE!
    return result.data.score==null;
  };
  let response = await poll(fetchReport, validate, 5000);
  alert('poll works!!! Score: ' + response.data.score);
} );
/* END - On Load Polling */