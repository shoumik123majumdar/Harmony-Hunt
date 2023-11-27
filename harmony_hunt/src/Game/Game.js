import React, {useRef, useState, useContext} from 'react';
import '../Login/harmony-hunt-logo_480.png';
//import '../App.css';
import './style.css'
import AlbumImage from './AlbumImage'
import Hints from './Hint';
import {useLocation} from 'react-router-dom';


function Game() { 
    
  const location = useLocation();
  const userGameData = location.state?.loginData;
  const [guessCount,setGuessCount] = useState(0);
  
  const guessRef = useRef();

  const song_info = userGameData ? {
    title: userGameData.track_name,    // Assuming track_name is the field you want
    image_url: userGameData.album_image_url,         // Replace these with the actual field names
    blurred_image : userGameData.album_image_blurred,
    album_name: userGameData.album_name,
    artist: userGameData.artist_name,  // in your userGameData object
    year: userGameData.release_date,    // Same as above
    snippet: userGameData.snippet
  } : {
    title: "Loading...",    //Placeholder values
    image_url: "Loading...",          
    blurred_image : "Loading...",  
    album_name: "Loading...",  
    artist: "Loading...",    
    year: "Loading...",     
    snippet: "Loading..."  
  };


  
  function handleGuess(e) {
    setGuessCount(prevCount => prevCount+1);
    const guess = guessRef.current.value;
    if (guess.toUpperCase() === song_info.title.toUpperCase()) {
    }
  }
  
  return (
    <>
    <AlbumImage image_url = {song_info.image_url} guessCount = {guessCount} />
    <div id="all-boxes">
      <div id="guess-box"  className="hint">
        <input ref={guessRef}type="text" id="guess-input" placeholder="Enter Guess..."></input>
        <button id="guess-button" onClick={handleGuess}></button>
      </div>
    <Hints />
    <div>
          <h1>{song_info.title}</h1>
          <p>Album: {song_info.album_name}</p>
          <p>Artist: {song_info.artist}</p>
          <p>Year: {song_info.year}</p>
          <p>Snippet: {song_info.snippet}</p>
        </div>
    </div>

    <p>{}</p>
    </>
    
  );
}
export default Game;