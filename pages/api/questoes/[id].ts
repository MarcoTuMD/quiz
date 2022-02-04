import questoes from "../bancoDeQuestoes";

export default function handler(req, res) {
  const idSelecionado = +req.query.id;

  const questaoUnica = questoes.filter(
    (questao) => questao.id === idSelecionado
  );

  if (questaoUnica.length === 1) {
    const questaoSelecionada = questaoUnica[0];

    res.status(200).json(questaoSelecionada.embaralharRespostas().paraObjeto());
  } else {
    res.status(204).send();
  }
}
