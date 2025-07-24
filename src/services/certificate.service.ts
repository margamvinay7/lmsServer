import { prisma } from '../utils/prisma'
import { CreateCertificationInput, UpdateCertificationInput } from '../validators/certificate.schema'

import { generateCertificatePDF } from '../utils/certificate.generator'
import { writeFileSync } from 'fs'
import path from 'path'

export const createAndGenerateCertificate = async (input: CreateCertificationInput) => {
  const student = await prisma.studentProfile.findUnique({ where: { id: input.studentId }, include: { user: true } })
  const course = await prisma.course.findUnique({ where: { id: input.courseId } })

  if (!student || !course) throw new Error('Student or Course not found')

  const issueDate = new Date().toISOString().split('T')[0]

  const pdfBytes = await generateCertificatePDF({
    userName: student.user.name,
    courseTitle: course.title,
    issueDate
  })

  const filePath = path.join(__dirname, `../../public/certificates/${student.id}_${course.id}.pdf`)
  writeFileSync(filePath, pdfBytes)

  const savedCert = await prisma.certification.create({
    data: {
      studentId: input.studentId,
      courseId: input.courseId
    },
    include: { student: { include: { user: true } }, course: true }
  })

  return savedCert
}

export const getAllCertifications = async ({
  studentId,
  courseId
}: {
  studentId?: string
  courseId?: string
}) => {
  const where: any = {}
  if (studentId) where.studentId = studentId
  if (courseId) where.courseId = courseId

  return prisma.certification.findMany({
    where,
    orderBy: { issuedAt: 'desc' },
    include: {
      student: { include: { user: true } },
      course: true
    }
  })
}

export const getCertificationById = async (id: string) => {
  return prisma.certification.findUnique({
    where: { id },
    include: { student: { include: { user: true } }, course: true }
  })
}

export const updateCertification = async (id: string, data: UpdateCertificationInput) => {
  return prisma.certification.update({
    where: { id },
    data,
    include: { student: { include: { user: true } }, course: true }
  })
}

export const deleteCertification = async (id: string) => {
  return prisma.certification.delete({ where: { id } })
}
