export type Status = 'Alive' | 'Dead' | 'unknown';

export interface Character {
  id: number;
  name: string;
  status: Status;
  species: string;
  type?: string;
  image: string;
  description?: string;
  gender?: string;
  origin: Origin;
  location: Location;
  episode: string[];
  url: string;
  created: string;
}

export interface Origin {
    name: string;
    url: string;
}

export interface Location {
    name: string;
    url: string;
}

export interface Api{
    
}
export interface CharactersApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}