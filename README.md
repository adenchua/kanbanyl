# kanbanyl

This is a web application designed to replace a physical kanban board in the office. The web page can be accessed [here](https://www.kanbanyl.com).

## Technologies used

This application is built upon ReactJS framework enhanced with TypeScript for proptype enforcement, MobX for state management and backend using Google's Firebase.
Authentication of the web application is handled by Google Auth

## Installation

Firebase API key is not provided in this repository for security purposes, hence API calls will not work upon forking from this repository. To replicate the database,
a `firebase.js` file is required with the contents to be replaced with Google's Firebase configurations. A template of the file is shown below:

```
import firebase from 'firebase';

const config = {
  apiKey: 'YOUR API KEY',
  authDomain: 'YOUR PROJECT DOMAIN.firebaseapp.com',
  databaseURL: 'YOUR PROJECT DATABASE DOMAIN.firebaseio.com',
  projectId: 'YOUR PROJECT ID',
};

firebase.initializeApp(config);

export default firebase;
```

After configured the `firebase.js` file, you can run your application with `npm start` to deploy on a local server.

## Versioning Control

Version updates can be found in CHANGELOG.md in this repository.
