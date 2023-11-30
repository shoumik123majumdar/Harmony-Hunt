import React from 'react'
import './style.css'

function ArtistName({song_artist,guessCount})
{
    var isVisible = false;
    if (guessCount>2){
        isVisible = true;
    }

    return (
        <div >
        {isVisible && <label className="hint">{"Artist: "+ song_artist}</label>}
        </div>
    );
}

export default ArtistName