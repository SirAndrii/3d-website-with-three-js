# 3D Website with Three.js
This repository contains the code for a 3D website built using React, Three.js, Webgl.
![Apr-09-2023 15-38-27](https://user-images.githubusercontent.com/24919819/230793140-51f4e699-17b1-43b7-b71c-0c09d7320716.gif)

## Main Challenges

-Integrating React with Three.js and other libraries
-Creating a responsive and visually appealing design
-Implementing animation and interactivity with Webgi and gsap
-Responsiveness
-Optimizing performance for large 3D models and animations


## Installation
Clone the repository: git clone https://github.com/username/3d-website-with-three-js.git
Install dependencies: npm install


## Usage
You can see live version on https://3d-react-demo.netlify.app/

To start the development server: npm run dev

This will start a development server that will serve the website on http://localhost:3000. Any changes made to the code will automatically refresh the website.

To build the project for production: npm run build

This will create a production build of the website in the dist directory.

To preview the production build: npm run preview

This will serve the production build of the website on http://localhost:5000.

## Dependencies
The following dependencies are used in this project:

- React for building the UI
- Three.js for rendering 3D graphics
- gsap for animation
- webgi for interactive 3D models
- vite for development server and build tool

### Webgi
Webgi is a library that provides a WebGL-based runtime for interactive 3D models. It allows users to interact with 3D models in real-time, providing a more engaging and immersive experience.

In this project, Webgi is used to display an interactive 3D model of an iPhone. The WebgiViewer component renders the model and provides functionality for zooming and rotating the model.

### Iphone 3d model
Used Iphone 3d model was downloaded from https://sketchfab.com/3d-models/iphone-13-pro-max-4f92b60d824a42c89bbf1833374c4f73

### Scroll Config File
The scroll-config.ts file contains the ScrollTriggerConfig class, which is used to configure the ScrollTrigger plugin from gsap. This class defines the trigger, start, end, scrub, and immediateRender properties of the ScrollTrigger.

