# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a full-stack Todo application built with React (frontend) and Node.js/Express (backend), featuring user authentication, email verification, and comprehensive task management. The project uses a monorepo structure with separate FRONTEND and BACKEND directories.

## Development Commands

### Backend (Node.js/Express)
```bash
cd BACKEND
npm install                 # Install dependencies
npm run dev                # Start development server with nodemon (port 3000)
npm start                  # Start production server
```

### Frontend (React/Vite)
```bash
cd FRONTEND
npm install                # Install dependencies
npm run dev               # Start development server (port 5173)
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint for code quality
```

### Full Application Development
Start both servers simultaneously:
```bash
# Terminal 1 - Backend
cd BACKEND && npm run dev

# Terminal 2 - Frontend  
cd FRONTEND && npm run dev
```

## Architecture Overview

### Monorepo Structure
- **BACKEND/**: Express.js API server with MongoDB integration
- **FRONTEND/**: React application built with Vite

### Backend Architecture (MVC Pattern)
- **models/**: Mongoose schemas (User, Todo)
- **controllers/**: Business logic (authController, todoController)  
- **routes/**: API endpoints (/auth, /todos)
- **middlewares/**: Authentication and validation
- **config/**: Database connection and email setup
- **utils/**: Helper functions (JWT, OTP generation, email templates)

### Frontend Architecture (Context + Components)
- **context/**: Global state management
  - `UserContext`: Authentication, user management, email verification
  - `TodoContext`: Todo CRUD operations, state management
- **pages/**: Route components organized by feature
  - `authPages/`: Login, Register, VerifyEmail, ResetPassword, HomePage
  - `todoPages/`: Dashboard, TodoList, CreateTodo, EditTodo
- **components/**: Reusable UI components (Navbar, Button)

### Key Design Patterns
- **React Context API**: Used instead of Redux for simpler state management
- **Custom Hooks**: `useUserContext()` and `useTodoContext()` for accessing global state
- **JWT with HTTP-only Cookies**: Secure authentication with automatic cookie handling
- **Axios Interceptors**: Automatic credential inclusion with `withCredentials: true`

## Database Models

### User Schema
- Authentication fields (name, email, password)
- Email verification (isAccountVerified, verificationOtp, verificationOtpExpiration)
- Password reset (resetOtp, resetOtpExpiration)
- Timestamps for tracking

### Todo Schema  
- Task fields (title, description, completed, dueDate)
- User reference for data isolation
- Validation: title (3-200 chars), description (max 1000 chars)

## API Endpoints

### Authentication (`/api/v1/auth/`)
- `POST /register` - User registration
- `POST /login` - User login  
- `POST /logout` - User logout
- `GET /is-auth` - Check authentication status
- `GET /get-user` - Get current user data
- `POST /send-verification-email-otp` - Send email verification OTP
- `POST /verify-email` - Verify email with OTP
- `POST /send-reset-otp` - Send password reset OTP
- `POST /change-password` - Reset password with OTP

### Todos (`/api/v1/`)
- `GET /todos` - Get all user todos
- `POST /todo` - Create new todo
- `GET /todos/:id` - Get specific todo
- `PATCH /todos/:id` - Update todo (partial updates supported)
- `DELETE /todos/:id` - Delete todo

## Environment Configuration

### Backend (.env)
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_secure_jwt_secret
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password  
SENDER_EMAIL=your_email@example.com
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:3000
```

## Authentication Flow

### User Registration/Login Process
1. User submits credentials → Backend validates and creates JWT
2. JWT stored in HTTP-only cookie for security
3. Frontend Context automatically manages auth state
4. All API requests include credentials via axios defaults

### Email Verification System
- OTP automatically sent on registration
- Manual resend functionality available
- 10-minute OTP expiration with auto-cleanup
- Account verification required for full access

## State Management Strategy

### UserContext Responsibilities
- Authentication status (`isLoggedIn`, `user`)
- Auth operations (login, register, logout)
- Email verification flow (`isEmailVerified`, `isOtpSent`)
- Password reset functionality
- Loading states for UI feedback

### TodoContext Responsibilities  
- Todo CRUD operations
- Local todo state management
- API integration with error handling
- Loading states for todo operations

## Development Patterns

### Error Handling
- Backend: Centralized error handling with tryCatchWrapper
- Frontend: Toast notifications for user feedback
- API errors automatically redirect to login when unauthorized

### Component Architecture
- Page components handle routing and high-level state
- Context hooks provide data and operations to components
- Reusable UI components in `/components` with consistent styling

### Styling Approach
- Tailwind CSS with utility-first approach
- Custom glassmorphism effects and gradients
- Dark theme throughout with consistent color scheme
- Responsive design patterns

## Common Development Tasks

### Adding New API Endpoints
1. Create route in `/BACKEND/routes/`
2. Add controller function in `/BACKEND/controllers/`
3. Update frontend context with new API call
4. Add error handling and loading states

### Adding New Pages
1. Create page component in appropriate `/pages` subdirectory
2. Add route to `App.jsx`
3. Implement authentication guards if needed
4. Connect to context for data/operations

### Database Schema Changes
1. Update Mongoose model in `/BACKEND/models/`
2. Update API controllers to handle new fields
3. Update frontend context and components
4. Consider migration strategy for existing data

## Testing Strategy

The codebase currently relies on manual testing, but should include:
- Backend API testing with Jest/Supertest
- Frontend component testing with React Testing Library
- Integration tests for authentication flow
- E2E tests for critical user journeys
