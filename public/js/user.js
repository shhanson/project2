$(document).ready(() => {
  console.log('ready!');


  // code for each task_id btn
  $('.completeBtn').click((event) => {
    console.log(event.currentTarget);

    // PUT request to update completed_count in DB

    // Need to update table display separately???
  });

  // code for each reward_id btn
  $('.redeemBtn').click((event) => {

    // DELETE request to remove redeemed reward_id


  });
});
