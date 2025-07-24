import { z } from 'zod'

export const CreatePaymentSchema = z.object({
  userId: z.string().cuid(),
  amount: z.number().min(0.01),
  currency: z.string().min(3).max(5).default('USD'),
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED']).default('PENDING')
})

export const UpdatePaymentSchema = z.object({
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED']),
})

export type CreatePaymentInput = z.infer<typeof CreatePaymentSchema>
export type UpdatePaymentInput = z.infer<typeof UpdatePaymentSchema>
