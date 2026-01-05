"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation'
import type { Character } from '@/types/character';
import styles from './style.module.css'
import FiltersPanel from '@/app/components/filters/FiltersPanel'
import { Card } from '@/app/components/card/Card'
import { useCharacters } from '@/hooks/useCharacters'

export default function DashboardPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const { data: characters = [], loading, error, refetch } = useCharacters()
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => {
    const alive = characters.filter(c => c.status === 'Alive').length;
    const dead = characters.filter(c => c.status === 'Dead').length;
    const unknown = characters.filter(c => c.status === 'unknown').length;
    return {
      total: characters.length,
      alive,
      dead,
      unknown,
    };
  }, [characters]);

  const filteredCharacters = useMemo(() => {
    const s = search.trim().toLowerCase();
    return characters.filter(c => {
      const matchesSearch = !s || c.name.toLowerCase().includes(s);
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [characters, search, statusFilter]);

  const totalCharacters = filteredCharacters.length;

  useEffect(() => {
    try {
      const raw = localStorage.getItem('current_user')
      if (!raw) {
        router.push('/login')
        return
      }
    } catch (e) {
      router.push('/login')
      return
    } finally {
      setCheckingAuth(false)
    }
  }, [router])

  if (checkingAuth) return <p>Comprobando sesión...</p>

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="spinner-border text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="page-header mb-4 text-2xl font-bold">Dashboard de Personajes</h1>

      {/* Estadísticas */}
      <div className="mb-4">
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <h6>Total</h6>
            <p className="fw-bold">{stats.total}</p>
          </div>
          <div className={styles.statCard}>
            <h6>Alive</h6>
            <p className="fw-bold text-success">{stats.alive}</p>
          </div>
          <div className={styles.statCard}>
            <h6>Dead</h6>
            <p className="fw-bold text-danger">{stats.dead}</p>
          </div>
          <div className={styles.statCard}>
            <h6>Unknown</h6>
            <p className="fw-bold text-warning">{stats.unknown}</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-4">
        <FiltersPanel
          search={search}
          status={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={setStatusFilter}
        />
      </div>

      {/* Lista */}
      <div className="cards-grid">
        {filteredCharacters.map((character, index) => (
          <div key={character.id ?? index}>
            <Card
              title={character.name}
              description={`Especie: ${character.species}`}
              imageUrl={`/api/image?url=${encodeURIComponent(character.image)}`}
            />
          </div>
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="alert alert-info mt-4">
          No se encontraron resultados.
        </div>
      )}
    </div>
  );
}
