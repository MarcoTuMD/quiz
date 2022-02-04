import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Botao from "../components/Botao";
import Questao from "../components/Questao";
import Questionario from "../components/Questionario";
import QuestaoModel from "../model/questao";
import RespostaModel from "../model/resposta";

const BASE_URL = "http://localhost:3000/api";

export default function Home() {
  const router = useRouter();

  const [idsQuestoes, setIdsQuestoes] = useState<number[]>([]);
  const [questao, setQuestao] = useState<QuestaoModel>();
  const [respostasCertas, setRespostasCertas] = useState<number>(0);

  async function carregarQuestoesIds() {
    const resp = await fetch(`${BASE_URL}/questionario`);
    const idsQuestoes = await resp.json();
    setIdsQuestoes(idsQuestoes);
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`);
    const questao = await resp.json();
    const novaQuestao = QuestaoModel.criarUsandoObjeto(questao);
    setQuestao(novaQuestao);
  }

  useEffect(() => {
    carregarQuestoesIds();
  }, []);

  useEffect(() => {
    idsQuestoes.length > 0 && carregarQuestao(idsQuestoes[0]);
  }, [idsQuestoes]);

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida);
    const certa = questaoRespondida.acertou;
    setRespostasCertas(respostasCertas + (certa ? 1 : 0));
  }

  function idPorximaPergunta() {
    const proximoIndice = idsQuestoes.indexOf(questao.id) + 1;
    return idsQuestoes[proximoIndice];
  }

  function irParaOProximoPasso() {
    const proximoId = idPorximaPergunta();
    proximoId ? irParaProximaQuestao(proximoId) : finalizar();
  }

  function irParaProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId);
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsQuestoes.length,
        certas: respostasCertas,
      },
    });
  }

  return questao ? (
    <Questionario
      questao={questao}
      ultima={idPorximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irParaOProximoPasso={irParaOProximoPasso}
    />
  ) : (
    false
  );
}
