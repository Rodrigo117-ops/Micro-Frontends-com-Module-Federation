import React, { useEffect, useState } from "react";
import { subscribeToOrder } from "../events/orderEvents";

/**
 * Componente responsável por exibir os itens do pedido.
 * Ele escuta o evento global "order:add" e atualiza o estado local.
 */
export default function OrderList() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    // Inscreve no evento global. Sempre que um novo prato é adicionado,
    // o callback será chamado com o prato.
    const unsubscribe = subscribeToOrder((novoItem) => {
      setItens((prev) => [...prev, novoItem]);
    });

    // Cleanup: remove o listener quando o componente é desmontado.
    return () => {
      unsubscribe();
    };
  }, []);

  const total = itens.reduce((acc, item) => acc + (item.preco || 0), 0);

  if (itens.length === 0) {
    return <p>Nenhum item no pedido ainda. Adicione algo no cardápio! 🙂</p>;
  }

  return (
    <div>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {itens.map((item, index) => (
          <li
            key={index}
            style={{
              borderBottom: "1px solid #eee",
              padding: "0.5rem 0",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.9rem",
            }}
          >
            <span>
              {item.nome}
              <span style={{ color: "#777", marginLeft: "0.25rem" }}>
                ({item.id})
              </span>
            </span>
            <span>R$ {item.preco?.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: "0.75rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        <span>Total:</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
