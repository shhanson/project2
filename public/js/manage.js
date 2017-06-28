$(document).ready(() => {
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
