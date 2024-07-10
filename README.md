
# Issue Tracker Application

This project is an Issue Tracker application built with Spring Boot for the backend, React for the frontend, and MySQL for the database. The application allows users to create, update, view, and delete tasks, as well as search for tasks based on various criteria.

## Table of Contents

-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Running the Application](#running-the-application)
-   [Testing](#testing)
-   [Project Structure](#project-structure)
-   [API Endpoints](#api-endpoints)

## Features

-   Create a new task
-   Update an existing task
-   View details of a task
-   Delete a task
-   Search tasks based on title, description, company, severity, priority, and status

## Technologies Used

-   **Backend**: Spring Boot
-   **Frontend**: React
-   **Database**: MySQL
-   **Testing**: JUnit, Mockito

## Installation

### Prerequisites

-   Java 17 or later
-   Node.js and npm
-   MySQL

### Backend Setup

1.  Clone the repository:
    
    
    Copy code
    
    `git clone https://github.com/viraj-official/Issue-Tracker-Application` 
    
	`cd issue-tracker`
    
2.  Configure the MySQL database:
    
    -   Create a database named `issue_tracker`.
    -   Update the `application.properties` file in the `src/main/resources` directory with your database credentials.
3.  Build the backend:
    
    Copy code
    
    `./mvnw clean install` 
    

### Frontend Setup

1.  Navigate to the `frontend` directory:
    
    
    Copy code
    
    `cd frontend` 
    
2.  Install dependencies:
    
    Copy code
    
    `npm install` 
    

## Running the Application

### Backend

1.  Run the backend:
    
    Copy code
    
    `./mvnw spring-boot:run` 
    
    The backend server will start at `http://localhost:8080`.
    

### Frontend

1.  Run the frontend:
    
    Copy code
    
    `npm start` 
    
    The frontend application will start at `http://localhost:3000`.
    

## Testing

### Backend Tests

1.  Navigate to the project root directory.
2.  Run the tests:
    
    Copy code
    
    `./mvnw test` 
    

### Test Cases

-   **Controller Tests**: Ensure that the API endpoints return the correct HTTP status codes and responses.
-   **Service Tests**: Verify the business logic and interactions with the repository layer.


## API Endpoints

### TaskController

-   **POST /tasks**: Create a new task
-   **PUT /tasks**: Update an existing task
-   **GET /tasks/{id}**: Get a task by ID
-   **GET /tasks**: Get all tasks
-   **DELETE /tasks/{id}**: Delete a task by ID
-   **GET /tasks/search**: Search tasks based on criteria

### Example Usage

**Creating a Task**:

Copy code

`POST /tasks
{
  "title": "New Task",
  "description": "Task description",
  "company": "ABC_CORP",
  "severity": "HIGH",
  "priority": "HIGH",
  "status": "OPEN"
}` 

**Updating a Task**:

Copy code

`PUT /tasks
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated description",
  "company": "ABC_CORP",
  "severity": "MEDIUM",
  "priority": "MEDIUM",
  "status": "IN_PROGRESS"
}` 

## Contributing

Contributions are welcome! Please create an issue or submit a pull request.

## License

This project is licensed under the MIT License.

----------

This README provides an overview of your project, including installation instructions, how to run the application, and how to test it. Make sure to replace placeholders such as `your-repo` with the actual repository URL.
