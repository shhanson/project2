$(document).ready(() => {
  $('.taskDescription').on('input', (event) => {
    const clickedDescriptionID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    $(`#tupdate_${clickedDescriptionID}`).attr('disabled', false);
  });

  $('.taskPriority').on('change', (event) => {
    const clickedPriorityID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    $(`#tupdate_${clickedPriorityID}`).attr('disabled', false);
  });

  $('.updateTaskBtn').click((event) => {
    const clickedTaskID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    const updatedTask = {
      description: $(`#tdescrip_${clickedTaskID}`).val(),
      priority: $(`#tpriority_${clickedTaskID}`).val(),
    };

    $.ajax({
      type: 'PUT',
      url: `/tasks/edit/${clickedTaskID}`,
      data: updatedTask,
      success: () => {
        Materialize.toast('Saved!', 2000, 'rounded green');
      },
    }).error(() => {
      console.error('PUT task error!');
    });
  });

  $('.updateRewardBtn').click((event) => {
    const clickedRewardID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    const updatedReward = {
      description: $(`rdescrip_${clickedRewardID}`).val(),
      value: $(`rvalue_${clickedRewardID}`).val(),
    };

    $.ajax({
      type: 'PUT',
      url: `/rewards/edit/${clickedRewardID}`,
      data: updatedReward,
      success: () => {

      },
    }).error(() => {
      console.error('PUT reward error!');
    });
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
