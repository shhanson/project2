const HABIT_COUNT = 100;

function setCookie() {
  const d = new Date();
  d.setHours(24);
  document.cookie = `dismissedQuote=true;expires=${d.toGMTString()}`;
}

$(document).ready(() => {
  const toastMessages = ['Great job!', 'Keep it up!', 'Wow!!', 'Awesome!'];

  if (!document.cookie) {
    $.ajax({
      type: 'GET',
      url: 'https://galvanize-cors-proxy.herokuapp.com/https://api.forismatic.com/api/1.0/',
      data: {
        method: 'getQuote',
        lang: 'en',
        format: 'text',
      },
      success: (response) => {
        $('#quotePlaceholder').text(response);
        $('#dismissQuote').show();
      },
    }).error(() => {
      console.error('Quote error!');
    });
  }

  $('#dismissQuote').click(() => {
    setCookie();
    $('#quotePlaceholder').hide();
    $('#dismissQuote').hide();
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
      success: (completedCount) => {
        const totalTaskCount = Number.parseInt($('#totalTaskCount').text()) + 1;
        if (completedCount === HABIT_COUNT) {
          Materialize.toast('CONGRATULATIONS! You formed a habit!!', 6000, 'rounded yellow darken-1');
          $(`#taskRow_${clickedTaskID}`).hide();
          $('#totalTaskCount').text(totalTaskCount - completedCount);
          $('.rprogress').text(totalTaskCount - completedCount);
        } else {
          Materialize.toast(toastMessages[Math.floor(Math.random() * toastMessages.length)], 2000, 'rounded green');
          $('#totalTaskCount').text(totalTaskCount);
        }
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
        // setTimeout(location.reload.bind(location), 2000);
        $(`#rewardRow_${clickedRewardID}`).hide();
      },
    }).error(() => {
      console.error('PUT reward error!');
    });
  });

  // $('#showRewards').click(() => {
  //   $('#tasksTable').toggle();
  //   $('#rewardsTable').toggle();
  //   $('#showRewards').toggle();
  //   $('#showTasks').toggle();
  // });
  //
  // $('#showTasks').click(() => {
  //   $('#rewardsTable').toggle();
  //   $('#tasksTable').toggle();
  //   $('#showTasks').toggle();
  //   $('#showRewards').toggle();
  // });
});
