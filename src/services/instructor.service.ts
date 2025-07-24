import { prisma } from '../utils/prisma'

/**
 * Get all instructors with their user details.
 * Used for admin dashboards.
 */
export const getAllInstructors = async () => {
  return prisma.instructor.findMany({
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
 * Get a single instructor's public profile by their ID.
 * Used for course pages or public instructor profiles.
 */
export const getInstructorById = async (id: string) => {
  return prisma.instructor.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      courses: {
        where: { isPublished: true },
        select: {
          id: true,
          title: true,
          imageUrl: true,
        },
      },
    },
  })
}

/**
 * Update an instructor's own profile.
 * The instructor's user ID is retrieved from the authenticated session.
 */
export const updateInstructorProfile = async (
  userId: string,
  data: { bio?: string; department?: string; skills?: string[] }
) => {
  return prisma.instructor.update({
    where: { userId },
    data,
  })
} 