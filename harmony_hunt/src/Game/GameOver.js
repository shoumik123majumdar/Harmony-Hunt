import React from 'react'


function GameOver({guessCount,song_title,guessIsValid})
{
    var labelContent = "The song is " + song_title + ", try again tommorow (RIP BOZO)";
    if (guessIsValid){
        labelContent = "Congrats you guessed the song " + song_title + " in " + guessCount+ " guesses!";
    }
    return (
        <div >
            <label className='hint'> {labelContent} </label>
        </div>
    );

    }

export default GameOver