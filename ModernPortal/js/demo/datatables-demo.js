$(document).ready(function () {
  var t = $('#dataTable').DataTable();

  $('#btn-modalCreate').on('click', function () {
    t.row.add([document.getElementById("input-caseId").value, document.getElementById("input-SSN").value,document.getElementById("input-date").value,document.getElementById("input-transactionType").value,document.getElementById("input-accountType").value,document.getElementById("input-transactionAmount").value,document.getElementById("input-financialAdvisor").value]).draw(false);
    $("#newRecordModal").modal('hide');
  });
});

function loginValidation() {
  if (document.getElementById("loginInputEmail").value === ('mark@pixiebrix.com') && document.getElementById('loginInputPassword').value === ('aabotgames2022')) {
    window.location = "index.html"
  } else {
    alert("Incorrect username and/or password.");
  }
}