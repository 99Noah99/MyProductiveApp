<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::create('taches', function (Blueprint $table) {
            $table->id('Id_Tache');
            $table->string('Intitule');
            $table->string('Statut');
            $table->dateTime('Date_ajout', $precision = 0);
            $table->foreignId('Id_User')->foreign()->references('Id_User')->on('User');
            $table->foreignId('Id_Groupe')->foreign()->references('Id_Groupe')->on('Groupe');
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taches');
    }
};
