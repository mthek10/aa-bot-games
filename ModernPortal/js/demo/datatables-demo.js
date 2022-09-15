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
  axios.post('')

  // TODO: instead of logging, need to send data to API
  // TODO: handle result
}