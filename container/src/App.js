import React, { Suspense } from "react";

// Importação dinâmica dos micros via Module Federation.
// O nome "cardapio/MenuApp" e "pedido/OrderApp" vem do webpack.config.js do container.
const MenuApp = React.lazy(() => import("cardapio/MenuApp"));
const OrderApp = React.lazy(() => import("pedido/OrderApp"));

/**
 * Aplicação container.
 * Responsável por montar o layout principal e carregar os micros.
 */
export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          marginBottom: "2rem",
          padding: "1rem 1.5rem",
          backgroundColor: "#222",
          color: "#fff",
          borderRadius: "8px",
        }}
      >
        <h1>🍽️ Restaurante Micro-Frontend</h1>
        <p style={{ marginTop: "0.5rem" }}>
          Container integrando <strong>Cardápio</strong> e <strong>Pedido</strong> via Module Federation.
        </p>
      </header>

      <Suspense fallback={<p>Carregando micros...</p>}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "1.5rem",
            alignItems: "flex-start",
          }}
        >
          <section
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "1rem 1.5rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Cardápio</h2>
            <MenuApp />
          </section>

          <section
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              padding: "1rem 1.5rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <h2>Pedido</h2>
            <OrderApp />
          </section>
        </div>
      </Suspense>
    </div>
  );
}
