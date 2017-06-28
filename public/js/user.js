$(document).ready(() => {
  const toastMessages = ['Great job!', 'Keep it up!', 'Wow!!', 'Awesome!'];


  $.ajax({
    type: 'GET',
    url: 'http://galvanize-cors-proxy.herokuapp.com/http://api.forismatic.com/api/1.0/',
    data: {
      method: 'getQuote',
      lang: 'en',
      format: 'text',
    },
    success: (response) => {
      $('#quotePlaceholder').text(response);
    },
  }).error(() => {
    console.error('Quote error!');
  });


  $('#dismissQuote').click(() => {
    $('#quotePlaceholder').toggle();
    $('#dismissQuote').toggle();
  });

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
    const clickedRewardID = $(event.currentTarget).attr('id').match(/\d+/)[0];
    $.ajax({
      type: 'PUT',
      url: `/rewards/redeem/${clickedRewardID}`,
      data: {
        redeemed: true,
      },
      success: () => {
        Materialize.toast('Hooray!!', 2000, 'rounded green');
        setTimeout(location.reload.bind(location), 2000);
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
