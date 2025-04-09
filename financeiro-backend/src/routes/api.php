<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ContaPagarController;
use App\Http\Controllers\ContaReceberController;

Route::apiResource('categorias', CategoriaController::class);

Route::apiResource('contas-pagar', ContaPagarController::class);
Route::post('contas-pagar/{id}/liquidar', [ContaPagarController::class, 'liquidar']);
Route::post('contas-pagar/{id}/desfazer-liquidacao', [ContaPagarController::class, 'desfazerLiquidacao']);

Route::apiResource('contas-receber', ContaReceberController::class);
Route::post('contas-receber/{id}/liquidar', [ContaReceberController::class, 'liquidar']);
Route::post('contas-receber/{id}/desfazer-liquidacao', [ContaReceberController::class, 'desfazerLiquidacao']);
