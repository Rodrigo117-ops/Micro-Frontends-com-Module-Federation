# Micro Frontends com React e Module Federation

Este monorepo contém **três aplicações**:

- **container** – aplicação principal que carrega os micros.
- **micro-cardapio** – micro frontend responsável pelo cardápio de pratos.
- **micro-pedido** – micro frontend responsável pelo pedido (itens adicionados).

A comunicação entre os micros é feita via **eventos globais do `window`** (`CustomEvent`), e a integração é feita usando **Webpack 5 Module Federation**.

> Tecnologias usadas: React, JavaScript (sem TS), Webpack 5, Webpack Dev Server e Module Federation.

---

## 1. Estrutura de pastas

```bash
mfe-cardapio-pedido/
├── README.md
├── container/
├── micro-cardapio/
└── micro-pedido/
```

Cada pasta é uma aplicação React com seu próprio `webpack.config.js` e `package.json`.

---

## 2. Como rodar o projeto

> Requer Node 18+ (recomendado) e npm ou yarn.

### 2.1. Instalar dependências

Dentro de **cada** pasta (`container`, `micro-cardapio`, `micro-pedido`), execute:

```bash
cd container
npm install

cd ../micro-cardapio
npm install

cd ../micro-pedido
npm install
```

### 2.2. Rodar os micros

> A ordem é importante: os remotes (micros) primeiro, depois o container.

Em três terminais diferentes:

```bash
# 1) Micro Cardápio (porta 8081)
cd micro-cardapio
npm start

# 2) Micro Pedido (porta 8082)
cd micro-pedido
npm start

# 3) Container (porta 8080)
cd container
npm start
```

Depois, acesse no navegador:

- Container: http://localhost:8080
- Cardápio isolado (dev server do micro): http://localhost:8081
- Pedido isolado (dev server do micro): http://localhost:8082

Cada micro pode ser testado individualmente, e o container importa ambos via Module Federation.

---

## 3. Comunicação entre os micros

A comunicação entre **micro-cardapio** e **micro-pedido** é feita usando **eventos globais** no objeto `window`.

### 3.1. Evento usado

- Nome do evento: `order:add`
- Implementação simples usando `CustomEvent`.

No micro do **Cardápio**, quando o usuário clica em **"Adicionar ao pedido"**, o micro dispara:

```js
window.dispatchEvent(
  new CustomEvent("order:add", {
    detail: pratoSelecionado,
  })
);
```

No micro do **Pedido**, ao iniciar, ele se registra para ouvir este evento:

```js
useEffect(() => {
  const handler = (event) => {
    setItens((prev) => [...prev, event.detail]);
  };

  window.addEventListener("order:add", handler);

  return () => {
    window.removeEventListener("order:add", handler);
  };
}, []);
```

Assim, **os micros não compartilham estado diretamente**, apenas trocam mensagens via eventos globais, o que simula bem um cenário de **desacoplamento entre times**.

---

## 4. Module Federation

Cada micro e o container possuem seu próprio `webpack.config.js`.

### 4.1. Micros (remotes)

Nos micros, usamos `ModuleFederationPlugin` para **expor** seus componentes principais:

- **micro-cardapio** expõe `./MenuApp`
- **micro-pedido** expõe `./OrderApp`

Exemplo (micro-cardapio):

```js
new ModuleFederationPlugin({
  name: "cardapio",
  filename: "remoteEntry.js",
  exposes: {
    "./MenuApp": "./src/App",
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
  },
});
```

### 4.2. Container (host)

No container, configuramos os remotes:

```js
new ModuleFederationPlugin({
  name: "container",
  remotes: {
    cardapio: "cardapio@http://localhost:8081/remoteEntry.js",
    pedido: "pedido@http://localhost:8082/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
  },
});
```

E usamos `React.lazy` + `Suspense` para carregar os micros:

```js
const MenuApp = React.lazy(() => import("cardapio/MenuApp"));
const OrderApp = React.lazy(() => import("pedido/OrderApp"));
```

---

## 5. Organização de código

Cada micro possui:

- `src/App.js` – ponto principal de renderização.
- `src/components/` – componentes reutilizáveis.
- `src/events/orderEvents.js` – helper para emissão/assinatura de eventos (encapsula o uso do `window`).
- `webpack.config.js` – configuração de build, Module Federation e dev server.
- `public/index.html` – HTML base.

O código está comentado em português para facilitar o entendimento dos conceitos.

---

## 6. Resumo rápido dos comandos

Para facilitar, um resumo:

```bash
# Micro Cardápio
cd micro-cardapio
npm install
npm start

# Micro Pedido
cd micro-pedido
npm install
npm start

# Container
cd container
npm install
npm start
```

Depois abra: http://localhost:8080

---

Bom estudo e boa prática com Micro Frontends! 🚀
