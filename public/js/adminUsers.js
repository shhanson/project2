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
        console.error('DELETE user error!');
      });
    }
  });
});
