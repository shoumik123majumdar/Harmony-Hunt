import React from 'react';
import './AlbumImage.css'

function AlbumImage({image_url, guessCount}) 
{
    var isBlurred = true;
    if(guessCount>3){
        isBlurred = false;
    }
    return (
        <img src= {image_url} alt = "Album_Image" className = {isBlurred ? 'blurred' : ''} />
    );
}
export default AlbumImage