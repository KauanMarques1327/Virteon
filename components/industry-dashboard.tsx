"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./icons";
import { FutureButton, Metrics, Photo, Progress } from "./ui";

const trainings = [
  {
    title: "Operação segura no vazamento de aço",
    image: "aciaria",
    status: "Em andamento",
    meta: "25 min • 5 etapas • Intermediário",
    footer: "60% concluído",
    progress: 60,
    href: "/industry/treinamentos/vazamento-de-aco",
    tone: "cyan",
  },
  {
    title: "Bloqueio e etiquetagem de energia",
    image: "energy",
    status: "Obrigatório",
    meta: "20 min • 4 etapas • Essencial",
    footer: "Disponível para iniciar",
    progress: 0,
    href: "",
    tone: "orange",
  },
  {
    title: "Inspeção e uso correto de EPIs",
    image: "epis",
    status: "Concluído",
    meta: "15 min • 4 etapas • Essencial",
    footer: "Concluído • Nota 94%",
    progress: 100,
    href: "",
    tone: "green",
  },
];
export function IndustryDashboard() {
  const [filter, setFilter] = useState("Todos");
  const visible = trainings.filter(
    (item) =>
      filter === "Todos" ||
      (filter === "Obrigatórios"
        ? item.status === "Obrigatório"
        : filter === "Concluídos"
          ? item.status === "Concluído"
          : item.status === filter),
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">BOM DIA, JOÃO</span>
          <h1>Seu próximo passo é mais segurança.</h1>
          <p>Continue sua jornada de desenvolvimento na AçoNorte.</p>
        </div>
        <span className="tag">UNIDADE • ACIARIA</span>
      </div>
      <section className="continue-banner panel">
        <div className="banner-copy">
          <span className="tag cyan">CONTINUE DE ONDE PAROU</span>
          <h2>Operação segura no vazamento de aço</h2>
          <div className="banner-progress">
            <Progress value={60} />
            <span>3 de 5 etapas • 60%</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/industry/treinamentos/vazamento-de-aco"
              className="btn primary"
            >
              <Icon name="play" />
              Continuar treinamento
            </Link>
            <small>Concluir até 30 out.</small>
          </div>
        </div>
        <Photo
          name="training-hero"
          alt="Vazamento de aço líquido dentro de uma aciaria"
          priority
        />
        <div className="banner-modes">
          <span className="tag">WEB</span>
          <span className="tag cyan">VR</span>
        </div>
      </section>
      <Metrics
        items={[
          {
            label: "Treinamentos concluídos",
            value: "8 de 12",
            caption: "2 concluídos neste mês",
            icon: "check",
          },
          {
            label: "Desempenho médio",
            value: "87%",
            caption: "+6 pontos no último mês",
            icon: "chart",
          },
          {
            label: "Tempo de prática",
            value: "6h 24min",
            caption: "Sua experiência faz a diferença",
            icon: "clock",
          },
          {
            label: "Competências desenvolvidas",
            value: "18",
            caption: "Em 4 áreas de conhecimento",
            icon: "shield",
          },
        ]}
      />
      <section id="treinamentos" className="catalog">
        <div className="dashboard-section-heading">
          <h2>Seu catálogo de treinamentos</h2>
          <FutureButton
            className="text-action"
            message="Este protótipo apresenta 3 dos 12 treinamentos. Catálogo completo em desenvolvimento."
          >
            Ver todos os 12 treinamentos <Icon name="arrow" />
          </FutureButton>
        </div>
        <div className="filters" role="group" aria-label="Filtrar treinamentos">
          {["Todos", "Em andamento", "Obrigatórios", "Concluídos"].map(
            (item) => (
              <button
                key={item}
                className={filter === item ? "selected" : ""}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ),
          )}
        </div>
        <div className="catalog-grid grid md:grid-cols-3 gap-4">
          {visible.map((item) => (
            <article
              className={`training-card panel hover-card ${item.tone}`}
              key={item.title}
            >
              <div className="card-photo">
                <Photo name={item.image} alt={item.title} />
                <span className={`tag ${item.tone}`}>
                  {item.status.toUpperCase()}
                </span>
              </div>
              <div className="training-card-body">
                {item.href ? (
                  <Link className="card-title-link" href={item.href}>
                    <h3>{item.title}</h3>
                  </Link>
                ) : (
                  <FutureButton className="card-title-link">
                    <h3>{item.title}</h3>
                  </FutureButton>
                )}
                <small>{item.meta}</small>
                <Progress value={item.progress} />
                <div className="card-footer">
                  <small>{item.footer}</small>
                  {item.href ? (
                    <Link href={item.href} aria-label={`Abrir ${item.title}`}>
                      <Icon name="external" />
                    </Link>
                  ) : (
                    <FutureButton label={`Abrir ${item.title}`}>
                      <Icon name="external" />
                    </FutureButton>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <div className="dashboard-bottom-grid">
        <div className="panel insight">
          <Icon name="sparkles" />
          <div>
            <h3>Seu desempenho está evoluindo</h3>
            <p>
              Identificação de riscos é seu ponto forte. Continue praticando a
              sequência de isolamento da área.
            </p>
          </div>
          <Link href="/industry/desempenho">
            Ver relatório <Icon name="arrow" />
          </Link>
        </div>
        <div className="deadline-panel">
          <span className="eyebrow">FIQUE ATENTO AO PRAZO</span>
          <h3>2 treinamentos até 30 de outubro</h3>
          <p>Organize sua prática com antecedência.</p>
        </div>
      </div>
    </>
  );
}
