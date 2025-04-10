<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Categoria;

class ContaReceber extends Model
{
    protected $table = 'contas_a_receber';

    protected $fillable = [
        'descricao',
        'valor',
        'vencimento',
        'status_pagamento',
        'categoria_id'
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
