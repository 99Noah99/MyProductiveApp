<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taches extends Model
{
    use HasFactory;

    protected $table = 'Taches';
    protected $primaryKey = 'Id_Tache';

    public function User(){        
        return $this->belongsTo(User::class, 'Id_User', 'Id_User');
    }

    public function Groupes(){        
        return $this->belongsTo(Groupes::class, 'Id_Groupe', 'Id_Groupe');
    }
}
