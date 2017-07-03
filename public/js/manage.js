$(document).ready(() => {
  $('.taskDescription').on('input', (event) => {
    const clickedDescriptionID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    $(`#tupdate_${clickedDescriptionID}`).attr('disabled', false);
  });

  $('.taskPriority').on('change', (event) => {
    const clickedPriorityID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    $(`#tupdate_${clickedPriorityID}`).attr('disabled', false);
  });

  $('.resetTaskBtn').click((event) => {
    const confirmReset = confirm('Are you sure you want to reset this task?');
    if (confirmReset) {
      const clickedTaskID = $(event.currentTarget).attr('id').match(/\d+/)[0];
      $.ajax({
        type: 'PUT',
        url: `/tasks/reset/${clickedTaskID}`,
        success: () => {
          $(`#count_${clickedTaskID}`).text('0');
          Materialize.toast('Saved!', 2000, 'rounded lime accent-1 black-text');
          $(`#treset_${clickedTaskID}`).attr('disabled', true);
        },
      }).error(() => {
        Materialize.toast('Something went wrong! :(', 4000, 'rounded red');
        console.error('PUT task error!');
      });
    }
  });

  $('.updateTaskBtn').click((event) => {
    const clickedTaskID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    console.log($(`#tpriority_${clickedTaskID}`).val());
    const updatedTask = {
      description: $(`#tdescrip_${clickedTaskID}`).val(),
      priority: Number.parseInt($(`#tpriority_${clickedTaskID}`).val()),
    };

    $.ajax({
      type: 'PUT',
      url: `/tasks/edit/${clickedTaskID}`,
      data: updatedTask,
      success: () => {
        Materialize.toast('Saved!', 2000, 'rounded lime accent-1 black-text');
        $(`#tupdate_${clickedTaskID}`).attr('disabled', true);
      },
    }).error(() => {
      Materialize.toast('Something went wrong! :(', 4000, 'rounded red');
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
          Materialize.toast('Deleted!', 2000, 'lime accent-1 black-text');
          $(`#taskRow_${deleteBtnID}`).hide();
        },
      }).error(() => {
        Materialize.toast('Something went wrong! :(', 4000, 'rounded red');
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
        Materialize.toast('Saved!', 2000, 'rounded lime accent-1 black-text');
        $(`#rupdate_${clickedRewardID}`).attr('disabled', true);
      },
    }).error(() => {
      Materialize.toast('Something went wrong! :(', 4000, 'rounded red');
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
          Materialize.toast('Deleted!', 2000, 'rounded lime accent-1 black-text');
          $(`#rewardRow_${deleteBtnID}`).hide();
        },
      }).error(() => {
        Materialize.toast('Something went wrong! :(', 4000, 'rounded red');
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
