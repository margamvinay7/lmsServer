# Learning Management System (LMS) Backend
# Link to <a href="https://github.com/margamvinay7/lmsUI">LMS UI</a>

This project is a backend service for a Learning Management System (LMS) designed to handle video uploads, processing, and various interactive features like chat and video calls for students and mentors. The service is implemented using **Express.js**, **TypeScript**, and **Docker**, with **Redis** for job queue management and **Bull** for background processing.

---

## Tech Stack

### Backend Framework
- **Node.js**: A JavaScript runtime for building scalable and efficient server-side applications.
- **Express.js**: A fast and minimalist web framework for building RESTful APIs and handling server logic.

### Database
- **PostgreSQL**: A powerful, open-source relational database for storing and managing structured data.

### ORM
- **Prisma**: A next-generation ORM for database access with TypeScript support, enabling efficient and type-safe queries.

### Queue Management
- **Bull**: A robust job queue library for Node.js, integrated with Redis for background processing and task scheduling.

### Caching & Messaging
- **Redis**: An in-memory data structure store used for caching, session management, and as the backend for the Bull queue.

### Containerization
- **Docker**: A platform for building, shipping, and running containerized applications, ensuring consistent environments across development and production.

### Additional Tools
- **Multer**: Middleware for handling file uploads.
- **Fluent-FFmpeg**: A Node.js wrapper for FFmpeg, used for video processing tasks.

--- 

Let me know if you'd like further details on any component!

## Current Features

1. **Video Upload and Processing**:
   - Users can upload raw videos, which are temporarily stored on the server.
   - Videos are processed in the background using worker nodes and stored back on the server.

2. **Modular Architecture**:
   - Organized into controllers, services, and routes for clear separation of concerns.
   - Supports scalable background processing using Bull and Redis.

3. **Containerized Deployment**:
   - Dockerized services for easy deployment and environment consistency.
   - Multi-stage Docker builds for optimized image sizes.

4. **Redis Queue Management**:
   - Redis-based queues to handle video processing jobs efficiently.

5. **Scalable Networking**:
   - Docker Compose setup with shared networks for seamless communication between services (main app, workers, Redis).

---

## Folder Structure

```
project-root/
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma       # Prisma schema file
│   └── migrations/         # Auto-generated migration files
├── uploads/                # Temporary storage for uploaded videos
├── src/                    # Application source code
│   ├── routes/             # Express routes
│   │   └── videoRoutes.ts  # Routes for video handling
│   ├── workers/            # Background workers
│   │   └── videoWorker.ts  # Worker for processing videos
│   ├── services/           # Business logic services
│   │   └── videoService.ts # Video processing logic
│   ├── controllers/        # Controllers for handling requests
│   │   └── videoController.ts
│   ├── utils/              # Utility functions and configurations
│   │   ├── uploader.ts     # Multer configuration for file uploads
│   │   ├── queue.ts        # Redis queue setup
│   │   ├── redis.ts        # Redis connection configuration
│   │   └── cloudinary.ts   # Cloudinary configuration (future use)
│   ├── index.ts              # Main Express app entry point
│   └── config/             # General configurations
│       ├── prisma.ts       # Prisma client setup
├── Dockerfile              # Multi-stage Dockerfile
├── docker-compose.yml      # Docker Compose configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── .env                    # Environment variables
└── README.md               # Project documentation
```

---

## Future Features

### 1. **Video Storage and Management**
- **Cloudinary Integration**:
  - Processed videos will be uploaded to Cloudinary for optimized streaming and CDN capabilities.

- **AWS S3 for Storage**:
  - Raw videos will be stored in one S3 bucket.
  - Processed videos will be stored in a separate S3 bucket for better organization and scalability.

### 2. **Notifications System**
- Real-time notifications to update users about the status of their video uploads and processing.
- Push notifications for important events like mentorship session reminders.

### 3. **Scalability**
- **Kubernetes Integration**:
  - Use Kubernetes for scaling the worker nodes dynamically based on the load.
  - Efficient resource utilization for handling a large number of video processing jobs.

### 4. **Chat and Video Call Features**
- **Students’ Community**:
  - Group chat and video call features for fostering discussions and collaborations among students.

- **One-to-One Chat**:
  - Private chat between students and mentors for resolving doubts and discussions.

### 5. **AI-Powered Chatbot**
- Implement an AI chatbot to assist students with their queries and provide real-time doubt resolution.
- Integrate the chatbot with the mentorship platform for seamless interactions.

### 6. **One-to-One Video Call with Mentor**
- Feature to schedule and conduct one-to-one video calls for doubt-solving sessions with mentors.

---

## Running the Project

### Prerequisites
1. Docker and Docker Compose installed on your machine.
2. Node.js and npm installed for local development.
3. Redis server (configured through Docker Compose).

### Steps

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. **Setup Environment Variables**:
   Create a `.env` file with the required environment variables. Example:
   ```env
   PORT=3000
   REDIS_HOST=redis
   REDIS_PORT=6379
   CLOUDINARY_URL=<your-cloudinary-url>
   ```

3. **Build and Run Services**:
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**:
   - Main App: `http://localhost:3000`
   - Redis (optional): `http://localhost:6379`

---

## Contributing
We welcome contributions! Please submit a pull request or open an issue for discussions.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

