<?php

namespace App\Http\Controllers;

use Session;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class AbsenController extends Controller
{

    public function Page(){
       
        //Log::info(json_encode($data));
        if (Session::has('user')){
            $title = "Absen";
            $username = Session::get('user')['userid'];
            return view('absen.index', compact('title','username'));
        }else{
           return redirect('logout');
        }
    }

    public function Checkin(Request $request){
        $api = config('app.api'). "webabsen/in";
        //$api = config('app.api'). "absen/in/". $request->param_emp ."/090034";
        Log::info($api);
       
        try{
             $data = [
            "biEid" => $request->param_emp,
            "stUserID" => Session::get('user')['ecode'],
            "stLatitude" => $request->param_lat,
            "stLongitude" => $request->param_long,
             ];
             Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'query' => $data,
        ]);
        $response = $res->getBody();
        Log::info($response);
        if($res->getStatusCode() == 200){
            $json['status'] = 200;
            $json['message'] = "Check in success";
        }else{
            $json['status'] = 400;
            $json['message'] = "Check in failed";
        }
        return $json;
            
        }catch(\Exception $e){
            Log::error($e);
            return $e;
        }
        
    }

    public function Checkout(Request $request){
        $api = config('app.api'). "webabsen/out";
        //$api = config('app.api'). "absen/out/".$request->param_emp."/".Session::get('user')['userid'] ;
        Log::info($api);
       
        //try{
             $data = [
            "biEid" => $request->param_emp,
            "stUserID" => Session::get('user')['ecode'],
            "stLatitude" => $request->param_lat,
            "stLongitude" => $request->param_long,
             ];
             Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'query' => $data,
        ]);
        $response = $res->getBody();
        Log::info($response);
        if($res->getStatusCode() == 200){
            $json['status'] = 200;
            $json['message'] = "Check out success";
        }else{
            $json['status'] = 400;
            $json['message'] = "Check out failed";
        }

    
        return $json;
                
        // //}catch(\Exception $e){
        //     Log::error($e);
        //     return $e;
        // }
        
    }

    
    public function GetAbsenList(Request $request){
        //$api = config('app.api'). "karyawanbyclient/list/" . $request->client;
        $api = config('app.api'). "webabsen/list";
        Log::info($api);
       
        try{
             $data = [
            "stCid" => $request->param_client,
             "biEid" => $request->param_emp
             ];
             Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'query' => $data
        ]);
        $response = $res->getBody();
        Log::info($response);
        if($res->getStatusCode() !== 200){
                Log::alert("message");
                Log::debug($api);
                Log::debug($response);
                    $values= array();
                $result= array(
                    'values' => $values
                );
                return $result['values'];
            }else{
                $data = json_decode($response)->values;
                // Log::debug($data);
                if ($data) {
                    return ($data);
                }else{
                    Log::debug(config('app.api'). "no Data");
                    $values= array();
                    $result= array(
                        'values' => $values
                    );
                    return $result['values'];
                }
            }
        }catch(\Exception $e){
            Log::error($e);
            return $e;
        }
        
    }

    public function GetDataKaryawanByClient(Request $request){
        //$api = config('app.api'). "karyawanbyclient/list/" . $request->client;
        $api = config('app.api'). "webgolonganabsen/list";
        Log::info($api);
       
        try{
             $data = [
            "stCid" => $request->client,
             ];
             Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'query' => $data
        ]);
        $response = $res->getBody();
        Log::info($response);
        if($res->getStatusCode() !== 200){
                Log::alert("message");
                Log::debug($api);
                Log::debug($response);
                    $values= array();
                $result= array(
                    'values' => $values
                );
                return $result['values'];
            }else{
                $data = json_decode($response)->values;
                // Log::debug($data);
                if ($data) {
                    return ($data);
                }else{
                    Log::debug(config('app.api'). "no Data");
                    $values= array();
                    $result= array(
                        'values' => $values
                    );
                    return $result['values'];
                }
            }
        }catch(\Exception $e){
            Log::error($e);
            return $e;
        }
        
    }

    public function GetDataKaryawanAndClient($userid){
        //$api = config('app.api'). "karyawanbyclient/list/" . $request->client;
        $api = config('app.api'). "webgetabsenuser/list";
        Log::info($api);
       
        try{
             $data = [
            "stECode" => $userid,
             ];
             Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'query' => $data
        ]);
        $response = $res->getBody();
        Log::info($response);
        if($res->getStatusCode() !== 200){
                Log::alert("message");
                Log::debug($api);
                Log::debug($response);
                    $values= array();
                $result= array(
                    'values' => $values
                );
                return $result['values'];
            }else{
                $data = json_decode($response)->values;
                // Log::debug($data);
                if ($data) {
                    Session::put('user.employeeid', json_decode($response)->values[0]->biEid);
                    Session::put('user.client', json_decode($response)->values[0]->stCName);
                    Session::put('user.employee' , json_decode($response)->values[0]->stEName);
                    Session::put('user.ecode' , json_decode($response)->values[0]->stECode);
                    //return ($data);
                }else{
                    Log::debug(config('app.api'). "no Data");
                    $values= array();
                    $result= array(
                        'values' => $values
                    );
                    return $result['values'];
                }
            }
        }catch(\Exception $e){
            Log::error($e);
            return $e;
        }
        
    }
}
