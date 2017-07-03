$(document).ready(() => {
  $('.deleteUserBtn').click((event) => {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const clickedBtnID = $(event.currentTarget).attr('id').match(/\d+/)[0];
      $.ajax({
        type: 'DELETE',
        url: `/users/${clickedBtnID}`,
        success: () => {
          location.reload();
        },
      }).error(() => {
        Materialize.toast('Something went wrong! :(', 4000, 'rounded red');
        console.error('DELETE user error!');
      });
    }
  });
});
