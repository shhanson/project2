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
        $(`#tupdate_${clickedTaskID}`).attr('disabled', true);
      },
    }).error(() => {
      console.error('PUT task error!');
    });
  });

  $('.deleteTaskBtn').click((event) => {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      const deleteBtnID = $(event.currentTarget).attr('id').match(/\d+/)[0];
      $.ajax({
        type: 'DELETE',
        url: `/tasks/${deleteBtnID}`,
        success: () => {
          // location.reload();
          $(`#taskRow_${deleteBtnID}`).hide();
        },
      }).error(() => {
        console.error('DELETE task error!');
      });
    }
  });

  $('.rewardDescription').on('input', (event) => {
    const clickedDescriptionID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    $(`#rupdate_${clickedDescriptionID}`).attr('disabled', false);
  });

  $('.rewardValue').on('input', (event) => {
    const clickedValueID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    $(`#rupdate_${clickedValueID}`).attr('disabled', false);
  });


  $('.updateRewardBtn').click((event) => {
    const clickedRewardID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    const updatedReward = {
      description: $(`#rdescrip_${clickedRewardID}`).val(),
      value: $(`#rvalue_${clickedRewardID}`).val(),
    };
    $.ajax({
      type: 'PUT',
      url: `/rewards/edit/${clickedRewardID}`,
      data: updatedReward,
      success: () => {
        Materialize.toast('Saved!', 2000, 'rounded green');
        $(`#rupdate_${clickedRewardID}`).attr('disabled', true);
      },
    }).error(() => {
      console.error('PUT reward error!');
    });
  });

  $('.deleteRewardBtn').click((event) => {
    const confirmDelete = confirm('Are you sure you want to delete this reward?');
    if (confirmDelete) {
      const deleteBtnID = $(event.currentTarget).attr('id').match(/\d+/)[0];
      $.ajax({
        type: 'DELETE',
        url: `/rewards/${deleteBtnID}`,
        success: () => {
          $(`#rewardRow_${deleteBtnID}`).hide();
        },
      }).error(() => {
        console.error('DELETE reward error!');
      });
    }
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
