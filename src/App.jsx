import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import LibraryPage from './pages/LibraryPage'
import AlbumDetailsPage from './pages/AlbumDetailsPage'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#34c38f',
    },
    secondary: {
      main: '#7c3aed',
    },
    background: {
      default: '#0f172a',
      paper: '#111827',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-shell">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/albums/:albumSlug" element={<AlbumDetailsPage />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
