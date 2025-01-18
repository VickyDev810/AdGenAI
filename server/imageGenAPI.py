import os
import httpx
from openai import AzureOpenAI
from dotenv import load_dotenv
from flask import Flask, jsonify, request

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Initialize the Azure OpenAI client
client = AzureOpenAI(
    api_version="2024-02-01",
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    azure_endpoint=os.getenv('AZURE_OPENAI_ENDPOINT_IMAGES')
)

@app.route('/generate_image', methods=['POST'])
def generate_image():
    try:
        # Extract the prompt from the request body
        data = request.get_json()

        # Ensure prompt is provided by the user
        prompt = data.get('prompt', None)
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400
        
        # Generate image using Azure OpenAI DALL-E
        result = client.images.generate(
            model="dalle3",  # Model used in the Azure deployment
            prompt=prompt,
            n=1
        )

        # Extract image URL
        image_url = result.data[0].url

        # Return the image URL in the response
        return jsonify({"image_url": image_url})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
