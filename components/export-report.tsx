"use client";
import { Icon } from "./icons";
export function ExportReport() {
  function download() {
    const data =
      "\uFEFFRelatório demonstrativo Virteon Industry\r\nParticipante;João Martins\r\nTreinamento;Operação segura no vazamento de aço\r\nData;28/10/2026\r\nNota final;92%\r\nDecisões corretas;23 de 25\r\nTempo;18min 42s\r\nIdentificação de riscos;100%\r\nUso correto de EPIs;96%\r\nProcedimento operacional;88%\r\nResposta a emergências;84%\r\n";
    const url = URL.createObjectURL(
      new Blob([data], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "virteon-relatorio-joao-martins.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <button className="btn secondary" onClick={download}>
      <Icon name="download" />
      Exportar relatório
    </button>
  );
}
