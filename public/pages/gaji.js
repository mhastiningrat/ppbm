var mech_row;
var biECS;
var stCSJobID;
var id;
var dtcs;
var dtrpt;
var imagePath1;
var karyawan;
var clientname;
var client;
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    // $(function () {
    //     $.validator.setDefaults({
    //         submitHandler: function () {
    //             //alert("Form successful submitted!");
    //         }
    //     });
    //     $('#filterkaryawan').validate({
    //         rules: {
    //             reservationdate: {
    //                 required: true,
    //                 //email: true,
    //             },
    //             client: {
    //                 required: true,
    //                 //minlength: 5
    //             },
    //             karyawan: {
    //                 required: true
    //             },
    //         },
    //         messages: {
    //             reservationdate: {
    //                 required: "Tanggal harus diisi",
    //                 //email: "Please enter a vaild email address"
    //             },
    //             client: {
    //                 required: "Nama client harus diisi",
    //                 //minlength: "Your password must be at least 5 characters long"
    //             },
    //             karyawan: {
    //                 required: "Nama karyawan harus diisi",
    //                 //minlength: "Your password must be at least 5 characters long"
    //             },
    //             terms: "Please accept our terms"
    //         },
    //         errorElement: 'span',
    //         errorPlacement: function (error, element) {
    //             error.addClass('invalid-feedback');
    //             element.closest('.form-group').append(error);
    //             element.closest('.input-group').append(error);
    //         },
    //         highlight: function (element, errorClass, validClass) {
    //             $(element).addClass('is-invalid');
    //         },
    //         unhighlight: function (element, errorClass, validClass) {
    //             $(element).removeClass('is-invalid');
    //         }
    //     });
    // }
    //SetTableAktifitas(data_aktifitas);

    $("#reservationdate").datetimepicker({
        format: 'MMMM-YYYY',
        defaultDate: moment().format()
    });


    console.log("New date", $("#reservationdate").datetimepicker('viewDate'))
    var vdate = $("#reservationdate").datetimepicker('viewDate');
    dtcs = formatDate(vdate);
    dtrpt = defDate(vdate);
    console.log("dtcs", dtcs);
    console.log("biEid", $('#karyawan').val());
    // $('#reservationdate').datetimepicker("setDate", "0");
    // console.log($("#reservationdate").val())

    $("#reservationdate").on("change.datetimepicker", ({ date, oldDate }) => {

        console.log("New date", date)
        console.log("dtcs", formatDate(date))
        dtcs = formatDate(date);
        dtrpt = defDate(date);

    })

    function formatDate(date) {
        var d = new Date(date),

            day = '' + d.getDate(),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month].join('');
    }

    function defDate(date) {
        var d = new Date(date),

            day = '' + d.getDate(),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    }


    $('#report').on('click', function () {
        var param_emp = $('#karyawan').val();

        if (dtcs == "" || dtcs == null || dtcs == undefined || dtcs == "NaNNaNNaN") {
            $('#errordate').css('display', 'block')
            //validate = false
        } else {
            $('#errordate').css('display', 'none')
            validate = true
        }




        // console.log(validate)

        // console.log(dtcs);
        if (validate) {
            let a = document.createElement('a');
            a.target = '_blank';
            a.href = "generate-pdf/slipgaji/" + dtcs + "/" + param_emp;
            a.click();

            //window.location.href = "generate-pdf/" + dtcs + "/" + clientname + "/" + spv + "/" + mgr, '_blank';
        }

    })



});