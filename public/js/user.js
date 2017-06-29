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
      url: 'http://galvanize-cors-proxy.herokuapp.com/http://api.forismatic.com/api/1.0/',
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
      success: () => {
        Materialize.toast(toastMessages[Math.floor(Math.random() * toastMessages.length)], 2000, 'rounded green');

        const totalTaskCount = Number.parseInt($('#totalTaskCount').text()) + 1;
        $('#totalTaskCount').text(totalTaskCount);
        $('.rprogress').text(totalTaskCount);
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
