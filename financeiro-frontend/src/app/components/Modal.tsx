"use client";

import { useEffect, useState } from "react";
import { api } from "../services/api";

type Categoria = {
  id: number;
  nome: string;
};

type Conta = {
  id: number;
  descricao: string;
  valor: number;
  vencimento: string;
  status_pagamento: number;
  categoria_id: number;
};

type ModalProps = {
  onClose: () => void;
  carregarContas: () => void;
  categorias: Categoria[];
  modoEdicao: boolean;
  contaSelecionada: Conta | null;
};

export default function Modal({
  onClose,
  carregarContas,
  categorias,
  contaSelecionada,
  modoEdicao,
}: ModalProps) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [statusPagamento, setStatusPagamento] = useState<number | "">("");
  const [categoriaId, setCategoriaId] = useState<number | "">("");

  const salvarConta = async () => {
    if (
      !descricao.trim() ||
      !valor ||
      !vencimento ||
      statusPagamento === "" ||
      categoriaId === ""
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      descricao,
      valor: parseFloat(valor),
      vencimento,
      status_pagamento: statusPagamento,
      categoria_id: categoriaId,
    };

    try {
      if (modoEdicao && contaSelecionada) {
        await api.put(`/contas-pagar/${contaSelecionada.id}`, payload);
        alert("Conta atualizada com sucesso!");
      } else {
        await api.post("/contas-pagar", payload);
        alert("Conta criada com sucesso!");
      }

      carregarContas();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar conta:", error);
    }
  };

  useEffect(() => {
    if (modoEdicao && contaSelecionada) {
      setDescricao(contaSelecionada.descricao);
      setValor(contaSelecionada.valor.toString());
      setVencimento(contaSelecionada.vencimento);
      setStatusPagamento(contaSelecionada.status_pagamento);
      setCategoriaId(contaSelecionada.categoria_id);
    } else {
      setDescricao("");
      setValor("");
      setVencimento("");
      setStatusPagamento("");
      setCategoriaId("");
    }
  }, [modoEdicao, contaSelecionada]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 text-3xl cursor-pointer"
        >
          ×
        </button>

        <h3 className="text-lg font-semibold mb-4">
          {modoEdicao ? "Editar Conta" : "Nova Conta"}
        </h3>

        <input
          type="text"
          placeholder="Descrição"
          className="border p-2 mb-2 w-full"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          className="border p-2 mb-2 w-full"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 mb-2 w-full"
          value={vencimento}
          onChange={(e) => setVencimento(e.target.value)}
        />

        <select
          className="border p-2 mb-2 w-full"
          value={statusPagamento}
          onChange={(e) => setStatusPagamento(parseInt(e.target.value))}
        >
          <option value="">Selecione o Status</option>
          <option value={1}>Pago</option>
          <option value={2}>Pendente</option>
          <option value={3}>Vencido</option>
        </select>

        <select
          className="border p-2 mb-4 w-full"
          value={categoriaId}
          onChange={(e) => setCategoriaId(parseInt(e.target.value))}
        >
          <option value="">Selecione a Categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={salvarConta}
            className="bg-[#FFA947] text-white px-4 py-2 rounded hover:bg-[#e69439] cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
