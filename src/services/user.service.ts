import { prisma } from '../utils/prisma'
import bcrypt from 'bcryptjs'
import { CreateUserInput } from '../validators/user.schema'
import { Role } from '@prisma/client'

export const createUser = async (input: CreateUserInput) => {
  const {
    name,
    email,
    password,
    role,
    // Destructure profile fields
    bio,
    department,
    designation,
    experience,
    skills,
    phone,
    address,
    city,
    state,
    country,
    zipCode,
    avatar, // Assuming avatar is a URL string for now
  } = input

  const hashedPassword = await bcrypt.hash(password, 10)

  // Use a transaction to ensure all related records are created together
  const user = await prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    // Based on the role, create the corresponding profile record with all details
    if (role === Role.STUDENT) {
      await tx.studentProfile.create({
        data: {
          userId: newUser.id,
          phone,
          address,
          city,
          state,
          country,
          zipCode,
          avatar,
          bio,
        },
      })
    } else if (role === Role.INSTRUCTOR) {
      await tx.instructor.create({
        data: {
          userId: newUser.id,
          bio,
          department,
          designation,
          experience,
          skills,
          avatar,
        },
      })
    } else if (role === Role.ADMIN) {
      await tx.admin.create({
        data: {
          userId: newUser.id,
        },
      })
    }

    return newUser
  })

  // Exclude password from the returned user object
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}


/**
 * Find a user by email, including their role-specific profile.
 */
export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
    include: {
      studentProfile: true,
      instructor: true,
      admin: true,
    },
  })
}

/**
 * Find a user by ID, including their role-specific profile.
 */
export const findUserById = (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      studentProfile: true,
      instructor: true,
      admin: true,
    },
  })
}
