import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { FutureButton, Metrics, Photo } from "@/components/ui";
export const metadata: Metadata = { title: "Visão geral | Virteon EDU" };

export default function EduPage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            OLÁ, LUIZA. O QUE VAMOS DESCOBRIR HOJE?
          </span>
          <h1>Grandes descobertas começam com você.</h1>
          <p>Explore a indústria, conecte ideias e imagine novos futuros.</p>
        </div>
        <span className="tag">TURMA • 2º ANO B</span>
      </div>
      <section className="continue-banner edu-banner panel">
        <div className="banner-copy">
          <span className="tag orange">SUA JORNADA CONTINUA</span>
          <h2>
            Como o minério se transforma
            <br />
            no mundo à sua volta?
          </h2>
          <p>
            Entre em uma siderúrgica virtual e descubra o caminho do aço, do
            alto-forno à reciclagem.
          </p>
          <div className="flex items-center flex-wrap gap-4">
            <FutureButton
              className="btn primary"
              message="Exploração virtual em desenvolvimento. Sua próxima missão é O nascimento do aço."
            >
              <Icon name="compass" />
              Continuar exploração
            </FutureButton>
            <small>Missão 3 de 6</small>
          </div>
        </div>
        <Photo
          name="edu-hero"
          alt="Estudante explorando um laboratório com óculos de realidade virtual"
          priority
        />
      </section>
      <Metrics
        items={[
          {
            label: "Missões concluídas",
            value: "2 de 6",
            caption: "Na trilha O caminho do aço",
            icon: "flag",
          },
          {
            label: "Pontos de descoberta",
            value: "120 XP",
            caption: "Cada descoberta conta",
            icon: "bolt",
          },
          {
            label: "Conquistas desbloqueadas",
            value: "3",
            caption: "Sua próxima está perto",
            icon: "award",
          },
          {
            label: "Sequência de aprendizado",
            value: "2 dias",
            caption: "Continue explorando!",
            icon: "fire",
          },
        ]}
      />
      <section className="catalog" id="missoes">
        <div className="dashboard-section-heading">
          <h2>Sua próxima descoberta</h2>
          <FutureButton className="text-action">
            Ver todas as missões <Icon name="arrow" />
          </FutureButton>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              title: "O nascimento do aço",
              image: "edu-steel",
              status: "MISSÃO 03 • EM ANDAMENTO",
              category: "Ciência e processos",
              time: "15 min",
              active: true,
            },
            {
              title: "O aço pode renascer?",
              image: "edu-recycle",
              status: "MISSÃO 04 • PRÓXIMA",
              category: "Sustentabilidade",
              time: "12 min",
              active: false,
            },
            {
              title: "Quem faz a indústria?",
              image: "edu-career",
              status: "MISSÃO 05 • EM BREVE",
              category: "Tecnologia e profissões",
              time: "10 min",
              active: false,
            },
          ].map((item) => (
            <article key={item.title} className="panel mission-card hover-card">
              <div className="card-photo">
                <Photo name={item.image} alt={item.title} />
                <span className={`tag ${item.active ? "orange" : ""}`}>
                  {item.status}
                </span>
              </div>
              <div className="mission-body">
                <span className="gold micro">{item.category}</span>
                <h3>{item.title}</h3>
                <div className="card-footer">
                  <small>{item.time} • +60 XP</small>
                  <FutureButton
                    label={
                      item.active
                        ? `Iniciar ${item.title}`
                        : `${item.title} — missão bloqueada`
                    }
                    message={
                      item.active
                        ? "Missão em desenvolvimento: explore como o minério se transforma em aço."
                        : "Conclua a missão anterior para desbloquear esta descoberta."
                    }
                  >
                    <Icon name={item.active ? "arrow" : "lock"} />
                  </FutureButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="dashboard-bottom-grid edu-bottom">
        <section className="panel learning-trail">
          <div className="flex justify-between items-center gap-3">
            <h2>Sua trilha: O caminho do aço</h2>
            <span className="text-accent micro">2 de 6 concluídas</span>
          </div>
          <ol className="trail">
            {[
              "Minério",
              "Alto-forno",
              "Aciaria",
              "Laminação",
              "Reciclagem",
              "Futuros",
            ].map((title, i) => (
              <li key={title}>
                <span className={i < 2 ? "done" : i === 2 ? "current" : ""}>
                  {i < 2 ? <Icon name="check" /> : i + 1}
                </span>
                <small>{title}</small>
              </li>
            ))}
          </ol>
        </section>
        <section id="conquistas" className="achievement-panel hover-card">
          <h2>
            <Icon name="award" />
            Olhar científico
          </h2>
          <p>
            Você reconheceu as matérias-primas do aço.
            <br />
            Próximo desafio: entender sua transformação.
          </p>
        </section>
      </div>
    </>
  );
}
