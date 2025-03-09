import React, { createContext, useContext, useActionState, useState, useEffect } from 'react';
import Queue from './Queue.jsx';

import axios from 'axios';
// API Search & axios post
function Search({theme}) {
  // * Query Hooks * //
  const [artist, setArtist] = useState(''); // artist query
  const [song, setSong] = useState(''); // song query
  const [album, setAlbum] = useState(''); // album query
  const [results, setResults] = useState([]); // API results
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(''); // error handling
  //* selectedSong = songModel */
  const [selectedSong, setSelectedSong] = useState({
    trackId: 0,
    title: '',
    link: '',
    preview: '',
    artist: { name: '', id: 0},
    album: { title: '', id: 0}
  });
  const [oEmbedData, setOEmbedData] = useState({})

  // Search Inputs
  const handleInputChange = e => { 
    const { name, value } = e.target;
    if (name === 'artist') setArtist(value);
    if (name === 'song') setSong(value);
    if (name === 'album') setAlbum(value);
  };

  // Query String construction
  const createQueryString = () => {
    let query = '';
    if (artist) query += `artist:'${artist}'`;
    if (song) query += `track:'${song}'`;
    if (album) query += `album:'${album}'`;
    return query;
  };

  // Deezer API call
  const handleSubmit = async e => {
    // prevents function from running on page render
    e.preventDefault();
    // results handling
    setLoading(true);
    //TODO : message for no results
    setError('');
    setResults([]);
    try {
      // Build the query string with user inputs
      const queryString = createQueryString();
      if (!queryString) {
        setError('enter at least 1 search term');
        return; // prevents API request attempt
      }
      const response = await fetch(
        `https://api.deezer.com/search?q=${queryString}&limit=10`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      console.log('search success')
      setResults(data.data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add to Play
  const handleSelect = (result) => {
    // Check if result type is a track
    if (!result.type === 'track') console.error('unable to add this format');
    // Format result to match selectedSong
    const formattedSong = {
      trackId: result.id,
      title: result.title,
      link: result.link,
      preview: result.preview || '', // previews can be missing
      artist: {
        name: result.artist.name,
        id: result.artist.id,
      }, 
      album: {
        title: result.album.title,
        id: result.album.id,
      },
    };
    // Set State
    // setSelectedSong(formattedSong);
    // Init post request to server
    addSong(formattedSong);
  }

  // Add song from search results to Songs Collection
  const addSong = (selectedSong) => {
    // songs endpoint and selectSong from state
    axios.post('/songs', selectedSong )
    // success handling
    .then(() => {
      // TODO : render client side success message
      console.log(`${selectedSong.title} added to collection`);
    })
    // error handling
    .catch((err) => {
      console.error('Add song failed at client:', err);
    });
  };

  //* Queue Requests
  const handlePreview = (result) => {
    // Check if result type is a track
    if (!result.type === 'track') console.error('unable to add this format');
    // Format result to match selectedSong
    const formattedSong = {
      trackId: result.id,
      title: result.title,
      link: result.link,
      preview: result.preview || '', // previews can be missing
      artist: {
        name: result.artist.name,
        id: result.artist.id,
      },
      album: {
        title: result.album.title,
        id: result.album.id,
      },
    };
    // Set State
    setOEmbedData(formattedSong);
    // Init post request to server
    previewSong(formattedSong)
  }

  const previewSong = (selectedSong) => {

  };
  return (
    <div style={{background:theme.secondaryColor, borderColor:theme.tertiaryColor, borderWidth:5, borderStyle:'solid', borderRadius:theme.borderRadius, paddingBottom: '200px'}} className='advanced-search'>
      <h1 style={{ fontFamily: 'creepster' }}> Search </h1>
      <div style={{background:theme.secondaryColor, borderColor:theme.tertiaryColor, borderWidth:5, borderStyle:'solid', borderRadius:theme.borderRadius}} className='search-container'>
        <h3 style={{color:theme.primaryColor, display:'block', fontFamily:theme.font, fontWeight:'bold'}}>
          Search for tracks by artist, song, or album
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='artist'>Artist</label>
            <input
              type='text'
              id='artist'
              name='artist'
              value={artist}
              onChange={handleInputChange}
              placeholder='Search for an artist'
            />
          </div>
          <div>
            <label htmlFor='song'>Song</label>
            <input
              type='text'
              id='song'
              name='song'
              value={song}
              onChange={handleInputChange}
              placeholder='Search for a song'
            />
          </div>
          <div>
            <label htmlFor='album'>Album</label>
            <input
              type='text'
              id='album'
              name='album'
              value={album}
              onChange={handleInputChange}
              placeholder='Search for an album'
            />
          </div>
          <button className='submit-button' type='submit'>
            {' '}
            🔎
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div style={{background:theme.secondaryColor, borderColor:theme.tertiaryColor, borderWidth:5, borderStyle:'solid', borderRadius:theme.borderRadius}} className='results-container'>
        <ul style={{ listStyleType: 'none' }}>
          {results.map((result, index) => (
            <li 
              key={index} 
              className={`${
                selectedSong === result ? "selection" : "not"
              }`}
            >
              <strong>{result.title}</strong> by {result.artist.name} from (
              {result.album.title})
              <button
                className="add-song"
                onClick={() => handleSelect(result)}
              >
                Add to Songs
              </button>
              <button
                className="preview-song "
                onClick={() => handlePreview(result)}
              >
                Preview Song
              </button>
             {/** <button>play now</button>  queue */}
            </li>
          ))}
        </ul>
        <div className='result'></div>
      </div>
    </div>
  );
}
export default Search;
