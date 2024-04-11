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
</style>
@php
  //$period = date("Y");
@endphp
@section('content')
    <div class="row">
        <!-- /.col -->
        <div class="col-md-12">
          <div class="card card-primary card-outline" style="padding: 10px !important">
            <div class="card-header">
              <form id="filterkaryawan">
              <div class="row">
                
                <div class="col-md-10">
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
                        <div class="row">
                          <div class="col-md-2">
                             <label>Date&nbsp;&nbsp;:</label>
                          </div>
                          <div class="col-md-8">
                            <div class="input-group date col-md-12" id="reservationdate" name="reservationdate" data-target-input="nearest">
                              <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate"/>
                              <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                                  <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                              </div>
                            </div>
                          </div>
                        </div>
                          <span class="text-danger" id="errordate" style="font-size:80%;display:none">Bulan tahun harus diisi</span>
                      </div>
                    </div>
                  </div>
                </div>  
                {{-- <div class="col-md-3">
                  <div class="form-group" style="">
                    <label>Karyawan:</label>
                    <select class="js-example-basic-single col-md-12" name="karyawan" id="karyawan">
                      <option></option>
                    </select>
                    <span class="text-danger" id="errorkaryawan" style="font-size:80%;display:none">Nama karyawan harus diisi</span>
                  </div>
                  <!-- /.form-group -->
                </div> --}}
                <div class="col-md-2">
                  {{-- <div class="row">
                    <div class="col-md-12">
                        <button type="button" id="view" class="btn btn-block btn-primary btn-xs2 col-md-6 float-right">Refresh</button>
                    </div>
                  </div> --}}
                </form>
                  <div class="row " style="margin-top:5px">
                      <div class="col-md-12 float-right">
                        <button type="button" id="report" class="btn btn-block btn-success btn-xs2 float-right">Export</button>
                    </div>
                  </div>
                  
                 
                </div>
                <!-- /.col -->
              </div>
              <h3 class="card-title"></h3>

              <div class="card-tools">
              </div>
            </div>
            <table id="TableGaji" class="display" style="width:100%">
            </table>
              <!-- /.mail-box-messages -->
            </div>
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>

      
@endsection

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
{{-- <script src="{{ asset ("vendor/jquery-validation/jquery.validate.min.js") }}"></script>
<script src="{{ asset ("vendor/jquery-validation/additional-methods.min.js") }}"></script> --}}

<script src="{{ asset ("pages/gaji.js") }}"></script>
