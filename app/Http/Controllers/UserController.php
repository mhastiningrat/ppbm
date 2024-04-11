<?php

namespace App\Http\Controllers;

use Session;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class UserController extends Controller
{

    public function Page(){
        return view('login_new');
    }

    public function UserPage(){
        //Log::info(json_encode($data));
        if (Session::has('user')){
            $title = "Welcome - ". Session::get('user')['userid'];
            $username = Session::get('user')['userid'];    
            return view('welcome', compact('username', 'title'));
        }else{
           return redirect('logout');
        }
        
    }

    public function logout(){
        $this->clearCache();
        return redirect('/');
    }

    public function PostLogin(Request $request){
        $api = config('app.api'). "user/loginsp";
        //$api = config('app.api'). "postlogin/".$request->userid."/".$request->password ;
        Log::info($api);
       
        try{
             $data = json_encode([
            "stUserID" => $request->userid,
            "stUserPwd" => $request->password
             ]);
             Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'body' => $data,
        ]);
        $response = $res->getBody();
        Log::info($response);
        if($res->getStatusCode() == 200){
            
            if(json_decode($response)->values[0]->hasil != 0){
                Session::put('user', [
                'userid' => json_decode($response)->values[0]->hasil,
                //'username' => json_decode($response)->values->stUserName,
            ]);
            $json['status'] = 200;
            $json['message'] = "Login Berhasil";
            app('App\Http\Controllers\AbsenController')->GetDataKaryawanAndClient(Session::get('user')['userid']);
            }else{
                $json['status'] = 400;
                $json['message'] = "User ID or Password Not Found";

            }
        }else{
            $json['status'] = 400;
            $json['message'] = "User ID or Password Not Found";
        }

        $datas = json_decode($response)->values;
                if ($datas) {
                    //return ($datas);
                    return $json;
                }else{
                    $values= array();
                    $result= array(
                        'values' => $values
                    );
                    //return $result['values'];
                    return $json;
                }
        }catch(\Exception $e){
            Log::error($e);
            $json['status'] = 400;
            $json['message'] = "Something went wrong";
            return $json;
        }
        
    }

    public function ChangePassword(Request $request){
        $api = config('app.api'). "gantipassword";
        //$api = config('app.api'). "postlogin/".$request->userid."/".$request->password ;
        Log::info($api);
       
        try{
             $data = [
            "stUserID" => $request->userid,
            "stPasswordBaru" => $request->newpass
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
            $json['status'] = 1;
            $json['message'] = "Change password success";
        }else{
            $json['status'] = 0;
            $json['message'] = "Change password failed";
        }
        return $json;
        }catch(\Exception $e){
            Log::error($e);
            $json['status'] = 0;
            $json['message'] = "Something went wrong";
            return $json;
        }
        
    }

    public function clearCache(){
        // ResponseCache::clear();
        Session::flush();
        Session::regenerate();
        //Cache::forget('MenuId');
        // Cache::forget('MenuParent');
        // Cache::forget('MenuParent');
        // Cache::forget('sidebarmenu');
        // Cache::forget('usergroup');
        // Cache::forget('userlevel');
        //return redirect('clear-cache');
    }
}
