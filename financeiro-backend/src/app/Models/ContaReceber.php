<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContaReceber extends Model
{
    protected $fillable = [
        'descricao',
        'valor',
        'vencimento',
        'status',
        'data_pagamento',
        'categoria_id'
    ];
}
