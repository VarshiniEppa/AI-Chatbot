import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

def call_gemini():
    url = f"url = f"https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key={API_KEY}"

    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "contents": [
            {
                "parts": [
                    {"text": "Tell me a joke about AI."}
                ]
            }
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    print(response.json())

call_gemini()
