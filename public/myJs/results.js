$(document).ready(function() {
  // click on a button to hide others form and show the form of the button
  // add employee button:
  $('#add-employee-button').click(() => {
    $('#find-employee-form.in').collapse('hide');
    $('#edit-form.in').collapse('hide');

    $('#add-employee-form').collapse("toggle");
  });

//find employee button:
  $('#find-employee-button').click(() => {
    $('#add-employee-form.in').collapse('hide');
    $('#edit-form.in').collapse('hide');

    $('#find-employee-form').collapse('toggle');
  });

//delete button:
  $('.delete-form').submit(function( event ) {
    event.preventDefault();
    const url = this.action;

    $("#delete-confirm-form").attr('action', url)
    $("#confirm-delete").modal({show:true});
  });
  
 // edit button:
    $(".edit").click((event) => {
        var id = $(event.target).attr('employee');

        $('#add-employee-form.in').collapse('hide');
        $('#find-employee-form.in').collapse('hide');

        $('#edit-form').collapse('show');

        function success(employee){
          $('#edit-jobTitle').val(employee.jobTitle);
          $('#edit-departmentId').val(employee.departmentId);
          $('#edit-firstName').val(employee.firstName);
          $('#edit-lastName').val(employee.lastName);
          $('#edit-email').val(employee.email);
          $('#edit-id').val(id);
        };
        $.ajax({
            url: "/get-employee/" + id,
            success: success,
          });

    });
})



