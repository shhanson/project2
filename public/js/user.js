$(document).ready(() => {
  console.log('ready!');

  const toastMessages = ['Great job!', 'Keep it up!', 'Wow!!', 'Awesome!'];

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
        // location.reload();
        Materialize.toast(toastMessages[Math.floor(Math.random() * toastMessages.length)], 2000, 'rounded green');
        setTimeout(location.reload.bind(location), 2000);
      },
    }).error(() => {
      console.error('PUT task error!');
    });
  });

  // code for each reward_id btn
  $('.redeemBtn').click((event) => {


  });

  $('#showRewards').click(() => {
    // $('#tasksTable').addClass('hide');
    // $('#rewardsTable').removeClass('hide');
    // $('#showRewards').addClass('hide');
    // $('#showTasks').removeClass('hide');
    $('#tasksTable').toggle();
    $('#rewardsTable').toggle();
    $('#showRewards').toggle();
    $('#showTasks').toggle();
  });

  $('#showTasks').click(() => {
    // $('#rewardsTable').addClass('hide');
    // $('#tasksTable').removeClass('hide');
    // $('#showTasks').addClass('hide');
    // $('#showRewards').removeClass('hide');

    $('#rewardsTable').toggle();
    $('#tasksTable').toggle();
    $('#showTasks').toggle();
    $('#showRewards').toggle();
  });
});
