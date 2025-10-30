# Exif Reader Frontend

The frontend of **Exif Reader**, a web application that allows users to upload images, extract EXIF metadata, view GPS data on a map, and compare or edit EXIF details — all with a clean and responsive UI.

---

##  Features
- Upload and extract EXIF metadata from images  
- View GPS data on an interactive map  
- Compare EXIF details between two images  
- Edit and download updated EXIF info  
- Responsive and user-friendly design  
- Secure API calls integrated with backend

---

##  Tech Stack
- **React.js**
- **Vite**
- **Tailwind CSS**
- **Axios**
- **React Context API**

---

##  Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/subhashsagarsingh/Exif-Reader.git
cd frontend

### 2. Install dependencies
npm install


### 3. Set up environment variables
Create a .env file in the root of the frontend folder:
VITE_API_BASE_URL=http://localhost:4000
VITE_API_EXIF_URL=http://localhost:4000/api/exif


### 4. Run the project
npm run dev


