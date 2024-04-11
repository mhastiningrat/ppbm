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
  $period = date("Y");
@endphp
@section('content')
    <div class="row">
        <!-- /.col -->
        <div class="col-md-12">
          <div class="card card-primary card-outline" style="padding: 10px !important">
            <div class="card-header">
              <form id="filterkaryawan">
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Date:</label>
                      <div class="input-group date col-md-12" id="reservationdate" name="reservationdate" data-target-input="nearest">
                          <input type="text" class="form-control datetimepicker-input" data-target="#reservationdate"/>
                          <div class="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                              <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                          </div>
                      </div>
                      <span class="text-danger" id="errordate" style="font-size:80%;display:none">Tanggal harus diisi</span>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label>Client:</label>
                    <select class="js-example-basic-single col-md-12" name="client" id="client">
                      <option></option>
                    </select>
                    <span class="text-danger" id="errorclient" style="font-size:80%;display:none">Nama client harus diisi</span>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group" style="">
                    <label>Karyawan:</label>
                    <select class="js-example-basic-single col-md-12" name="karyawan" id="karyawan">
                      <option></option>
                    </select>
                    <span class="text-danger" id="errorkaryawan" style="font-size:80%;display:none">Nama karyawan harus diisi</span>
                  </div>
                  <!-- /.form-group -->
                </div>
                <div class="col-md-3">
                  <div class="row">
                    <div class="col-md-12">
                        <button type="button" id="view" class="btn btn-block btn-primary btn-xs2 col-md-6 float-right">Refresh</button>
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
            
              <table id="example" class="display" style="width:100%">
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

      <div class="modal fade" id="modal-image">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Upload</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="upload-image-form" enctype="multipart/form-data">
                @csrf
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-3"> <label for="exampleInputEmail1">Before</label></div>
                    <div class="col-md-7">
                      <input type="hidden" id="col1" name="col1" class="form-control"  value="col1">
                      <input type="file" id="file1" name="file1" class="form-control"  placeholder="Add File">
                    </div>
                    <div class="col-md-2" id="colfile1">
                      {{-- <button type="submit" id="uploadcol1" class="btn btn-primary"><i class="fas fa-upload"></i></button> --}}
                    </div>
                  </div>
                </div>
              </form>
              <form id="upload-image-form" enctype="multipart/form-data">
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-3"> <label for="exampleInputEmail1">Process</label></div>
                    <div class="col-md-7">
                      <input type="hidden" id="col2" name="col2" class="form-control"  value="col2">
                      <input type="file" id="file2" name="file2" class="form-control"  placeholder="Add File">
                    </div>
                    <div class="col-md-2" id="colfile2">
                      {{-- <button type="submit" id="uploadcol2" class="btn btn-primary"><i class="fas fa-upload"></i></button> --}}
                    </div>
                  </div>
                </div>
              </form>
              <form id="upload-image-form" enctype="multipart/form-data">
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-3"> <label for="exampleInputEmail1">After</label></div>
                    <div class="col-md-7">
                      <input type="hidden" id="col3" name="col3" class="form-control"  value="col3">
                      <input type="file" id="file3" name="file3" class="form-control"  placeholder="Add File">
                    </div>
                    <div class="col-md-2" id="colfile3">
                      {{-- <button type="submit" id="uploadcol3" class="btn btn-primary"><i class="fas fa-upload"></i></button> --}}
                    </div>
                  </div>
                </div>
                </form>
            </div>
            {{-- <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" id="upload" class="btn btn-primary">Simpan</button>
            </form>
            </div> --}}
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <div class="modal fade" id="modal-report">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title"></h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="upload-image-form" enctype="multipart/form-data">
                @csrf
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-3"> <label for="exampleInputEmail1">Supervisor</label></div>
                    <div class="col-md-7">
                      <input type="hidden" id="col1" name="col1" class="form-control"  value="col1">
                      <input type="text" id="supervisor" name="supervisor" class="form-control"  placeholder="Enter Supervisor">
                    </div>
                    <div class="col-md-2" id="colfile1">
                      {{-- <button type="submit" id="uploadcol1" class="btn btn-primary"><i class="fas fa-upload"></i></button> --}}
                    </div>
                  </div>
                </div>
              </form>
              <form id="upload-image-form" enctype="multipart/form-data">
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-3"> <label for="exampleInputEmail1">Manager</label></div>
                    <div class="col-md-7">
                      <input type="hidden" id="col2" name="col2" class="form-control"  value="col2">
                      <input type="text" id="manager" name="manager" class="form-control"  placeholder="Enter Manager">
                    </div>
                    <div class="col-md-2" id="colfile2">
                      {{-- <button type="submit" id="uploadcol2" class="btn btn-primary"><i class="fas fa-upload"></i></button> --}}
                    </div>
                  </div>
                </div>
              </form>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" id="print" class="btn btn-primary">Print</button>
            </form>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
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

<script src="{{ asset ("pages/cleaningservice.js") }}"></script>
