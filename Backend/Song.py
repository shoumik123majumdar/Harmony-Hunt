import requests
from io import BytesIO
from pydub import AudioSegment
import base64
import random


class Song():
    def __init__(self,track_info):
        self.track_name =  track_info['track_name']
        self.release_date = track_info['release_date']
        self.artist_name = track_info['artist_name']
        self.album_name = track_info['album_name']
        self.album_image_url = track_info['album_image_url']
        self.genre = track_info['genre']
        self.clip = track_info['clip']
        self.snippet = self.shorten_audio_url(self.clip)


    def get_track_name(self):
        return self.track_name
    def get_release_date(self):
        return self.release_date
    def get_artist_name(self):
        return self.artist_name
    def album_name(self):
        return self.album_name()

    def get_album_image(self):
        return self.album_image_url

    def get_genre(self):
        return self.genre
    def get_clip(self):
        return self.clip
    def get_snippet(self):
        return self.snippet()

    def shorten_audio_url(self, audio_url):
        # Fetch the audio file
        response = requests.get(audio_url)
        audio_data = BytesIO(response.content)

        # Load the audio file
        audio = AudioSegment.from_mp3(audio_data)

        # Get a random start point
        max_start = len(audio) - 1500  # Subtract 1500 milliseconds from total length
        random_start = random.randint(0, max_start)  # Random start point

        # Extract 1.5 seconds from the random start point
        shortened_audio = audio[random_start:random_start + 1500]

        # Export the audio snippet
        audio_data = shortened_audio.export(format='mp3')
        base64_audio = base64.b64encode(audio_data.read()).decode("utf-8")

        return base64_audio