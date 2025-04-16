"use client";

import { useEffect, useState } from "react";
import ModalCategorias from "../../components/ModalCategorias";
import { api } from "../../services/api";
import { formatDate } from "../../utils/date";

type Categoria = {
  id: number;
  nome: string;
  created_at: string;
};

export default function CategoriasPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<Categoria | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const abrirModal = (categoria?: Categoria) => {
    if (categoria) {
      setModoEdicao(true);
      setCategoriaSelecionada(categoria);
    } else {
      setModoEdicao(false);
      setCategoriaSelecionada(null);
    }
    setModalAberto(true);
  };

  const fetchCategorias = async () => {
    try {
      const response = await api.get("/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletarCategoria = async (id: number) => {
    const confirmar = confirm("Tem certeza que deseja excluir esta categoria?");
    if (!confirmar) return;

    try {
      await api.delete(`/categorias/${id}`);
      alert("Categoria deletada com sucesso!");

      fetchCategorias();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Categorias</h2>
        <button
          onClick={() => abrirModal()}
          className="bg-[#FFA947] text-white px-4 py-2 rounded hover:bg-[#e69439] cursor-pointer"
        >
          Nova categoria
        </button>
      </div>

      {loading ? (
        <p>Carregando categorias...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300 rounded shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">Nome</th>
              <th className="p-2 border-b">Data de criação</th>
              <th className="p-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{categoria.id}</td>
                <td className="p-2 border-b">{categoria.nome}</td>
                <td className="p-2 border-b">
                  {formatDate(categoria.created_at)}
                </td>
                <td className="p-2 border-b flex gap-2">
                  <button
                    onClick={() => abrirModal(categoria)}
                    className="bg-[#FFA947] text-white px-4 py-2 rounded hover:bg-[#e69439] cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletarCategoria(categoria.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalAberto && (
        <ModalCategorias
          modoEdicao={modoEdicao}
          categoria={categoriaSelecionada}
          onClose={() => setModalAberto(false)}
          fetchCategorias={fetchCategorias}
        />
      )}
    </div>
  );
}
