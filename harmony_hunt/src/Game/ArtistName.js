import React from 'react'


function ArtistName({song_artist})
{
    return (
        <div >
        <label className="hint">{"Artist: "+ song_artist}</label>
        </div>
    );
}

export default ArtistName