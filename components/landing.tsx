"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./icons";
import { Brand, Competencies, FutureButton, Photo, Reveal } from "./ui";

export function Landing() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-nav wrap">
          <Brand />
          <button
            className="mobile-toggle"
            aria-label="Abrir navegação"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
          <nav className={menu ? "open" : ""} aria-label="Navegação principal">
            {[
              ["Soluções", "solucoes"],
              ["Experiências", "experiencias"],
              ["Como funciona", "como-funciona"],
              ["Sobre a VIRTEON", "sobre"],
            ].map(([text, id]) => (
              <a href={`#${id}`} key={id} onClick={() => setMenu(false)}>
                {text}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <Link href="/industry" className="text-link">
              Entrar
            </Link>
            <FutureButton
              className="btn primary"
              message="Agendamento em desenvolvimento. Explore os ambientes Industry e EDU pelo protótipo."
            >
              <Icon name="external" />
              Agendar demonstração
            </FutureButton>
          </div>
        </div>
      </header>
      <main id="main-content">
        <section className="hero">
          <Photo
            name="aciaria"
            alt="Interior de uma aciaria com pontes rolantes e aço líquido"
            className="hero-photo"
            priority
          />
          <div className="hero-shade" />
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <span className="eyebrow badge">
                O FUTURO DO APRENDIZADO JÁ É REAL
              </span>
              <h1>
                Aprender na prática.
                <br />
                Evoluir sem riscos.
              </h1>
              <p className="hero-subtitle">
                Treinamento imersivo para um amanhã mais seguro.
              </p>
              <p className="muted hero-description">
                Conectamos pessoas à indústria com simulações Web e VR. Mais
                preparo para quem opera. Novas descobertas para quem aprende.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/industry"
                  className="btn primary"
                  aria-label="Conhecer Virteon"
                >
                  <Icon name="arrow" />
                  Conhecer a VIRTEON
                </Link>
                <a href="#experiencias" className="btn secondary">
                  <Icon name="play" />
                  Ver a experiência
                </a>
              </div>
              <div className="platforms">
                <span>
                  <Icon name="monitor" />
                  No navegador
                </span>
                <span>/</span>
                <span>
                  <Icon name="headset" />
                  Em realidade virtual
                </span>
              </div>
            </div>
            <aside className="hero-note panel">
              <span className="eyebrow">
                ● &nbsp; AMBIENTE VIRTUAL · ACIARIA
              </span>
              <h2>
                A complexidade é real.
                <br />O risco, não.
              </h2>
              <div className="flex gap-7">
                <div>
                  <strong>360°</strong>
                  <small>de imersão</small>
                </div>
                <div>
                  <strong>Web + VR</strong>
                  <small>uma só plataforma</small>
                </div>
              </div>
            </aside>
            <div className="hero-values">
              <span className="micro">01 / EXPERIÊNCIAS QUE TRANSFORMAM</span>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  ["shield", "Segurança antes da operação"],
                  ["book", "Aprendizado pela experiência"],
                  ["chart", "Evolução que você acompanha"],
                  ["sparkles", "Tecnologia com propósito"],
                ].map(([icon, text]) => (
                  <span key={text}>
                    <Icon name={icon} />
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Reveal id="solucoes" className="wrap section">
          <div className="section-heading">
            <h2>Uma plataforma. Muitos futuros.</h2>
            <p>Da sala de aula ao chão de fábrica.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Industry",
                tag: "PARA EMPRESAS",
                copy: "Prepare pessoas para decisões que importam. Treine procedimentos, avalie competências e fortaleça a cultura de segurança.",
                action: "Transformar o treinamento",
                photo: "industry-person",
                route: "/industry",
              },
              {
                name: "Edu",
                tag: "PARA INSTITUIÇÕES DE ENSINO",
                copy: "Abra as portas da indústria para a curiosidade. Ciência, sustentabilidade e profissões em missões que fazem sentido.",
                action: "Explorar novas possibilidades",
                photo: "school-small",
                route: "/edu",
              },
            ].map((item) => (
              <Link
                href={item.route}
                className={`solution-card panel hover-card ${item.name === "Edu" ? "edu-solution" : ""}`}
                key={item.name}
              >
                <div>
                  <span className="eyebrow">{item.tag}</span>
                  <h3>VIRTEON {item.name}</h3>
                  <p>{item.copy}</p>
                  <span className="text-accent">
                    {item.action} <Icon name="external" />
                  </span>
                </div>
                <Photo
                  name={item.photo}
                  alt={
                    item.name === "Edu"
                      ? "Estudantes explorando tecnologia em sala de aula"
                      : "Profissional com equipamentos de proteção em uma aciaria"
                  }
                />
              </Link>
            ))}
          </div>
        </Reveal>
        <div className="section-band">
          <Reveal id="experiencias" className="wrap section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">
                  DENTRO DA INDÚSTRIA. ALÉM DO CONVENCIONAL.
                </span>
                <h2>
                  Ambientes reais. Possibilidades
                  <br className="desktop-break" /> extraordinárias.
                </h2>
              </div>
              <p>
                Explore cada etapa da siderurgia em cenários virtuais
                detalhados, feitos para ensinar com contexto.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                ["Aciaria", "aciaria", "Segurança • Aço líquido • Operação"],
                [
                  "Alto-forno",
                  "alto-forno",
                  "Matérias-primas • Transformação • Energia",
                ],
                [
                  "Laminação",
                  "laminacao",
                  "Processos • Qualidade • Tecnologia",
                ],
              ].map(([title, photo, text], i) => (
                <div className="environment-card panel hover-card" key={title}>
                  <Photo name={photo} alt={`Ambiente industrial: ${title}`} />
                  {i === 0 ? (
                    <Link
                      href="/industry/treinamentos/vazamento-de-aco"
                      className="environment-body"
                    >
                      <h3>{title}</h3>
                      <Icon name="external" />
                      <p>{text}</p>
                    </Link>
                  ) : (
                    <FutureButton className="environment-body">
                      <h3>{title}</h3>
                      <Icon name="external" />
                      <p>{text}</p>
                    </FutureButton>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal id="como-funciona" className="wrap section split-section">
          <div className="journey-photo">
            <Photo
              name="vr-journey"
              alt="Profissional praticando com óculos e controles de realidade virtual"
            />
            <div className="platform-panel panel">
              <span>
                <Icon name="monitor" />
                Comece na Web
              </span>
              <Icon name="repeat" />
              <span>
                <Icon name="headset" />
                Mergulhe em VR
              </span>
            </div>
          </div>
          <div>
            <span className="eyebrow">UMA JORNADA CONECTADA</span>
            <h2>Da primeira descoberta à prática com confiança.</h2>
            <ol className="journey-steps">
              {[
                [
                  "Escolha sua experiência",
                  "Acesse trilhas e simulações alinhadas ao seu contexto.",
                ],
                [
                  "Aprenda fazendo, na Web ou em VR",
                  "Explore cenários, tome decisões e pratique sem risco real.",
                ],
                [
                  "Entenda e evolua",
                  "Receba feedback e acompanhe cada competência desenvolvida.",
                ],
              ].map(([title, copy], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <div className="section-band">
          <Reveal id="sobre" className="wrap section">
            <h2>O aprendizado muda. O impacto permanece.</h2>
            <div className="benefits grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                [
                  "shield",
                  "Segurança por experiência",
                  "Pratique situações críticas antes de encontrar o risco no mundo real.",
                ],
                [
                  "repeat",
                  "Prática sem limites",
                  "Repita procedimentos e aprenda com cada decisão, no seu ritmo.",
                ],
                [
                  "compass",
                  "Conhecimento visível",
                  "Transforme desempenho em feedback claro e ações de desenvolvimento.",
                ],
                [
                  "users",
                  "Acesso que aproxima",
                  "Leve a indústria para mais pessoas, do navegador à realidade virtual.",
                ],
              ].map(([icon, title, text]) => (
                <article key={title}>
                  <Icon name={icon} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="wrap section split-section">
          <div>
            <span className="eyebrow">VIRTEON INDUSTRY</span>
            <h2>
              Não basta concluir.
              <br />É preciso compreender.
            </h2>
            <p>
              Visualize acertos, erros e competências em relatórios claros.
              Identifique oportunidades e direcione o próximo treinamento com
              base no desempenho de cada pessoa.
            </p>
            <Link href="/industry" className="btn secondary">
              <Icon name="arrow" />
              Conhecer a solução Industry
            </Link>
          </div>
          <div className="panel performance-demo">
            <div className="flex justify-between gap-4">
              <h3>Desempenho por competência</h3>
              <span className="tag">DEMONSTRAÇÃO</span>
            </div>
            <Competencies demo />
            <div className="info-note">
              <Icon name="sparkles" />
              Próximo passo: revisar a sequência de isolamento da área.
            </div>
          </div>
        </Reveal>
        <div className="section-band">
          <Reveal className="wrap section split-section edu-intro">
            <Photo
              name="school"
              alt="Estudantes descobrindo processos industriais com computador e óculos VR"
            />
            <div>
              <span className="eyebrow gold">VIRTEON EDU</span>
              <h2>A próxima grande ideia começa com uma descoberta.</h2>
              <p>
                Do minério ao aço, transforme conteúdos em vivências. Missões
                interativas conectam ciência, tecnologia, sustentabilidade e
                profissões ao mundo dos estudantes.
              </p>
              <div className="topics gold">
                Ciência &nbsp;&nbsp; Sustentabilidade &nbsp;&nbsp; Profissões
              </div>
              <Link href="/edu" className="btn secondary">
                <Icon name="arrow" />
                Conhecer a solução Edu
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal className="wrap section faq-section">
          <div>
            <span className="eyebrow">VAMOS SIMPLIFICAR</span>
            <h2>
              Tecnologia avançada.
              <br />
              Começo descomplicado.
            </h2>
            <p>
              Nossa equipe ajuda você a encontrar a experiência ideal para sua
              empresa ou instituição.
            </p>
          </div>
          <div className="faq">
            {[
              [
                "Preciso de óculos VR para começar?",
                "Não. As experiências Web são acessadas pelo navegador. Para uma imersão em VR, utilize um headset compatível.",
              ],
              [
                "Como acompanho a evolução dos participantes?",
                "A plataforma reúne progresso, decisões e competências em relatórios individuais e da equipe.",
              ],
              [
                "A VIRTEON atende empresas e escolas?",
                "Sim. Industry é voltada ao treinamento profissional; Edu conecta estudantes aos processos e às carreiras da indústria.",
              ],
            ].map(([q, a]) => (
              <details key={q} open>
                <summary>
                  {q}
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </main>
      <footer className="wrap landing-footer">
        <Brand />
        <span>Aprender na prática. Evoluir sem riscos.</span>
        <Link href="/industry">
          Explorar a plataforma <Icon name="arrow" />
        </Link>
      </footer>
    </div>
  );
}
