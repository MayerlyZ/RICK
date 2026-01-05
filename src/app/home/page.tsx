'use client'
import { useCharacters } from '@/hooks/useCharacters'
import { Card } from '../components/card/Card'
import { useState } from 'react'
import type { Character } from '@/types/character'
import CharacterModal from '@/app/components/CharacterModal'

export default function Home() {
  const { data: characters = [], loading, error } = useCharacters()
  const [selected, setSelected] = useState<Character | null>(null)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <div className="cards-grid">
        {characters.map((char, index) => (
          <div key={char.id ?? index} onClick={() => setSelected(char)}>
            <Card
              title={char.name}
              description={char.description}
              imageUrl={`/api/image?url=${encodeURIComponent(char.image)}`}
            />
          </div>
        ))}
      </div>
      <CharacterModal character={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
