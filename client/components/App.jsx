import React from 'react';
import Search from './Search.jsx';
const axios = require('axios');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  searchDeezer(query) {
    axios
      .get(`https://api.deezer.com/search?q=${query}`)
      .then(data => {
        console.log('successfully queried deezer', data[0]);
        return data;
      })
      .catch(err => {
        console.error('deezer query failed', err);
      });
  }

  render() {
    return (
      <div>
        <nav className='main-nav'>Slime Wire</nav>
        <div className='main-content'>
          <Search handleSearch={this.searchDeezer} />
          <Library/>
        </div>
      </div>
    );
  }
}

export default App;
