# Student and Instructor API Documentation

This document describes the API endpoints for managing students and instructors in the LMS system.

## Authentication

All endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Student Endpoints

### Base URL: `/api/students`

#### 1. Get All Students
- **GET** `/api/students`
- **Description**: Fetch all students with their user information
- **Authorization**: Admin only
- **Response**: Array of students with user details

#### 2. Get Student by ID
- **GET** `/api/students/:id`
- **Description**: Get detailed information about a specific student
- **Authorization**: Admin or the student themselves
- **Response**: Student details with enrollments, progress, and other related data

#### 3. Get Student Enrollments
- **GET** `/api/students/:id/enrollments`
- **Description**: Get all course enrollments for a specific student
- **Authorization**: Admin or the student themselves
- **Response**: Array of enrollments with course and instructor details

#### 4. Get Student Course Progress
- **GET** `/api/students/:id/course-progress`
- **Description**: Get course progress for a specific student
- **Authorization**: Admin or the student themselves
- **Response**: Array of course progress records

#### 5. Get Student Chapter Progress
- **GET** `/api/students/:id/chapter-progress`
- **Description**: Get chapter progress for a specific student
- **Authorization**: Admin or the student themselves
- **Response**: Array of chapter progress records

#### 6. Get Student Certifications
- **GET** `/api/students/:id/certifications`
- **Description**: Get all certifications earned by a student
- **Authorization**: Admin or the student themselves
- **Response**: Array of certifications with course details

#### 7. Get Student Payments
- **GET** `/api/students/:id/payments`
- **Description**: Get payment history for a specific student
- **Authorization**: Admin or the student themselves
- **Response**: Array of payment records

#### 8. Get Student Schedules
- **GET** `/api/students/:id/schedules`
- **Description**: Get schedules for a specific student
- **Authorization**: Admin or the student themselves
- **Response**: Array of schedule records

## Instructor Endpoints

### Base URL: `/api/instructors`

#### 1. Get All Instructors
- **GET** `/api/instructors`
- **Description**: Fetch all instructors with their user information
- **Authorization**: Admin only
- **Response**: Array of instructors with user details

#### 2. Get Instructor by ID
- **GET** `/api/instructors/:id`
- **Description**: Get detailed information about a specific instructor
- **Authorization**: Admin or the instructor themselves
- **Response**: Instructor details with courses and related data

#### 3. Get Instructor Courses
- **GET** `/api/instructors/:id/courses`
- **Description**: Get all courses created by a specific instructor
- **Authorization**: Admin or the instructor themselves
- **Response**: Array of courses with chapters and enrollment details

#### 4. Get Course Enrollments
- **GET** `/api/instructors/:id/courses/:courseId/enrollments`
- **Description**: Get all enrollments for a specific course
- **Authorization**: Admin or the course instructor
- **Response**: Array of enrollments with student details

#### 5. Get Course Student Progress
- **GET** `/api/instructors/:id/courses/:courseId/student-progress`
- **Description**: Get student progress for a specific course
- **Authorization**: Admin or the course instructor
- **Response**: Array of student progress records

#### 6. Get Course Chapter Progress
- **GET** `/api/instructors/:id/courses/:courseId/chapter-progress`
- **Description**: Get chapter progress for all students in a course
- **Authorization**: Admin or the course instructor
- **Response**: Array of chapter progress records

#### 7. Get Course Certifications
- **GET** `/api/instructors/:id/courses/:courseId/certifications`
- **Description**: Get certifications issued for a specific course
- **Authorization**: Admin or the course instructor
- **Response**: Array of certifications with student details

#### 8. Get Instructor Analytics
- **GET** `/api/instructors/:id/analytics`
- **Description**: Get comprehensive analytics for an instructor
- **Authorization**: Admin or the instructor themselves
- **Response**: Analytics data including course stats, enrollment trends, etc.

#### 9. Get Instructor Schedules
- **GET** `/api/instructors/:id/schedules`
- **Description**: Get schedules for a specific instructor
- **Authorization**: Admin or the instructor themselves
- **Response**: Array of schedule records

## Response Formats

### Student Response Example
```json
{
  "id": "student_id",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "STUDENT",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "enrollments": [
    {
      "id": "enrollment_id",
      "enrolledAt": "2024-01-01T00:00:00.000Z",
      "course": {
        "id": "course_id",
        "title": "Introduction to Programming",
        "description": "Learn the basics of programming",
        "instructor": {
          "user": {
            "name": "Jane Smith",
            "email": "jane@example.com"
          }
        }
      }
    }
  ],
  "courseProgress": [
    {
      "id": "progress_id",
      "status": "IN_PROGRESS",
      "completedAt": null,
      "course": {
        "id": "course_id",
        "title": "Introduction to Programming"
      }
    }
  ]
}
```

### Instructor Response Example
```json
{
  "id": "instructor_id",
  "user": {
    "id": "user_id",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "INSTRUCTOR",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "courses": [
    {
      "id": "course_id",
      "title": "Introduction to Programming",
      "description": "Learn the basics of programming",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "enrollments": [
        {
          "id": "enrollment_id",
          "enrolledAt": "2024-01-01T00:00:00.000Z",
          "student": {
            "user": {
              "name": "John Doe",
              "email": "john@example.com"
            }
          }
        }
      ],
      "chapters": [
        {
          "id": "chapter_id",
          "title": "Chapter 1: Getting Started",
          "order": 1,
          "videoDuration": 1800
        }
      ]
    }
  ]
}
```

### Analytics Response Example
```json
{
  "totalCourses": 5,
  "totalEnrollments": 150,
  "totalStudents": 120,
  "totalCertifications": 45,
  "recentEnrollments": [
    {
      "date": "2024-01-01",
      "count": 5
    }
  ],
  "courseStats": [
    {
      "courseId": "course_id",
      "courseTitle": "Introduction to Programming",
      "enrollmentCount": 30,
      "completionRate": 75.5,
      "averageProgress": 68.2
    }
  ]
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "status": 400
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Usage Examples

### Getting a Student's Course Progress
```bash
curl -X GET \
  http://localhost:8000/api/students/student_id/course-progress \
  -H 'Authorization: Bearer your-jwt-token'
```

### Getting an Instructor's Analytics
```bash
curl -X GET \
  http://localhost:8000/api/instructors/instructor_id/analytics \
  -H 'Authorization: Bearer your-jwt-token'
```

### Getting Course Enrollments for an Instructor
```bash
curl -X GET \
  http://localhost:8000/api/instructors/instructor_id/courses/course_id/enrollments \
  -H 'Authorization: Bearer your-jwt-token'
``` 