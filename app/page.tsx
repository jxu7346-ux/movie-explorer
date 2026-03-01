import SearchBar from "@/components/SearchBar"
import { getSortedMovies } from "@/lib/tmdb";


export default async function Home() {
const initialData = await getSortedMovies("popularity.desc", 1); 

  return (
    <main>
      <div><SearchBar initialMovies={initialData.results} initialTotalPages={initialData.total_pages}/></div>
    </main>
  )
}
