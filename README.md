# Mongo_Express_Backend

## Overview

This repository is structured to handle various aspects of the application with different directories and files.

## Project Structure

The project is organized into directories and files as follows:

- **controllers:** Contains controllers for managing different entities within the system.

  - `cameraController.js`
  - `userController.js`
  - `postController.js`
  - `videoController.js`

- **db:** Includes the database connection file.

  - `connection.js`

- **models:** Holds the database models for different entities.

  - `Camera.js`
  - `Post.js`
  - `User.js`
  - `Video.js`

- **routes:** Contains route handlers for managing different entities.

  - `cameraRoutes.js`
  - `userRoutes.js`
  - `videoRoutes.js`
  - `postRoutes.js`

- **utils:** Houses utility files.

  - `email.js`
  - `awsS3upload.js`
    **mailTemplates** Contains mail templates
    - `registerSuccess.html`
    - `videoUploadOwner.html`

- **app.js:** Entry point for the application.
- **index.js:** Primary file to start the server.
- **package-lock.json:** Lock file specifying exact versions of dependencies.
- **package.json:** File containing project metadata and dependencies.

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone <repository_URL>
   ```
