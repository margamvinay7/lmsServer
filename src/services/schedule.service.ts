import { prisma } from '../utils/prisma'
import { CreateScheduleInput, UpdateScheduleInput } from '..//validators/schedule.schema'

export const createSchedule = async (data: CreateScheduleInput, userId: string) => {
  return prisma.schedule.create({
    data: {
      ...data,
      userId
    },
    include: {
      user: true,
      course: true
    }
  })
}

// export const getAllSchedules = async ({
//   page = 1,
//   limit = 10,
//   userId,
//   courseId
// }: {
//   page?: number
//   limit?: number
//   userId?: string
//   courseId?: string
// }) => {
//   const where: any = {}
//   if (userId) where.userId = userId
//   if (courseId) where.courseId = courseId

//   const [data, total] = await Promise.all([
//     prisma.schedule.findMany({
//       where,
//       skip: (page - 1) * limit,
//       take: limit,
//       orderBy: { start: 'asc' },
//       include: { user: true, course: true }
//     }),
//     prisma.schedule.count({ where })
//   ])

//   return {
//     data,
//     pagination: {
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit)
//     }
//   }
// }

//scope schedule based on user's courses schedule
export const getAllSchedules = async ({
  page = 1,
  limit = 10,
  userId,
  courseId,
  role
}: {
  page?: number
  limit?: number
  userId?: string
  courseId?: string
  role?: 'INSTRUCTOR' | 'STUDENT' | 'ADMIN'
}) => {
  const where: any = {}

  if (courseId) {
    where.courseId = courseId
  }

  if (role === 'INSTRUCTOR' && userId) {
    const instructor = await prisma.instructor.findUnique({
      where: { userId },
      include: { courses: true }
    })

    const instructorCourseIds = instructor?.courses.map(c => c.id) || []

    where.courseId = { in: instructorCourseIds }
  }

  if (role === 'STUDENT' && userId) {
    const student = await prisma.student.findUnique({
      where: { userId },
      include: { enrollments: true }
    })

    const enrolledCourseIds = student?.enrollments.map(e => e.courseId) || []

    where.OR = [
      { userId },
      { courseId: { in: enrolledCourseIds } }
    ]
  }

  if (role === 'ADMIN' && userId) {
    if (userId) {
      where.userId = userId
    }
  }

  const [data, total] = await Promise.all([
    prisma.schedule.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { start: 'asc' },
      include: { user: true, course: true }
    }),
    prisma.schedule.count({ where })
  ])

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  }
}


export const getScheduleById = async (id: string) => {
  return prisma.schedule.findUnique({
    where: { id },
    include: { user: true, course: true }
  })
}

export const updateSchedule = async (id: string, data: UpdateScheduleInput) => {
  return prisma.schedule.update({
    where: { id },
    data,
    include: { user: true, course: true }
  })
}

export const deleteSchedule = async (id: string) => {
  return prisma.schedule.delete({ where: { id } })
}

// import { startOfDay, formatISO } from 'date-fns'

// export const getCalendarView = async (userId?: string) => {
//   const where: any = {}
//   if (userId) where.userId = userId

//   const schedules = await prisma.schedule.findMany({
//     where,
//     orderBy: { start: 'asc' },
//     include: { course: true }
//   })

//   const grouped: Record<string, typeof schedules> = {}

//   for (const sched of schedules) {
//     const dateKey = formatISO(startOfDay(sched.start), { representation: 'date' })
//     if (!grouped[dateKey]) grouped[dateKey] = []
//     grouped[dateKey].push(sched)
//   }

//   return grouped
// }

