import { prisma } from '../utils/prisma'
import { CreateEnrollmentInput } from '../validators/enrollment.schema'

export const createEnrollment = async (data: CreateEnrollmentInput) => {
    const enrollment = await prisma.enrollment.create({
      data,
      include: {
        student: { include: { user: true } },
        course: true
      }
    })
  
    // Auto-create course progress
    await prisma.studentCourseProgress.upsert({
      where: {
        studentId_courseId: {
          studentId: data.studentId,
          courseId: data.courseId
        }
      },
      update: {},
      create: {
        studentId: data.studentId,
        courseId: data.courseId,
        status: 'NOT_STARTED'
      }
    })
  
    return enrollment
  }
  
  export const getAllEnrollments = async ({
    page = 1,
    limit = 10,
    studentId,
    courseId
  }: {
    page?: number
    limit?: number
    studentId?: string
    courseId?: string
  }) => {
    const where: any = {}
    if (studentId) where.studentId = studentId
    if (courseId) where.courseId = courseId
  
    const [data, total] = await Promise.all([
      prisma.enrollment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          student: { include: { user: true } },
          course: true
        }
      }),
      prisma.enrollment.count({ where })
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
  
  export const getEnrollmentById = async (id: string) => {
    return prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: { include: { user: true } },
        course: true
      }
    })
  }
  
