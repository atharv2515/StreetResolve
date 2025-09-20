
<p align="center">
  <h1>🛣️ StreetResolve</h1>
  <img width="2847" height="1799" alt="StreetResolve" src="https://github.com/user-attachments/assets/9f7e1ae5-f2c8-428a-8fa7-576f1d62d5b9"/>
</p>

StreetResolve is a simple web application that allows users to report potholes by submitting details like location, description, severity, image, reporter name, and date. The system displays all submitted reports in a dashboard where statuses can be updated: **Reported → In Progress → Fixed**.

---

## 🚀 Features

- 📍 Report potholes with location, description, severity, image, and reporter details
- 🌍 Get current location using browser geolocation
- 🖼️ Upload pothole images (stored in `/uploads`)
- 📋 View all submitted reports in a clean, responsive dashboard
- 🔄 Update report status (**Reported / In Progress / Fixed**)
- 🟢 Backend built with **Express.js + Multer** (for file uploads)
- 🎨 Frontend built with **HTML + TailwindCSS + Vanilla JS**

---

## 🗂️ Project Structure

.
├── server.js # Backend server (Express.js APIs)
├── StreetResolve.html # Frontend (report form + dashboard)
├── uploads/ # Uploaded pothole images (auto-created)
└── README.md # Project documentation



---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/atharv2515/StreetResolve.git
cd streetresolve
```

### 2️⃣ Install dependencies
```bash
npm install express multer cors
```

### 3️⃣ Start the server
```bash
node server.js
```

The server runs at: http://localhost:3000

### 4️⃣ Open the frontend

Simply open StreetResolve.html in your browser.
Make sure the backend (server.js) is running so the form can submit reports.

### 📡 API Endpoints

GET /api/reports
Retrieve all pothole reports.

POST /api/report
Submit a new pothole report.
Requires multipart/form-data with fields:

location (string)

description (string, optional)

severity (Low/Medium/High)

reporterName (string)

reportDate (date)

potholeImage (file, required)

PATCH /api/reports/:id/status
Update the status of a specific report (Reported, In Progress, Fixed).

### 📌 Future Improvements

✅ Add database support (MongoDB/Postgres) instead of in-memory storage

✅ Authentication for report management

✅ Deployment to cloud (Heroku/Render/Netlify + Vercel)

###👨‍💻 Author

-Atharv Shirke
-Developed with ❤️ under the project name StreetResolve.
