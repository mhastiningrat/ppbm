<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PPBM | Log in</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="{{ asset('vendor/fontawesome-free/css/all.min.css') }}">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="{{ asset('vendor/icheck-bootstrap/icheck-bootstrap.min.css') }}">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{ asset('vendor/dist/css/adminlte.min.css') }}">
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <!-- /.login-logo -->
  <div class="card card-outline card-danger">
    <div class="card-header text-center">
      <a href="#" class="h1"><b style="color:#dc3545 !important">PPBM</b></a>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Login Here</p>

      <form>
        <div class="input-group mb-3">
          <input type="text" id="username" class="form-control" placeholder="User ID">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" id="password" class="form-control" placeholder="Password">
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember">
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="button" class="btn btn-danger btn-block" onClick="stre()">Sign In</button>
          </div>
          <!-- /.col -->
        </div>
      </form>

       <div class="social-auth-links text-center mt-2 mb-3">
       {{-- <a href="#" class="btn btn-block btn-primary">
          <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
        </a>
        <a href="#" class="btn btn-block btn-danger">
          <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
        </a>--}}
      </div> 
      <!-- /.social-auth-links -->

    {{-- <p class="mb-1">
        <a href="#" id="change-password">Change Password</a>
      </p> --}}
        {{-- <p class="mb-0">
        <a href="register.html" class="text-center">Register a new membership</a>
      </p> --}}
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
<!-- Bootstrap 4 -->
<script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
<!-- AdminLTE App -->
<script src="{{ asset('vendor/dist/js/adminlte.min.js') }}"></script>
<script src="{{ asset ('vendor/sweetalert/sweetalert.all.js') }}" type="text/javascript"></script>

<script>

     $(document).ready(function() {
            
     });
     
      function stre() {
                var userid = $('#username').val();
                var passid = $('#password').val();

                $.ajax({
                    url : '/postlogin',
                    type : 'GET',
                    data : {userid:userid, password:passid},
                    datatype : 'json',
                    async : false,
                    success : function(res){
                        console.log(res);
                        if(res.status == 200){
                           Swal.fire({
                                icon: 'success',
                                title: res.message,
                                showDenyButton: false,
                                showCancelButton: false,
                                confirmButtonText: 'Yes'
                            }).then((result) => {
                                $('#username').val("");
                                $('#password').val("");
                                window.location='/userpage'
                            });
                        }else{
                            Swal.fire({
                                    icon: 'warning',
                                    title: res.message,
                                    showDenyButton: false,
                                    showCancelButton: false,
                                    confirmButtonText: 'Ok'
                                }).then((result) => {
                                    $('#username').val("");
                                    $('#password').val("");
                                    // window.location='/userpage'
                                });
                        }
                    }
                })
        }

</script>
</body>
</html>
