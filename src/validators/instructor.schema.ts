import { z } from 'zod'

// Schema for getting instructor by ID
export const GetInstructorByIdSchema = z.object({
  id: z.string().cuid('Invalid instructor ID'),
})

// Schema for getting instructor courses
export const GetInstructorCoursesSchema = z.object({
  id: z.string().cuid('Invalid instructor ID'),
})

// Schema for getting instructor course enrollments
export const GetInstructorCourseEnrollmentsSchema = z.object({
  id: z.string().cuid('Invalid instructor ID'),
  courseId: z.string().cuid('Invalid course ID'),
})

// Schema for getting instructor course student progress
export const GetInstructorCourseStudentProgressSchema = z.object({
  id: z.string().cuid('Invalid instructor ID'),
  courseId: z.string().cuid('Invalid course ID'),
})

// Schema for getting instructor course chapter progress
export const GetInstructorCourseChapterProgressSchema = z.object({
  id: z.string().cuid('Invalid instructor ID'),
  courseId: z.string().cuid('Invalid course ID'),
})

// Schema for getting instructor course certifications
export const GetInstructorCourseCertificationsSchema = z.object({
  id: z.string().cuid('Invalid instructor ID'),
  courseId: z.string().cuid('Invalid course ID'),
})

// Schema for getting instructor analytics
export const GetInstructorAnalyticsSchema = z.object({
  id: z.string().cuid('Invalid instructor ID'),
})

// Schema for getting instructor schedules
export const GetInstructorSchedulesSchema = z.object({
  id: z.string().cuid('Invalid instructor ID'),
})

// Types automatically inferred for use in controllers
export type GetInstructorByIdInput = z.infer<typeof GetInstructorByIdSchema>
export type GetInstructorCoursesInput = z.infer<typeof GetInstructorCoursesSchema>
export type GetInstructorCourseEnrollmentsInput = z.infer<typeof GetInstructorCourseEnrollmentsSchema>
export type GetInstructorCourseStudentProgressInput = z.infer<typeof GetInstructorCourseStudentProgressSchema>
export type GetInstructorCourseChapterProgressInput = z.infer<typeof GetInstructorCourseChapterProgressSchema>
export type GetInstructorCourseCertificationsInput = z.infer<typeof GetInstructorCourseCertificationsSchema>
export type GetInstructorAnalyticsInput = z.infer<typeof GetInstructorAnalyticsSchema>
export type GetInstructorSchedulesInput = z.infer<typeof GetInstructorSchedulesSchema> 