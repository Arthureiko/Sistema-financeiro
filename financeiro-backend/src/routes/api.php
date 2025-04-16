<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ContaPagarController;
use App\Http\Controllers\ContaReceberController;
use Illuminate\Support\Facades\Log;

Route::apiResource('categorias', CategoriaController::class);

Route::apiResource('contas-pagar', ContaPagarController::class);
Route::post('contas-pagar/{id}/liquidar', [ContaPagarController::class, 'liquidar']);
Route::post('contas-pagar/{id}/desfazer-liquidacao', [ContaPagarController::class, 'desfazerLiquidacao']);
