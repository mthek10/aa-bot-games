var _globalData;

function runLoginScript() {
  alert("LOGGING IN");
  document.getElementById("transDate2").value = "2001-09-01"
}

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
      return "credit";
    case 1:
      return "debit";
  }
}

function genRandomAccountType(){
  let rand = genRand(0,3,0);
  switch (rand) {
    case 0:
      return "checking";
    case 1:
      return "savings";
    case 2:
      return "loan"
  }
}

function genRandomDate() {
  let randomDate = new Date(new Date() - Math.random()*(1e+12));
  return randomDate.getFullYear()+"-"+("0" + (randomDate.getMonth() + 1)).slice(-2)+"-"+("0" + randomDate.getDate()).slice(-2);
}

function generateAccounts() {
  // GENERATE ACCOUNT DATA
  let clientData = [];
  for (let i = 0; i < 10; i++) {
    clientData.push({
      id: Math.floor(Math.random() * 100000),
      SSN:Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+"-"+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+"-"+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString()+Math.floor(Math.random() * 10).toString(),
      transactionDate:genRandomDate(),
      transactionType: genRandomTransactionType(),
      accountType:genRandomAccountType(),
      transactionAmount:"$"+genRand(1000,1000000,2),
      financialAdvisor:genRandomFinancialAdvisor()
    });
  }

  // DISPLAY ACCOUNT DATA
  clientData.forEach(
    function(curClientData, index){
      document.getElementById("caseId"+index).innerText = curClientData.id.toString();
      document.getElementById("SSN"+index).innerText = curClientData.SSN.toString();
      // setting value to show and innertext for reader
      document.getElementById("transDate"+index).value = curClientData.transactionDate;
      document.getElementById("transDate"+index).innerText = curClientData.transactionDate;

      document.getElementById("transType"+index).value = curClientData.transactionType;
      document.getElementById("accountType"+index).value = curClientData.accountType;
      // set button id for easy viewing
      document.getElementById("viewModal"+index).id = "viewModal-" + curClientData.id.toString();
      console.log(index)
    });
  _globalData = clientData;
  return clientData;

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
  console.log(index + "-" + buttonName);
  document.getElementById("modalCaseId").innerText = _globalData[index].id;
  document.getElementById("modalTransactionAmount").innerText = _globalData[index].transactionAmount;
  document.getElementById("modalFinancialAdvisor").innerText = _globalData[index].financialAdvisor;
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
