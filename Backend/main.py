import os
import random
from Spotipy import Spotipy
from flask import Flask, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
from Song import Song


app = Flask(__name__)
#CORS(app) #Update when we get an actual domain for the website


def clear_cache():
    if os.path.exists("../.cache"):
        os.remove("../.cache")

@app.route('/generate-random-song') #Ask what a good naming principle is for
@cross_origin()
def generate_random_song():
    clear_cache()
    CLIENT_ID = os.environ.get("CLIENT_ID")
    CLIENT_SECRET = os.environ.get("CLIENT_SECRET")
    SCOPE = "user-read-playback-state user-top-read user-read-recently-played"

    sp = Spotipy(CLIENT_ID, CLIENT_SECRET, SCOPE)
    sp.authenticate_user()

    tracks = list(set(sp.get_current_user_recently_played(limit=50)))
    #Handle when user doesn't have enough songs (aka len(tracks) ==0) or if persistence is implemented, tracks have already been used
    #Prompt them with something like "Listen to more new music"
    song_index = random.randint(0, len(tracks) - 1)

    # Randomly chooses one of the 50 most recently played tracks
    chosen_track_id = tracks[song_index]
    song_info = sp.get_track_info(chosen_track_id)
    return jsonify(song_info)


if __name__ == '__main__':
    app.run(debug=True)





