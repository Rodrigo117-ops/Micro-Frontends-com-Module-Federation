import React from "react";
import MenuList from "./components/MenuList";

/**
 * App principal do micro-cardápio.
 * Exportado como default para ser exposto via Module Federation.
 */
export default function App() {
  return (
    <div>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        Clique em "Adicionar ao pedido" para enviar itens ao micro do Pedido.
      </p>
      <MenuList />
    </div>
  );
}
