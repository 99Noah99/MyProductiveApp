<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'Nom' => 'required|string',
            'Prenom' => 'required|string',
            'Identifiant' => 'required|string',
            'Password' => 'required|string| min:3'
        ],
        [
            'Nom.required' => 'Le Nom est requis.',
            'Prenom.required' => 'Le Prenom est requis.',
            'Identifiant.required' => "L'identifiant est requis.",
            'Password.required' => 'Le mot de passe est requis.',
            'Password.min' => 'Le mot de passe doit avoir au moins :min caractères.',
        ]);

        if ($validator->fails()) {
            return ['message_erreur' => $validator->messages(), 
                    'status' => false
                ];
        } 
        elseif(User::where("Identifiant", $request->Identifiant)->exists()){
            return ['message_erreur' => 'Identifiant déjà pris veuillez en choisir un autre.', 
                    'status' => false];
        }
        else {
            $user = User::create([
                "Nom" => $request->Nom,
                "Prenom" => $request->Prenom,
                "Identifiant" => $request->Identifiant,
                "Password" => Hash::make($request->Password),
            ]);
            $token = $user->createToken($request->deviceName)->plainTextToken;
            
            return ['status' => true, 'user' => $user, 'token' => $token];
        } 
    }


    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'Identifiant' => 'required|string',
            'Password' => 'required|string| min:3'
        ],
        [
            'Identifiant.required' => "L'identifiant est requis.",
            'Password.required' => 'Le mot de passe est requis.',
            'Password.min' => 'Le mot de passe doit avoir au moins :min caractères.',
        ]);

        if ($validator->fails()) {
            return ['message_erreur' => $validator->messages(), 
                    'status' => false
                ];
        }
        else {
            if(User::where("Identifiant", $request->Identifiant)->doesntExist()){
                return [ 'status' => false, 'message_erreur' => "Ce compte n'existe pas"];
            }
            else {
                $user = User::where("Identifiant", $request->Identifiant)->first();

                if($user && Hash::check($request->Password, $user->Password)){
                    $token = $user->createToken($request->deviceName)->plainTextToken;
                    return ['status' => true, 'user' => $user, 'token' => $token];
                }
                else{
                    if(!$user && !Hash::check($request->Password, $user->Password)){
                        return [ 'status' => false, 'message_erreur' => 'Identifiant et mot de passe incorrect'];
                    }
                    elseif(!$user){
                        return [ 'status' => false, 'message_erreur' => 'Identifiant incorrect'];
                    }
                    else{
                        return [ 'status' => false, 'message_erreur' => 'Mot de passe incorrect'];
                    }
                }
            }
 
        }
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->tokens()->delete();
        return ["status" => true, 'message' => "suppression token réussi"];
    }

}
