"use client";

import { useEffect, useState } from "react";
import { api } from "../services/api";

type Categoria = {
  id: number;
  nome: string;
};

type ModalProps = {
  onClose: () => void;
  fetchCategorias: () => void;
  categoria: Categoria | null;
  modoEdicao: boolean;
};

export default function ModalCategorias({
  onClose,
  fetchCategorias,
  categoria,
  modoEdicao,
}: ModalProps) {
  const [nome, setNome] = useState("");

  const salvarCategoria = async () => {
    if (!nome.trim()) return;
    const payload = {
      nome,
    };

    try {
      if (modoEdicao && categoria) {
        await api.put(`/categorias/${categoria.id}`, payload);
        alert("Categoria editada com sucesso!");
      } else {
        await api.post("/categorias", payload);
        alert("Categoria cadastrada com sucesso!");
      }

      fetchCategorias();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  useEffect(() => {
    if (modoEdicao && categoria) {
      setNome(categoria.nome);
    } else {
      setNome("");
    }
  }, [modoEdicao, categoria]);

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
          {modoEdicao ? "Editar categoria" : "Criar nova categoria"}
        </h3>

        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da categoria"
          className="border p-2 w-full rounded mb-4"
        />

        <div className="flex justify-end">
          <button
            onClick={salvarCategoria}
            className="bg-[#FFA947] text-white px-4 py-2 rounded hover:bg-[#e69439] cursor-pointer"
          >
            {modoEdicao ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
