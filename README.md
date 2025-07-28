# 🚀 FullStack Todo App

> 🧠 **UI Built with Augment AI** | 💻 Developed using Cursor IDE  

A modern, full-stack todo application built with React, Node.js, and MongoDB. Features a beautiful UI with authentication, email verification, and comprehensive task management capabilities.

![Todo App](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** - Secure authentication with JWT tokens
- **Email Verification** - OTP-based email verification system
- **Password Reset** - Secure password recovery via email OTP
- **Session Management** - HTTP-only cookies for enhanced security
- **Input Validation** - Comprehensive form validation and sanitization

### 📋 Task Management
- **Create & Edit Todos** - Add titles and descriptions to your tasks
- **Mark as Complete** - Track completion status with visual indicators
- **Delete Tasks** - Remove completed or unwanted tasks
- **Real-time Updates** - Instant UI updates without page refresh
- **User-specific Data** - Each user sees only their own todos

### 🎨 Modern UI/UX
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Theme** - Beautiful gradient backgrounds with glassmorphism effects
- **Smooth Animations** - Elegant transitions and hover effects
- **Interactive Dashboard** - Real-time statistics and progress tracking
- **Dynamic Home Page** - Different content for logged-in vs guest users
- **Toast Notifications** - User-friendly feedback for all actions
  - **AI-Generated Design** - UI created with the help of Augment AI

### 📊 Dashboard Analytics
- **Task Statistics** - Total, completed, and pending task counts
- **Progress Tracking** - Visual progress bars and completion percentages
- **Recent Activity** - Quick overview of latest tasks
- **User Profile** - Account information and verification status

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Router 7.7.1** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notification system
- **Lucide React** - Beautiful icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.16.4** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email sending functionality
- **Cookie Parser** - Cookie handling middleware
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting and formatting
- **Nodemon** - Development server with auto-restart
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
FullStack-TodoApp/
├── BACKEND/                 # Node.js/Express API
│   ├── config/             # Database and email configuration
│   ├── controllers/        # Route controllers
│   ├── errorHandler/       # Error handling middleware
│   ├── middlewares/        # Custom middleware
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── server.js           # Main server file
├── FRONTEND/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   │   ├── authPages/  # Authentication pages
│   │   │   └── todoPages/  # Todo management pages
│   │   └── main.jsx        # App entry point
│   └── package.json
├── .vscode/
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/akashsingh062/FullStack-TodoApp.git
cd FullStack-TodoApp
```

### 2. Backend Setup
```bash
cd BACKEND
npm install
```

Copy the example environment file and configure it:
```bash
cp BACKEND/.env.example BACKEND/.env
```

Then edit `BACKEND/.env` with your actual values:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
SENDER_EMAIL=your_email@example.com
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd FRONTEND
npm install
```

Copy the example environment file and configure it:
```bash
cp .env.example .env
```

Then edit `.env` with your API URL:
```env
VITE_API_URL=http://localhost:3000
```

### 4. Start Development Servers

**Backend:**
```bash
cd BACKEND
npm run dev
```

**Frontend:**
```bash
cd ../FRONTEND
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | User login |
| POST | `/api/v1/auth/logout` | User logout |
| POST | `/api/v1/auth/send-reset-otp` | Send password reset OTP |
| POST | `/api/v1/auth/change-password` | Reset password with OTP |
| POST | `/api/v1/auth/send-verification-email-otp` | Send email verification OTP |
| POST | `/api/v1/auth/verify-email` | Verify email with OTP |
| GET | `/api/v1/auth/get-user` | Get current user data |
| GET | `/api/v1/auth/is-auth` | Check authentication status |

### Todo Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/todos` | Get all todos for user |
| POST | `/api/v1/todo` | Create new todo |
| PATCH | `/api/v1/todos/:id` | Update todo |
| DELETE | `/api/v1/todos/:id` | Delete todo |
| GET | `/api/v1/todos/:id` | Get specific todo |

## 🎯 Key Features Explained

### Dynamic Home Page Experience
The home page intelligently adapts to provide the best experience for different user types:

**For Guest Users (Not Logged In):**
- Marketing-focused landing page with TodoMaster branding
- Feature highlights with beautiful icons and descriptions
- Statistics showcasing app popularity (10,000+ users, 1M+ tasks completed)
- Call-to-action buttons for registration and login
- Elegant gradient backgrounds with floating animations

**For Logged-In Users:**
- Personalized welcome message with user's name
- Real-time statistics dashboard showing:
  - Total todos count
  - Completed tasks
  - Pending tasks
  - Tasks due today
- Recent todos preview with completion status
- Quick action buttons to navigate to dashboard, create todos, or view all todos
- User profile section with email verification status
- Success rate calculation and productivity insights

### Authentication Flow
1. **Registration**: Users can create accounts with name, email, and password
2. **Email Verification**: OTP sent to email for account verification (automatic on page visit)
3. **Login**: Secure login with JWT token storage in HTTP-only cookies
4. **Password Reset**: OTP-based password recovery system
5. **Session Management**: Automatic token validation and renewal

### Todo Management
1. **Create**: Add new todos with title and optional description
2. **Read**: View all todos with completion status and timestamps
3. **Update**: Edit todo details or mark as complete/incomplete
4. **Delete**: Remove todos with confirmation
5. **User Isolation**: Each user only sees their own todos

### Security Features
- **Password Hashing**: bcrypt for secure password storage
- **JWT Tokens**: Secure authentication with expiration
- **HTTP-only Cookies**: XSS protection for token storage
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper cross-origin request handling

## 🎨 UI Components

### Reusable Components
- **Button**: Multiple variants (primary, secondary, outline, ghost, danger, success)
- **Navbar**: Responsive navigation with user menu
- **Toast Notifications**: User feedback system
- **Form Components**: Consistent styling across all forms

### Pages
- **HomePage**: Dynamic landing page that shows different content based on user authentication status
  - **Guest Users**: Marketing page with features, statistics, and call-to-action buttons
  - **Logged-in Users**: Personalized dashboard with user stats, recent todos, and quick actions
- **LoginPage**: User authentication
- **RegisterPage**: User registration
- **DashboardPage**: Main application interface with comprehensive todo management
- **VerifyEmailPage**: Email verification with automatic OTP sending
- **ResetPasswordPage**: Password recovery

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=3000                    # Server port
MONGO_URI=mongodb://...      # MongoDB connection string
JWT_SECRET=your_secret       # JWT signing secret
SMTP_USER=your_email         # Email service username
SMTP_PASS=your_password      # Email service password
SENDER_EMAIL=your_email      # From email address
NODE_ENV=development         # Environment mode
```

### Email Configuration
The app uses Brevo (formerly Sendinblue) for email services. Configure your SMTP settings in the backend environment variables.

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables on your hosting platform
3. Deploy to platforms like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean App Platform

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy the `dist` folder to platforms like:
   - Vercel
   - Netlify
   - GitHub Pages
   - Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For the beautiful icon library
- **MongoDB** - For the flexible NoSQL database
- **Express.js** - For the robust web framework
- **Augment AI** - For accelerating UI design with AI
- **Cursor IDE** - For AI-powered development experience

## 📞 Support

If you have any questions or need help with the application:

- Create an issue in the GitHub repository
- Check the API documentation at `http://localhost:3000` when running the backend
- Review the component documentation in the codebase

---

**Made with ❤️ by [akashsingh062](https://github.com/akashsingh062)**

*Transform your productivity with this modern todo application!* 