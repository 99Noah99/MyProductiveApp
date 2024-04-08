<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Groupes;
use App\Models\Taches;
use Illuminate\Support\Facades\Validator;

class TacheController extends Controller
{
    public function getGroupes(Request $request){
        $groupes = Groupes::where("Id_User", $request->user['Id_User'])->get();
        return ['status' => true, 'groupes' => $groupes];      
    }

    public function getTaches(Request $request){
        // Vérifie si la requête contient l'élément "groupes"
        if ($request->has('groupe')) {
            $taches = Taches::where('Id_User', $request->user['Id_User']) ->where('Id_Groupe', $request->groupe)->get();
            return ['status' => true, 'taches' => $taches]; 
        } else {
            $taches = Taches::where('Id_User', $request->user['Id_User']) ->where('Id_Groupe', null)->get();
            return ['status' => true, 'taches' => $taches]; 
        }
    }

    public function createTache(Request $request){
        $validator = Validator::make($request->all(), [
            'TacheIntitule' => 'required|string',
            'statut' => 'required|string',
            'groupe' => 'required|int',           
        ],
        [
            'TacheIntitule.required' => "L'intitulé de la tâche est requis",
            'statut.required' => 'Le status de la tâche est requis',
            'groupe.required' => "Veuillez choisir d'attribuer ou non la tâche",
        ]);

        if ($validator->fails()) {
            return ['message_erreur' => $validator->messages(), 
                    'status' => false
                ];
        }
        elseif ($request->groupe == -1){
            Taches::create([
                "Intitule" => $request->TacheIntitule,
                "Statut" => $request->statut,
                "Date_Ajout" => Carbon::now(),
                "Id_User" => $request->user['Id_User'],
            ]);
            return ['status' => true];   
        }
        else{
            Taches::create([
                "Intitule" => $request->TacheIntitule,
                "Statut" => $request->statut,
                "Date_Ajout" => Carbon::now(),
                "Id_User" => $request->user['Id_User'],
                "Id_Groupe" => $request->groupe
            ]);
            return ['status' => true];   
        }
    }

}
