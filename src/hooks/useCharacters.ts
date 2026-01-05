import { useEffect, useState } from "react"
import { getCharacters } from "@/services/api";
import type { Character } from "@/types/character";

export function useCharacters() {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true); setError(null);
    try {
      const list = await getCharacters();
      setData(list);
    } catch (err: any) {
      console.error('[hook] fetchData: error', err);
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
      
    }
  };

  useEffect(() => { fetchData() }, []);

  return { data, loading, error, refetch: fetchData };
}