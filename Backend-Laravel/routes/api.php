<?php

use App\Http\Controllers\TacheController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:sanctum')->group( function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/getGroupes', [TacheController::class, 'getGroupes']);
    Route::get('/getTaches', [TacheController::class, 'getTaches']);
    Route::post('/createTache', [TacheController::class, 'createTache']);
    Route::post('/createGroupe', [TacheController::class, 'createGroupe']);
    Route::post('/deleteGroupe', [TacheController::class, 'deleteGroupe']);
    Route::post('/deleteTache', [TacheController::class, 'deleteTache']);
    Route::post('/AssignTacheToGroupe', [TacheController::class, 'AssignTacheToGroupe']);
    

});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);