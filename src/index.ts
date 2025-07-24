import 'dotenv/config'
import express, { type Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route'
import userRoutes from './routes/user.route'
import instructorRoutes from './routes/instructor.route'
import studentRoutes from './routes/student.route'
import courseRoutes from './routes/course.route'
import chapterRoutes from './routes/chapter.route';

const app: Express = express()
const port = process.env.PORT || 8001

const isProduction = process.env.NODE_ENV === 'production'
// const allowedOrigin = isProduction
//   ? process.env.ORIGIN || 'https://your-production-domain.com'
//   : 'http://localhost:3000'

app.use(
  cors({
    origin: ["http://localhost:3000","https://livelearn.vercel.app"],
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/instructors', instructorRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/chapters', chapterRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/videos', express.static('uploads/videos'));

app.get("*.m3u8", (req, res, next) => {
  res.setHeader("Content-Type", "application/x-mpegURL");
  next();
});

app.get("*.ts", (req, res, next) => {
  res.setHeader("Content-Type", "video/MP2T");
  next();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
