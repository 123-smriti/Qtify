const API_BASE_URL = 'https://qtify-backend-labs.crio.do'

const fallbackAlbums = [
  {
    title: 'Midnight Echo',
    artist: 'Neon Harbor',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
    likes: 12.9,
  },
  {
    title: 'Glass Skies',
    artist: 'Ari Vale',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    likes: 9.8,
  },
  {
    title: 'Sunset Drive',
    artist: 'Milo West',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80',
    likes: 11.2,
  },
  {
    title: 'Electric Bloom',
    artist: 'Stella Ray',
    image:
      'https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=900&q=80',
    likes: 8.4,
  },
  {
    title: 'Velvet Tide',
    artist: 'Luna Hart',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
    likes: 10.6,
  },
  {
    title: 'Afterglow',
    artist: 'Ocean Lane',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    likes: 7.9,
  },
]

const fallbackSongs = [
  {
    title: 'City Lights',
    artist: 'Nova Bloom',
    genre: 'All',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Midnight Echo',
    artist: 'Neon Harbor',
    genre: 'Rock',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Velvet Tide',
    artist: 'Luna Hart',
    genre: 'Jazz',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Sunset Drive',
    artist: 'Milo West',
    genre: 'Pop',
    image:
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Electric Bloom',
    artist: 'Stella Ray',
    genre: 'Electronic',
    image:
      'https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=700&q=80',
  },
  {
    title: 'Afterglow',
    artist: 'Ocean Lane',
    genre: 'Rock',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80',
  },
]

const fallbackGenres = ['All', 'Rock', 'Jazz', 'Pop', 'Electronic']

async function fetchJson(path, signal) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export async function fetchTopAlbums(signal) {
  try {
    const albums = await fetchJson('/albums/top', signal)
    return albums.length > 0 ? albums : fallbackAlbums
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }
    return fallbackAlbums
  }
}

export async function fetchNewAlbums(signal) {
  try {
    const albums = await fetchJson('/albums/new', signal)
    return albums.length > 0 ? albums : fallbackAlbums
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }
    return fallbackAlbums
  }
}

export async function fetchSongs(signal) {
  try {
    const songs = await fetchJson('/songs', signal)
    return songs.length > 0 ? songs : fallbackSongs
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }
    return fallbackSongs
  }
}

export async function fetchGenres(signal) {
  try {
    const genres = await fetchJson('/genres', signal)
    return ['All', ...genres.filter((genre) => genre !== 'All')]
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error
    }
    return fallbackGenres
  }
}
