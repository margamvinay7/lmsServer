import { prisma } from '../utils/prisma'

/**
 * Get all students with their user details (for admin dashboard).
 */
export const getAllStudents = async () => {
  return prisma.studentProfile.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })
}

/**
 * Get a student's own profile.
 * The student's user ID is retrieved from the authenticated session.
 */
export const getStudentProfile = async (userId: string) => {
  return prisma.studentProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      enrollments: {
        select: {
          course: {
            select: {
              id: true,
              title: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  })
}

/**
 * Update a student's own profile.
 * The student's user ID is retrieved from the authenticated session.
 */
export const updateStudentProfile = async (
  userId: string,
  data: {
    bio?: string
    phone?: string
    avatar?: string
    address?: string
    city?: string
    state?: string
    country?: string
    zipCode?: string
  }
) => {
  return prisma.studentProfile.update({
    where: { userId },
    data,
  })
} 