<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Groupes;
use Illuminate\Support\Facades\DB;

class TacheController extends Controller
{
    public function getGroupes(Request $request){
        $groupes = Groupes::where("Id_User", $request->user['Id_User'])->get();
        return ['status' => true, 'groupes' => $groupes];      
    }

}
