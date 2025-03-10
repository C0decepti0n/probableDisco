import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const axios = require('axios');

// Components
import Settings from './Settings.jsx';
import Search from './Search.jsx';
import Avatar from './Avatar.jsx';
import Library from './Library.jsx';
import Comments from './Comments.jsx';
import Queue from './Queue.jsx';
import Logo from '../images/slimewire.png';

function App() {
  const [themes, setThemes] = useState([]);
  const [theme, setTheme] = useState(
    {
      themeName: 'site default',
      primaryColor: 'black',
      secondaryColor: 'white',
      tertiaryColor: 'green',
      cursor: 'auto',
      font: 'serif',
      borderRadius: 0,
      userId: 0,
    }
  );
  const [avatars, setAvatars] = useState([]);
  const [currentImage, setCurrentImage] = useState(
    {
      name: null,
      idleImage: 'https://img.freepik.com/premium-vector/cute-green-slime-monster-illustration_799627-169.jpg',
      activeImage: 'https://img.freepik.com/premium-vector/cute-green-slime-monster-illustration_799627-169.jpg',
      userId: 0,
    }
  );

  const handleLogout = () => {
    // Send GET req to server logout route
    window.location.href = '/logout'
  };

  return (
    <Router>
      <style>
        {`
          html {
            cursor: url(${theme.cursor}), auto;
          }
        `}
      </style>
      <div>
        <img src={Logo} alt='App Logo' style={{ height: 115, width: 500 }} />
        {/* Nav Links */}
        <nav className='nav'>
          <ul style={{ listStyleType: 'none' }}>
            <li><Link to='/home'>Home</Link></li>
            <li><Link to='/settings'>Settings</Link></li>
            <li><Link to='/search'>Search</Link></li>
            <li><Link to='/avatar'>Avatar</Link></li>
            <li><Link to='/library'>Library</Link></li>
            <li><Link to='/comments'>Comments</Link></li>
            <li><Link to='/queue'>Music Player</Link></li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
        </nav>

        <div className='main-content'>
          {/* Routes = Nav Link Page Paths */}
          <Routes>

            <Route path='/home' element={
              <div>
                <h1 style={{ fontFamily: 'creepster' }}>Get Slimed</h1>
                <img src={currentImage} style={{ width: '50%', height: 'auto' }} />
              </div>
            }/>

            {/* Settings */}
            <Route path='/settings' element={<Settings
              themes={themes}
              setThemes={setThemes}
              theme={theme}
              setTheme={setTheme}
            />} />
            {/* Search */}
            <Route path='/search' element={<Search theme={theme}/>} />
            {/* Avatar */}
            <Route path='/avatar' element={
              <Avatar
                theme={theme}
                avatars={avatars}
                setAvatars={setAvatars}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
              />
            }/>
            {/* Library */}
            <Route path='/library' element={<Library theme={theme} />} />
            {/* Comments */}
            <Route path='/comments' element={<Comments theme={theme}/>} />
            {/* Queue */}
            <Route path='/queue' element={<Queue theme={theme} activeAvatar={currentImage?.activeImage}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
