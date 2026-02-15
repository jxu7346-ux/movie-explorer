import { notFound } from "next/navigation"

async function getMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  )
  if (!res.ok) return null
  return res.json()
}

export default async function MoviePage({ params }: {params:Promise<{id:string}>}) {
  // 1. 先把 Promise 解開 (Unwrap)
  const resolvedParams = await params;
  // 2. 現在才能安全地拿到 id
  const id = resolvedParams.id;
  const movie = await getMovie(id)
  if (!movie) return notFound()

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-80 rounded-lg"
      />
      

      <div>
        <h1 style={{color:"oklch(98.5% 0.002 247.839)"}} className="text-3xl font-bold">{movie.title}</h1>
        <p className="mt-2 text-gray-400">{movie.release_date}</p>
        <p style={{color:"oklch(98.5% 0.002 247.839)"}} className="mt-4">⭐ {movie.vote_average}</p>
        <p style={{color:"oklch(98.5% 0.002 247.839)"}} className="mt-4">{movie.overview}</p>
      </div>
    </div>
  )
}
