$(document).ready(function () {
  var t = $('#dataTable').DataTable();

  $('#btn-modalCreate').on('click', function () {
    t.row.add([document.getElementById("input-caseId").value, document.getElementById("input-SSN").value,document.getElementById("input-date").value,document.getElementById("input-transactionType").value,document.getElementById("input-accountType").value,document.getElementById("input-transactionAmount").value,document.getElementById("input-financialAdvisor").value]).draw(false);
    $("#newRecordModal").modal('hide');
  });

  $('#btn-submitEntries').on('click', function () {
    alert('PUT INTO API CALL + ID:' + getSubmissionIdURL());
    submitTableDataToApi();
  });

});

function getSubmissionIdURL(){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('submissionId');
}

function loginValidation() {
  if (document.getElementById("loginInputEmail").value === ('mark@pixiebrix.com') && document.getElementById('loginInputPassword').value === ('aabotgames2022')) {
    let userInputSubmissionId = document.getElementById("loginInputSubmissionId").value
    window.location = "index.html?submissionId="+ userInputSubmissionId;
  } else {
    alert("Incorrect username and/or password.");
  }
}

function submitTableDataToApi(){
  let userTableSubmission = [];
  let userHTMLTable = $('#dataTable').DataTable().rows().data();

  userHTMLTable.map(
      function (elem) {
        userTableSubmission.push(
            {
              "caseId":elem[0],
              "SSN":elem[1],
              "transDate":elem[2],
              "transType":elem[3],
              "accountType":elem[4],
              "transactionAmount":elem[5],
              "financialAdvisor":elem[6]
            }
        )
      }
  );


  let userAPISubmission = {
    "submissionId":getSubmissionIdURL(),
    "submissions":userTableSubmission
  }

  console.log(userAPISubmission);

  // Send to API
  axios.post('https://pixiebrix-demo-api.herokuapp.com/submissions/20/validate/',{
      "submission_id":20,
      "cases": [
          {
              "id": 191,
              "customer_ssn": "287-69-1637",
              "transaction_date": "1988-04-21",
              "transaction_type": "Debit",
              "transaction_amount": "8878.23",
              "account_type": "Loan",
              "financial_advisor": "Ashley Bro"
          },
          {
              "id": 192,
              "customer_ssn": "649-95-0673",
              "transaction_date": "2010-02-25",
              "transaction_type": "Debit",
              "transaction_amount": "5843.51",
              "account_type": "Loan",
              "financial_advisor": "Nathan House"
          },
          {
              "id": 193,
              "customer_ssn": "324-08-4369",
              "transaction_date": "2016-08-06",
              "transaction_type": "Debit",
              "transaction_amount": "9089.11",
              "account_type": "Checking",
              "financial_advisor": "Donald Wright"
          },
          {
              "id": 194,
              "customer_ssn": "403-51-6763",
              "transaction_date": "1985-07-05",
              "transaction_type": "Debit",
              "transaction_amount": "8988.51",
              "account_type": "Checking",
              "financial_advisor": "Todd Sharp"
          },
          {
              "id": 195,
              "customer_ssn": "065-86-2041",
              "transaction_date": "1979-03-18",
              "transaction_type": "Credit",
              "transaction_amount": "9814.18",
              "account_type": "Loan",
              "financial_advisor": "Nicholas Farley"
          },
          {
              "id": 196,
              "customer_ssn": "076-80-0973",
              "transaction_date": "2005-04-30",
              "transaction_type": "Credit",
              "transaction_amount": "3890.61",
              "account_type": "Loan",
              "financial_advisor": "Cindy Parker"
          },
          {
              "id": 197,
              "customer_ssn": "530-33-2145",
              "transaction_date": "1989-03-09",
              "transaction_type": "Credit",
              "transaction_amount": "9886.63",
              "account_type": "Checking",
              "financial_advisor": "Nicholas Bates"
          },
          {
              "id": 198,
              "customer_ssn": "370-81-0665",
              "transaction_date": "1983-06-26",
              "transaction_type": "Credit",
              "transaction_amount": "8857.92",
              "account_type": "Checking",
              "financial_advisor": "Kelsey Burgess"
          },
          {
              "id": 199,
              "customer_ssn": "586-59-1329",
              "transaction_date": "1995-02-12",
              "transaction_type": "Debit",
              "transaction_amount": "3519.90",
              "account_type": "Checking",
              "financial_advisor": "Cindy Hickman"
          },
          {
              "id": 200,
              "customer_ssn": "258-71-6386",
              "transaction_date": "1981-06-30",
              "transaction_type": "Credit",
              "transaction_amount": "7168.46",
              "account_type": "Loan",
              "financial_advisor": "Christina Guerrero"
          }
      ]
  }).then(
      response => console.log(response)
  ).catch(
      error => console.log(error)
  );

  // TODO: instead of logging, need to send data to API
  // TODO: handle result
}