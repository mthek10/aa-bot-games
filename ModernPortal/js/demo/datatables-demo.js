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

  // create api table
  userHTMLTable.map(
      function (elem) {
        userTableSubmission.push(
            {
              "id":elem[0],
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

  let postBody = {
      "submission_id":getSubmissionIdURL(),
      "cases":userTableSubmission
  }

  console.log(postBody);

  // Send to API
  axios.post('https://pixiebrix-demo-api.herokuapp.com/submissions/'+getSubmissionIdURL()+'/validate/',postBody, {
      headers: {'Content-Type': 'application/json'}
  }).then(
      response => console.log(response)
  ).catch(
      error => console.log(error)
  );

}