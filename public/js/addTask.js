$(document).ready(() => {
  $('#addTaskForm').submit((event) => {
    event.preventDefault();


    const newTask = {
      description: $('#description').val(),
      priority: Number.parseInt($('input[name=priority]:checked', '#addTaskForm').val()),
      completed_count: 0,
    };

    $.post('/tasks', newTask).done((sessionID) => {
      window.location.replace(`/users/${sessionID}`);
    }).error(() => {
      Materialize.toast('Something went wrong! :(', 4000, 'rounded red');
      console.error('POST task error!');
    });
  });
});
