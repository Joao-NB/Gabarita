import { gerarQuizOpenAI } from '../utils/openai.js';

export const gerarQuiz = async (req, res) => {
  const { materia, assunto } = req.body;

  if (!materia || !assunto) {
    return res.status(400).json({ error: 'Matéria e assunto são obrigatórios' });
  }

  try {
    const quiz = await gerarQuizOpenAI(materia, assunto);
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao gerar quiz' });
  }
};
