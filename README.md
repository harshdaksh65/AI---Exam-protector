# Exam Shield – AI Exam Protector

A full-stack application for secure online exams, featuring live video monitoring, cheating detection, and a teacher portal for reviewing student activity.

---

## Features

- **Student Monitoring:**
  - Live webcam video recording during exams
  - Automatic upload of exam videos to ImageKit
  - Cheating detection logic

- **Teacher Portal:**
  - View student exam logs and recorded videos
  - Review flagged cheating events

- **Authentication:**
  - Secure login for students and teachers

- **Backend:**
  - Express.js server
  - MongoDB for data storage
  - Multer for file uploads
  - ImageKit integration for media storage

- **Frontend:**
  - React + Vite
  - Modern UI with SVG branding

---

## Project Structure

```
AI - Exam-protector/
├── Backend/
│   ├── controllers/
│   ├── DB/
│   ├── middleware/
│   ├── models/
│   ├── Routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
└── README.md
```

---


## Demo Login Credentials

**Student**
- ID: `harsh@daksh.com`
- Password: `12345678`

**Teacher**
- ID: `teacher@gmail.com`
- Password: `12345678`

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### 1. Clone the repository
```sh
git clone https://github.com/harshdaksh65/AI---Exam-protector.git
cd AI---Exam-protector
```

### 2. Setup Backend
```sh
cd Backend
npm install
```

- Configure your `.env` file in `Backend/` with MongoDB, JWT, and ImageKit credentials.

#### Start Backend
```sh
node server.js
```

Backend will run on `http://localhost:5000` by default.

### 3. Setup Frontend
```sh
cd ../Frontend
npm install
```

#### Start Frontend
```sh
npm run start
```

Frontend will run on `http://localhost:3000` by default.

---

## Build for Deployment

To build the frontend for deployment (e.g., Render):
```sh
npm run build
```
The production files will be in the `dist` folder.

---

## Environment Variables

Create a `.env` file in `Backend/`:
```
NODE_ENV=development
PORT=5000
MONGO_URL=your_mongo_url
JWT_SECRET=your_jwt_secret
IK_PUBLIC_KEY=your_imagekit_public_key
IK_PRIVATE_KEY=your_imagekit_private_key
IK_URL_ENDPOINT=your_imagekit_url_endpoint
```

---

## API Endpoints

- `/api/users` – User authentication & management
- `/api/exams` – Exam creation & management
- `/api/videos` – Video upload & retrieval

---

## License

MIT

---

## Author

Made with ❤️ by harshdaksh65

---

## Screenshots

![Exam Shield Logo](Frontend/public/dark-logo.svg)

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Support

For questions or support, contact [harshdaksh65](mailto:your-email@example.com)
