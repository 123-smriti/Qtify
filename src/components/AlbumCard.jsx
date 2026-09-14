import { Link } from 'react-router-dom'

function AlbumCard({ album }) {
  const { title, artist, image, likes } = album

  return (
    <Link
      to={`/albums/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
      state={{ album }}
      className="album-card-link"
    >
      <article className="album-card">
        <div className="album-image-wrap">
          <img src={image} alt={title} className="album-image" />
          <span className="album-likes">{likes}</span>
        </div>

        <div className="album-info">
          <h3>{title}</h3>
          <p>{artist}</p>
        </div>
      </article>
    </Link>
  )
}

export default AlbumCard
