import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Player = () => {
  const { movieId } = useParams();
  const [videoKey, setVideoKey] = useState('');
  const [poster, setPoster] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      console.error("[Player] No movieId in URL!");
      setLoading(false);
      return;
    }

    const fetchTrailer = async () => {
      const TMDB_KEY = "db289dbc4a10cbac25ecc2cd9597f170"; // Use your TMDB API key
      console.log("[Player] movieId received:", movieId);

      try {
        // Step 1: Get TMDB ID from IMDb ID
        const FIND_URL = `https://api.themoviedb.org/3/find/${movieId}?api_key=${TMDB_KEY}&external_source=imdb_id`;
        console.log("[Player] FIND_URL:", FIND_URL);
        const resFind = await fetch(FIND_URL);
        const dataFind = await resFind.json();
        console.log("[Player] FIND API RESPONSE:", dataFind);

        const tmdbId = dataFind.movie_results?.[0]?.id;
        console.log("[Player] TMDB ID:", tmdbId);

        if (!tmdbId) {
          console.error("[Player] TMDB ID NOT FOUND!");
          setLoading(false);
          return;
        }

        // Step 2: Get videos
        const VIDEO_URL = `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${TMDB_KEY}&language=en-US`;
        console.log("[Player] VIDEO_URL:", VIDEO_URL);
        const resVideo = await fetch(VIDEO_URL);
        const dataVideo = await resVideo.json();
        console.log("[Player] VIDEOS API RESPONSE:", dataVideo);

        const trailer = dataVideo.results?.find(
          v => v.type === "Trailer" && v.site === "YouTube"
        );

        if (trailer) {
          console.log("[Player] Trailer found, videoKey:", trailer.key);
          setVideoKey(trailer.key);
        } else {
          console.warn("[Player] NO TRAILER FOUND!");
        }

        // Step 3: Get poster fallback
        const DETAILS_URL = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_KEY}&language=en-US`;
        console.log("[Player] DETAILS_URL:", DETAILS_URL);
        const resDetails = await fetch(DETAILS_URL);
        const dataDetails = await resDetails.json();
        console.log("[Player] Movie Details:", dataDetails);

        if (dataDetails.poster_path) {
          const posterURL = `https://image.tmdb.org/t/p/w500${dataDetails.poster_path}`;
          console.log("[Player] Poster URL:", posterURL);
          setPoster(posterURL);
        } else {
          console.warn("[Player] No poster available!");
        }

      } catch (err) {
        console.error("[Player] ERROR:", err);
      } finally {
        setLoading(false);
        console.log("[Player] Loading finished.");
      }
    };

    fetchTrailer();
  }, [movieId]);

  if (loading) {
    console.log("[Player] Currently loading trailer...");
    return <div style={{ textAlign: "center" }}><h2>Loading trailer...</h2></div>;
  }

  if (videoKey) {
    console.log("[Player] Rendering iframe for videoKey:", videoKey);
    return (
      <div style={{ textAlign: "center" }}>
        <iframe
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
          title="YouTube Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  console.warn("[Player] Trailer missing. Showing poster fallback.");
  return (
    <div style={{ textAlign: "center" }}>
      {poster ? (
        <img src={poster} alt="Poster" style={{ width: "300px" }} />
      ) : (
        <div style={{ width: "300px", height: "450px", backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p>Poster Not Available</p>
        </div>
      )}
      <h2>Trailer Not Available</h2>
    </div>
  );
};

export default Player;



 