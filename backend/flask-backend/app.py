from flask import Flask, request, jsonify
import numpy as np
import cv2
import base64
import requests
import os
import logging


# Configure logging
logging.basicConfig(filename='/app/app.log', level=logging.DEBUG)
logger = logging.getLogger(__name__)  # Create a logger for your application

API_KEY = os.environ.get('API_KEY','None') 
ENDPOINT = os.environ.get('ENDPOINT','None')


# Create Flask app
app = Flask(__name__)


# Define function to process image into the np.array format
def process_image(base64_string):
    # Convert Base64 string to image
    image_data = base64.b64decode(base64_string)
    image = np.frombuffer(image_data, dtype=np.uint8)
    image = cv2.imdecode(image, flags=cv2.IMREAD_COLOR)
    
    # Resize image
    resized_image = cv2.resize(image, (256, 256))
    
    # Expand dimensions to match the desired shape (1, 256, 256, 3)
    processed_image = np.expand_dims(resized_image, axis=0)
    
    return processed_image.tolist()

# Define function to make inference to the IBM Watson Machine Learning model
def inference(Image):
    token_response = requests.post('https://iam.cloud.ibm.com/identity/token', data={"apikey":API_KEY, "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})
    mltoken = token_response.json()["access_token"]

   
    # NOTE: manually define and pass the array(s) of values to be scored in the next line
    payload_scoring = {"input_data": [{"values": Image}]}

    response_scoring = None

    try:
        response_scoring = requests.post(ENDPOINT, json=payload_scoring,headers={'Authorization': 'Bearer ' + mltoken})
    except Exception as e:
        logger.error("Error: " + str(e))

    if not response_scoring.json()['predictions'][0]['values'][0]:
        return "Server Error"


    Classes= ["Flour Moths","Grain Borers","Grain and Flour Beetles","Grain Moths","Grain Weevils","Mealworms","Rodents"]

    return Classes[np.argmax(response_scoring.json()['predictions'][0]['values'][0])]

# Define endpoint
@app.route('/process_image', methods=['POST'])
def endpoint():


    if API_KEY == "None" or ENDPOINT == "None":
        return jsonify({'error': 'Server is not configured corrrectly'}), 400
    
    try:
        data = request.json
        base64_string = data['base64_image']

        if not base64_string:
            return jsonify({'error': 'Missing image'}), 400
        

        
        processed_image = process_image(base64_string)

        prediction = inference(processed_image)

        JSON = {
            'Pest': prediction
        }
        
        return jsonify(JSON)
    

    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/')
def index():
    return "Welcome to the backend of the Pest Detect App! , This link provides API for the Pest Snap Feature"


if __name__ == "__main__":
    response = requests.get(ENDPOINT)
    response.raise_for_status()  # Check for HTTP errors

    # Process the API response here
    data = response.json()
    logger.info("API preconnection successful.")

    if(API_KEY == "None" or ENDPOINT == "None"):
        logger.critical("Server is not configured corrrectly")
        exit()

    # Start the App
    app.run(host='0.0.0.0', port=5000)