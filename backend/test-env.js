import dotenv from "dotenv";
dotenv.config();

import { listarModelos } from "./utils/gemini.js"; // Certifique-se de importar corretamente

async function test() {
  try {
    const modelos = await listarModelos();  // Chama a função para listar os modelos
    console.log("Modelos disponíveis:", JSON.stringify(modelos, null, 2));
  } catch (e) {
    console.error("ERRO:", e);
  }
}

test();
