import React, { useState, useEffect } from 'react';

const Queue = ({ activeAvatar, theme }) => {
  // Data from Deezer request
  const [oEmbedData, setOEmbedData] = useState(null);

  // const fetchOEmbedData = async(url) => {
  //   const res = await axios.post('/queue')
  // }

  useEffect(() => {
    const fetchData = async () => {
      // const data = await fetchOEmbedData(url); // POST request to server
      const data = {
        version: "1.0",
        type: "rich",
        cache_age: 86400,
        provider_name: "Deezer",
        provider_url: "https://www.deezer.com",
        entity: "album",
        id: "302127",
        url: "https://www.deezer.com/en/album/302127",
        author_name: "Daft Punk",
        title: "Discovery",
        width: 700,
        height: 300,
        html: "<iframe id=\"deezer-widget\" src=\"https://widget.deezer.com/widget/dark/album/302127?app_id=457142&autoplay=false&radius=true&tracklist=true\" width=\"700\" height=\"300\" allowtransparency=\"true\" allowfullscreen=\"true\" allow=\"encrypted-media\"></iframe>",
      }; // POST request to server
      setOEmbedData(data);
    };

    fetchData();
  }, []);

  if (!oEmbedData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     <h1 style={{fontFamily: 'creepster'}}> play back </h1>

    <div>
        <h2>{oEmbedData.title}</h2>
        <p>By: {oEmbedData.author_name}</p>

        {activeAvatar ? (
          <img
            src={activeAvatar}
            alt="Active Avatar"
            width={100}
            height={100}
          />
        ) : (
          <p>where's your little monster?</p>
        )}

        <p>
          <a href={oEmbedData.url} target="_blank" rel="noopener noreferrer">
            Listen on Deezer
          </a>
        </p>

        <div
          dangerouslySetInnerHTML={{ __html: oEmbedData.html }}
        />
      </div>
    </div>
  );
}

export default Queue;