<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Groupes;
use App\Models\Taches;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;


class TacheController extends Controller
{
    public function getGroupes(Request $request){
        $groupes = Groupes::select('*', DB::raw('(SELECT COUNT(*) FROM taches WHERE taches.Id_Groupe = groupes.Id_Groupe) as nombre_taches'))
                    ->where("Id_User", $request->user()->Id_User)
                    ->get();
    return ['status' => true, 'groupes' => $groupes];      
    }

    public function getTaches(Request $request){
        // Vérifie si la requête contient l'élément "groupes"
        if ($request->has('Id_Groupe')) {
            $taches = Taches::where('Id_User', $request->user()->Id_User) ->where('Id_Groupe', $request->Id_Groupe)->get();
            return ['status' => true, 'taches' => $taches, 'message' => 'cic']; 
        } else {
            $taches = Taches::where('Id_User', $request->user()->Id_User) ->where('Id_Groupe', null)->get();
            return ['status' => true, 'taches' => $taches, 'message' => 'pas bon']; 
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


    public function createGroupe(Request $request){
        $validator = Validator::make($request->all(), [
            'Nom_Groupe' => 'required|string',
            'Description' => 'required|string',          
        ],
        [
            'Nom_Groupe.required' => "Le nom du groupe est requis !",
            'Description.required' => "La Description du groupe est requise !",
        ]);

        if ($validator->fails()) {
            return ['message_erreur' => $validator->messages(), 
                    'status' => false
                ];
        }
        else{
            Groupes::create([
                "Nom_Groupe" => $request->Nom_Groupe,
                "Description" => $request->Description,
                "Id_User" => $request->user['Id_User'],
            ]);
            return ['status' => true];   
        }
    }

    public function deleteGroupe(Request $request){
        Taches::where("Id_User", $request->user['Id_User'])
        ->where("Id_Groupe", $request->groupe['Id_Groupe'])
        ->delete();

        Groupes::where("Id_User", $request->user['Id_User'])
            ->where("Id_Groupe", $request->groupe['Id_Groupe'])
            ->delete();

        return ['status' => true]; 
    }

    public function deleteTache(Request $request){
        try {
            $affectedRows = Taches::where("Id_User", $request->user()->Id_User)
                ->where("Id_Tache", $request->tache)
                ->delete();
    
            if ($affectedRows > 0) {
                return ['status' => true, 'message' => 'La tâche a été supprimée avec succès.'];
            } else {
                return ['status' => false, 'message' => 'La tâche spécifiée n\'a pas été trouvée ou n\'a pas été supprimée.'];
            }
        } catch (QueryException $e) {
            // Gestion des erreurs de la base de données
            Log::error("Erreur lors de la suppression de la tâche: " . $e->getMessage());
            return ['status' => false, 'message' => 'Une erreur est survenue lors de la suppression de la tâche. Veuillez réessayer plus tard.'];
        } catch (\Exception $e) {
            // Gestion des autres erreurs
            Log::error("Une erreur inattendue est survenue: " . $e->getMessage());
            return ['status' => false, 'message' => 'Une erreur inattendue est survenue. Veuillez réessayer plus tard.'];
        }
    }

    public function AssignTacheToGroupe(Request $request){
        Taches::where("Id_Tache", $request->Tache["Id_Tache"])
            ->update(["Id_Groupe" => $request->groupe]);
        return ['status' => true, 'message' => 'La tâche a été assignée à un groupe avec succès.'];

    }

}
