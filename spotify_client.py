import os
import base64
import time
from dotenv import load_dotenv
import requests
import json
from typing import List, Iterator
from threading import Thread
from concurrent.futures import ThreadPoolExecutor, Future

# Load any environment variables
load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

ARTIST_LIST: List[str] = [
    "Travis Scott",
    "Lana Del Rey",
    "Post Malone",
    "Olivia Rodrigo",
    "Adele",
    "Sabrina Carpenter",
    "21 Savage",
    "Taylor Swift",
    "Bruno Mars",
    "SZA",
    "Drake",
]


def main():
    spotify_client = SpotifyClient()

    start: float = time.perf_counter()
    for artist in ARTIST_LIST:
        spotify_client.retrieve_artist_info(artist)
        end: float = time.perf_counter()

    total_time: float = end - start
    print(f"Single-threaded {total_time=}:")

    print("*" * 50)

    start: float = time.perf_counter()
    with ThreadPoolExecutor() as pool:
        futures: Iterator = pool.map(spotify_client.retrieve_artist_info, ARTIST_LIST)
        results = list(futures)
    
    end: float = time.perf_counter()
    total_time: float = end - start
    print(f"Multi-threaded {total_time=}:")


class SpotifyClient:
    def __init__(self):
        self.access_token = self.get_token()

    def get_token(self):
        """
        Sends a POST request to the /api/token endpoint of the Spotify OAuth 2.0 service
        The request provides the authorization information in order to retrieve an access token.
        Authorization information is an encoded base 64 string containing
        <client_id:client_secret>
        The response contains an access token returned via JSON and is used to authenticate Spotify Web API requests.
        """
        # Create the authorization information as a b64 encoded string
        auth_str: str = client_id + ":" + client_secret
        auth_bytes: bytes = auth_str.encode("utf-8")
        auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

        auth_endpoint_url = "https://accounts.spotify.com/api/token"

        req_headers = {
            "Authorization": "Basic" + " " + auth_base64,
            "Content-Type": "application/x-www-form-urlencoded",
        }

        req_body = {"grant_type": "client_credentials"}

        # Send a POST req to the login API endpoint
        response = requests.post(auth_endpoint_url, headers=req_headers, data=req_body)

        # Raise an HTTP error if one occured
        response.raise_for_status()

        json_result = json.loads(response.content)
        access_token = json_result["access_token"]
        return access_token

    def get_auth_header(self):
        """
        Returns the authorization header for any outgoing HTTP requests sent to the Spotify Web API
        in order to authenticate these requests
        """
        return {"Authorization": "Bearer" + " " + self.access_token}

    def search_for_artist(self, artist_name: str):
        search_endpoint_url = "https://api.spotify.com/v1/search"
        headers = self.get_auth_header()
        # Create a search query, indicating we only want the top 1 artist associated with the given artist name
        query = f"?q={artist_name}&type=artist&limit=1"
        query_url = search_endpoint_url + query

        # Make a GET request to the search endpoint
        response = requests.get(query_url, headers=headers)
        # Raise an HTTP error if one occured
        response.raise_for_status()

        # Load the response as JSON, extract the the artist item information
        json_result = json.loads(response.content)["artists"]["items"][0]
        if len(json_result) == 0:
            raise ValueError(f"No artists with name {artist_name} found")
        else:
            return json_result

    def get_songs_by_arist_id(self, artist_id: str):
        top_tracks_url = (
            f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?country=US"
        )
        response = requests.get(top_tracks_url, headers=self.get_auth_header())
        json_result = json.loads(response.content)["tracks"]
        return json_result

    def retrieve_artist_info(self, artist: str):
        print(f"Searching for artist {artist}")
        artist_search_result = self.search_for_artist(artist)
        print(f"Done searching for {artist=}")
        artist_id = artist_search_result["id"]
        top_tracks = self.get_songs_by_arist_id(artist_id)
        for idx, song in enumerate(top_tracks):
            # print(f'{idx+1}. {song["name"]} preview URL {song["preview_url"]}')
            pass

if __name__ == "__main__":
    main()
