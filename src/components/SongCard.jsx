function SongCard({ song }) {
  const { title, artist, image } = song

  return (
    <article className="song-card">
      <img src={image} alt="" className="song-image" />
      <div className="song-info">
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
    </article>
  )
}

export default SongCard
