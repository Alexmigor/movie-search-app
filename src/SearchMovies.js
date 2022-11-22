import React, { useState } from "react";
import MovieCard from "./movieCard";

export default function SearchMovies() {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([])

    const searschMovies = async (e) => {

        e.preventDefault()

        const url = `https://api.themoviedb.org/3/search/movie?api_key=7e6a13d126914bcf433f5e1587907800&language=eu-US&query=${query}&page=1&include_adult=false`

        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <form className="form" onSubmit={searschMovies}>
                <label htmlFor="query" className="label">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={(e) => setQuery(e.target.value)} ></input>
                <button className="button" type="submit" >Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </>
    )
}