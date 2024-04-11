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
    // });



    var data_aktifitas = [];
    function SetTableAktifitas(data_aktifitas) {

        if ($.fn.dataTable.isDataTable('#example')) {
            $('#example').DataTable().destroy();
        }
        $('#example').DataTable({
            "lengthChange": false,
            "responsive": true,
            "paging": false,
            scrollX: true,
            scrollY: ($(window).height() - 440),
            "aaData": data_aktifitas,
            "columns": [
                { targets: 0, data: "stLokasi", title: "Lokasi" },
                { targets: 1, data: "stArea", title: "Area" },
                { targets: 2, data: "stCSJobID", title: "stCSJobID", visible: false },
                {
                    targets: 3, data: "stFileName1", title: "Before",
                    render: function (data) {
                        if (data == null) {
                            return ""
                        } else {
                            return "Yes"
                        }
                    }
                },
                {
                    targets: 4, data: "stFileName2", title: "Process",
                    render: function (data) {
                        if (data == null) {
                            return ""
                        } else {
                            return "Yes"
                        }
                    }

                },
                {
                    targets: 5, data: "stFileName3", title: "After",
                    render: function (data) {
                        if (data == null) {
                            return ""
                        } else {
                            return "Yes"
                        }
                    }

                },
                {
                    data: "biECS", title: "Action",
                    render: function (data, type, full, meta) {
                        return '<button class="btn btn-clear btn-icon-h float-right" id="edit-image"><i class="fa fa-edit btn-outline-primary" ></i></button>'
                    }
                },
            ]
        })
    };
    //SetTableAktifitas(data_aktifitas);

    $("#reservationdate").datetimepicker({
        format: 'L',
        defaultDate: moment().format()
    });


    console.log("New date", $("#reservationdate").datetimepicker('viewDate'))
    var vdate = $("#reservationdate").datetimepicker('viewDate');
    dtcs = formatDate(vdate);
    dtrpt = defDate(vdate);
    console.log("dtcs", dtcs);
    // $('#reservationdate').datetimepicker("setDate", "0");
    // console.log($("#reservationdate").val())

    $("#reservationdate").on("change.datetimepicker", ({ date, oldDate }) => {
        $('#client').empty().trigger('change');
        console.log("New date", date)
        console.log("dtcs", formatDate(date))
        dtcs = formatDate(date);
        dtrpt = defDate(date);

        $.ajax({
            url: 'getDataClient',
            method: 'GET',
            async: false,
            success: function (data) {
                console.log(data)
                var dataclient = [];
                for (var h = 0; h < data.length; h++) {
                    dataclient.push({
                        id: data[h].stCid,
                        text: data[h].stCName
                    })
                }

                $('#client').select2({
                    placeholder: "Pilih Client",
                    data: dataclient,
                    allowClear: true,


                })

            },
            error: function (jqXHR, status, error) {
                $("#client").select2({
                    allowClear: true,
                    placeholder: "Pilih Client",

                })
            }
        })

    })

    function formatDate(date) {
        var d = new Date(date),

            day = '' + d.getDate(),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('');
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



    $('#client').select2({
        allowClear: true,
        placeholder: "Pilih Client"
    });

    $('#karyawan').select2({
        allowClear: true,
        placeholder: "Pilih Karyawan"
    });

    $.ajax({
        url: 'getDataClient',
        method: 'GET',
        async: false,
        success: function (data) {
            console.log(data)
            var dataclient = [];
            for (var h = 0; h < data.length; h++) {
                dataclient.push({
                    id: data[h].stCid,
                    text: data[h].stCName
                })
            }

            $('#client').select2({
                data: dataclient,
                allowClear: true,
                placeholder: "Pilih Client",

            })


        },
        error: function (jqXHR, status, error) {
            $("#client").select2({
                allowClear: true,
                placeholder: "Pilih Client",

            })
        }
    })

    $("#client").attr(
        "data-placeholder", "Pilih Client"
    );

    var clientname = "";
    $('#client').select2().on('change', function () {
        clientname = $('#client').val();
        console.log(clientname)
        $('#karyawan').empty().trigger('change');
        $.ajax({
            url: 'getDataKaryawanByClient',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: { client: clientname },
            dataType: 'json',
            success: function (data) {
                console.log(data)
                var datakaryawan = [];
                for (var h = 0; h < data.length; h++) {
                    datakaryawan.push({
                        id: data[h].biEid,
                        text: data[h].stEName
                    })
                }

                $('#karyawan').select2({
                    data: datakaryawan,
                    allowClear: true,
                    placeholder: "Pilih Karyawan",

                })
            },
            error: function (jqXHR, status, error) {
                $('#karyawan').select2({
                    placeholder: "Pilih Karyawan"
                })
            }
        })

    })
    var biecs;
    var stcsjobid;

    $('#view').on("click", function () {
        clientname = $('#client').val();
        karyawan = $('#karyawan').val();
        var validate = false;
        var valiclient = false;
        var valikaryawan = false;

        if (dtcs == "" || dtcs == null || dtcs == undefined || dtcs == "NaNNaNNaN") {
            $('#errordate').css('display', 'block')
            //validate = false
        } else {
            $('#errordate').css('display', 'none')
            validate = true
        }


        if (clientname == "" || clientname == null) {
            $('#errorclient').css('display', 'block')
            //return false;
        } else {
            $('#errorclient').css('display', 'none')
            valiclient = true
        }


        if (karyawan == "" || karyawan == null) {
            $('#errorkaryawan').css('display', 'block')
            //return false;
        } else {
            $('#errorkaryawan').css('display', 'none')
            valikaryawan = true
        }


        console.log(validate, valiclient, valikaryawan)

        console.log(clientname);
        console.log(karyawan);
        console.log(dtcs);
        if (validate && valiclient && valikaryawan) {
            $.ajax({
                url: "get_aktifitas_karyawan",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                method: "POST",
                data: {
                    datecs: dtcs,
                    cid: clientname,
                    eid: karyawan
                },


            }).done(function (data) {
                console.log("data CS : ", data)
                SetTableAktifitas(data)

            })
        }

    })

    $('#example').on('click', 'tbody tr td .dtr-details #edit-image', function () {
        //tableSKU;
        let row_data = $('#example').DataTable().row($(this).parents('span')).data();
        mech_row = $('#example').DataTable().row($(this).parents('tr')).index();
        stCSJobID = row_data.stCSJobID;
        biECS = row_data.biECS
        console.log('m-row', stCSJobID, biECS, mech_row)
        // $('#mechanism_notes').val(row_data.stCSJobID);
        $("#modal-image").modal("show");

    })

    $('#example').on('click', 'tbody #edit-image', function () {
        //tableSKU;

        let row_data = $('#example').DataTable().row($(this).parents('tr')).data();
        mech_row = $('#example').DataTable().row($(this).parents('tr')).index();
        stCSJobID = row_data.stCSJobID;
        biECS = row_data.biECS
        console.log('m-row', stCSJobID, biECS, mech_row)
        // $('#mechanism_notes').val(row_data.stCSJobID);
        $("#modal-image").modal("show");

    })

    $('#file1, #file2, #file3').on('change', function () {
        console.log('file', $(this).attr('id'))
        id = $(this).attr('id');
        //let formData = new FormData($('#upload-image-form')[0]);
        // let File1 = $("#file1")[0];
        console.log("file 1 :", document.getElementById(id).files[0])
        var form_data = new FormData();
        form_data.append('dtcs', dtcs);
        form_data.append('file', document.getElementById(id).files[0]);
        form_data.append('biecs', biECS);
        form_data.append('bieid', karyawan);
        form_data.append('stcid', clientname);
        form_data.append('fileName', "");
        form_data.append('stcsjobid', stCSJobID);
        form_data.append('col', $(this).attr('id'));
        $.ajax({
            url: "upload_gambar_karyawan",
            method: "POST",
            data: form_data,
            contentType: false,
            processData: false,
            success: function (data) {
                document.getElementById(id).value = "";
                console.log(data.status)
                if (data.status) {
                    $('#col' + id).append('<label id="pop' + id + '" class="text-success"><i class="fas fa-check"></i></label >')
                    //var row = $('#example').DataTable().row(mech_row);
                    if (id == "file1") {
                        $('#example').DataTable().cell({ row: mech_row, column: 3 }).data('Yes')
                    }
                    if (id == "file2") {
                        $('#example').DataTable().cell({ row: mech_row, column: 4 }).data('Yes')
                    }
                    if (id == "file3") {
                        $('#example').DataTable().cell({ row: mech_row, column: 5 }).data('Yes')
                    }



                }
                else {
                    alert("gagal")
                }
            }

        })
    });

    $("#modal-image").on('hide.bs.modal', function () {
        $('#popfile1').remove()
        $('#popfile2').remove()
        $('#popfile3').remove()
    });

    $("#upload").on("click", function () {
        let formData = new FormData($('#upload-image-form')[0]);
        // let File1 = $("#file1")[0];
        // console.log("file 1 :", File1.files[0].name)

        $.ajax({
            url: "upload_gambar_karyawan",
            method: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.status == 1) {
                    alert("sukses")
                }
                else {
                    alert("gagal")
                }
            }

        })
    })


    // REPORT

    var data_report = [];
    function SetTableReport(data_report) {

        if ($.fn.dataTable.isDataTable('#TableReport')) {
            $('#TableReport').DataTable().destroy();
        }
        $('#TableReport').DataTable({
            "lengthChange": false,
            "responsive": true,
            scrollX: true,
            scrollY: ($(window).height() - 440),
            "aaData": data_report,
            "columns": [
                { targets: 0, data: "stArea", title: "Area" },
                {
                    targets: 1, data: "stFileName1", title: "Before",
                    render: function (data) {
                        return '<img src="../image/karyawan/"' + data + ' style="width: 100px; height: 100px"/>'
                    }

                },
                {
                    targets: 2, data: "stFileName2", title: "Process",
                    render: function (data) {
                        return '<img src="../image/karyawan/"' + data + ' style="width: 100px; height: 100px"/>'
                    }
                },
                {
                    targets: 3, data: "stFileName3", title: "After",
                    render: function (data) {
                        return '<img src="../image/karyawan/"' + data + ' style="width: 100px; height: 100px"/>'
                    }

                },

            ]
        })
    };


    $('#report').on('click', function () {
        clientname = $('#client').val();
        var nclient = $('#client').select2('data')[0]['text'];
        client = nclient.replace('.', '');
        var spv = $('#supervisor').val();
        var mgr = $('#manager').val();
        spv = spv.replace(/\/r/g, '.');
        mgr = mgr.replace(/\/r/g, '.');
        //karyawan = $('#karyawan').val();
        var validate = false;
        var valiclient = false;
        var valispv = false;
        var valimgr = false;

        if (dtcs == "" || dtcs == null || dtcs == undefined || dtcs == "NaNNaNNaN") {
            $('#errordate').css('display', 'block')
            //validate = false
        } else {
            $('#errordate').css('display', 'none')
            validate = true
        }


        if (clientname == "" || clientname == null) {
            $('#errorclient').css('display', 'block')
            //return false;
        } else {
            $('#errorclient').css('display', 'none')
            valiclient = true
        }


        if (spv == "" || spv == null) {
            $('#errorspv').css('display', 'block')
            //return false;
        } else {
            $('#errorspv').css('display', 'none')
            valispv = true
        }

        if (mgr == "" || mgr == null) {
            $('#errormgr').css('display', 'block')
            //return false;
        } else {
            $('#errormgr').css('display', 'none')
            valimgr = true
        }


        console.log(validate, valiclient, valispv, valimgr)

        console.log(dtcs);
        console.log(clientname);
        console.log(spv);
        console.log(mgr);
        //console.log(karyawan);
        console.log(dtcs);
        if (validate && valiclient && valispv && valimgr) {
            // $.ajax({
            //     url: "get_aktifitas_report",
            //     headers: {
            //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //     },
            //     method: "POST",
            //     data: {
            //         dtCs: dtcs,
            //         stCid: clientname,
            //         Spv: spv,
            //         OMgr: mgr
            //     },


            // }).done(function (data) {
            //     console.log("data Report : ", data)
            //     SetTableReport(data)

            // })

            let a = document.createElement('a');
            a.target = '_blank';
            a.href = "generate-pdf/" + dtcs + "/" + clientname + "/" + spv + "/" + mgr + "/" + client + "/" + dtrpt;
            a.click();

            //window.location.href = "generate-pdf/" + dtcs + "/" + clientname + "/" + spv + "/" + mgr, '_blank';
        }

    })



});