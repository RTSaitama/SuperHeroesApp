 # SuperHeroes Database

A full-stack web application for managing superheroes with CRUD operations, image uploads, and pagination.

## 🚀 Features

- **CRUD Operations**: Create, Read, Update, Delete superheroes
- **Image Upload**: Upload and display superhero images
- **Pagination**: Browse superheroes with pagination (5 per page)
- **Form Validation**: Client and server-side validation
- **Responsive Design**: Clean, functional UI
- **TypeScript**: Full type safety on both frontend and backend
- **State Management**: Zustand for React state management
- **Unit Tests**: Backend API tests and React component tests

## 🛠️ Tech Stack

### Backend
- **Node.js + Express.js** - RESTful API
- **TypeScript** - Type safety
- **Multer** - File uploads
- **Joi** - Data validation
- **Jest + Supertest** - Testing
- **JSON file storage** - Simple data persistence

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Zustand** - State management
- **React Router** - Navigation
- **React Testing Library** - Component testing

## 📁 Project Structure
SuperHeroesApp/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── routes/          # Express routes
│   │   ├── middleware/      # Custom middleware (file upload)
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   ├── tests/           # Unit tests
│   │   └── server.ts        # Main server file
│   ├── data/                # JSON data storage
│   ├── uploads/             # Uploaded images
│   └── package.json
├── frontend/                # React application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── stores/          # Zustand state stores
│   │   ├── services/        # API client
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Main App component
│   └── package.json
└── README.md
## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SuperHeroesApp
   Install backend dependencies
bashcd backend
npm install

Install frontend dependencies
bashcd ../frontend
npm install


Running the Application

Start the backend server
bashcd backend
npm run dev
Backend will run on http://localhost:3001
Start the frontend application (in a new terminal)
bashcd frontend
npm start
Frontend will run on http://localhost:3000
Open your browser and go to http://localhost:3000

📊 API Endpoints
Superheroes

GET /api/superheroes - Get paginated list of superheroes
GET /api/superheroes/:id - Get specific superhero
POST /api/superheroes - Create new superhero
PUT /api/superheroes/:id - Update superhero
DELETE /api/superheroes/:id - Delete superhero
POST /api/superheroes/:id/images - Upload images for superhero

Query Parameters

page - Page number (default: 1)
limit - Items per page (default: 5)

🧪 Testing
Backend Tests
bashcd backend
npm test
Frontend Tests
bashcd frontend
npm test
📝 Data Model
Superhero
typescriptinterface Superhero {
  id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: string[];
  created_at: string;
  updated_at: string;
}
🎯 Key Implementation Details
State Management

Zustand used for global state management
Optimistic updates for better UX
Error handling and loading states

File Uploads

Multer middleware for handling multipart/form-data
Images stored in backend/uploads/ directory
Unique filename generation using UUID
File type validation (images only)

Component Architecture

Reusable, functional React components
Props interface definitions with TypeScript
Separation of concerns (UI, logic, API calls)

API Design

RESTful API following standard conventions
Consistent error responses
Input validation with Joi
CORS enabled for frontend integration

🔧 Environment Configuration
Backend (.env - optional)
PORT=3001
NODE_ENV=development
Frontend
No environment configuration needed for local development.
🚀 Deployment Notes
Backend

Build: npm run build
Start production: npm start
Ensure uploads/ directory exists

Frontend

Build: npm run build
Serve the build/ directory with any static file server

📋 Assumptions Made

Data Storage: JSON file used instead of database for simplicity
Authentication: No authentication implemented (public API)
Image Storage: Local file system storage (not cloud storage)
Styling: Inline styles used instead of Tailwind (due to setup issues)
Error Handling: Basic error handling implemented
File Upload: Limited to 5MB per image, 5 images per upload

🔮 Future Enhancements

Database integration (PostgreSQL/MongoDB)
User authentication and authorization
Image deletion functionality
Search and filtering capabilities
Docker containerization
Cloud storage for images
Advanced error handling and logging

👨‍💻 Author
RTSaitama

Note: This project was created as a technical assessment demonstrating full-stack development skills with modern web technologies.
