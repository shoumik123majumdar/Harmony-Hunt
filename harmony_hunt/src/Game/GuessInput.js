import React from 'react';
import './GuessInput.css'


function GuessInput({ handleGuess, guessRef, isDisabled}) {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleGuess();
      }
    };
  
    return (
      <input 
        ref={guessRef} 
        onKeyPress={handleKeyPress} 
        type="text" 
        className = "spotify-input"
        placeholder="Enter Guess..."
        disabled = {isDisabled}
      />
    );
  }
  export default GuessInput