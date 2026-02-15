const BASE_URL = "https://api.themoviedb.org/3"

export async function getPopularMovies() {
  const today = new Date().toISOString().split('T')[0];
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&primary_release_date.lte=${today}`
  )
  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}

export async function searchMovies(query: string) {
  const today = new Date().toISOString().split('T')[0];
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}&primary_release_date.lte=${today}`
  )
  return res.json()
}

export async function getSortedMovies(sort: string) {
  const today = new Date().toISOString().split('T')[0];
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&sort_by=${sort}&primary_release_date.lte=${today}`
  )

  if (!res.ok) throw new Error("Failed to fetch")
  return res.json()
}