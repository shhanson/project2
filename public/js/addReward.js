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
      Materialize.toast('Something went wrong! Try reloading the page:(', 4000, 'rounded red');
      console.error('POST reward error!');
    });
  });
});
