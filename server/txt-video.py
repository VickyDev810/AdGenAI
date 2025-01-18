from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import time
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

API_KEY = os.getenv("API_KEY")

@app.route('/generate-video', methods=['POST'])
def generate_video():
    data = request.json
    prompt = data.get("prompt", "")
    time_duration = data.get("time", 5)

    url = "https://api.aivideoapi.com/runway/generate/text"
    payload = {
        "text_prompt": prompt,
        "model": "gen3",
        "width": 1344,
        "height": 768,
        "motion": 5,
        "seed": 0,
        "callback_url": "",
        "time": time_duration
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": API_KEY
    }

    response = requests.post(url, json=payload, headers=headers)
    response_data = response.json()

    uuid = response_data.get("uuid")
    status_url = f"https://api.aivideoapi.com/status?uuid={uuid}"

    while True:
        status_response = requests.get(status_url, headers=headers)
        status_data = status_response.json()
        status = status_data.get("status")
        print(status_data)
        if status == "success":
            video_url = status_data.get("url")
            return jsonify({"status": "success", "video_url": video_url})
        elif status == "failed":
            return jsonify({"status": "failed", "message": "The task failed. Please check the error message."})
        else:
            time.sleep(10)

if __name__ == '__main__':
    app.run(debug=True)
