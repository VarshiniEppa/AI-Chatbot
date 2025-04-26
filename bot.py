import google.generativeai as genai
from config import Config

class GeminiBot:
    def __init__(self):
        genai.configure(api_key=Config.GEMINI_API_KEY)

        # Explicitly use the correct model and API version
        self.model = genai.GenerativeModel(
            model_name="models/gemini-1.5-pro-002",  # Full model path
        )
        self.chat = self.model.start_chat(history=[])

    def get_response(self, message):
        try:
            response = self.chat.send_message(message)
            return response.text.strip()
        except Exception as e:
            return f"Error from Gemini API: {e}"
