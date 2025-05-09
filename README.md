# Hair Accessories Shop

A full-stack e-commerce application for selling hair accessories.

## Features

- Product listings with details
- Shopping cart functionality
- User authentication
- Order management
- Admin dashboard for product management

## Tech Stack

### Frontend
- Next.js 14 (React framework)
- Tailwind CSS for styling
- TypeScript

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd hair-accessories-shop
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Backend
The backend can be deployed to services like Heroku, Render, or Railway.

### Frontend
The frontend can be deployed to Vercel, Netlify, or any other static site hosting service.

## License

This project is licensed under the MIT License.
