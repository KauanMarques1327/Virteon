import type { Metadata } from "next";
import Link from "next/link";
import { ExportReport } from "@/components/export-report";
import { Icon } from "@/components/icons";
import { Competencies, FutureButton, Metrics } from "@/components/ui";
export const metadata: Metadata = {
  title: "Meu desempenho | Virteon Industry",
};

export default function PerformancePage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            RELATÓRIO INDIVIDUAL / SESSÃO CONCLUÍDA
          </span>
          <h1>Cada decisão constrói seu preparo.</h1>
          <p>
            Operação segura no vazamento de aço • João Martins • 28 out. 2026
          </p>
        </div>
        <ExportReport />
      </div>
      <section className="result-banner panel">
        <div className="score-ring">
          <strong>92%</strong>
          <small>NOTA FINAL</small>
        </div>
        <div className="result-copy">
          <span className="tag green">APROVADO • 5 DE 5 ETAPAS</span>
          <h2>Bom trabalho, João. Você está evoluindo.</h2>
          <p>
            Você superou a nota mínima de 80%. Revise os pontos de atenção para
            tornar sua próxima prática ainda mais segura.
          </p>
        </div>
        <FutureButton className="btn primary">
          <Icon name="award" />
          Ver certificado
        </FutureButton>
      </section>
      <Metrics
        items={[
          {
            label: "Decisões corretas",
            value: "23 de 25",
            caption: "92% de aproveitamento",
            icon: "check",
          },
          {
            label: "Pontos de atenção",
            value: "2",
            caption: "Nenhum erro crítico",
            icon: "warning",
          },
          {
            label: "Tempo de execução",
            value: "18min 42s",
            caption: "Estimativa do treinamento: 25 min",
            icon: "clock",
          },
          {
            label: "Evolução nesta prática",
            value: "+8 p.p.",
            caption: "Sessão anterior: 84%",
            icon: "chart",
          },
        ]}
      />
      <div className="report-grid">
        <section className="panel chart-panel">
          <div className="flex justify-between gap-4">
            <h2>Desempenho por etapa</h2>
            <small>% de acertos</small>
          </div>
          <div
            className="bar-chart"
            role="img"
            aria-label="Acertos por etapa: Área 100%, EPIs 100%, Equipamentos 100%, Vazamento 80%, Desvios 80%"
          >
            <div className="chart-axis">
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
            {[
              ["Área", 100],
              ["EPIs", 100],
              ["Equip.", 100],
              ["Vazam.", 80],
              ["Desvios", 80],
            ].map(([label, value], i) => (
              <div className="chart-column" key={label}>
                <div className="bar-track">
                  <div
                    className={`chart-bar ${i > 2 ? "orange" : ""}`}
                    style={{ height: `${value}%` }}
                  >
                    <span>{value}%</span>
                  </div>
                </div>
                <small>{label}</small>
              </div>
            ))}
          </div>
          <p>Maior oportunidade: isolamento e resposta a desvios.</p>
        </section>
        <section className="panel report-competencies">
          <h2>Competências desenvolvidas</h2>
          <Competencies />
        </section>
        <section className="panel attention-panel">
          <h2>Aprenda com os pontos de atenção</h2>
          <div>
            <span>14:08</span>
            <div>
              <h3>Isolamento incompleto</h3>
              <p>
                A zona de exclusão foi validada antes da conferência de uma das
                barreiras.
              </p>
            </div>
          </div>
          <div>
            <span>17:26</span>
            <div>
              <h3>Comunicação após desvio</h3>
              <p>
                A confirmação com a equipe ocorreu após o tempo recomendado.
              </p>
            </div>
          </div>
        </section>
        <section className="panel next-step">
          <h2>
            <Icon name="sparkles" />
            Seu próximo passo
          </h2>
          <p>
            Revise as etapas 4 e 5. Concentre a prática na conferência das
            barreiras e no protocolo de comunicação antes da retomada.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/industry/treinamentos/vazamento-de-aco"
              className="btn primary"
            >
              <Icon name="repeat" />
              Praticar novamente
            </Link>
            <Link href="/industry" className="btn secondary">
              Voltar ao painel
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
