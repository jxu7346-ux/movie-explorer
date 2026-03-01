export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
}

export interface SearchBarProps {
  initialMovies: Movie[];
  initialTotalPages: number;
}

export interface SortableListProps {
  initialData?: Movie[]; 
  initialTotalPages: number;
}