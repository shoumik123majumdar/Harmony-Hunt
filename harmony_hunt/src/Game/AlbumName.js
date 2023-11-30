import React from 'react'
import './style.css'

function AlbumName({song_album,guessCount})
{
    var isVisible = false;

    if (guessCount>3){
        isVisible = true;
    }
    

    return (
        <div >
        {isVisible && <label className="hint">{"Album: "+ song_album}</label>}
        </div>
    );
}

export default AlbumName