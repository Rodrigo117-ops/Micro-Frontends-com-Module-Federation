import React from "react";
import { emitAddToOrder } from "../events/orderEvents";

/**
 * Lista de pratos estáticos do restaurante.
 * Em um cenário real, isso poderia vir de uma API externa.
 */
const PRATOS = [
  {
    id: 1,
    nome: "Spaghetti à Bolonhesa",
    descricao: "Massa fresca com molho de carne e tomate.",
    preco: 32.9,
  },
  {
    id: 2,
    nome: "Filé de Frango Grelhado",
    descricao: "Acompanha arroz, salada verde e legumes salteados.",
    preco: 28.5,
  },
  {
    id: 3,
    nome: "Hambúrguer Artesanal",
    descricao: "Pão brioche, blend da casa, queijo e batatas rústicas.",
    preco: 35.0,
  },
  {
    id: 4,
    nome: "Salada Caesar",
    descricao: "Alface romana, frango em cubos, croutons e molho especial.",
    preco: 24.9,
  },
];

/**
 * Componente de cardápio.
 * Mostra os pratos e permite adicionar ao pedido emitindo um evento global.
 */
export default function MenuList() {
  const handleAdd = (prato) => {
    // Emite um evento global para que o micro de Pedido capture.
    emitAddToOrder(prato);
  };

  return (
    <div>
      {PRATOS.map((prato) => (
        <article
          key={prato.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "0.75rem 1rem",
            marginBottom: "0.75rem",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ margin: 0 }}>{prato.nome}</h3>
              <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                {prato.descricao}
              </p>
            </div>
            <strong style={{ marginLeft: "1rem" }}>
              R$ {prato.preco.toFixed(2)}
            </strong>
          </div>
          <button
            onClick={() => handleAdd(prato)}
            style={{
              marginTop: "0.5rem",
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#2d6cdf",
              color: "#fff",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Adicionar ao pedido
          </button>
        </article>
      ))}
    </div>
  );
}
