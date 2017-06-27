$(document).ready(() => {
  $('#addTaskForm').submit((event) => {
    event.preventDefault();
    const newTask = {
      description: $('#description').val(),
      priority: $('input[name=priority]:checked', '#addTaskForm').val(),
      completed_count: 0,
    };

    $.post('/tasks', newTask).done((sessionID) => {
      window.location.replace(`/users/${sessionID}`);
    }).error(() => {
      console.error('POST task error!');
    });
  });
});
