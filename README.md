Repository for [https://gt-phonlab.com](https://gt-phonlab.com)

Project of the Georgia Tech Department of Modern Languages & Phonology Laboratory

Recipient of the DILAC grant

[Video Demo](https://www.youtube.com/watch?v=g2PBWmSXKlY)

## Credit
- Dr.Yongtaek Kim
- Dr.Robert Griffin
- Ethan Roland
- Chaeeun Song

## Contents
- Phonology section
  - small Neural Network running on-browser to automatically assess quality of student vowel phoneme production
  - utilizes ONNX.js
- Vocabulary section
  - flashcard and quiz utilities to facilitate Korean vocabulary aquisition 
  - localStorage based progress tracking on quizes

## Building & Deployment
For development server, go to root directory and run:

### `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build for production, go to root directory and run:

### `npm run build`

The built project will be located in the /build folder under the root directory.
Deploy using a suitable production file server configured for Single Page Apps, such as Nginx.
