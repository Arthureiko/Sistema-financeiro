<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;

class ContaPagarController extends Controller
{
    public function index() {
        return ContaPagar::all();
    }

    public function store(Request $request) {
        return ContaPagar::create($request->all());
    }

    public function show($id) {
        return ContaPagar::findOrFail($id);
    }

    public function update(Request $request, $id) {
        $conta = ContaPagar::findOrFail($id);
        $conta->update($request->all());
        return $conta;
    }

    public function destroy($id) {
        ContaPagar::destroy($id);
        return response()->json(null, 204);
    }

    public function liquidar($id) {
        $conta = ContaPagar::findOrFail($id);
        $conta->status = 'pago';
        $conta->data_pagamento = now();
        $conta->save();
        return $conta;
    }

    public function desfazerLiquidacao($id) {
        $conta = ContaPagar::findOrFail($id);
        $conta->status = 'pendente';
        $conta->data_pagamento = null;
        $conta->save();
        return $conta;
    }
}
