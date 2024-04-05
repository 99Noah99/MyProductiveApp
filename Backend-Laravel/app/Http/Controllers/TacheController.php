<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Model;
use Illuminate\Support\Facades\DB;

class TacheController extends Controller
{
    public function getGroupe(){
        $groupes = DB::table("groupes")->get();
        return ['status' => true, 'groupes' => $groupes];      
    }
}
