import React from 'react';
//import { useState } from "react";

// react hook for functional component to manage state
//creating a functional component for Search with destructured props
const Search = ({ handleSearch }) => {
  // triggers when  typed input field
  const change = event => {
    // calls function being passed down by props(get info that was typed in)
    handleSearch(event.target.value);
  };
  return (
    // search for query
<div className="input-group">
<input type="text" className="form-control" placeholder="Search" aria-label="Search" />
<button className="btn btn-primary">
<span className="glyphicon glyphicon-search"></span>🔎
</button>

    </div>
  );
};
export default Search;
