$(document).ready(() => {
  console.log('ready!');


  // code for each task_id btn
  $('.completeBtn').on('click', (event) => {
    const clickedTaskID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    $.ajax({
      type: 'PUT',
      url: `/tasks/${clickedTaskID}`,
      data: {
        completed_count: 1,
      },
      success: () => {
        location.reload();
      },
    }).error(() => {
      console.error('PUT task error!');
    });
  });

  // code for each reward_id btn
  $('.redeemBtn').click((event) => {


  });
});
