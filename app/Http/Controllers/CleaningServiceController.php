<?php

namespace App\Http\Controllers;

use Session;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use File;
use Storage;
use PDF;

class CleaningServiceController extends Controller
{

    public function Page(){
        if($username){ 
            $title = "Absen";
            $username = Session::get('user')['userid']; 
            return view('absen.index', compact('title','username'));
         }else{
           return redirect('/'); 
        }   
    }

    public function ReportPage(){
         if (Session::has('user')){    
            $title = "Report";
            $username = Session::get('user')['userid']; 
            return view('report.index', compact('title','username'));
         }else{
           return redirect('logout');
        }
    }

    public function AktifitasPage(){
        
         if (Session::has('user')){    
            $title = "Aktifitas Harian";
            $username = Session::get('user')['userid'];
            return view('laporan.index', compact('title','username'));
         }else{
           return redirect('logout');
        }
    }

    public function UserPage(){
        
        //Log::info(json_encode($data));
         if (Session::has('user')){   
            $userid = Session::get('user')['userid']; 
            $username = Session::get('user')['userid']; 
            return view('userpage', compact('userid','username'));
        }else{
         return redirect('logout');
        }
        
    }

    public function logout(){
        $this->clearCache();
        return redirect('/');
    }

    public function PostLogin(Request $request){
        $api = config('app.api'). "user/logintu";
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
            $json['status'] = 200;
            $json['message'] = "Login Berhasil";

            Session::put('user', [
                'userid' => json_decode($response)->values->stUserID,
                'username' => json_decode($response)->values->stUserName,
            ]);
        }else{
            $json['status'] = 400;
            $json['message'] = "Login Gagal";
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
            return $e;
        }
        
    }

    public function GetData(Request $request){
        $api = config('app.api'). "cleaningservice/list";
        Log::info($api);
       
        try{
            //  $data = json_encode([
            // "stUserID" => $request->userid,
            // "stUserPwd" => $request->password
            //  ]);
            //  Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            //'body' => $data,
        ]);
        $response = $res->getBody();
        Log::info($response);
        // if($res->getStatusCode() == 200){
        //     $json['status'] = 200;
        //     $json['message'] = "Login Berhasil";

        //     Session::put('user', [
        //         'userid' => json_decode($response)->values->stUserID,
        //         'username' => json_decode($response)->values->stUserName,
        //     ]);
        // }else{
        //     $json['status'] = 400;
        //     $json['message'] = "Login Gagal";
        // }

        $datas = json_decode($response)->values;
                if ($datas) {
                    //return ($datas);
                    Log::info("message :", $datas);
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

    public function GetDataClient(Request $request){
        $api = config('app.api'). "client/list";
        Log::info($api);
       
        try{
            //  $data = json_encode([
            // "stUserID" => $request->userid,
            // "stUserPwd" => $request->password
            //  ]);
            //  Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            //'body' => $data,
        ]);
        $response = $res->getBody();
        Log::info($response);
        // if($res->getStatusCode() == 200){
        //     $json['status'] = 200;
        //     $json['message'] = "Login Berhasil";

        //     Session::put('user', [
        //         'userid' => json_decode($response)->values->stUserID,
        //         'username' => json_decode($response)->values->stUserName,
        //     ]);
        // }else{
        //     $json['status'] = 400;
        //     $json['message'] = "Login Gagal";
        // }

        $datas = json_decode($response)->values;
                if ($datas) {
                    //return ($datas);
                    Log::info("message :", $datas);
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

    public function GetDataKaryawanByClient(Request $request){
        //$api = config('app.api'). "karyawanbyclient/list/" . $request->client;
        $api = config('app.api'). "karyawanbyclient/list";
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

    public function GetAktifitasKaryawan(Request $request){
        $api = config('app.api'). "karyawanaktifitas/get";
        Log::info($api);
       
        try{
             $data = json_encode([
            "dtCS" => $request->datecs,
            'stCid' => $request->cid,
            'biEid' => $request->eid,
             ]);
             Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'body' => $data,
        ]);
        $response = $res->getBody();
        Log::info($response);
        // if($res->getStatusCode() == 200){
        //     $json['status'] = 200;
        //     $json['message'] = "Login Berhasil";

        //     Session::put('user', [
        //         'userid' => json_decode($response)->values->stUserID,
        //         'username' => json_decode($response)->values->stUserName,
        //     ]);
        // }else{
        //     $json['status'] = 400;
        //     $json['message'] = "Login Gagal";
        // }

        $datas = json_decode($response)->values;
                if ($datas) {
                    //return ($datas);
                    Log::info("message :", $datas);
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

    public function UpdateAndUpload(Request $request){

        if($request->col == "file1"){
            $filename1 = $request->dtcs ."_". $request->biecs ."_". $request->bieid ."_". $request->stcsjobid ."_". $request->col .".jpg";
        }else{
            $filename1 = "empty";
        }
        if($request->col == "file2"){
            $filename2 = $request->dtcs ."_". $request->biecs ."_". $request->bieid ."_". $request->stcsjobid ."_". $request->col .".jpg";
        }else{
            $filename2 = "empty";
        }
        if($request->col == "file3"){
            $filename3 = $request->dtcs ."_". $request->biecs ."_". $request->bieid ."_". $request->stcsjobid ."_". $request->col .".jpg";
        }else{
            $filename3 = "empty";
        }

         $api = config('app.api'). "update/activitykaryawan";

        $path_user = public_path().'/images/karyawan';
        if (!File::isDirectory($path_user)) {
            File::makeDirectory($path_user,0777,true);
        }
        //File::makeDirectory($path_user,0777,true);
        Log::alert($request->col);
        $request->validate([
            'file*' => 'mimes:doc,pdf,docx,zip,jpeg,png,jpg,gif,svg',
        ]);
        Log::debug($request->file('file'));
        if($request->file('file')){
        $image = $request->file('file');
        $image_name = $request->dtcs ."_". $request->biecs ."_". $request->bieid ."_". $request->stcsjobid ."_". $request->col .".jpg";

        $image->move(public_path('/images/karyawan'), $image_name);


        
        Log::info($api);

        
       
        try{
             $data = json_encode([
            "dtCS" => $request->dtcs,
            'stCid' => $request->stcid,
            'biEid' => $request->bieid,
            'biECS' => $request->biecs,
            'stFileName1' => $filename1,
            'stFileName2' => $filename2,
            'stFileName3' => $filename3,
            'stUserID' => Session::get('user')['userid'],
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
            $json['status']    = true;
            $json['pesan']     = 'Upload Successfuly';
           // $json['userid']    = Session::get('user')['userid'];
            // return json_encode($json);
            return $json;
        }else{
            $json['status'] = "gagal";
            return $json;
        }

        $datas = json_decode($response)->values;
                if ($datas) {
                    //return ($datas);
                    Log::info("message :", $datas);
                    //return $datas;
                }else{
                    $values= array();
                    $result= array(
                        'values' => $values
                    );
                    //return $result['values'];
                    //return $json;
                }
        }catch(\Exception $e){
            Log::error($e);
            return $e;
        }
    //$image_path = "/images/" . $image_name;
        // }
        // if($image->move(public_path('/images/karyawan'),$request->dtcs . $request->biecs . $request->stcsjobid . $request->col . $image_name)){
            
        }else{
            $statusFile = 0;
            $json['status']    = false;
            $json['pesan']     = 'Upload Failed';
            //$json['userid']    = Session::get('user')['userid'];
            // return json_encode($json);
        
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

    public function GetDataReport(Request $request){
        $api = config('app.api'). "report/list";
        Log::info($api);
       
        try{
             $data = [
            "dtCS" => $request->dtCs,
            'stCid' => $request->stCid,
            'Spv' => $request->Spv,
            'OMgr' => $request->OMgr,
             ];
             Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'query' => $data,
        ]);
        $response = $res->getBody();
        Log::info($response);
        // if($res->getStatusCode() == 200){
        //     $json['status'] = 200;
        //     $json['message'] = "Login Berhasil";

        //     Session::put('user', [
        //         'userid' => json_decode($response)->values->stUserID,
        //         'username' => json_decode($response)->values->stUserName,
        //     ]);
        // }else{
        //     $json['status'] = 400;
        //     $json['message'] = "Login Gagal";
        // }

        $datas = json_decode($response)->values;
                if ($datas) {
                    //return ($datas);
                    Log::info("message :", $datas);
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

    public function GetListPekerjaan(){
        $api = config('app.api'). "pekerjaan/list";
        Log::info($api);
       
        try{
            //  $data = json_encode([
            // "dtCs" => $request->client,
            // 'stCid' => $request->cid,
            // 'Spv' => $request->eid,
            // 'OMgr' => $request->eid,
            //  ]);
            //  Log::info($data);
        $client = new \GuzzleHttp\Client();
        $res = $client->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            //'body' => $data,
        ]);
        $response = $res->getBody();
        Log::info($response);

        $data = json_decode($response)->values;
                if ($data) {
                    //return ($datas);
                    Log::info("message :", $data);
                   
                    return $data;
                }else{
                    $values= array();
                    $result= array(
                        'values' => $values
                    );
                    return $values['value'];
                    //return $json;
                }
        }catch(\Exception $e){
            Log::error($e);
            return $e;
        }
    }

    public function generatePDF($dtcs, $clientname, $spv, $mgr, $client, $dtrpt){

        Log::debug($dtcs. $clientname. $spv. $mgr.$client. $dtrpt);
        $datar = $this->GetListPekerjaan();
       Log::debug("message", $datar);
        $api = config('app.api'). "report/list";
        Log::info($api);
       
        try{
             $data = [
            "dtCS" => $dtcs,
            'stCid' => $clientname,
            'Spv' => $spv,
            'OMgr' => $mgr,
             ]; 
             Log::info($data);
        $clients = new \GuzzleHttp\Client();
        $res = $clients->request('POST',$api,[
            'headers' => ['Content-Type' => 'application/json', 'Accept' => 'application/json'],
            'query' => $data
        ]);
        $response = $res->getBody();
        Log::info($response);
        // if($res->getStatusCode() == 200){
        //     $json['status'] = 200;
        //     $json['message'] = "Login Berhasil";

        //     Session::put('user', [
        //         'userid' => json_decode($response)->values->stUserID,
        //         'username' => json_decode($response)->values->stUserName,
        //     ]);
        // }else{
        //     $json['status'] = 400;
        //     $json['message'] = "Login Gagal";
        // }

        $datas = json_decode($response)->values;
                if ($datas) {
                    //return ($datas);
                    Log::info("message :", $datas);
                    $pdf = PDF::loadView('report.view_pdf',compact('datas','datar','client','spv','mgr', 'dtrpt'));
                    return $pdf->download('Cleaning_service_rreport_'. date('m/d/Y') .'.pdf');
                    
                }else{
                    $values= array();
                    $result= array(
                        'values' => $values
                    );
                    return '<script>alert("There are no fields to generate a report");
                    window.location.href="/cleaning_service_report_harian";
                    </script>';
                    //return $json;
                }
        }catch(\Exception $e){
            Log::error($e);
            return $e;
        }

        

        
    }
}
