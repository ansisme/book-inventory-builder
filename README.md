# Book Inventory Builder 📚📸

A web application for managing book inventory by scanning book covers and extracting details automatically.

![image](https://github.com/user-attachments/assets/3d01a8f4-ef6b-48ac-93b2-8730adff8438)

![image](https://github.com/user-attachments/assets/76655b0d-d747-4b82-833b-67df4ba01ac2)

![image](https://github.com/user-attachments/assets/a99c844c-7ffb-48fd-a2b4-67f1dba95bef)

![image](https://github.com/user-attachments/assets/89c13115-91aa-4d7e-a8f3-e7c8ff2c6d94)


## Features
- Upload book covers via camera or file upload
- Automatic book detail extraction from images
- Search and manage book inventory
- Mobile-friendly responsive design

## Prerequisites
- Node.js (v22.6.0)
- MongoDB Atlas account (for database)
- Google Gemini API Key 

## Setup Instructions 🚀

### 1. Clone the Repository
```bash
git clone https://github.com/ansisme/book-inventory-builder.git
cd book-inventory-builder
```
### 2. Gemini AI 
- Go to Google AI Studio
- Sign in with your Google account
- Click "Get API Key" in the left sidebar
- Create a new API key (copy and save this securely)
- Add it to your .env file:

```bash
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. MongoDB Setup (Free Tier)
  - Create Your Cluster
    - Sign up at MongoDB Atlas
    - Create a new project → "Build a Database"
    - Select FREE tier (M0)
    - Choose cloud provider/region (AWS/Oregon recommended)
    -  Create cluster (takes ~5 minutes)

- Configure Database Access:
    - Go to "Database Access" → Add New User
    - Set username/password (save these!)
    - Set privileges: "Atlas admin" (for development)

- Get Connection String:
    - Go to "Database" → Connect → "Drivers"
    - Copy connection string (replace placeholders):
    - ```bash
      mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
      ```
### 4. Configure Environment variable `.env`
  - Backend Folder
    - ```bash
      PORT=5000
      MONGODB_URI=your_mongodb_connection_string
      GEMINI_API_KEY=your_google_gemini_key
      ```
  - Frontend folder
    - ```bash
      VITE_NODE_API_URL=http://localhost:5000
      ```
### 5. Install & Run
  - Backend
    ```bash
      cd backend
      npm install
      npm run dev
    ```
    
- Frontend
    ```bash
      cd frontend
      npm install
      npm run dev
    ```
