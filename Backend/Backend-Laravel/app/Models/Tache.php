<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tache extends Model
{
    use HasFactory;

    protected $table = 'Tache';
    protected $primaryKey = 'Id_Tache';

    public function User(){        
        return $this->belongsTo(User::class, 'Id_User', 'Id_User');
    }

    public function Groupe(){        
        return $this->belongsTo(Groupe::class, 'Id_Groupe', 'Id_Groupe');
    }
}
