# Event Management Website

Welcome to the Event Management Website project! This web application provides a platform for organizing and managing events. Users can create accounts, send messages to event organizers, and enjoy a seamless event booking experience.

## Features

- User Registration and Login
- Organizer Registration and Login
- User-friendly Dashboard for Organizers
- Image Upload for Organizers
- Forget Password Functionality
- Admin Module for Admin Users
- Admin Dashboard with User Management
  - Delete Users
  - View Users

## Technologies Used

- Frontend:
  - HTML
  - CSS
  - JavaScript
  - Bootstrap
  - Reactjs

- Backend:
  - Node.js
  - Express.js

- Database:
  - MongoDB

## Getting Started

1. Clone the repository:


2. Navigate to the project directory:

    cd event-management-website



3. Install dependencies on both backend as well as main directory:

    npm install




4. Set up your environment variables, such as database connection details and email configurations.



5. Start the server:

    npm start



6. Access the website locally in your web browser:

    http://localhost:3000




## note
Note that to send emails you need to add your email address and the app password not your email password. You can create the app password in you accound settings.
Next add that email id and app password into 

backend/routes/auth.js - Locate to sendmail route


## Usage

- Users can create accounts to book and manage events.
- Organizers can create accounts, manage events, and receive messages from users.
- Admins have access to a dashboard for user management.



## License

This project is not licensed under the MIT License and it is completely free except the bootstrap desing templates.

## Acknowledgments

We would like to thank all contributors for their efforts in developing and improving this project.
