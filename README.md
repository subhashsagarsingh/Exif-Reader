
---

##  **Backend README (`backend/README.md`)**

```markdown
# Exif Reader Backend

The backend of **Exif Reader**, built using Node.js and Express.js.  
It handles authentication, image EXIF extraction, metadata comparison, and API communication for the frontend.

---

##  Features
- Secure REST API for EXIF metadata operations  
- JWT-based authentication  
- MongoDB integration using Mongoose  
- Environment-based configuration  
- CORS-enabled for frontend communication  
- Organized MVC folder structure

---

##  Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **Multer / Exif Parser (if used for image handling)**

---

##  Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/subhashsagarsingh/Exif-Reader.git
git checkout backend
cd backend

### 2. Install dependencies
npm install

### 3. Create a .env file in the backend root
FRONTEND_URL=http://localhost:5173
PORT=4000

# Database
MONGO_URI=mongodb://127.0.0.1:27017/metalens

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

### 4. Start the server
npm run dev

