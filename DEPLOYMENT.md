# Deployment Guide - Render.com

This guide will help you deploy the FullStack Todo App to Render.com using Infrastructure as Code.

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to a GitHub repository
2. **MongoDB Atlas Account**: Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
3. **Render Account**: Sign up at [Render.com](https://render.com)
4. **Email Service**: Configure SMTP credentials (Gmail, Brevo, SendGrid, etc.)

## Step 1: Set Up MongoDB Atlas

1. **Create a new project** in MongoDB Atlas
2. **Create a cluster** (choose the free tier)
3. **Create a database user**:
   - Go to Database Access
   - Add New Database User
   - Choose password authentication
   - Save the username and password
4. **Configure network access**:
   - Go to Network Access
   - Add IP Address
   - Choose "Allow access from anywhere" (0.0.0.0/0) for Render deployment
5. **Get connection string**:
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority`

## Step 2: Push Code to GitHub

Ensure your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 3: Deploy on Render

### Option A: Using Infrastructure as Code (Recommended)

1. **Connect your GitHub repository** to Render
2. **Create a new Blueprint**:
   - Go to Render Dashboard
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file
3. **Review the services** that will be created:
   - `fullstack-todo-backend` (Web Service)
   - `fullstack-todo-frontend` (Static Site)

### Option B: Manual Setup

If you prefer manual setup, deploy services separately:

#### Backend Deployment
1. **Create Web Service**:
   - Name: `fullstack-todo-backend`
   - Build Command: `cd BACKEND && npm install`
   - Start Command: `cd BACKEND && npm start`
   - Environment: Node

#### Frontend Deployment  
1. **Create Static Site**:
   - Name: `fullstack-todo-frontend`
   - Build Command: `cd FRONTEND && npm install && npm run build`
   - Publish Directory: `FRONTEND/dist`

## Step 4: Configure Environment Variables

### Backend Environment Variables

Set these in the Render dashboard for your backend service:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_here_at_least_32_characters
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
SENDER_EMAIL=your_email@gmail.com
FRONTEND_URL=https://your-frontend-name.onrender.com
```

### Frontend Environment Variables

Set this in the Render dashboard for your frontend static site:

```env
VITE_BACKEND_URL=https://your-backend-name.onrender.com
```

## Step 5: Email Service Setup

### Using Gmail SMTP
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → App passwords
   - Select "Mail" and generate password
   - Use this password as `SMTP_PASS`

### Alternative Email Services
- **Brevo (Sendinblue)**: Free tier with 300 emails/day
- **SendGrid**: Free tier with 100 emails/day
- **Mailgun**: Free tier with 5000 emails/month

## Step 6: Update CORS Settings

After deployment, the backend will automatically use the correct CORS origin based on the `FRONTEND_URL` environment variable.

## Step 7: Test Your Deployment

1. **Backend Health Check**: Visit `https://your-backend-name.onrender.com`
2. **Frontend Application**: Visit `https://your-frontend-name.onrender.com`
3. **Full Application**: 
   - Register a new account
   - Verify email functionality
   - Create and manage todos
   - Test login/logout functionality

## Important Notes

### Free Tier Limitations
- **Cold Start**: Free services sleep after 15 minutes of inactivity
- **Build Time**: Services may take 1-2 minutes to wake up
- **Monthly Hours**: 750 hours per month for free services

### Production Best Practices
1. **Upgrade to Paid Plans** for production apps to avoid cold starts
2. **Use Strong JWT Secret**: At least 32 random characters
3. **Secure Database**: Use MongoDB Atlas network restrictions
4. **Monitor Logs**: Check Render logs for any deployment issues
5. **Backup Database**: Regular MongoDB Atlas backups

## Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check that `package.json` scripts are correct
   - Ensure all dependencies are in `dependencies`, not `devDependencies`

2. **CORS Errors**:
   - Verify `FRONTEND_URL` is set correctly in backend
   - Check that URLs don't have trailing slashes

3. **Database Connection**:
   - Verify MongoDB URI is correct
   - Ensure network access allows Render IPs (0.0.0.0/0)

4. **Email Not Working**:
   - Check SMTP credentials
   - Verify sender email matches authenticated account

### Support
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Check Service Logs**: Available in Render dashboard

## URLs After Deployment

After successful deployment, you'll have:

- **Frontend**: `https://fullstack-todo-frontend.onrender.com`
- **Backend API**: `https://fullstack-todo-backend.onrender.com`
- **API Documentation**: `https://fullstack-todo-backend.onrender.com`

Remember to update these URLs in your environment variables!
