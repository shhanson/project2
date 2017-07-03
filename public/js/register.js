$(document).ready(() => {
  $('#password').change(() => {
    if ($('#password').val().length < 8) {
      Materialize.toast('Password must be at least 8 characters long!', 4000, 'rounded red');
    }
  });

  $('#vpassword').change(() => {
    if ($('#vpassword').val() !== $('#password').val()) {
      Materialize.toast("Password fields don't match!", 4000, 'rounded red');
    }
  });
});
