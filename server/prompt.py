from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import base64
from openai import AzureOpenAI

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Set your Azure endpoint and credentials
endpoint = os.getenv("ENDPOINT_URL", "https://veerv-m612vhmv-swedencentral.openai.azure.com/")
deployment = os.getenv("DEPLOYMENT_NAME", "gpt-4o-mini")
subscription_key = os.getenv("AZURE_OPENAI_API_KEY", "REPLACE_WITH_YOUR_KEY_VALUE_HERE")

# Initialize Azure OpenAI Service client with key-based authentication    
client = AzureOpenAI(
    azure_endpoint=endpoint,
    api_key=subscription_key,
    api_version="2024-05-01-preview",
)

# Function to create chat prompt for image advertisement
def create_image_prompt(text_input=None, image_path=None):
    messages = []

    # Add system message to guide the AI for image prompts
    system_message = {
        "role": "system",
        "content": "Assist the user in crafting concise, 30-word prompts for image generation using dall-e model tailored for advertisements."
    }
    messages.append(system_message)

    # Add user input message (text and/or image)
    if text_input:
        user_text_message = {
            "role": "user",
            "content": text_input
        }
        messages.append(user_text_message)

    if image_path:
        # Encode the image as base64
        with open(image_path, 'rb') as img_file:
            encoded_image = base64.b64encode(img_file.read()).decode('ascii')

        user_image_message = {
            "role": "user",
            "content": f"data:image/jpeg;base64,{encoded_image}"
        }
        messages.append(user_image_message)

    return messages

@app.route('/generate_ad', methods=['POST'])
def generate_ad():
    data = request.json
    text_input = data.get('text')
    image_path = data.get('image')  # Optionally, base64 encoded image
    
    # Prepare the chat prompt based on user input for image ad
    messages = create_image_prompt(text_input=text_input, image_path=image_path)
    
    # Generate the completion from the model for image ad
    completion = client.chat.completions.create(
        model=deployment,
        messages=messages,
        max_tokens=800,
        temperature=0.7,
        top_p=0.95,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None,
        stream=False
    )

    try:
        # Access the generated response
        response = completion.choices[0].message.content
        return jsonify({"advertisement": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
