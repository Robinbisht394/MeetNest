# Meetup & Event Management Application

A full-stack web application that allows users to create, manage, and join events.  
The platform supports role-based access control and integrates AI to generate professional event descriptions.

## Features
- Secure user authentication using JWT
- Role-based access: Event Creator and Participant
- Create, edit, and manage events
- Join and participate in events
- AI-powered event description and summary generation
- User-specific dashboards
- Secure API endpoints

## Tech Stack
Frontend:
- React.js
- Tailwind CSS

Backend:
- Node.js
- Express.js

Database:
- MongoDB

Authentication:
- JSON Web Tokens (JWT)

AI Integration:
- AI API for event description generation

## Project Structure
/client   -> React frontend  
/server   -> Node.js & Express backend  

## Setup Instructions

### Prerequisites
- Node.js (v16 or later)
- MongoDB
- Git

### Installation
1. Clone the repository  
   git clone https://github.com/your-username/meetup-app.git

2. Install dependencies  
   cd meetup-app  
   npm install  
   cd client  
   npm install  

3. Environment Variables  
Create a `.env` file in the server directory:

4. Run the application  
   npm run dev

Frontend: http://localhost:3000  
Backend: http://localhost:5000  

## Future Enhancements
- Event reminders and notifications
- live events updates
- user centric events

## Author
Robin Singh