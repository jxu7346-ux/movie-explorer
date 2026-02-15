"use client"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce"
import { searchMovies } from "@/lib/tmdb"
import MovieCard from "./MovieCard"
import SortableList from "./SortableList"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (!debouncedQuery) return

    async function fetchData() {
      const data = await searchMovies(debouncedQuery)
      setResults(data.results)
      console.log("這個是",data);
    }

    fetchData()
  }, [debouncedQuery])

  return (
    <>
      <div className="mb-6">
        <div className="flex gap-6">
          <h1 style={{color:"oklch(98.5% 0.002 247.839)"}} className="text-3xl font-bold mb-6">Popular Movies</h1>
            <input style={{border:"2px solid rgba(0,0,0,0.2)", borderRadius:"50px", backgroundColor:"oklch(98.5% 0.002 247.839)"}}
              className={`w-48 p-2 focus:outline-none`}
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
        </div>
      </div>
      {debouncedQuery? <div className="grid grid-cols-12 gap-4 p-4">
          <div className="col-start-1 col-span-2"></div>
              <div className="col-start-3 col-span-10">
                  <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                       
                  {results.length==0? <div className="text-white">No Results found</div>:results.map((movie: any) => (
                      <MovieCard key={movie.id} movie={movie} />
                                  ))}
                        
              </div>
          </div>
      </div>:   <SortableList/>}
  
   
    </>
  )
}
