$(document).ready(function() {
    $(".edit").click((event) => {
        var id = $(event.target).attr('employee');
        
        $('#edit-form').collapse('show');

    });
})


