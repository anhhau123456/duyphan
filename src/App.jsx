import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './pages/Home';

import Sidebar from './components/Sidebar';

function App() {
  const [open, setOpen] = useState(false);
  const drawerWidth = 240;

  return (
    <div className="flex h-screen">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top AppBar */}
        <AppBar position="static" className="z-10">
          <Toolbar className="justify-between">
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setOpen(!open)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              My App
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <div className="flex flex-1">
          {/* Drawer inside the page */}
          <Drawer
            variant="temporary"
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <List>
              {['Home'].map((text) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Main Content Area */}
          <main className="flex-1 bg-gray-100 p-6">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
