"use client"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce"
import { searchMovies } from "@/lib/tmdb"
import MovieCard from "./MovieCard"
import SortableList from "./SortableList"
import { Movie } from "@/types/movie"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (!debouncedQuery) return

    fetchData(debouncedQuery,1)
  }, [debouncedQuery])

    async function fetchData(movie:string, pageNumber:number, append:boolean=false) {
      setLoading(true);

      try{
      const data = await searchMovies(movie,pageNumber);

      if(append){
        setResults(prev=>{
          const combined = [...prev, ...data.results]

          // 去除重複 movie.id
          const unique = Array.from(
            new Map(combined.map(movie => [movie.id, movie])).values()
          )

          return unique
        }
          
        )

      }else{
        setResults(data.results);
      }
      
      setTotalPages(data.total_pages);
      }catch(error){
        console.error("發生這個錯誤",error);
      }finally{
        setLoading(false)
      }
    }

  const loadMore = async () => {
    if (loading) return
    if (page >= totalPages) return

   const nextPage = page + 1
    setPage(nextPage)
    fetchData(debouncedQuery, nextPage, true)
  }


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
                      <MovieCard key={movie.id} movie={movie} /> ))}
                        
                  </div>
                  {results.length>0 && page < totalPages &&(
                  <div className="text-center mt-6 w-full flex justify-center">
            
                    <button
                      onClick={loadMore}
                      disabled={loading}
                      className="bg-gray-800 text-white px-6 py-2 disabled:opacity-50 rounded-md hover:text-orange-300 hover:cursor-pointer transition">
                      {loading ? "Loading..." : "Load More"}
                    </button>
                
              </div>)}
          </div>
      </div>:   <SortableList/>}
  
   
    </>
  )
}
