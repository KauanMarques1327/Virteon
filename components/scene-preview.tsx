"use client";
import { useRef } from "react";
import { Icon } from "./icons";
import { Photo } from "./ui";

export function ScenePreview() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <div className="scene-preview">
        <Photo
          name="aciaria"
          alt="Prévia do cenário de vazamento de aço líquido"
          priority
        />
        <div className="scene-tags">
          <span className="tag cyan">PRÉVIA 3D</span>
          <span className="tag">ACIARIA • SETOR 02</span>
        </div>
        <button
          className="scene-play"
          aria-label="Abrir prévia do cenário"
          onClick={() => dialog.current?.showModal()}
        >
          <Icon name="compass" />
        </button>
        <div className="scene-caption">
          <span>Conheça o cenário antes de começar</span>
          <button
            aria-label="Ampliar prévia"
            onClick={() => dialog.current?.showModal()}
          >
            <Icon name="external" />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="scene-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="flex justify-between items-center gap-4">
          <h2>Conheça o cenário: Aciaria</h2>
          <button
            aria-label="Fechar prévia"
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" />
          </button>
        </div>
        <Photo name="aciaria" alt="Área de vazamento da aciaria" />
        <p>
          Prévia ilustrativa do ambiente. A simulação interativa está em
          desenvolvimento.
        </p>
        <button className="btn primary" onClick={() => dialog.current?.close()}>
          Voltar ao treinamento
        </button>
      </dialog>
    </>
  );
}
