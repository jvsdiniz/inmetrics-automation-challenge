export function gerarId(tamanho = 16) {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";

  for (let i = 0; i < tamanho; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres[randomIndex];
  }

  return resultado;
}

export function gerarBodyVazio() {
  return {};
}