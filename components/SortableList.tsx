"use client"

import { useState, useEffect } from "react"
import MovieCard from "./MovieCard"
import { getSortedMovies } from "@/lib/tmdb"
import { Movie } from "@/types/movie"

export default function SortableList() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [currentSort, setCurrentSort] = useState("popularity.desc")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const fetchMovies = async (
    sortBy: string,
    pageNumber = 1,
    append = false
  ) => {
    setLoading(true)

    try {
      const result = await getSortedMovies(sortBy, pageNumber)

      if (append) {
        setMovies(prev => {
          const combined = [...prev, ...result.results]

          // 去除重複 movie.id
          const unique = Array.from(
            new Map(combined.map(movie => [movie.id, movie])).values()
          )

          return unique
        })
      } else {
        setMovies(result.results)
      }
      console.log(result);
      setTotalPages(result.total_pages)
    } catch (error) {
      console.error("排序失敗:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(currentSort, 1)
  }, [])

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let sortBy = "popularity.desc"

    switch (value) {
      case "high":
        sortBy = "vote_average.desc"
        break
      case "low":
        sortBy = "vote_average.asc"
        break
      case "new":
        sortBy = "primary_release_date.desc"
        break
      case "old":
        sortBy = "primary_release_date.asc"
        break
    }

    setCurrentSort(sortBy)
    setPage(1)
    fetchMovies(sortBy, 1)
  }

  const loadMore = async () => {
    if (loading) return
    if (page >= totalPages) return

    const nextPage = page + 1
    setPage(nextPage)

    fetchMovies(currentSort, nextPage, true)
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      <div className="col-span-12 md:col-span-2">
        <h2 className="text-white text-xl font-bold mb-4">Sort By</h2>
        <ul className="space-y-3 text-gray-300">
          {[
            { label: "High Score", value: "high" },
            { label: "Low Score", value: "low" },
            { label: "Newest", value: "new" },
            { label: "Oldest", value: "old" },
          ].map(item => (
            <li key={item.value}>
              <label className="flex items-center space-x-2 cursor-pointer hover:text-white transition">
                <input
                  type="radio"
                  name="movieSort"
                  value={item.value}
                  onChange={handleSortChange}
                  className="w-3 h-3 accent-orange-400 cursor-pointer"
                />
                <span>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-12 md:col-span-10">
        {loading && movies.length === 0 ? (
          <div className="text-white text-center mt-10">
            Loading...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.length > 0 ? (
                movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : (
                <div className="text-white col-span-full text-center">
                  No Results found
                </div>
              )}
            </div>

            {page < totalPages && (
              <div className="text-center mt-6">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-gray-800 text-white px-6 py-2 disabled:opacity-50 rounded-md hover:text-orange-300 hover:cursor-pointer transition"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
