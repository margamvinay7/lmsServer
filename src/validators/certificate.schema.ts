import { z } from 'zod'

export const CreateCertificationSchema = z.object({
  userId: z.string().cuid(),
  courseId: z.string().cuid(),
  certificateUrl: z.string().url()
})

export const UpdateCertificationSchema = z.object({
  certificateUrl: z.string().url().optional()
})

export type CreateCertificationInput = z.infer<typeof CreateCertificationSchema>
export type UpdateCertificationInput = z.infer<typeof UpdateCertificationSchema>
