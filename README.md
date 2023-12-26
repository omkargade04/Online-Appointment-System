## Installation

```bash
$ npm install
```

## Running the app

```bash
# To start the React App
$ npm start

# To start the Nodejs server.js
$ nodemon server.js

```

## Description

- Online Appointment System is a MERN Stack based Application which helps users to book doctors for treatment. It has mainly three roles Admin, Users and Doctors.


## Features of the Application
- The Online Appointment System is a Full Stack Application which helps users to book doctors for treatment.
- The application has a very user-friendly interface and relies on a scalable backend.
- The backend of the application is build in Nodejs & Expressjs and the data is stored using MongoDB.
- The frontend is mainly built using Reactjs, Bootstrap and CSS. 
- The application has user Authentication and role Authorization features.
- There are mainly three roles,
  1) Admin
  2) Users
  3) Doctors

## Flow of the Application
- You need to register as an Admin and log in into the application. Then you the user info has a role specifier called "isAdmin" which will we false initially but to be admin, you need to update it's status to true so that you can become the admin.
- So as admin you will be directed to admin interface.
- Moving on the application is going to need a doctor, so by registering and logging in to the app by a new user, the app has a section for "Apply Doctor" position. So you need to fill the doctor's information.
- After that the admin will recieve a notification for doctor's request which he'll need to accept and the user will get a notification of accepted approval by admin and he will be directed to doctor's interface.
- The admin will have to update the timing mentioned by the doctor in the database.
- Then a new user registered and logged in successfully will be able to apply for appointment with the doctor.
- The user has to choose the timing mentioned by doctor and check for availability and then book his/her slot.
- The doctor will be notified about the user's booking and will have to accept/reject the user according to his needs.
- The user will be notified about his appointment status which is accepted or rejected.
