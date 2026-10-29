import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { ScenePreview } from "@/components/scene-preview";
import { FutureButton, Progress } from "@/components/ui";
export const metadata: Metadata = {
  title: "Operação segura no vazamento de aço | Virteon Industry",
};

export default function TrainingPage() {
  return (
    <>
      <Link href="/industry#treinamentos" className="back-link">
        ← Voltar para treinamentos
      </Link>
      <div className="page-heading">
        <div>
          <span className="eyebrow">INDUSTRY / ACIARIA</span>
          <h1>Operação segura no vazamento de aço</h1>
          <p>
            Prepare-se para reconhecer riscos e executar o procedimento com
            segurança.
          </p>
        </div>
      </div>
      <div className="training-layout">
        <div>
          <ScenePreview />
          <section className="practice-section">
            <h2>O que você vai praticar</h2>
            <ul>
              {[
                "Reconhecer os riscos térmicos e a zona de exclusão do vazamento.",
                "Inspecionar EPIs, equipamentos e condições da área.",
                "Executar a sequência operacional e responder a desvios.",
              ].map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="panel practice-journey">
            <div className="flex justify-between items-center gap-4">
              <h2>Sua jornada de prática</h2>
              <span className="text-accent micro">3 de 5 concluídas</span>
            </div>
            <ol>
              {[
                ["Reconhecimento da área", "4 min"],
                ["Inspeção de EPIs", "4 min"],
                ["Verificação dos equipamentos", "5 min"],
                ["Isolamento e vazamento", "7 min"],
                ["Resposta a desvios e avaliação", "5 min"],
              ].map(([title, time], i) => (
                <li className={i === 3 ? "current" : ""} key={title}>
                  <span className={`step-number ${i < 3 ? "done" : ""}`}>
                    {i < 3 ? <Icon name="check" /> : i + 1}
                  </span>
                  <span>{title}</span>
                  <small>{time}</small>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside className="training-aside">
          <section className="panel training-status">
            <div className="flex justify-between items-center gap-4">
              <span className="tag cyan">EM ANDAMENTO</span>
              <strong className="text-accent">60%</strong>
            </div>
            <Progress value={60} />
            <dl>
              {[
                ["clock", "Duração estimada", "25 minutos"],
                ["book", "Nível", "Intermediário"],
                ["compass", "Aprovação mínima", "80%"],
                ["report", "Prazo", "30 out. 2026"],
              ].map(([icon, label, value]) => (
                <div key={label}>
                  <dt>
                    <Icon name={icon} />
                    {label}
                  </dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <FutureButton
              className="btn primary"
              message="Simulação Web em desenvolvimento. O progresso demonstrativo está na etapa 4: Isolamento e vazamento."
            >
              <Icon name="monitor" />
              Continuar na Web
            </FutureButton>
            <FutureButton
              className="btn secondary"
              message="Integração VR em desenvolvimento. Será necessário um headset compatível."
            >
              <Icon name="headset" />
              Iniciar em VR
            </FutureButton>
            <p>
              Seu progresso é o mesmo nas duas modalidades. VR requer um
              dispositivo compatível.
            </p>
          </section>
          <section className="panel competencies-focus">
            <h2>Competências em foco</h2>
            <ul>
              {[
                "Identificação de riscos",
                "Uso correto de EPIs",
                "Procedimento operacional",
                "Resposta a emergências",
              ].map((item) => (
                <li key={item}>
                  <Icon name="shield" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <div className="info-note">
            <Icon name="help" />
            <span>
              Ambiente simulado para aprendizagem. A prática não substitui as
              normas e os procedimentos da sua unidade.
            </span>
          </div>
        </aside>
      </div>
    </>
  );
}
