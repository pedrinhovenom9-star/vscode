"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    categoria: "",
    tamanho: "",
    cor: "",
    estoque: "",
  });

  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  const total = useMemo(() => {
    return carrinho.reduce(
      (acc, item) => acc + Number(item.preco) * item.qtd,
      0
    );
  }, [carrinho]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const carregarProdutos = async () => {
    const { data } = await supabase.from("produtos").select("*");
    setProdutos(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await supabase.from("produtos").insert([produto]);

    setProduto({
      nome: "",
      preco: "",
      categoria: "",
      tamanho: "",
      cor: "",
      estoque: "",
    });

    carregarProdutos();
  };

  const adicionarAoCarrinho = (p) => {
    setCarrinho((prev) => {
      const existe = prev.find((i) => i.id === p.id);
      if (existe) {
        return prev.map((i) =>
          i.id === p.id ? { ...i, qtd: i.qtd + 1 } : i
        );
      }
      return [...prev, { ...p, qtd: 1 }];
    });
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
  <div className="min-h-screen bg-white text-black">

    {/* HEADER */}
    <header className="flex justify-between items-center px-10 py-6 border-b">
      <h1 className="text-2xl font-bold tracking-wide">NIKE STORE</h1>
      <div className="text-sm font-medium">
        🛒 {carrinho.length}
      </div>
    </header>

    <div className="max-w-7xl mx-auto px-10 py-10 grid md:grid-cols-4 gap-10">

      {/* FORM (clean) */}
      <div className="col-span-1">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
          Novo Produto
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input name="nome" value={produto.nome} onChange={handleChange}
            placeholder="Nome"
            className="border-b border-gray-300 p-2 focus:border-black outline-none"/>

          <input name="preco" value={produto.preco} onChange={handleChange}
            placeholder="Preço"
            className="border-b border-gray-300 p-2 focus:border-black outline-none"/>

          <input name="categoria" value={produto.categoria} onChange={handleChange}
            placeholder="Categoria"
            className="border-b border-gray-300 p-2"/>

          <input name="tamanho" value={produto.tamanho} onChange={handleChange}
            placeholder="Tamanho"
            className="border-b border-gray-300 p-2"/>

          <input name="cor" value={produto.cor} onChange={handleChange}
            placeholder="Cor"
            className="border-b border-gray-300 p-2"/>

          <input name="estoque" value={produto.estoque} onChange={handleChange}
            placeholder="Estoque"
            className="border-b border-gray-300 p-2"/>

          <button className="mt-4 bg-black text-white py-3 text-sm tracking-wide hover:opacity-80">
            SALVAR
          </button>
        </form>
      </div>

      {/* PRODUTOS */}
      <div className="col-span-3">

        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-8">
          Produtos
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {produtos.map((p) => (
            <div key={p.id} className="group">

              {/* IMAGEM */}
              <div className="h-56 bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition">
                <span className="text-gray-400 text-sm">Produto</span>
              </div>

              {/* INFO */}
              <h3 className="font-medium">{p.nome}</h3>

              <p className="text-sm text-gray-500">
                {p.categoria}
              </p>

              <p className="mt-1 font-semibold">
                R$ {p.preco}
              </p>

              {/* BOTÃO DISCRETO */}
              <button
                onClick={() => adicionarAoCarrinho(p)}
                className="mt-3 text-sm underline hover:opacity-70"
              >
                Adicionar ao carrinho
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>

    {/* CARRINHO MINIMALISTA */}
    <div className="fixed bottom-6 right-6 bg-white border p-4 w-64 text-sm">
      <h2 className="font-medium mb-2">Carrinho</h2>

      {carrinho.length === 0 && (
        <p className="text-gray-400">Vazio</p>
      )}

      {carrinho.map((item) => (
        <div key={item.id} className="flex justify-between mb-1">
          <span>{item.nome}</span>
          <span>x{item.qtd}</span>
        </div>
      ))}

      <div className="border-t mt-2 pt-2 font-semibold">
        R$ {total.toFixed(2)}
      </div>
    </div>

  </div>
);
}