

export default function Hints() {
    return(
        <div id="hint-and-guess-boxes">
            <div id="album-cover"></div>
            <div id="hint-boxes">
            <div className="hint">
                <p id="genre" className="hint-text">Genre:</p>
            </div>
            <div className="hint">
                <p id="artist" className="hint-text">Artist:</p>
            </div>
            <div className="hint">
                <p id="year" className="hint-text">Year Released:</p>
            </div>
            <div id="snippet" className="hint">
                <button id="snippet-button">
                    <div id="play-button"></div>
                </button>
                <p id="snippet-text" className="hint-text">Play Snippet</p>
            </div>
            </div>
        </div>
    )
}