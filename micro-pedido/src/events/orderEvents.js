// Helper simples para comunicação entre micros usando eventos globais.
// Ele encapsula o uso de window.dispatchEvent e window.addEventListener,
// deixando o código dos componentes mais limpo.

const ORDER_EVENT = "order:add";

/**
 * Emite um evento global informando que um novo item foi adicionado ao pedido.
 * @param {{ id: number, nome: string, descricao: string, preco: number }} item
 */
export function emitAddToOrder(item) {
  window.dispatchEvent(
    new CustomEvent(ORDER_EVENT, {
      detail: item,
    })
  );
}

/**
 * Assina o evento global de novo item no pedido.
 * @param {(item: any) => void} callback
 * @returns {() => void} Função de cleanup para remover o listener.
 */
export function subscribeToOrder(callback) {
  const handler = (event) => {
    callback(event.detail);
  };

  window.addEventListener(ORDER_EVENT, handler);

  // Retorna função para desinscrever
  return () => {
    window.removeEventListener(ORDER_EVENT, handler);
  };
}
