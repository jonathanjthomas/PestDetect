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
Food insecurity is a present day crisis. Stored grain pests - accounting for 9% and 20% of the post-harvest losses in developed and developing countries respectively- are a major cause of the current food grain shortage. We decided to build a solution overcome these losses by directly supporting the people who connect nature to society - our farmers. A massive problem currently faced by them are the expensive resources and scarce expertise available to identify, rectify and prevent stored-grain pest infestations. Most farmers in developing regions of the world are unable to find experts who can identify and help them prevent stored grain pest infestations. Ultimately, this results in the indescriminate use of insecticides, which are harmful to both the environment and humans. However, these farmers would greatly benefit from a grassroots solution that is affordable and promotes sustainable prevention and management techniques specific to the type of pest their grains are being attacked by. Armed with this new-found knowledge, the farmers of the world would be unstoppable, and able to overcome any pest, any where, at any time of the year. 

Our solution? - PestDetect! PestDetect is a mobile application that places the key to overcoming stored grain pest infestations into the hands of farmers - literally! With the frontend created using Expo React Native, PestDetect is a simple-to-use, seamless and deployment-ready application that provides two basic functionalities to farmers - PestSnap and PestBot. In PestSnap, farmers can either take or upload a photo of a stored grain pest they have found in their grainary or storage area during one of their routine checks. Once they have cropped the photo, it is sent for predicition to an Image Classification model that is deployed on Watson Machine Learning, through a Flask Web App deployed on IBM Cloud Kubernetes. The [model](./backend/PestDetect-Model/PEST-DETECT-V7.51.h5) is trained on 7000 images for 7 classes of pests - Grain Moths, Grain Borers, Grain Weevils, Grain & Flour Beetles, Flour Moths, Mealworms and Rodents - by fine-tuning and adding to the prebuilt MobileNetV3 model. Based on the features it analyses from the image, it predicts and returns to the app the most probable category the pest in the image falls under. 

This prediction received by the app is sent to the Watson Assistant Chatbot we have created ([actions of the chatbot](./backend/Watson_Assistant/PestBot-action.json)). The chatbot (utilising the New action-based Watson Assistant) has actions to respond to a prediction of one of the seven pest categories, with suitable sustainable management techniques that promote prevention rather than extermination. The responses of the chatbot have been prepared using the latest research in the field of pest grain management ([Ahmad R, Hassan S, Ahmad S, et al. (2022) Stored Grain Pests and Current Advances for Their Management. Postharvest Technology - Recent Advances, New Perspectives and Applications. IntechOpen. DOI: 10.5772/intechopen.101503.](https://www.intechopen.com/chapters/79822)). However, the average farmer may require some additional clarity on some of the pest prevention and management techniques initially provided to them by the chatbot. In order to address the innumerable number of queries a farmer may have, we have empowered our chatbot using one of the most advanced large language models currently available - OpenAI's gpt-3.5-turbo. By building a custom extension, we call OpenAI's GPT chat completion API and supply it the following:
 - a set of system instructions that explain to GPT 3.5 how to respond to the farmer in a simple and comprehensible manner. We also instruct it to respond with a 'Sorry, that question is beyond my current scope' message when it is asked a question that is either irrelevant to the pest or unknown to it
 - background information about the specific pest category to provide context and guide its response 
 - the user's query
   
In order to take advantage of the seamless and user friendly UI created by the team at Watson Assistant, we use a web view in the PestBot component of a Watson Assistants webchat that is deployed on an NGINX server in IBM Cloud Kubernetes. The use of Kubernetes and other IBM Cloud services throughout our application allows it to scale to meet the expected demand of millions of farmers around the world. Our app is designed with the concept of design and usability in mind - evidenced by our intuitive user flow and the various help notes that are provided to our users to guide them along the process of receiving the best prediction for the pest that attacks their grains.

How does our solution differ from existing solutions? Like night and day. Currently, the use of image classification to predict stored grain pests is still in the research phase - far from the farmers who are in dire need of a directly accessible application. Additionally, preexisiting apps on app stores only provide predictions focussing on field pests - ignoring the tremendous post harvest losses due to stored grain pests. Moreover, these applications are devoid of the feature of providing sustainable prevention and management techniques - the very feature that takes our app from principle to practice. Finally, we aim to release our app at the extremely low monthly cost of $0.23 per month - the price of two cups of tea in most developing countries. 
We are grateful to the team at IBM Call for Code 2023 for providing us the opportunity and resources to use our skills to create this awesome application. We certainly believe that PestDetect will go a long way in bringing these farmers the solution that they deserve.


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

[Watch the video](https://youtu.be/T_OGQxEcOj4)

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

1. Create an account in Expo (expo.dev)
2. Install the EAS CLI: npm install --global eas-cli
3. Run eas login , and enter your credentials
4. Run `npm install` ( yarn install if using yarn)
5. Run `npm run start` ( yarn start if using yarn)
6. Enter 's' to switch to the 'Expo Go' mode
7. Download Expo from your phone's app store, and log in using the account created
8. Scan the second QR Code generated in the Expo app. When prompted "How would you like to open this project", select "Expo Go"
Note: Ensure you are signed into the same Expo account in both the app and your computer. Verify that your computer is connected to the Internet, ideally the same Wi-Fi network as your mobile device

Instruction to deploy on Production:
Prior to this eas will need to be Setup on the machine. Follow the instructions [here](https://docs.expo.dev/build/setup/) to configure eas.

1. Clone the repository
2. Navigate to the pest-detect-app directory
3. Run `eas build`
4. Run `eas submit` to submit the build to the app store

### Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We used [GitHub](https://github.com) for versioning. For the versions available, see the [tags on this repository](https://github.com/jonathanjthomas/PestDetect/)

### Authors


- **Ajay Menon**
- **Jonathan John Thomas**
- **Siddh Tailor**


### License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.
