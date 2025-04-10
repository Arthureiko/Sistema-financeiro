<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ContaPagar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContaPagarController extends Controller
{
    public function index() {
        return ContaPagar::all();
    }

    public function store(Request $request) {
        try {
            Log::info('Dados recebidos:', $request->all());
            $conta = ContaPagar::create($request->all());
            return response()->json($conta, 201);
        } catch (\Exception $e) {
            Log::error('Erro ao criar conta a pagar:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'error' => 'Erro ao criar conta a pagar',
                'message' => $e->getMessage()
            ], 500);
        }
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
        $conta->status_pagamento = true;
        $conta->save();
        return $conta;
    }

    public function desfazerLiquidacao($id) {
        $conta = ContaPagar::findOrFail($id);
        $conta->status_pagamento = false;
        $conta->save();
        return $conta;
    }
}
