const HABIT_COUNT = 100;
const CORS_PROXY = 'https://galvanize-cors-proxy.herokuapp.com/';
const toastMessages = ['Great job!', 'Keep it up!', 'Wow!!', 'Awesome!', 'Way to go!', 'Proud of you!!'];

function setCookie() {
  const d = new Date();
  d.setHours(24);
  document.cookie = `dismissedQuote=true;expires=${d.toGMTString()}`;
}

$(document).ready(() => {
  if (!document.cookie) {
    $.ajax({
      type: 'GET',
      url: `${CORS_PROXY}https://api.forismatic.com/api/1.0/`,
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
        } else {
          Materialize.toast(toastMessages[Math.floor(Math.random() * toastMessages.length)], 2000, 'rounded green');
          $('#totalTaskCount').text(totalTaskCount);
          $('.rprogress').text(totalTaskCount);
        }

        $('.rvalue').each(function () {
          const rewardValue = Number.parseInt($(this).text());
          const rewardID = $(this).attr('id');

          if (rewardValue === totalTaskCount) {
            $(`#reward_${rewardID}`).attr('disabled', false);
          }
        });
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
