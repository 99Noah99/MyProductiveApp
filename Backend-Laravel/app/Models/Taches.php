<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taches extends Model
{
    use HasFactory;

    protected $table = 'taches';
    protected $primaryKey = 'Id_Tache';

    protected $guarded = []; // Ne protège aucune colonne, permet le create

    public function User()
    {
        return $this->belongsTo(User::class, 'Id_User', 'Id_User');
    }

    public function Groupes()
    {
        return $this->belongsTo(Groupes::class, 'Id_Groupe', 'Id_Groupe');
    }
}
