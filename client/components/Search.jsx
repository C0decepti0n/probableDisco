import React, { createContext, useContext, useActionState, useState, useEffect } from 'react';
import Queue from './Queue.jsx';


import axios from 'axios';
// API Search & axios post
function Search({theme}) {
  // * Query States * //
  const [artist, setArtist] = useState(''); // artist query
  const [song, setSong] = useState(''); // song query
  const [album, setAlbum] = useState(''); // album query
  const [results, setResults] = useState([]); // API results
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(''); // error handling
  const [oEmbedData, setOEmbedData] = useState({}) // TODO maybe delete
  const [showDropdown, setShowDropdown] = useState(false) // Show Playlists
  const [playlists, setPlaylists] = useState([]); // All playlists
  const [currentPlaylist, setCurrentPlaylist] = useState({});  // Current Playlists
  // Song Model
  const [selectedSong, setSelectedSong] = useState({
    trackId: 0,
    title: '',
    link: '',
    preview: '',
    artist: { name: '', id: 0},
    album: { title: '', id: 0}
  });
  // Playlist Model
  const [playlistAdd, setPlaylistAdd] = useState({
    name: '',
    tracks: {
      data: [
          {
          trackId: 0,
          title: '',
          link: '',
          preview: '',
          artist: { name: '', id: 0},
          album: { title: '', id: 0 },
          }
        ]
    }
  });
  useEffect(() => {
    getPlaylists();
  }, []);
  //* Event Handlers : Search Queries *//
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

  //* Deezer API Request *//
  // Search Deezer
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
 // oEmbed Preview
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
  // oEmbed Preview 
  const previewSong = (selectedSong) => {
  };

  //* Event Handlers : Song Actions
  // Format Selected Song
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

  // * Server Requests *// 
  // get playlists
  const getPlaylists = () => {
    axios
      .get("/library")
      .then((response) => {
        // console.log(response.data[0].tracks.data);
        // console.log("Fetched playlists:", response.data); // Log the response data
        setPlaylists(response.data);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  };
  //Add song from search results to Songs Collection
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

  // Add song from search results to Playlist
  const addToPlaylist = () => {
    
    // Format selectio
    const formattedSong = {
      trackId: selectedSong.id,
      title: selectedSong.title,
      link: selectedSong.link,
      preview: selectedSong.preview || '', // previews can be missing
      artist: {
        name: selectedSong.artist.name,
        id: selectedSong.artist.id,
      }, 
      album: {
        title: selectedSong.album.title,
        id: selectedSong.album.id,
      },
    };
   
    const playlistToUpdate = playlists.find((p) => p._id === currentPlaylist);
      if (!playlistToUpdate) {
        console.error('Playlist not found');
        return;
      }
    const newTracks = playlistToUpdate.tracks;
    newTracks.data.push(formattedSong);
    
    axios.patch(`/library/${currentPlaylist}`, {tracks: newTracks})
      .then(() => {
        console.log(`${formattedSong.title} added to ${playlistToUpdate}`);
      })
      .catch((err) => {
        console.error(`adding ${formattedSong.title} failed at client`, err);
      });
  };
  
  return (
    
    <div style={{background:theme.secondaryColor, borderColor:theme.tertiaryColor, borderWidth:5, borderStyle:'solid', borderRadius:theme.borderRadius, paddingBottom: '20px'}} className='advanced-search'>
      <h1 style={{ fontFamily: 'creepster' }}> Search </h1>
      <div className='search-container' style={{color:theme.primaryColor, display:'block', fontFamily:theme.font, fontWeight:'bold'}}>
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
                className="add-to-playlist "
                onClick={() => setShowDropdown(true)}
              >
                Add to Playlist
              </button>
              {/* Dropdown for selecting playlist */}
              {showDropdown && (
                <div>
                  <select onChange={(e) => {setCurrentPlaylist(e.target.value);setSelectedSong(result)}}>
                    <option value="" disabled selected>Select a Playlist</option>
                    {playlists.map((playlist) => (
                      <option key={playlist._id} value={playlist._id}>
                        {playlist.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={addToPlaylist}>Confirm Add</button> 
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className='result'></div>
      </div>
    </div>
  );
}
export default Search;

