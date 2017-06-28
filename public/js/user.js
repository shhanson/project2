$(document).ready(() => {
  console.log('ready!');

  const toastMessages = ['Great job!', 'Keep it up!', 'Wow!!', 'Awesome!'];

  // code for each task_id btn
  $('.completeBtn').on('click', (event) => {
    const clickedTaskID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    $.ajax({
      type: 'PUT',
      url: `/tasks/increment/${clickedTaskID}`,
      data: {
        completed_count: 1,
      },
      success: () => {
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
    $('#tasksTable').toggle();
    $('#rewardsTable').toggle();
    $('#showRewards').toggle();
    $('#showTasks').toggle();
  });

  $('#showTasks').click(() => {
    $('#rewardsTable').toggle();
    $('#tasksTable').toggle();
    $('#showTasks').toggle();
    $('#showRewards').toggle();
  });
});
