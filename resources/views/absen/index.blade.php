@extends('master')
<meta name="csrf-token" content="{{ csrf_token() }}" />
<link rel="stylesheet" href="{{ asset('vendor/dist/css/datatable.css') }}">
<link rel="stylesheet" href="{{ asset('vendor/daterangepicker/daterangepicker.css') }}">
<link rel="stylesheet" href="{{ asset('vendor/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css') }}">
<link rel="stylesheet" href="{{ asset('vendor/select2/css/select2.min.css') }}">
<link rel="stylesheet" href="{{ asset('vendor/datatables-bs4/css/dataTables.bootstrap4.min.css') }}">
<link rel="stylesheet" href="{{ asset('vendor/datatables-responsive/css/responsive.bootstrap4.min.css') }}">
<link rel="stylesheet" href="{{ asset('vendor/datatables-buttons/css/buttons.bootstrap4.min.css') }}">
{{-- <script src="{{ asset('vendor/jquery/jquery351.js') }}"></script>
<script src="{{ asset('vendor/jquery/datatable.min.js') }}"></script> --}}
{{-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script> --}}
<style>
  .display{
    font-size:12px !important;
  }
  #map { width: 100%; height: 350px; }
</style>
@php
  $period = date("Y");
  $today = date('d F Y');
@endphp
@section('content')
    <div class="row">
        <!-- /.col -->
        <div class="col-md-12">
          <div class="card card-primary card-outline" style="padding: 10px !important">
            <div class="card-header">
              <form id="filterkaryawan">
              <div class="row">
                <div class="col-md-9">
                  <div class="row">
                    <div class="col-md-6 float-right" style="display: flex;flex-direction: column;align-items: start;">
                      <div class="form-group">
                        <label>Karyawan &nbsp;&nbsp;:&nbsp;&nbsp;</label> <label>{{ @Session::get('user')['employee'] }}</label>
                        <input id="karyawan" type="hidden" value="{{ @Session::get('user')['employeeid'] }}">
                      </div>
                      <div class="form-group">
                        <label>Lokasi Kerja&nbsp;&nbsp;:&nbsp;&nbsp;</label> <label>{{ @Session::get('user')['client'] }}</label>
                      </div>
                    </div>
                    <div class="col-md-6 float-right" style="display: flex;flex-direction: column;align-items: start;">
                      <div class="form-group">
                        <label>NIP &nbsp;&nbsp;:&nbsp;&nbsp;</label> <label>{{ @Session::get('user')['ecode'] }}</label>
                        <input id="karyawan" type="hidden" value="{{ @Session::get('user')['employeeid'] }}">
                      </div>
                      <div class="form-group">
                        <label>Tanggal&nbsp;&nbsp;:&nbsp;&nbsp;</label> <label>{{ $today }}</label>
                      </div>
                    </div>
                  </div>
                </div>    
                  
                <div class="col-md-3">
                  <div class="row">
                    <div class="col-md-12 float-right" style="display: flex;flex-direction: column;align-items: end;">
                      
                        <button type="button" id="checkin" class="btn btn-block btn-primary btn-xs2 col-md-6 ">
                          <span id="spinner"></span>
                          Check In
                        </button>
                      
                         <button type="button" id="checkout" class="btn btn-block btn-danger btn-xs2 col-md-6 ">Check Out</button>
                       
                    </div>
                  </div>
                </form>
                </div>
                <!-- /.col -->
                
              </div>
              <h3 class="card-title"></h3>

              <div class="card-tools">
                {{-- <div class="input-group input-group-sm">
                  <input type="text" class="form-control" placeholder="Search Mail">
                  <div class="input-group-append">
                    <div class="btn btn-primary">
                      <i class="fas fa-search"></i>
                    </div>
                  </div>
                </div> --}}
              </div>
              <!-- /.card-tools -->
            </div>
            <!-- /.card-header -->
              <table id="AbsenTable" class="display" style="width:100%">
                {{-- <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Extn.</th>
                        <th>Name</th>
                       
                        <th>Start date</th>
                        <th>Salary</th>
                    </tr>
                </thead> --}}
                {{-- <tfoot>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Office</th>
                        <th>Extn.</th>
                        <th>Start date</th>
                        <th>Salary</th>
                    </tr>
                </tfoot> --}}
            </table>
              <!-- /.mail-box-messages -->
            </div>
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>

      <div class="modal fade" id="modal-map">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title"></h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div id="map"></div>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              {{-- <button type="button" id="print" class="btn btn-primary">Print</button> --}}
            </form>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
@endsection

<script>

     

        
     
   
</script>
<script src="{{ asset ("vendor/jquery/jquery.min.js") }}"></script>
<script src="{{ asset ("vendor/select2/js/select2.full.min.js") }}"></script>
<script src="{{ asset ("vendor/moment/moment.min.js") }}"></script>
<script src="{{ asset ("vendor/inputmask/jquery.inputmask.min.js") }}"></script>
<script src="{{ asset ("vendor/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js") }}"></script>
<!-- date-range-picker -->
<script src="{{ asset ("vendor/daterangepicker/daterangepicker.js") }}"></script>
<script src="{{ asset ("vendor/datatables/jquery.dataTables.min.js") }}"></script>
<script src="{{ asset ("vendor/datatables-bs4/js/dataTables.bootstrap4.min.js") }}"></script>
<script src="{{ asset ("vendor/datatables-responsive/js/dataTables.responsive.min.js") }}"></script>
<script src="{{ asset ("vendor/datatables-responsive/js/responsive.bootstrap4.min.js") }}"></script>
<script src="{{ asset ("vendor/datatables-buttons/js/dataTables.buttons.min.js") }}"></script>
<script src="{{ asset ("vendor/datatables-buttons/js/buttons.bootstrap4.min.js") }}"></script>
<script src="{{ asset ("vendor/jszip/jszip.min.js") }}"></script>
<script src="{{ asset ("vendor/pdfmake/pdfmake.min.js") }}"></script>
<script src="{{ asset ("vendor/pdfmake/vfs_fonts.js") }}"></script>
<script src="{{ asset ("vendor/datatables-buttons/js/buttons.html5.min.js") }}"></script>
<script src="{{ asset ("vendor/datatables-buttons/js/buttons.print.min.js") }}"></script>
<script src="{{ asset ("vendor/datatables-buttons/js/buttons.colVis.min.js") }}"></script>
<script src="{{ asset ('vendor/sweetalert/sweetalert.all.js') }}" type="text/javascript"></script>
{{-- <script src="{{ asset ("vendor/jquery-validation/jquery.validate.min.js") }}"></script>
<script src="{{ asset ("vendor/jquery-validation/additional-methods.min.js") }}"></script> --}}

<script src="{{ asset ("pages/absen.js") }}"></script>
