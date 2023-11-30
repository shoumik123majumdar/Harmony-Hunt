import React from 'react';
import './AlbumImage.css'

function AlbumImage({image_url, guessCount, albumName}) 
{
    var isBlurred = true;
    var altText = "Make 4 guesses before revealing Album Image"

    if(guessCount>3){
        isBlurred = false;
        altText = albumName
    }
    return (
        <img src= {image_url} alt = {altText} className = {isBlurred ? 'blurred' : ''} />
    );
}
export default AlbumImage