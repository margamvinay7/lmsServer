import { z, TypeOf } from 'zod'
import { Role } from '@prisma/client'

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.nativeEnum(Role),

  // Optional Instructor fields
  bio: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  experience: z.string().optional(),
  skills: z.array(z.string()).optional(),
  avatar: z.string().optional(), // Assuming avatar is handled as a URL

  // Optional Student fields
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
})

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).max(100).optional(),
  password: z.string().min(6).optional(),
  role: z.nativeEnum(Role).optional(),
})

// Types automatically inferred for use in services
export type CreateUserInput = TypeOf<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
