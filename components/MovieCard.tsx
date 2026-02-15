import Link from "next/link"
import { Movie } from "@/types/movie"

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div style={{backgroundColor:"oklch(98.5% 0.002 247.839)"}} className="rounded-lg overflow-hidden hover:scale-105 transition">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="p-3">
          <h2 className="text-sm font-semibold">{movie.title}</h2>
          <p>⭐ {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  )
}
