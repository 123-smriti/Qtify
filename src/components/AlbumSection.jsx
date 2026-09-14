import { useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import AlbumCard from './AlbumCard'

function AlbumSection({ title, albums }) {
  const [showAll, setShowAll] = useState(false)

  return (
    <section className="album-section">
      <div className="section-header">
        <h2>{title}</h2>
        <button
          type="button"
          className="show-all-btn"
          onClick={() => setShowAll((value) => !value)}
        >
          {showAll ? 'Collapse' : 'Show All'}
        </button>
      </div>

      {showAll ? (
        <div className="album-grid">
          {albums.map((album) => (
            <AlbumCard key={album.title} album={album} />
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            560: { slidesPerView: 3 },
            760: { slidesPerView: 4 },
            1000: { slidesPerView: 5 },
            1240: { slidesPerView: 6 },
          }}
          className="album-swiper"
        >
          {albums.map((album) => (
            <SwiperSlide key={album.title} className="album-slide">
              <AlbumCard album={album} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  )
}

export default AlbumSection