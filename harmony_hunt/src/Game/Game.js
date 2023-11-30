import React, {useRef, useState} from 'react';
import '../Login/harmony-hunt-logo_480.png';
import './style.css'
import AlbumImage from './AlbumImage'
import GuessInput from "./GuessInput"
import Genre from "./Genre"
import ReleaseDate from "./ReleaseDate"
import ArtistName from "./ArtistName"
import AlbumName from "./AlbumName"
import AudioPlayer from "./AudioPlayer"
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
    snippet: userGameData.snippet,
    genre: userGameData.genre
  } : {
    title: "Loading...",    //Placeholder values
    image_url: "Loading...",          
    blurred_image : "Loading...",  
    album_name: "Loading...",  
    artist: "Loading...",    
    year: "Loading...",     
    snippet: "Loading...",  
    genre : "Loading..."
  };
  
  function handleGuess() {
    setGuessCount(prevCount => prevCount+1);
    const guess = guessRef.current.value;
    if (guess.toUpperCase() === song_info.title.toUpperCase()) {
    }
  }
  
  return (
  
    <div className="container">
      <AlbumImage image_url = {song_info.image_url} guessCount = {guessCount} albumName = {song_info.album_name} />
      <AlbumName song_album = {song_info.album_name} guessCount = {guessCount}/>
      <div id="guess-box">
        <GuessInput guessRef = {guessRef} handleGuess = {handleGuess}/>
      </div>
      <Genre song_genre = {song_info.genre} guessCount = {guessCount}/>
      <ReleaseDate song_date={song_info.year} guessCount = {guessCount}/>
      <ArtistName song_artist = {song_info.artist} guessCount = {guessCount}/>
      <AudioPlayer base64Audio={song_info.snippet} guessCount = {guessCount}/>
    </div>
    
    
  );
}
export default Game;