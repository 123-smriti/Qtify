import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Library', path: '/library' },
]

function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar className="topbar">
        <div className="brand-wrap">
          <div className="brand-logo">Q</div>
          <Typography variant="h6" component="div" className="brand-title">
            QTify
          </Typography>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Search a song of your choice" />
        </div>

        <nav className="nav-menu" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Button variant="contained" className="feedback-btn">
          Feedback
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
