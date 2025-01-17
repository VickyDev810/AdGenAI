import os
import httpx
from azure.identity import DefaultAzureCredential
from openai import AzureOpenAI
from PIL import Image
import json

credential = DefaultAzureCredential()
client = AzureOpenAI(
    api_version="2024-02-01",
    azure_endpoint=os.environ['AZURE_OPENAI_ENDPOINT'],
    credential=credential
)

result = client.images.generate(
    model="dalle3", # the name of your DALL-E 3 deployment
    prompt="an billboard advertisement for the keyboard black body, write functions in english language one corner of a plain white background 1. function is rgb lighting, 2. is mechincal keyboard, 3. is sounds and add the company name in one corner",
    n=1
)

# Set the directory for the stored image
image_dir = os.path.join(os.curdir, 'images')

# If the directory doesn't exist, create it
if not os.path.isdir(image_dir):
    os.mkdir(image_dir)

# Initialize the image path (note the filetype should be png)
image_path = os.path.join(image_dir, 'generated_image.png')

# Retrieve the generated image
json_response = json.loads(result.model_dump_json())
image_url = json_response["data"][0]["url"]  # extract image URL from response
generated_image = httpx.get(image_url).content  # download the image

with open(image_path, "wb") as image_file:
    image_file.write(generated_image)

# Display the image in the default image viewer
image = Image.open(image_path)
image.show()