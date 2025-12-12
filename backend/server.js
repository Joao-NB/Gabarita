import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { gerarQuizGemini } from "./utils/gemini.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/quiz", async (req, res) => {
  try {
    const { materia, assunto } = req.body;

    if (!materia || !assunto) {
      return res.status(400).json({ error: "Matéria e assunto são obrigatórios" });
    }

    const questoes = await gerarQuizGemini(materia, assunto);

    res.json({ questoes });

  } catch (error) {
    console.error("ERRO AO GERAR QUIZ:", error);
    res.status(500).json({ error: "Erro ao gerar quiz" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
);
