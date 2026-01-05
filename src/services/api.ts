
import type { CharactersApiResponse, Character } from '@/types/character';

export async function getCharacters(): Promise<Character[]> {
  const url = '/api/characters';
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('[services/api] proxy fetch failed', res.status, text);
    throw new Error('Failed to fetch characters (proxy)');
  }

  const data = (await res.json()) as CharactersApiResponse | { error?: string } | any;
  if (!data || !Array.isArray(data.results)) {
    console.warn('[services/api] unexpected response shape', data);
    return [];
  }

  return data.results as Character[];
}
