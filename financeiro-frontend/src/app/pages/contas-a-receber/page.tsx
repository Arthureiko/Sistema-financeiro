"use client";

import { useEffect, useState } from "react";
import { api } from "../../services/api";
import ModalReceber from "../../components/ModalReceber";

type Conta = {
  id: number;
  descricao: string;
  valor: number;
  vencimento: string;
  status_pagamento: number;
  categoria_id: number;
};

type Categoria = {
  id: number;
  nome: string;
};

export default function ContasReceber() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [contaSelecionada, setContaSelecionada] = useState<Conta | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const carregarContas = async () => {
    const { data } = await api.get("/contas-receber");
    setContas(data);
  };

  const abrirModal = (conta?: Conta) => {
    if (conta) {
      setModoEdicao(true);
      setContaSelecionada(conta);
    } else {
      setModoEdicao(false);
      setContaSelecionada(null);
    }
    setModalAberto(true);
  };

  const deletarCategoria = async (id: number) => {
    const confirmar = confirm("Tem certeza que deseja excluir esta categoria?");
    if (!confirmar) return;

    try {
      await api.delete(`/contas-receber/${id}`);
      alert("Conta deletada com sucesso!");

      carregarContas();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  };

  useEffect(() => {
    carregarContas();
    api.get("/categorias").then((res) => {
      setCategorias(res.data);
    });
  }, []);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Contas a Receber</h2>
        <button
          onClick={() => abrirModal()}
          className="bg-[#FFA947] text-white px-4 py-2 rounded hover:bg-[#e69439] cursor-pointer"
        >
          Nova Conta
        </button>
      </div>

      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Descrição</th>
            <th className="p-3">Valor</th>
            <th className="p-3">Vencimento</th>
            <th className="p-3">Status</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {contas.map((conta) => (
            <tr key={conta.id} className="border-t">
              <td className="p-3">{conta.descricao}</td>
              <td className="p-3">R$ {conta.valor}</td>
              <td className="p-3">{conta.vencimento}</td>
              <td className="p-3">
                {conta.status_pagamento === 1 && (
                  <span className="text-green-600 font-semibold">Pago</span>
                )}
                {conta.status_pagamento === 2 && (
                  <span className="text-orange-600 font-semibold">
                    Pendente
                  </span>
                )}
                {conta.status_pagamento === 3 && (
                  <span className="text-red-600 font-semibold">Vencido</span>
                )}
              </td>
              <td className="p-3 space-x-2 flex gap-2">
                <button
                  onClick={() => abrirModal(conta)}
                  className="bg-[#FFA947] text-white px-4 py-2 rounded hover:bg-[#e69439] cursor-pointer"
                >
                  Editar
                </button>

                <button
                  onClick={() => deletarCategoria(conta.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAberto && (
        <ModalReceber
          onClose={() => setModalAberto(false)}
          carregarContas={carregarContas}
          categorias={categorias}
          contaSelecionada={contaSelecionada}
          modoEdicao={modoEdicao}
        />
      )}
    </main>
  );
}
