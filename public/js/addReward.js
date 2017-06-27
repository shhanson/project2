$(document).ready(() => {
  $('#addRewardForm').submit((event) => {
    event.preventDefault();

    const newReward = {
      description: $('#description').val(),
      value: $('#rewardVal').val(),
    };

    $.post('/rewards', newReward).done((sessionID) => {
      window.location.replace(`/users/${sessionID}`);
    }).error(() => {
      console.error('POST reward error!');
    });
  });
});
