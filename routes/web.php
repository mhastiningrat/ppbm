<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AbsenController;
use App\Http\Controllers\CleaningServiceController;
use App\Http\Controllers\GajiController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('login');
// });

Route::get('/', [UserController::class, 'Page']);
Route::get('/userpage', [UserController::class, 'UserPage']);
Route::get('/postlogin', [UserController::class, 'PostLogin']);
Route::post('change_password', [UserController::class, 'ChangePassword']);
Route::get('/logout', [UserController::class, 'logout']);
Route::get('/absen_cleaning_service', [CleaningServiceController::class, 'Page']);
Route::get('/cleaning_service_report', [CleaningServiceController::class, 'AktifitasPage']);
Route::get('/cleaning_service_report_harian', [CleaningServiceController::class, 'ReportPage']);
Route::get('/getDataClient', [CleaningServiceController::class, 'GetDataClient']);
Route::post('/getDataKaryawanByClient', [CleaningServiceController::class, 'getDataKaryawanByClient']);
Route::get('/cleaning_service_list', [CleaningServiceController::class, 'GetData']);
Route::post('/get_cleaning_service_list', [CleaningServiceController::class, 'GetData']);

Route::post('/get_aktifitas_karyawan', [CleaningServiceController::class, 'GetAktifitasKaryawan']);
Route::post('/get_aktifitas_report', [CleaningServiceController::class, 'GetDataReport']);
Route::post('/upload_gambar_karyawan', [CleaningServiceController::class, 'UpdateAndUpload']);
Route::get('generate-pdf/{dtcs}/{clientname}/{spv}/{mgr}/{client}/{dtrpt}', [CleaningServiceController::class, 'generatePDF']);

Route::get('/absen', [AbsenController::class, 'Page']);
Route::post('/checkin', [AbsenController::class, 'CheckIn']);
Route::post('/checkout', [AbsenController::class, 'CheckOut']);
Route::post('/getlistabsen', [AbsenController::class, 'GetAbsenList']);
Route::post('/getDataKaryawanAbsenByClient', [AbsenController::class, 'getDataKaryawanByClient']);

Route::get('slipgaji', [GajiController::class, 'Page']);
Route::get('generate-pdf/slipgaji/{date}/{param_emp}', [GajiController::class, 'generatePDF']);
