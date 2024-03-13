<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
    use HasFactory;

    protected $table = 'Groupe';
    protected $primaryKey = 'Id_Groupe';

    public function Tache(){        
        return $this->hasMany(Tache::class, 'Id_Groupe', 'Id_Groupe');
    }
}
