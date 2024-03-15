<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request){
        //dd($request);
        $validator = Validator::make($request->all(), [
            'Nom' => 'required|string',
            'Prenom' => 'required|string',
            'Identifiant' => 'required|string',
            'Password' => 'required|string| min:3'
        ]);

        if ($validator->fails()) {
            return ['message_erreur' => $validator->messages([
                                        'Nom.required' => 'Le Nom est requis.',
                                        'Prenom.required' => 'Le Prenom est requis.',
                                        'Identifiant.required' => "L'identifiant est requis.",
                                        'Password.required' => 'Le mot de passe est requis.',
                                        'Password.min' => 'Le mot de passe doit avoir au moins :min caractères.',
                                        ]), 
                    'status' => false
                ];
        } 
        // else {
        //     $user = User::create([
        //         "Nom" => $request->Nom,
        //         "Prenom" => $request->Prenom,
        //         "Identifiant" => $request->username,
        //         "Password" => Hash::make($request->Password),
        //     ]);
        //     $token = $user->createToken($deviceName)->PlainTextToken;
        //     return ['status' => true];
            
        // } 
    }

    public function testAPI(){
        return ['message' => "LA REQUETE A MARCHER"];
    }    
}
