"use client"
import React from "react";
import type { Character } from "@/types/character";
import type { CharacterModalProps } from "@/types/components";

export default function CharacterModal({ character, onClose }: CharacterModalProps) {
  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <img
          src={`/api/image?url=${encodeURIComponent(character.image)}`}
          alt={character.name}
          className="modal-image"
        />
        <div className="modal-body">
          <h2>{character.name}</h2>
          <p><strong>Especie:</strong> {character.species}</p>
          <p><strong>Estado:</strong> {character.status}</p>
        </div>
      </div>
    </div>
  );
}
