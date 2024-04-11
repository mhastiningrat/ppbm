<?php

namespace App\Http\Controllers;

use Session;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use PDF;

class GajiController extends Controller
{

    public function Page(){
        $title = "Slip Gaji";
        //Log::info(json_encode($data));
        if (Session::has('user')){
            $username = Session::get('user')['userid'];
            return view('gaji.index', compact('title','username'));
        }else{
           return redirect('logout');
        }
    }

    public function GetSlipGaji($date, $param_emp){
        $api = config('app.api'). "cleaningservice/slipgaji";
        //$api = config('app.api'). "absen/in/". $request->param_emp ."/090034";
        Log::info($api);
       
        try{
             $data = [
            "stThnBln" => $date,
            "biEid" => $param_emp,
             ];
             Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'query' => $data,
        ]);
        $response = $res->getBody();
        Log::info($response);
        $datas = json_decode($response)->values;
                if ($datas) {
                    //return ($datas);
                    return $datas;
                }else{
                    $values= array();
                    $result= array(
                        'values' => $values
                    );
                    return $result['values'];
                    //return $json;
                }
            
        }catch(\Exception $e){
            Log::error($e);
            return $e;
        }
        
    }

    public function generatePDF($date, $param_emp){

        //Log::debug($date, $param_emp);
        $datar = $this->GetSlipGaji($date, $param_emp);
        $pdf = PDF::loadView('gaji.view_pdf',compact('datar'));
                    return $pdf->download('Slip_Gaji_'. Session::get('user')['userid'] . date('m/Y') .'.pdf');
       
    }
}
