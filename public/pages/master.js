$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('.change-password').on('click', function () {
        $("#modal-change-password").modal("show");
    });

    $('#submit-change-password').on('click', function () {
        let userid = $('#userid').val();
        let newpass = $('#password').val();

        $.ajax({
            url: 'change_password',
            method: 'POST',
            data: { userid: userid, newpass: newpass },
            dataType: 'json',
            success: function (feedback) {
                if (feedback.status) {
                    Swal.fire({
                        icon: 'success',
                        title: feedback.message,
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        $('#password').val("");
                        $("#modal-change-password").modal("hide");
                    });
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: feedback.message,
                        showDenyButton: false,
                        showCancelButton: false,
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        $('#password').val("");
                        // window.location='/userpage'
                    });
                }
            }
        })
    })

    $("#modal-change-password").on('hide.bs.modal', function () {
        $('#password').val("")
    });

});