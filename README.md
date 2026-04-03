
deployed link https://full-stack-mern1.netlify.app

Pro-Tasker - Collaborative Project Management Tool

 Project Description

Pro-Tasker is a full-stack web application built using the MERN stack (MongoDB, Express.js, 
React.js, and Node.js). It serves as a modern and intuitive project management tool that enables users to efficiently organize their personal and team-based projects.

The application allows users to create accounts, securely log in, and manage multiple projects.
Within each project, users can create tasks, update their status (To Do, In Progress, Done),
and delete them when completed. A key feature of this application is the collaboration system, 
where project owners can invite other registered users to join their projects as collaborators. 
Collaborators have permission to view the project and update task statuses, while only 
the project owner maintains full administrative rights, including the ability to delete the project.

This capstone project demonstrates a strong command of full-stack development principles.
On the backend, it features a well-structured RESTful API with proper separation of concerns using controllers, 
routes, and middleware. User authentication is implemented using JSON Web Tokens (JWT) and passwords are securely hashed with bcryptjs.
The application also enforces strict authorization rules to ensure users can only access and modify resources they own or have been invited to.

On the frontend, React is used with functional components and the Context API for global state management
(especially authentication). React Router handles client-side navigation, while Axios is used for
seamless communication with the backend. The user interface is built with clean, responsive design using plain CSS, ensuring good usability across desktop, tablet, and mobile devices.

Pro-Tasker highlights important concepts such as database modeling with Mongoose schemas 
and relationships (one-to-many between Project and Task), protected routes, error handling,
and deployment practices. The stretch goal of collaboration was successfully implemented, adding real value and complexity to the application.

 Local Setup and Running Instructions

 Backend
1. Clone the repository and navigate to the backend folder.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add your `MONGO_URI` and `JWT_SECRET`.
4. Start the server using `npm run dev`.

Frontend
1. Navigate to the frontend folder.
2. Run `npm install`.
3. Start the development server with `npm run dev`.
4. Open `http://localhost:5000` in your browser.

The backend runs on port 5000 and the frontend on port 3000.

 API Endpoints

User Routes:
- POST `/api/users/register` – Register new user
- POST `/api/users/login` – User login

Project Routes:
- POST `/api/projects` – Create project
- GET `/api/projects` – Get all projects
- GET `/api/projects/:id` – Get project by ID
- DELETE `/api/projects/:id` – Delete project (owner only)
- POST `/api/projects/:id/invite` – Invite collaborator

Task Routes:
- POST `/api/projects/:projectId/tasks` – Create task
- GET `/api/projects/:projectId/tasks` – Get project tasks
- PUT `/api/projects/:projectId/tasks/:taskId` – Update task status
- DELETE `/api/projects/:projectId/tasks/:taskId` – Delete task

All protected routes require a valid JWT token in the Authorization header.

 Technologies Used

Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs  
Frontend: React, React Router, Axios, Context API




