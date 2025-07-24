import { z } from 'zod'

export const CreateEnrollmentSchema = z.object({
  studentId: z.string().cuid(),
  courseId: z.string().cuid(),
})

export type CreateEnrollmentInput = z.infer<typeof CreateEnrollmentSchema>
