<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupes extends Model
{
    use HasFactory;

    protected $table = 'Groupes';
    protected $primaryKey = 'Id_Groupe';

    protected $guarded = []; // Ne protège aucune colonne, permet le create

    public function Taches(){        
        return $this->hasMany(Taches::class, 'Id_Groupe', 'Id_Groupe');
    }

    public function User(){        
        return $this->belongsTo(User::class, 'Id_User', 'Id_User');
    }
}
