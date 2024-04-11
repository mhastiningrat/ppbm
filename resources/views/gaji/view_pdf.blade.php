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
                width:100%; 
                border-collapse:collapse; 
                /* border:2px solid #000; */
                
            } 
            .cover tr td{
                border-collapse:collapse; 
                /* border:1px solid #000; */
                font-size: 10px;
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
        {{-- <h1 style="text-align: center">SLIP GAJI</h1> --}}

        <table class="cover">
            <tr>
                <td style="padding-left:25px;width:40%"><b>SLIP GAJI KARYAWAN</b></td>
            </tr>
            <tr>
                <td style="padding-left:25px;width:40%"><b>PT PERDANA PRIMA BHAKTI MANDIRI</b></td>
            </tr>
        </table>

        <table class="cover">
            <tr>
                <td style="padding-left:25px;padding-top:20px;width:20%">NAMA</td>
                <td style="padding-left:25px;padding-top:20px;width:5%">:</td>
                <td style="padding-left:2px;padding-top:20px;width:40%">{{ @$datar[0]->stEName }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:20%">NIP</td>
                <td style="padding-left:25px;padding-top:5px;width:5%">:</td>
                <td style="padding-left:2px;padding-top:5px;width:40%">{{ @$datar[0]->stECode }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:20%">JABATAN</td>
                <td style="padding-left:25px;padding-top:5px;width:5%">:</td>
                <td style="padding-left:2px;padding-top:5px;width:40%">{{ @$datar[0]->stOcupName}}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:20%">LOKASI</td>
                <td style="padding-left:25px;padding-top:5px;width:5%">:</td>
                <td style="padding-left:2px;padding-top:5px;width:20%">{{ @$datar[0]->stCName }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:20%">NO.BPJS TK</td>
                <td style="padding-left:25px;padding-top:5px;width:5%">:</td>
                <td style="padding-left:2px;padding-top:5px;width:40%">{{ @$datar[0]->stEBPJS1no }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:20%">NO.BPJS KES</td>
                <td style="padding-left:25px;padding-top:5px;width:5%">:</td>
                <td style="padding-left:2px;padding-top:5px;width:40%">{{ @$datar[0]->stEBPJS2no }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:15px;width:20%">BULAN</td>
                <td style="padding-left:25px;padding-top:15px;width:5%">:</td>
                <td style="padding-left:2px;padding-top:15px;width:40%">{{ substr_replace(@$datar[0]->stThnBln, " - ", 4, 0) }}</td>
            </tr>
        </table>
        <table class="cover">
            <tr>
                <td style="padding-left:25px;padding-top:15px;width:5%">1</td>
                <td style="padding-left:5px;padding-top:15px;width:40%">UPAH</td>
                <td colspan="2" style="padding-left:25px;padding-top:15px;width:40%;text-align:right">{{ @number_format($datar[0]->upah,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%">2</td>
                <td style="padding-left:5px;padding-top:5px;width:50%">PENAMBAHAN (A+B+C+D)</td>
                <td colspan="2" style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->penambah,0,".",",")}}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">A.TUNJANGAN</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tunjangan,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan Jabatan</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_Jabatan,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan Cuti</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_Cuti,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan OS</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_OS,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan Multiskill</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_MultiSkill,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan Skill Prioritas</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_SkillPrioritas,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan English</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_SkillEnglish,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan Quality Monitoring</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_QM,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan World Elite</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_WE,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan Reward</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_Reward,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan Insentif</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_Insentif,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Tunjangan CC Platinum</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->tj_CCPlatinum,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">B.RAPEL</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->rapel,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Rapel Gaji</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->rapelGaji,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Rapel Lembur</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->rapelLembur,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:40px;padding-top:5px;width:40%">Rapel Tunjangan</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->rapelTunjaangan,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">C.UANG MAKAN LEMBUR</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->uangmakanlembur,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">D.UANG LEMBUR</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->uanglembur,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">E.REIMBURSE/UANG PERJALANAN DINAS</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->perjalanandinas,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%">3</td>
                <td style="padding-left:5px;padding-top:5px;width:50%">POTONGAN</td>
                <td colspan="2" style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->potongan,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">BPJS TK 3%</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->pot_BPJStk,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">BPJS KES 1%</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->pot_BPJSkes,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">PPH 21</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->pot_PPH21,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">Pot.Gaji/Pelanggaran</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->pot_Gaji,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">Pot.Alpa</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->pot_Alpha,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">Pot.Koperasi</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->pot_Koperasi,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">Pot.Selisih</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->pot_Selsih,0,".",",") }}</td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:5px;width:5%"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%">Pot.Gada Pratama</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->pot_GadaPratama,0,".",",") }}</td>
            </tr>
            <tr>
                <td colspan="2" style="padding-left:25px;padding-top:5px;width:5%">JUMLAH DITERIMA (1+2-3)</td>
                <td style="padding-left:25px;padding-top:5px;"></td>
                <td style="padding-left:25px;padding-top:5px;width:40%;text-align:right">{{ @number_format($datar[0]->diterima,0,".",",") }}</td>
            </tr>
        </table>
        <table class="cover">
            <tr>
                <td style="padding-left:25px;padding-top:25px;width:40%"><b>Diserahkan Oleh</b></td>
                <td style="padding-left:25px;padding-top:25px;width:40%"><b>Diterima Oleh</b></td>
            </tr>
            <tr>
                <td style="padding-left:25px;padding-top:45px;width:40%"><b>HRD</b></td>
                <td style="padding-left:25px;padding-top:45px;width:40%"><b>{{ @$datar[0]->stEName }}</b></td>
            </tr>
        </table>

    </main>
        

   
    
   
{{-- <tr><td>'.$datas[$x]->stFileName1.'</td><td>'.$datas[$x]->stFileName2.'</td><td>'.$datas[$x]->stFileName3.'</td></tr> --}}
</body>

</html>