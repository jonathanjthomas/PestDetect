[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Community](https://img.shields.io/badge/Join-Community-blue)](https://developer.ibm.com/callforcode/solutions/projects/get-started/)


# PestDetect

- [Project summary](#project-summary)
  - [The issue we are hoping to solve](#the-issue-we-are-hoping-to-solve)
  - [How our technology solution can help](#how-our-technology-solution-can-help)
  - [Our idea](#our-idea)
- [Technology implementation](#technology-implementation)
  - [IBM AI service(s) used](#ibm-ai-services-used)
  - [Other IBM technology used](#other-ibm-technology-used)
  - [Solution architecture](#solution-architecture)
- [Presentation materials](#presentation-materials)
  - [Solution demo video](#solution-demo-video)
  - [Project development roadmap](#project-development-roadmap)
- [Additional details](#additional-details)
  - [How to run the project](#how-to-run-the-project)
  - [Live demo](#live-demo)
- [About this template](#about-this-template)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)


## Project summary

### The issue we are hoping to solve

The sustainability challenge our solution aims to address is the global food insecurity caused by the destruction of grains by stored grain pests. PestDetect is designed to circumvent the expensive expertise currently required to identify these stored grain pests and minimize the use of harmful chemical insecticides in granaries.

### How our technology solution can help

An AI-powered mobile application that identifies stored grain pests and recommends sustainable management techniques.

### Our idea

INSTRUCTIONS: Replace this paragraph with a longer description of your solution. In about 500 words, describe your solution in more detail. Include the real-world problem you identified, describe the technological solution you have created, and explain how it’s an improvement over existing solutions. You can supply additional documentation in this source code repository that you link to as well.


More detail is available in our [description document](./docs/DESCRIPTION.md).

## Technology implementation

### IBM AI service(s) used

- [Watson Machine Learning](https://github.com/jonathanjthomas/PestDetect/blob/1bf09b14c0ea3b37424520a868939aee46b936b6/backend/Flask_Backend/app.py) - The Watson Machine Learning service is used to deploy the Image Classification Machine Learning model, used in the backend service of the app. The model has been trained on a dataset of 7000 images of several pest categories. The model was then uploaded to the IBM Cloud Object Storage. Model inferences for the app are now run in Watson Machine Learning. 

- [Watson Assistant](https://github.com/jonathanjthomas/PestDetect/blob/93662c062d354c5c05cca92d9e54ff3ba745cf1e/backend/Nignx_Backend/Web/index.html) - Watson Assistant is used in both the PestSnap and PestBot feature of the app to serve as a chatbot farmer to recommend to them sustainable pest prevention and management techniques, based on different categories of pests . The initial set of management and prevention practices recommended to the user by Watson Assistant is provided through the set of predefined actions for each pest category. Follow up questions are then handled by calling the OpenAI GPT Chat Completion API. A set of system instructions, information about the pest and the user's question are sent through the API, and the response is provided to the user through the Watson Assistant Interface.

- Watson Studio - The Image classification model is uploaded as an asset and deployed using the Watson Studio Deployments service on an extra small CPU and 2 GB RAM Instance.

### Other IBM technology used

Additionally, This project uses:
1. IBM Cloud Kubernetes Service to deploy the Flask Backend and the Nginx Server onto pods which are exposed using the NodePort service.
2. IBM Cloud Object Storage stores the Machine Learning Model on the Watson Studio
3. IBM Container Registry stores the Docker Image of the Flask Backend and the Nginx Server.

The Deployment of the Backend service is done using the IBM Cloud CLI, Docker CLI and Kubernetes CLI. 

1. IBM Cloud CLI was used to login into docker and kubernetes.
2. Docker was used to build the docker image of the Flask Backend and the Nginx Server.
3. Kubernetes was used to deploy the docker image onto the IBM Cloud Kubernetes Service.

### Solution architecture

Diagram and step-by-step description of the flow of our solution:

![Video transcription/translaftion app](https://github.com/jonathanjthomas/PestDetect/blob/d3513101ff47e6a85bd1bfc7dd9553be37cf3012/images/Model_Architecture.jpg)

1. The user navigates to the PestSnap module of the app.
2. User uploads the image through the PestSnap module and it is sent to a Flask web app that is deployed to the IBM Kubernetes service.
3. After preprocessing the image is sent to the IBM Machine Learning for inferencing.
4. The Machine learning model prediction is received by the PestBot module.
5. The received prediction is sent to the NGINX server that is deployed to the IBM Kubernetes service by the app.
6. The IBM Watson Assistant web chat lists the sustainable management practices for the identified pest.
7. The Watson Assistant chatbot is integrated with OpenAi's gpt-3.5-turbo LLM using a custom extension to answer a wide variety of follow-up questions from the farmer.

## Presentation materials

### Solution demo video

[![Watch the video](https://raw.githubusercontent.com/Liquid-Prep/Liquid-Prep/main/images/readme/IBM-interview-video-image.png)](https://youtu.be/vOgCOoy_Bx0)

### Project development roadmap

The project currently does the following things.

- PestSnap - Snap or use an image from gallery to identify a stored grain pest and receive targeted sustainable prevention and management techniques 
- PestBot - Chat with Pest Bot to get more information about stored grain pests

In the future we plan to increase accessibility by adding more languages, integrating a voice reader to support illiterate farmers, and making region specific predictions and recommendations to the farmers

See below for our proposed schedule on next steps after Call for Code 2023 submission.

![Roadmap](https://github.com/jonathanjthomas/PestDetect/blob/d64709fe5f084a1ce47a9dd2101fa52671e370c8/images/PD_Roadmap.jpg)

## Additional details

### How to run the project
Instruction to run the project locally:
1. Clone the repository
2. Navigate to the pest-detect-app directory
3. Run `npm install` or `yarn install` to install the dependencies
4. Run `npm start` or `yarn start` to start the app
5. Scan the QR code using the Expo go app on your phone or use an emulator

Instruction to deploy on Production:
1. Clone the repository
2. Navigate to the pest-detect-app directory
3. Run `eas build`
4. Run `eas submit` to submit the build to the app store


## About this template

### Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We used [GitHub](https://github.com) for versioning. For the versions available, see the [tags on this repository](https://github.com/jonathanjthomas/PestDetect/)

### Authors


- **Ajay Menon**
- **Jonathan Thomas**
- **Siddh Tailor**


### License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
