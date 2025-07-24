// src/services/course.service.ts
import { prisma } from '../utils/prisma';
import { CreateCourseInput } from '../validators/course.schema';


// Courses
export const getAllCourses = async ({ page, limit }: { page: number; limit: number }) => {
  const skip = (page - 1) * limit
  const [data, total] = await prisma.$transaction([
    prisma.course.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        instructor: { include: { user: true } },
        chapters: { orderBy: { position: 'asc' } },
      },
    }),
    prisma.course.count(),
  ])
  return {
    data,
    total,
  }
}

export const getCourseById = async (id: string) => {
  return prisma.course.findUnique({
    where: { id },
    include: {
      chapters: { orderBy: { position: 'asc' } },
      instructor: { include: { user: true } },
    },
  });
};

export const createCourse = async (input: CreateCourseInput) => {
  return await prisma.$transaction(async (tx) => {
    const course = await tx.course.create({
      data: {
        title: input.title,
        description: input.description,
        imageUrl: input.imageUrl,
        price: Number(input.price),
        isPublished: input.isPublished ?? false,
        instructor: { connect: { id: input.instructorId } },
      },
      include: { chapters: true },
    });
    return course;
  });
};

export const updateCourse = async (id: string, data: any) => {
  return prisma.course.update({
    where: { id },
    data,
  })
}

export const deleteCourse = async (id: string) => {
  return prisma.course.delete({
    where: { id },
  })
}

// Chapters
export const getAllChaptersByCourse = async (
  courseId: string,
  { page, limit }: { page: number; limit: number }
) => {
  const skip = (page - 1) * limit
  const [data, total] = await prisma.$transaction([
    prisma.chapter.findMany({
      where: { courseId },
      skip,
      take: limit,
      orderBy: { position: 'asc' },
    }),
    prisma.chapter.count({ where: { courseId } }),
  ])
  return {
    data,
    total,
    
  }
}

export const createChapter = async (data: any) => {
  return prisma.chapter.create({
    data,
  })
}

export const updateChapter = async (id: string, data: any) => {
  return prisma.chapter.update({
    where: { id },
    data,
  })
}

export const deleteChapter = async (id: string) => {
  return prisma.chapter.delete({
    where: { id },
  })
}