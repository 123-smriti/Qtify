import { useEffect, useState } from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import { fetchGenres, fetchSongs } from '../api/musicApi'
import SongCard from './SongCard'

function SongsSection() {
  const [activeGenre, setActiveGenre] = useState('All')
  const [songs, setSongs] = useState([])
  const [genres, setGenres] = useState(['All'])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    Promise.all([
      fetchSongs(controller.signal),
      fetchGenres(controller.signal),
    ])
      .then(([loadedSongs, loadedGenres]) => {
        setSongs(loadedSongs)
        setGenres(loadedGenres)
        setIsLoading(false)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setIsLoading(false)
        }
      })

    return () => controller.abort()
  }, [])

  const visibleSongs =
    activeGenre === 'All'
      ? songs
      : songs.filter((song) => song.genre === activeGenre)

  return (
    <section className="songs-section" aria-labelledby="songs-heading">
      <div className="section-header songs-header">
        <h2 id="songs-heading">Songs</h2>
      </div>

      <Box className="genre-tabs-wrap">
        <Tabs
          value={activeGenre}
          onChange={(_event, genre) => setActiveGenre(genre)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Song genres"
          className="genre-tabs"
        >
          {genres.map((genre) => (
            <Tab key={genre} value={genre} label={genre} />
          ))}
        </Tabs>
      </Box>

      {isLoading ? (
        <p className="section-status">Loading songs...</p>
      ) : (
        <div className="song-grid">
          {visibleSongs.map((song) => (
            <SongCard key={song.title} song={song} />
          ))}
        </div>
      )}
    </section>
  )
}

export default SongsSection
