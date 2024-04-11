var mech_row;
var biECS;
var stCSJobID;
var id;
var dtcs;
var dtrpt;
var imagePath1;
var karyawan;
var clientname;
var param_client;
var param_emp;
var param_long;
var param_lat;
var uLat;
var uLon;
var Lat;
var Long;
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    // get users lat/long

    var getPosition = {
        enableHighAccuracy: false,
        timeout: 9000,
        maximumAge: 0
    };

    function success(gotPosition) {
        uLat = gotPosition.coords.latitude;
        uLon = gotPosition.coords.longitude;
        console.log(`${uLat}`, `${uLon}`);

    };

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        document.getElementById('checkin').disabled = true;
        document.getElementById('checkout').disabled = true
    };

    navigator.geolocation.getCurrentPosition(success, error, getPosition);

    function getMap() {
        var uri = 'https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=' + Lat + ',' + Long + '+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed';
        console.log(uri)
        document.getElementById('map').innerHTML = '<iframe scrolling="no" marginheight="0" marginwidth="0" src="' + uri + '" width="100%" height="100%" frameborder="0"><a href="https://www.gps.ie/wearable-gps/">wearable gps</a></iframe></div>';
    }

    var data_absen = [];
    function SetTableAbsen(data_absen) {

        if ($.fn.dataTable.isDataTable('#AbsenTable')) {
            $('#AbsenTable').DataTable().destroy();
        }
        $('#AbsenTable').DataTable({
            "lengthChange": false,
            "responsive": true,
            "paging": false,
            scrollX: true,
            scrollY: ($(window).height() - 440),
            "aaData": data_absen,
            "order": [[5, 'desc']],
            "columns": [
                { targets: 0, data: "stTgl", title: "Tanggal" },
                {
                    targets: 1, data: "stLatitude", title: "Latitude", visible: false
                },
                { targets: 2, data: "stLongitude", title: "Longitude", visible: false },
                { targets: 3, data: "inOrOut", title: "Status" },
                { targets: 4, data: "stJam", title: "Jam" },
                { targets: 5, data: "biAbsID", title: "Tanggal", visible: false },
                {
                    targets: 6, data: "biAbsID", title: "Lokasi",
                    render: function (data) {
                        return '<a href="#" id="show-map">Open Map</a>'
                    }
                },

            ]
        })
    };



    $('#AbsenTable').on('click', 'tbody tr td .dtr-details .dtr-data #show-map', function () {
        //tableSKU;
        console.log('detail')
        let rows_data = $('#AbsenTable').DataTable().row($(this).parents('span')).data();
        mech_row = $('#AbsenTable').DataTable().row($(this).parents('span')).index();
        Lat = rows_data.stLatitude;
        Long = rows_data.stLongitude
        console.log('m-row', uLat, uLon, mech_row)
        // $('#mechanism_notes').val(row_data.stCSJobID);
        $("#modal-map").modal("show");
        getMap()

    })

    $('#AbsenTable').on('click', 'tbody #show-map', function () {
        //tableSKU;
        console.log('biasa')
        let row_data = $('#AbsenTable').DataTable().row($(this).parents('tr')).data();
        mech_row = $('#AbsenTable').DataTable().row($(this).parents('tr')).index();
        Lat = row_data.stLatitude;
        Long = row_data.stLongitude
        console.log('m-row', uLat, uLon, mech_row)
        $('#mechanism_notes').val(row_data.stCSJobID);
        $("#modal-map").modal("show")
        getMap()

    })
    //SetTableAktifitas(data_aktifitas);
    param_emp = $('#karyawan').val();
    $.ajax({
        url: "getlistabsen",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        method: "POST",
        data: {
            param_emp: param_emp
        },


    }).done(function (data) {

        console.log(data)
        console.log("data CS : ", data)
        SetTableAbsen(data)

    });

    $('#checkin').on("click", function () {
        param_emp = $('#karyawan').val();
        // $('#spinner').addClass('spinner-border spinner-border-sm');

        console.log(param_emp);
        if (param_emp) {
            $.ajax({
                url: "checkin",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                method: "POST",
                data: {
                    param_emp: param_emp,
                    param_long: uLon,
                    param_lat: uLat
                },
                success: function (res) {
                    console.log(res);
                    if (res.status == 200) {
                        Swal.fire({
                            icon: 'success',
                            title: res.message,
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: 'Yes'
                        }).then((result) => {
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Check in failed',
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                        });
                    }
                }


            }).done(function (data) {
                console.log("data CS : ", data)
                if (data) {

                    $.ajax({
                        url: "getlistabsen",
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: "POST",
                        data: {
                            param_emp: param_emp
                        },


                    }).done(function (data) {
                        // if (!data || data) {
                        //     $('#spinner').removeClass('spinner-border spinner-border-sm');
                        // }

                        // var no = [];
                        // var datatabel = [];
                        // for (var i = 0; i < data.length; i++) {
                        //     data.push({
                        //         id: i
                        //     })
                        // }

                        console.log(data)
                        console.log("data CS : ", data)
                        SetTableAbsen(data)

                    })

                }

            })

        }


    })

    $('#checkout').on("click", function () {
        param_emp = $('#karyawan').val();

        console.log(param_emp);
        if (param_emp) {
            $.ajax({
                url: "checkout",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                method: "POST",
                data: {
                    param_emp: param_emp,
                    param_long: uLon,
                    param_lat: uLat
                },
                success: function (res) {
                    if (res.status == 200) {
                        Swal.fire({
                            icon: 'success',
                            title: res.message,
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: 'Yes'
                        }).then((result) => {
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Check in failed',
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                        });
                    }
                }

            }).done(function (data) {
                console.log("data CS : ", data)
                if (data) {
                    $.ajax({
                        url: "getlistabsen",
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        method: "POST",
                        data: {
                            param_client: param_client,
                            param_emp: param_emp
                        },


                    }).done(function (data) {
                        console.log("data CS : ", data)
                        SetTableAbsen(data)

                    })
                }

            })
        }

    })





});