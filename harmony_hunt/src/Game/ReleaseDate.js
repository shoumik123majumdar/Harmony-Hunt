import React from 'react'
import './style.css'

function ReleaseDate({song_date,guessCount})
{
    var isVisible = false;
    if (guessCount>1){
        isVisible = true;
    }
    const finalDate = song_date.substring(5) + "-" + song_date.substring(0,4);
    const genre_text = "Release Date : " + finalDate

    return (
        <div >
        {isVisible && <label className="hint">{genre_text}</label>}
        </div>
    );
}

export default ReleaseDate