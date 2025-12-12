import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function gerarQuizGemini(materia, assunto) {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash"
    });

    const prompt = `
      Gere um quiz ENEM com 5 questões sobre:
      Matéria: ${materia}
      Assunto: ${assunto}

      Responda SOMENTE com JSON puro, sem explicações, sem markdown.
      Formato exato:
      [
        {
          "pergunta": "...",
          "opcoes": ["A", "B", "C", "D"],
          "correta": "A"
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    let texto = result.response.text();

    // 🔥 Remove markdown antes de fazer JSON.parse
    texto = texto
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(texto);

  } catch (error) {
    console.error("❌ ERRO AO GERAR QUIZ:", error);
    throw error;
  }
}
