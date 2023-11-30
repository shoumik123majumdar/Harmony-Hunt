import React from 'react'
import './style.css'

function Genre({song_genre,guessCount})
{
    var isVisible = false;
    if (guessCount>0){
        isVisible = true;
    }

    var genre_text = "Genres : "
    for (let i=0; i<song_genre.length-1;i++)
    {
        genre_text += song_genre[i] + ", "
    }
    genre_text +=song_genre[song_genre.length-1]

    return (
        <div >
        {isVisible && <label className="hint">{genre_text}</label>}
        </div>
    );
}

export default Genre