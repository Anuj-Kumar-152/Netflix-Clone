import React, { useEffect, useState } from "react";
import "./TitileCards.css";

const TMDB_API_KEY = "db289dbc4a10cbac25ecc2cd9597f170"; // apna TMDB key lagao

const TitileCards = ({ titile, keyword }) => {
  const [movies, setMovies] = useState([]);
  const [trailerId, setTrailerId] = useState(null);

  useEffect(() => {
    const keywords = ["batman", "avengers", "spider", "king", "matrix", "love", "war", "future"];
    const randomKeyword = keyword || keywords[Math.floor(Math.random() * keywords.length)];
    const page = Math.floor(Math.random() * 5) + 1;

    fetch(`https://www.omdbapi.com/?s=${randomKeyword}&page=${page}&apikey=44063c01`)
      .then((res) => res.json())
      .then((data) => {
        console.log("OMDB Response:", data); // 🔍 Debug
        if (data.Search) {
          const unique = Array.from(new Map(data.Search.map(item => [item.imdbID, item])).values());
          const filtered = unique.filter(item => item.Poster && item.Poster !== "N/A");
          setMovies(filtered);
        }
      })
      .catch((err) => console.error("OMDB Error:", err));
  }, [keyword]);

  // Trailer fetcher function
  const fetchTrailer = async (imdbID) => {
    try {
      console.log("Fetching trailer for imdbID:", imdbID);

      // Step 1: imdbID → TMDB id
      const findRes = await fetch(
        `https://api.themoviedb.org/3/find/${imdbID}?api_key=${TMDB_API_KEY}&language=en-US&external_source=imdb_id`
      );
      const findData = await findRes.json();
      console.log("TMDB Find Result:", findData);

      const movie = findData.movie_results[0];
      if (!movie) {
        alert("Movie not found on TMDB");
        return;
      }

      // Step 2: Trailer fetch
      const videoRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const videoData = await videoRes.json();
      console.log("TMDB Video Data:", videoData);

      const trailer = videoData.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        console.log("Trailer Found:", trailer.key);
        setTrailerId(trailer.key);
      } else {
        alert("Trailer not found 😔");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
    }
  };

  return (
    <div className="titile-cards">
      <h2>{titile ? titile : "Popular on Netflix"}</h2>
      <div className="card-list">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="card"
            onClick={() => fetchTrailer(movie.imdbID)}
          >
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Title}</p>
          </div>
        ))}
      </div>

      {/* Modal Player */}
      {trailerId && (
        <div className="modal-overlay" onClick={() => setTrailerId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setTrailerId(null)}>✖</button>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default TitileCards;















  
