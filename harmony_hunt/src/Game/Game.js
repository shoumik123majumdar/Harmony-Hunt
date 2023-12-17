import React, {useRef, useState} from 'react';
import '../Login/harmony-hunt-logo_480.png';
import './game_styles.css'
import AlbumImage from './AlbumImage'
import GuessInput from "./GuessInput"
import Genre from "./Genre"
import ReleaseDate from "./ReleaseDate"
import ArtistName from "./ArtistName"
import GameOver from './GameOver.js'
import AudioPlayer from "./AudioPlayer"
import {useLocation} from 'react-router-dom';


function Game() { 
    
  const location = useLocation();
  const userGameData = location.state?.loginData;
  const [guessCount,setGuessCount] = useState(0);
  const [isCorrectGuess,setCorrectGuess] = useState(false);
  const [gameIsOver,setGameIsOver] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);

  const guessRef = useRef();

  const song_info = userGameData ? {
    title: userGameData.track_name,    // Assuming track_name is the field you want
    image_url: userGameData.album_image_url,         // Replace these with the actual field names
    album_name: userGameData.album_name,
    artist: userGameData.artist_name,  // in your userGameData object
    year: userGameData.release_date,    // Same as above
    snippet: userGameData.snippet,
    clip: userGameData.clip,
    genre: userGameData.genre
  } : {
    title: "Loading...",    //Placeholder values
    image_url: "Loading...",          
    album_name: "Loading...",  
    artist: "Loading...",    
    year: "Loading...",     
    snippet: "Loading...",  
    clip: "Loading...",
    genre : "Loading..."
  };

  console.log(song_info)
  
  function handleGuess() {
    setGuessCount(prevCount => {
      const newCount = prevCount + 1;
      const guess = guessRef.current.value;
  
      
      if(newCount>4) { //unblur album cover after the users 4th guess
        setIsBlurred(false);
      }
      if (newCount> 5) { //end the game after the user's 6th guess
        setIsBlurred(false);
        setGameIsOver(true);
      }
      if (guess.toUpperCase() === song_info.title.toUpperCase()) { // If the user guesses correctly..
        setCorrectGuess(true); //set there guess as correct
        setIsBlurred(false); // Unblur the album cover
        setGameIsOver(true); //End the game
        
      } 
      return newCount;
    });
  }
  
  return (
  
    <div className="container">
      <AlbumImage image_url = {song_info.image_url} isBlurred = {isBlurred} />
      <div id="guess-box">
        <GuessInput guessRef = {guessRef} handleGuess = {handleGuess}/>
      </div>
      {
        (gameIsOver || guessCount > 0) && 
        (<Genre song_genre={song_info.genre}/>)
      }
      {
        (gameIsOver || guessCount > 1) && 
        (<ReleaseDate song_date={song_info.year}/>)
      }
      {
        (gameIsOver || guessCount > 2) && 
        (<ArtistName song_artist={song_info.artist}/>)
      }
      {
        (guessCount > 3) && 
        (<AudioPlayer base64Audio={song_info.snippet}/>)
      }
      {gameIsOver && <GameOver song_title = {song_info.title} guessCount = {guessCount} guessIsValid = {isCorrectGuess}/>}
      {gameIsOver && <audio src={song_info.clip} autoPlay></audio>
}


    </div>
    
    
  );
}
export default Game;