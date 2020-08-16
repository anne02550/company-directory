$(document).ready(function() {
    $(".edit").click((event) => {
        var id = $(event.target).attr('employee');

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


