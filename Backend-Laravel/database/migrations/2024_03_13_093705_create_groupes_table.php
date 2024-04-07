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
        Schema::create('groupes', function (Blueprint $table) {
            $table->id('Id_Groupe');
            $table->string('Nom_Groupe');
            $table->string('Description');
            $table->foreignId('Id_User')->foreign()->references('Id_User')->on('users');
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groupes');
    }
};
