[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Community](https://img.shields.io/badge/Join-Community-blue)](https://developer.ibm.com/callforcode/solutions/projects/get-started/)

_INSTRUCTIONS: This GitHub repository serves as a template you can use to create a new project for the [2023 Call for Code Global Challenge](https://developer.ibm.com/callforcode/global-challenge/). Use the **Use this template** button to create a new version of this repository and start entering content for your own Call for Code submission project. Make sure you have [registered for the 2023 Call for Code Global Challenge](https://developer.ibm.com/callforcode/global-challenge/register/) to access resources and full project submission instructions. Remove any "INSTRUCTIONS" sections when you are ready to submit your project._

_New to Git and GitHub? This free online course will get you up to speed quickly: [Getting Started with Git and GitHub](https://www.coursera.org/learn/getting-started-with-git-and-github)_.

# Replace this heading with your team/submission name

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

_INSTRUCTIONS: Complete all required deliverable sections below._

## Project summary

### The issue we are hoping to solve

REPLACE THIS SENTENCE with a short description, 2-3 sentences in length, of the specific sustainability problem your solution is meant to address.

### How our technology solution can help

REPLACE THIS SENTENCE with a short description of your team's solution, in about 10 words.

### Our idea

INSTRUCTIONS: Replace this paragraph with a longer description of your solution. In about 500 words, describe your solution in more detail. Include the real-world problem you identified, describe the technological solution you have created, and explain how it’s an improvement over existing solutions. You can supply additional documentation in this source code repository that you link to as well.

More detail is available in our [description document](./docs/DESCRIPTION.md).

## Technology implementation

### IBM AI service(s) used

_INSTRUCTIONS: Included here is a list of commonly used IBM AI services. Remove any services you did not use, or add others from the linked catalog not already listed here. Leave only those included in your solution code. Provide details on where and how you used each IBM AI service to help judges review your implementation. Remove these instructions._

- [Watson Machine Learning](https://github.com/jonathanjthomas/PestDetect/blob/1bf09b14c0ea3b37424520a868939aee46b936b6/backend/Flask_Backend/app.py) - The Watson Machine Learning service is used to deploy the Image Classification Machine Learning model that used in the backend service of the app. The model is trained on a dataset of images of several pests. The model is then deployed to the IBM Cloud Object Storage. 
- [Watson Assistant](https://github.com/jonathanjthomas/PestDetect/blob/93662c062d354c5c05cca92d9e54ff3ba745cf1e/backend/Nignx_Backend/Web/index.html) - WHERE AND HOW THIS IS USED IN OUR SOLUTION
- [Watson Studio] - The Image classification model is uploaded as an assest and deployed using the Watson Studio Deployments service on a Extra small 1 CPU and 2 GB RAM Instance.

### Other IBM technology used

<<<<<<< HEAD
Additionally, This project uses:
1. IBM Cloud Kubernetes Service to deploy the Flask Backend and the Nginx Server onto pods which exposed using the NodePort service.
2. IBM Cloud Object Storage stores the Machine Learning Model on the Watson Studio
3. IBM Container Registry stores the Docker Image of the Flask Backend and the Nginx Server.

The Depoyment of the Backend service is done using the IBM Cloud CLI, Docker and Kubernetes. 

1. IBM Cloud CLI was used to login into docker and kubernetes.
2. Docker was used to build the docker image of the Flask Backend and the Nginx Server.
3. Kubernetes was used to deploy the docker image onto the IBM Cloud Kubernetes Service.
=======
INSTRUCTIONS: List any other IBM technology used in your solution and describe how each component was used. If you can provide links to/details on exactly where these were used in your code, that would help the judges review your submission.
>>>>>>> 93662c062d354c5c05cca92d9e54ff3ba745cf1e

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

_INSTRUCTIONS: The following deliverables should be officially posted to your My Team > Submissions section of the [Call for Code Global Challenge resources site](https://cfc-prod.skillsnetwork.site/), but you can also include them here for completeness. Replace the examples seen here with your own deliverable links._

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

_INSTRUCTIONS: The following deliverables are suggested, but **optional**. Additional details like this can help the judges better review your solution. Remove any sections you are not using._

### How to run the project

INSTRUCTIONS: In this section you add the instructions to run your project on your local machine for development and testing purposes. You can also add instructions on how to deploy the project in production.

### Live demo

You can find a running system to test at...

See our [description document](./docs/DESCRIPTION.md) for log in credentials.

---

_INSTRUCTIONS: You can remove the below section from your specific project README._

## About this template

### Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

### Authors

<a href="https://github.com/Call-for-Code/Project-Sample/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=Call-for-Code/Project-Sample" />
</a>

- **Billie Thompson** - _Initial work_ - [PurpleBooth](https://github.com/PurpleBooth)

### License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
