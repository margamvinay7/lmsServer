import { z } from 'zod'

export const CreateCertificationSchema = z.object({
  studentId: z.string().cuid(),
  courseId: z.string().cuid()
})

export const UpdateCertificationSchema = z.object({
  studentId: z.string().cuid().optional(),
  courseId: z.string().cuid().optional()
})

export type CreateCertificationInput = z.infer<typeof CreateCertificationSchema>
export type UpdateCertificationInput = z.infer<typeof UpdateCertificationSchema>
