"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";
import { Brand, FutureButton } from "./ui";

export function PlatformShell({
  environment,
  children,
}: {
  environment: "industry" | "edu";
  children: React.ReactNode;
}) {
  const edu = environment === "edu";
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const links = edu
    ? [
        ["grid", "Visão geral", "/edu"],
        ["compass", "Explorar siderúrgica", ""],
        ["book", "Minhas trilhas", ""],
        ["flag", "Missões", "#missoes"],
        ["award", "Conquistas", "#conquistas"],
      ]
    : [
        ["grid", "Visão geral", "/industry"],
        ["helmet", "Treinamentos", "/industry#treinamentos"],
        ["chart", "Meu desempenho", "/industry/desempenho"],
        ["report", "Relatórios", "/industry/desempenho"],
        ["award", "Certificados", ""],
      ];
  const current = pathname.includes("vazamento-de-aco")
    ? "Treinamentos"
    : pathname.includes("desempenho")
      ? "Meu desempenho"
      : "Visão geral";
  const results = edu
    ? [
        { title: "O nascimento do aço", href: "#missoes" },
        { title: "O aço pode renascer?", href: "#missoes" },
        { title: "Quem faz a indústria?", href: "#missoes" },
      ]
    : [
        {
          title: "Operação segura no vazamento de aço",
          href: "/industry/treinamentos/vazamento-de-aco",
        },
        { title: "Meu desempenho", href: "/industry/desempenho" },
        { title: "Catálogo de treinamentos", href: "/industry#treinamentos" },
      ];
  const filtered = results.filter((item) =>
    item.title
      .toLocaleLowerCase("pt-BR")
      .includes(search.toLocaleLowerCase("pt-BR")),
  );
  return (
    <div className={`platform ${edu ? "edu-platform" : "industry-platform"}`}>
      <button
        className="mobile-sidebar-toggle"
        onClick={() => setMobileMenu(!mobileMenu)}
        aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"}
        aria-expanded={mobileMenu}
      >
        <Icon name={mobileMenu ? "close" : "menu"} />
      </button>
      {mobileMenu && (
        <button
          className="sidebar-overlay"
          aria-label="Fechar menu"
          onClick={() => setMobileMenu(false)}
        />
      )}
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <Brand />
        <Link
          href={edu ? "/industry" : "/edu"}
          className="environment-switch"
          aria-label={
            edu
              ? "VIRTEON Edu — mudar para Industry"
              : "VIRTEON Industry — mudar para EDU"
          }
        >
          <Icon name={edu ? "book" : "factory"} />
          <span>VIRTEON {edu ? "Edu" : "Industry"}</span>
          <span className="switch-arrows">
            ⌃<br />⌄
          </span>
        </Link>
        <div className="sidebar-label">APRENDIZAGEM</div>
        <nav aria-label="Navegação do ambiente">
          {links.map(([icon, title, href]) =>
            href ? (
              <Link
                href={href}
                key={title}
                className={`sidebar-link ${current === title ? "active" : ""}`}
                aria-current={current === title ? "page" : undefined}
                onClick={() => setMobileMenu(false)}
              >
                <Icon name={icon} />
                {title}
              </Link>
            ) : (
              <FutureButton key={title} className="sidebar-link">
                <Icon name={icon} />
                {title}
              </FutureButton>
            ),
          )}
        </nav>
        <div className="sidebar-promo">
          <Icon name={edu ? "sparkles" : "headset"} />
          <h3>
            {edu
              ? "Sua curiosidade vai longe."
              : "Mais presença. Mais preparo."}
          </h3>
          <p>
            {edu
              ? "Explore, descubra e colecione conhecimento a cada missão."
              : "Experimente seus treinamentos também em realidade virtual."}
          </p>
          {edu ? (
            <a href="#conquistas" onClick={() => setMobileMenu(false)}>
              Ver conquistas <Icon name="arrow" />
            </a>
          ) : (
            <FutureButton>
              Conectar dispositivo <Icon name="arrow" />
            </FutureButton>
          )}
        </div>
        <div className="sidebar-bottom">
          <FutureButton className="help-link">
            <Icon name="help" />
            Central de ajuda
          </FutureButton>
          <div className="profile">
            <span className="avatar">{edu ? "LS" : "JM"}</span>
            <div>
              <strong>{edu ? "Luiza Santos" : "João Martins"}</strong>
              <small>{edu ? "Escola Horizonte" : "AçoNorte • Operação"}</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="platform-body">
        <header className="platform-topbar">
          <div className="breadcrumb">
            Espaço {edu ? "do estudante" : "do colaborador"} <span>/</span>{" "}
            {current}
          </div>
          <div className="topbar-actions">
            <div className="search-box">
              <Icon name="search" />
              <input
                aria-label="Buscar na plataforma"
                placeholder="Buscar na plataforma"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setSearch("");
                }}
              />
              {search && (
                <div className="search-results">
                  {filtered.length ? (
                    filtered.map((item) => (
                      <Link
                        key={item.href + item.title}
                        href={item.href}
                        onClick={() => setSearch("")}
                      >
                        {item.title}
                        <Icon name="arrow" />
                      </Link>
                    ))
                  ) : (
                    <p>Nenhum resultado encontrado.</p>
                  )}
                </div>
              )}
            </div>
            <FutureButton
              className="notification-button"
              label="Notificações"
              message={
                edu
                  ? "Sua jornada continua: a missão O nascimento do aço está disponível."
                  : "Você tem 2 treinamentos com prazo até 30 de outubro de 2026."
              }
            >
              <Icon name="bell" />
              <span />
            </FutureButton>
          </div>
        </header>
        <main id="main-content" className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  );
}
