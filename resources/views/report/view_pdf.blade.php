<!DOCTYPE html>

<html>

<head>

    <title>Hi</title>
    <style>
        @page {
                margin-top: 150px;
            }
        .table{
            border: 1px solid #000;
            width:100%;
            border-collapse: collapse;
            page-break-inside: always
        }
        .table thead tr td,
        .table tbody tr td{
            text-align: center;
            border: 0.2px solid #000;
            page-break-inside: always
        }
        .table tbody tr,
        .table thead tr{
            page-break-inside: always
        }
        .img{
            width:150px;
            height:150px;
        }
        hr {
        page-break-after: always;
        border: 0;
        }

        .header{
            background-color: rgb(243, 121, 254)
        }

        #header table,
        #footer table {
            width: 100%;
            border-collapse: collapse;
            border: none;
        }

        header {
                position: fixed;
                top: -160px;
                left: 0px;
                right: 0px;
                height: 50px;

                /** Extra personal styles **/
                
                text-align: center;
                line-height: 35px;
            }
        footer {
                position: fixed; 
                bottom: 0cm; 
                left: 0cm; 
                right: 0cm;
                height: 2cm;

                /** Extra personal styles **/
                text-align: center;
                line-height: 1.5cm;
            }
            .cover{
                width:80%; 
                border-collapse:collapse; 
                border:2px solid #000;
                position: absolute;
                top:30%;
                left:10%
            } 

    </style>

</head>

<body>
    <header>
        <div id="header">
            <table>
                <tr>
                    <td><img style="width:100%;height:150px;" src="./images/headerpdf.jpg"></td>
                </tr>
            </table>
        </div>
    </header>
    
    <main>
        <h1 style="text-align: center">DAILY REPORT</h1>

        <table class="cover">
            <tr>
                <td style="padding-left:25px;padding-top:25px;width:40%">Area</td>
                <td style="padding-left:25px;padding-top:25px;width:5%">:</td>
                <td style="padding-left:25px;padding-top:25px;width:55%"> <?php echo @$client ?></td>
            </tr>
            <tr>
                <td style="padding-left:25px;width:40%">Supervisor</td>
                <td style="padding-left:25px;width:5%">:</td>
                <td style="padding-left:25px;width:55%"><?php echo  @$spv  ?></td>
            </tr>
            <tr>
                <td style="padding-left:25px;width:40%">Operation Manager</td>
                <td style="padding-left:25px;width:5%">:</td>
                <td style="padding-left:25px;width:55%"><?php echo @$mgr ?></td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-bottom:25px;width:40%">Hari/Tanggal</td>
                <td style="padding-left:25px;padding-bottom:25px;width:5%">:</td>
                <td style="padding-left:25px;padding-bottom:25px;width:55%">{{ @$dtrpt }}</td>
            </tr>
        </table>
<hr>
        <table class="table" page-break-inside: auto;>
            <thead>
                <tr class="header"><td>No</td><td>Lokasi</td><td>Area</td></tr>
            </thead>
            
            <?php
            
            for($i=0;$i < count(@$datar);$i++){
                echo '
                <tbody>
                    <tr><td>'.@$datar[$i]->iSort.'</td><td>'.@$datar[$i]->stLokasi.'</td><td>'.@$datar[$i]->stArea.'</td></tr>
                </tbody>
                
                ';
            }
            ?>
        </table>
        <hr>

        {{-- <p>{{ $datas[0]->stArea }}</p> --}}

        <h2 style="text-align: center">DOKUMENTASI PEKERJAAN</h2>
        <table class="table" page-break-inside: auto;>

            <?php
                for ($x = 0; $x < count(@$datas); $x++) {
                    if(@$datas[$x]->stFileName1 == null){
                        $img1 = '<img class="img" src="./images/karyawan/imagenotfound.jpg">';
                    }else{
                        $img1 = '<img class="img" src="./images/karyawan/'. @$datas[$x]->stFileName1 .'">';
                    }

                    if(@$datas[$x]->stFileName2 == null){
                        $img2 = '<img class="img" src="./images/karyawan/imagenotfound.jpg">';
                    }else{
                        $img2 = '<img class="img" src="./images/karyawan/'. @$datas[$x]->stFileName2 .'">';
                    }

                    if(@$datas[$x]->stFileName3 == null){
                        $img3 = '<img class="img" src="./images/karyawan/imagenotfound.jpg">';
                    }else{
                        $img3 = '<img class="img" src="./images/karyawan/'. @$datas[$x]->stFileName3 .'">';
                    }
                
                echo '
                <thead class="header">
                    <tr><td colspan="3">'.@$datas[$x]->stArea.'</td></tr>
                    <tr><td>Before</td><td>Process</td><td>After</td></tr>
                </thead>
                <tbody>
                    <tr><td>'.$img1.'</td><td>'. $img2 .'</td><td>'. $img3 .'</td></tr>
                </tbody>
                ';
                }
                
            ?> 

        </table>

    </main>
        

   
    
   
{{-- <tr><td>'.$datas[$x]->stFileName1.'</td><td>'.$datas[$x]->stFileName2.'</td><td>'.$datas[$x]->stFileName3.'</td></tr> --}}
</body>

</html>