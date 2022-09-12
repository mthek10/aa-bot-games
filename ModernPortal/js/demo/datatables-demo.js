$(document).ready(function () {
  var t = $('#dataTable').DataTable();

  $('#btn-modalCreate').on('click', function () {
    t.row.add([document.getElementById("input-caseId").value, document.getElementById("input-SSN").value,document.getElementById("input-date").value,document.getElementById("input-transactionType").value,document.getElementById("input-accountType").value,document.getElementById("input-transactionAmount").value,document.getElementById("input-financialAdvisor").value]).draw(false);
    $("#newRecordModal").modal('hide');
  });

  $('#btn-submitEntries').on('click', function () {
    const urlParams = new URLSearchParams(window.location.search);
    alert('PUT INTO API CALL + ID:' + urlParams.get('submissionId'));
  });

});

function loginValidation() {
  if (document.getElementById("loginInputEmail").value === ('mark@pixiebrix.com') && document.getElementById('loginInputPassword').value === ('aabotgames2022')) {
    let userInputSubmissionId = document.getElementById("loginInputSubmissionId").value
    window.location = "index.html?submissionId="+ userInputSubmissionId;
  } else {
    alert("Incorrect username and/or password.");
  }
}