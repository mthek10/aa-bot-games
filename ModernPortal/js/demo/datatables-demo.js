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
  // let userTableSubmission = [];
  let userHTMLTable = $('#dataTable').DataTable().rows().data();

  let postBodyNew = {
        "submission_id": getSubmissionIdURL(),
        "cases": []
    };


  // // create api table
  // userHTMLTable.map(
  //     function (elem) {
  //       userTableSubmission.push(
  //           {
  //             "id":elem[0],
  //             "customer_ssn":elem[1],
  //             "transaction_date":elem[2],
  //             "transaction_type":elem[3],
  //             "account_type":elem[4],
  //             "transaction_amount":elem[5],
  //             "financial_advisor":elem[6]
  //           }
  //       )
  //     }
  // );

    // create api table
    userHTMLTable.map(
        function (elem) {
            postBodyNew.cases.push(
                {
                    "id": parseInt(elem[0]),
                    "customer_ssn":elem[1],
                    "transaction_date":elem[2],
                    "transaction_type":elem[3],
                    "account_type":elem[4],
                    "transaction_amount":elem[5],
                    "financial_advisor":elem[6]
                }
            )
        }
    );

    console.log('postBodyNew...');
    console.log(postBodyNew);

  // let postBody = {
  //     "submission_id":getSubmissionIdURL(),
  //     "cases":userTableSubmission
  // }
  //
  // console.log(postBody);

  // TEST
  //   let test_tables =  [
  //       {
  //           "id": 341,
  //           "customer_ssn": "592-72-0092",
  //           "transaction_date": "2013-08-01",
  //           "transaction_type": "Debit",
  //           "transaction_amount": "848.23",
  //           "account_type": "Loan",
  //           "financial_advisor": "Heather Baker"
  //       },
  //       {
  //           "id": 342,
  //           "customer_ssn": "787-33-2193",
  //           "transaction_date": "1987-07-12",
  //           "transaction_type": "Debit",
  //           "transaction_amount": "482.95",
  //           "account_type": "Loan",
  //           "financial_advisor": "Austin Velez"
  //       },
  //       {
  //           "id": 343,
  //           "customer_ssn": "132-87-6037",
  //           "transaction_date": "1977-07-03",
  //           "transaction_type": "Debit",
  //           "transaction_amount": "6740.46",
  //           "account_type": "Loan",
  //           "financial_advisor": "Mike Taylor"
  //       },
  //       {
  //           "id": 344,
  //           "customer_ssn": "607-70-9484",
  //           "transaction_date": "2017-08-09",
  //           "transaction_type": "Credit",
  //           "transaction_amount": "2935.35",
  //           "account_type": "Checking",
  //           "financial_advisor": "Becky Garcia"
  //       },
  //       {
  //           "id": 345,
  //           "customer_ssn": "894-99-0507",
  //           "transaction_date": "1979-01-10",
  //           "transaction_type": "Credit",
  //           "transaction_amount": "5570.42",
  //           "account_type": "Loan",
  //           "financial_advisor": "Brian Jimenez"
  //       },
  //       {
  //           "id": 346,
  //           "customer_ssn": "766-57-2585",
  //           "transaction_date": "1978-01-01",
  //           "transaction_type": "Debit",
  //           "transaction_amount": "8485.45",
  //           "account_type": "Loan",
  //           "financial_advisor": "Thomas Leonard"
  //       },
  //       {
  //           "id": 347,
  //           "customer_ssn": "328-52-1559",
  //           "transaction_date": "1981-05-29",
  //           "transaction_type": "Credit",
  //           "transaction_amount": "4358.31",
  //           "account_type": "Loan",
  //           "financial_advisor": "Mercedes Sanchez"
  //       },
  //       {
  //           "id": 348,
  //           "customer_ssn": "274-29-4536",
  //           "transaction_date": "2007-05-13",
  //           "transaction_type": "Credit",
  //           "transaction_amount": "4961.02",
  //           "account_type": "Checking",
  //           "financial_advisor": "Keith Ramirez"
  //       },
  //       {
  //           "id": 349,
  //           "customer_ssn": "648-17-5249",
  //           "transaction_date": "2006-06-04",
  //           "transaction_type": "Credit",
  //           "transaction_amount": "4686.90",
  //           "account_type": "Loan",
  //           "financial_advisor": "Brittany Green"
  //       },
  //       {
  //           "id": 350,
  //           "customer_ssn": "762-13-4533",
  //           "transaction_date": "2000-09-02",
  //           "transaction_type": "Debit",
  //           "transaction_amount": "2129.90",
  //           "account_type": "Loan",
  //           "financial_advisor": "Shannon Harvey"
  //       }
  //   ];

    // postBody = {
    //   "submission_id": getSubmissionIdURL(),
    //   "cases": test_tables
    // };
  // Send to API
  axios.post('https://pixiebrix-demo-api.herokuapp.com/submissions/'+getSubmissionIdURL()+'/validate/',JSON.stringify(postBodyNew),{
      headers: {'Content-Type': 'application/json'}
  }).then(
      response => console.log(response)
  ).catch(
      error => console.log(error)
  );

}