<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;

class ContaReceberController extends Controller
{
    public function index()
    {
        return ContaReceber::all();
    }

    public function store(Request $request)
    {
        return ContaReceber::create($request->all());
    }

    public function show($id)
    {
        return ContaReceber::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $conta = ContaReceber::findOrFail($id);
        $conta->update($request->all());
        return $conta;
    }

    public function destroy($id)
    {
        ContaReceber::destroy($id);
        return response()->json(null, 204);
    }

    public function liquidar($id)
    {
        $conta = ContaReceber::findOrFail($id);
        $conta->status = 'recebido';
        $conta->data_pagamento = now();
        $conta->save();
        return $conta;
    }

    public function desfazerLiquidacao($id)
    {
        $conta = ContaReceber::findOrFail($id);
        $conta->status = 'pendente';
        $conta->data_pagamento = null;
        $conta->save();
        return $conta;
    }
}
