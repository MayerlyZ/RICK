import type { Character } from '@/types/character';

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  return (
    <div>
      <h2>{character.name}</h2>
      <p>{character.status}</p>
    </div>
  );
}
