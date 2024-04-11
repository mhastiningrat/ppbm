<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300&family=Montserrat:wght@400;600&family=Source+Sans+Pro:wght@300&display=swap" rel="stylesheet"> 
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/solid.css" integrity="sha384-Tv5i09RULyHKMwX0E8wJUqSOaXlyu3SQxORObAI08iUwIalMmN5L6AvlPX2LMoSE" crossorigin="anonymous"/>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/fontawesome.css" integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7" crossorigin="anonymous"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <style>
        .login-container{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .form-login{
            width: max(300px);
            height: max(100px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }
        .input-username{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border-radius:25px;
            background: rgba(202, 203, 208, 0.6);
            border: solid rgba(202, 203, 208, 0.6) 0.5px ;
        }
        .input-password{
            margin-top:10px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border-radius:25px;
            background: rgba(202, 203, 208, 0.6);
            border: solid rgba(202, 203, 208, 0.6) 0.5px ;
        }
        .btn-login{
            width: 100%;
            padding: 10px;
        }
        input:focus{
           -moz-box-shadow: none !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
            border: 1px solid #dadada;
            outline: none;
        }
        #username{
            padding-left: 10px;
            width: calc(100% - 40px);
            height: 50px;
            font-size: 16px;
            border-radius:25px;
            background: transparent;
            border: transparent 0.5px ;
        }
        #password{
            padding-left: 10px;
            width: calc(100% - 40px);
            height: 50px;
            font-size: 16px;
            border-radius:25px;
            background: transparent;
            border: transparent 0.5px ;
        }
        .user-icon{
            /* color:rgb(217, 31, 42) */
        }
        #btn-login{
            color: #ffffff;
            width: 100%;
            height: 50px;
            font-size: 18px;
            font-weight: 600;
            border-radius:25px;
            background: rgb(217, 31, 42);
            border: solid rgb(217, 31, 42) 0.5px ;
        }
        .logo{
            margin-bottom:25px;
        }
    </style>
</head>
<body>

    <div class="login-container">
        <div class="logo">
            <img src="{{ asset ('img/Logo PPBM.png') }}" style="width:150px; height:50px" alt="">
        </div>
        <div class="form-login">
            <div class="input-username">
                <span class="user-icon"><i class="fa fa-user"></i></span>
                <input type="text" name="username" id="username" placeholder="Username">
            </div>
            <div class="input-password">
                <span class="user-icon"><i class="fa fa-key"></i></span>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="btn-login">
                <button id="btn-login" onClick="stre()">Login</button>
            </div>
        </div>
    </div>
   
{{-- <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script> --}}
<script src="{{ asset ('js/jq.min.js') }}"></script>
<script src="{{ asset ('js/jq.js') }}"></script>
{{-- <script src="http://code.jquery.com/jquery-1.11.1.js"></script> --}}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>

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
                                    title: 'Login Gagal',
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