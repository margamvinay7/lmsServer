import { z } from 'zod'

// export const CreateScheduleSchema = z.object({
//   title: z.string().min(1),
//   description: z.string().optional(),
//   start: z.string().datetime(), // ISO format
//   end: z.string().datetime(),
//   courseId: z.string().cuid().optional()
// })

export const CreateScheduleSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    start: z.string().datetime(),
    end: z.string().datetime(),
    courseId: z.string().cuid().optional(),
    repeatFrequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']).optional(),
    repeatUntil: z.string().datetime().optional()
  })
  

export const UpdateScheduleSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  start: z.string().datetime().optional(),
  end: z.string().datetime().optional(),
  courseId: z.string().cuid().optional()
})

export type CreateScheduleInput = z.infer<typeof CreateScheduleSchema>
export type UpdateScheduleInput = z.infer<typeof UpdateScheduleSchema>
