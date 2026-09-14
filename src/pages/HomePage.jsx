import { useEffect, useState } from 'react'
import AlbumSection from '../components/AlbumSection'
import SongsSection from '../components/SongsSection'
import { fetchNewAlbums, fetchTopAlbums } from '../api/musicApi'

function HomePage() {
  const [topAlbums, setTopAlbums] = useState([])
  const [newAlbums, setNewAlbums] = useState([])
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    Promise.all([
      fetchTopAlbums(controller.signal),
      fetchNewAlbums(controller.signal),
    ])
      .then(([loadedTopAlbums, loadedNewAlbums]) => {
        setTopAlbums(loadedTopAlbums)
        setNewAlbums(loadedNewAlbums)
        setIsLoadingAlbums(false)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setIsLoadingAlbums(false)
        }
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="page-shell hero-shell">
      <div className="hero-content">
        <div className="hero-copy">
          <h1 className="hero-title">100 Thousand Songs, ad-free</h1>
          <h2 className="hero-subtitle">Over thousands podcast episodes</h2>
        </div>

        <div className="hero-card-panel">
          <div className="hero-card">
            <span className="hero-card-label">Your sound, your way</span>
            <div className="hero-headphone" aria-hidden="true">♫</div>
          </div>
        </div>
      </div>

      {isLoadingAlbums ? (
        <p className="section-status">Loading albums...</p>
      ) : (
        <>
          <AlbumSection title="Top Albums" albums={topAlbums} />
          <AlbumSection title="New Albums" albums={newAlbums} />
        </>
      )}

      <SongsSection />
    </section>
  )
}

export default HomePage
