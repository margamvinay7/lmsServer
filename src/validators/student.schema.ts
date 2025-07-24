import { z } from 'zod'

// Schema for getting student by ID
export const GetStudentByIdSchema = z.object({
  id: z.string().cuid('Invalid student ID'),
})

// Schema for getting student enrollments
export const GetStudentEnrollmentsSchema = z.object({
  id: z.string().cuid('Invalid student ID'),
})

// Schema for getting student course progress
export const GetStudentCourseProgressSchema = z.object({
  id: z.string().cuid('Invalid student ID'),
})

// Schema for getting student chapter progress
export const GetStudentChapterProgressSchema = z.object({
  id: z.string().cuid('Invalid student ID'),
})

// Schema for getting student certifications
export const GetStudentCertificationsSchema = z.object({
  id: z.string().cuid('Invalid student ID'),
})

// Schema for getting student payments
export const GetStudentPaymentsSchema = z.object({
  id: z.string().cuid('Invalid student ID'),
})

// Schema for getting student schedules
export const GetStudentSchedulesSchema = z.object({
  id: z.string().cuid('Invalid student ID'),
})

// Types automatically inferred for use in controllers
export type GetStudentByIdInput = z.infer<typeof GetStudentByIdSchema>
export type GetStudentEnrollmentsInput = z.infer<typeof GetStudentEnrollmentsSchema>
export type GetStudentCourseProgressInput = z.infer<typeof GetStudentCourseProgressSchema>
export type GetStudentChapterProgressInput = z.infer<typeof GetStudentChapterProgressSchema>
export type GetStudentCertificationsInput = z.infer<typeof GetStudentCertificationsSchema>
export type GetStudentPaymentsInput = z.infer<typeof GetStudentPaymentsSchema>
export type GetStudentSchedulesInput = z.infer<typeof GetStudentSchedulesSchema> 