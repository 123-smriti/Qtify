import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchTopAlbums } from '../api/musicApi'

function toAlbumSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function AlbumDetailsPage() {
  const { albumSlug } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [album, setAlbum] = useState(location.state?.album || null)
  const [isLoading, setIsLoading] = useState(!location.state?.album)

  useEffect(() => {
    if (album) {
      return undefined
    }

    const controller = new AbortController()

    fetchTopAlbums(controller.signal)
      .then((albums) => {
        const matchingAlbum = albums.find((item) => toAlbumSlug(item.title) === albumSlug)
        setAlbum(matchingAlbum || null)
        setIsLoading(false)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setIsLoading(false)
        }
      })

    return () => controller.abort()
  }, [album, albumSlug])

  if (isLoading) {
    return <p className="section-status">Loading album...</p>
  }

  if (!album) {
    return (
      <section className="details-empty">
        <h1>Album not found</h1>
        <p>The album may no longer be available.</p>
        <Link to="/" className="details-back-link">Back to home</Link>
      </section>
    )
  }

  return (
    <section className="album-details-page">
      <button type="button" className="details-back-button" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="album-details">
        <img src={album.image} alt={album.title} className="album-details-image" />
        <div className="album-details-copy">
          <span className="hero-kicker">Album details</span>
          <h1>{album.title}</h1>
          <p className="album-details-artist">{album.artist}</p>
          <p className="album-details-meta">{album.likes}k likes</p>
          <Link to="/" className="primary-btn details-home-link">Browse more music</Link>
        </div>
      </div>
    </section>
  )
}

export default AlbumDetailsPage
