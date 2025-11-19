import React from "react";
import OrderList from "./components/OrderList";

/**
 * App principal do micro-pedido.
 * Exportado como default para ser exposto via Module Federation.
 */
export default function App() {
  return (
    <div>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        Este micro escuta os eventos de "Adicionar ao pedido" enviados pelo Cardápio.
      </p>
      <OrderList />
    </div>
  );
}
