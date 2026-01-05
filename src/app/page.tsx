"use client"
import React, { useMemo, useState } from "react"
import { Card } from "@/app/components/card/Card"
import { useCharacters } from "@/hooks/useCharacters"
import type { Character } from "@/types/character"
import CharacterModal from "@/app/components/CharacterModal"
import FiltersPanel from "./components/filters/FiltersPanel"

export default function Home() {
  
  const {data: characters, loading, error} = useCharacters()
  const [selected, setSelected] = useState<Character | null>(null)
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<string>('all')

  const filteredCharacters = useMemo(() => {
    const s = search.trim().toLowerCase();
    return characters.filter((c: Character) => {
      const matchesSearch = !s || c.name.toLowerCase().includes(s)
      const matchesStatus = status === 'all' || c.status === status
      return matchesSearch && matchesStatus
    })
  }, [characters, search, status])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error}</p>
  if (!characters.length ) return <p>No hay personajes disponibles.</p>

  return (
    <div>
      <FiltersPanel
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <div className="cards-grid">
        {filteredCharacters.map((char, index) => (
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
