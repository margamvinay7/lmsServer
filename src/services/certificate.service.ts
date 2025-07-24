import { prisma } from '../utils/prisma'
import { CreateCertificationInput, UpdateCertificationInput } from '../validators/certificate.schema'

// export const createCertification = async (data: CreateCertificationInput) => {
//   return prisma.certification.create({
//     data,
//     include: {
//       user: true,
//       course: true
//     }
//   })
// }

import { generateCertificatePDF } from '../utils/certificate.generator'
import { generateCertificateHash } from '../utils/hash'
import { writeFileSync } from 'fs'
import path from 'path'

export const createAndGenerateCertificate = async (input: CreateCertificationInput) => {
  const user = await prisma.user.findUnique({ where: { id: input.userId } })
  const course = await prisma.course.findUnique({ where: { id: input.courseId } })

  if (!user || !course) throw new Error('User or Course not found')

  const issueDate = new Date().toISOString().split('T')[0]

  const pdfBytes = await generateCertificatePDF({
    userName: user.name,
    courseTitle: course.title,
    issueDate
  })

  const certHash = generateCertificateHash(input.userId, input.courseId)
  const filePath = path.join(__dirname, `../../public/certificates/${certHash}.pdf`)

  writeFileSync(filePath, pdfBytes)

  const savedCert = await prisma.certification.create({
    data: {
      userId: input.userId,
      courseId: input.courseId,
      certificateUrl: `/certificates/${certHash}.pdf`,
      certificateHash: certHash
    },
    include: { user: true, course: true }
  })

  return savedCert
}


export const getAllCertifications = async ({
  userId,
  courseId
}: {
  userId?: string
  courseId?: string
}) => {
  const where: any = {}
  if (userId) where.userId = userId
  if (courseId) where.courseId = courseId

  return prisma.certification.findMany({
    where,
    orderBy: { issuedAt: 'desc' },
    include: {
      user: true,
      course: true
    }
  })
}

export const getCertificationById = async (id: string) => {
  return prisma.certification.findUnique({
    where: { id },
    include: { user: true, course: true }
  })
}

export const updateCertification = async (id: string, data: UpdateCertificationInput) => {
  return prisma.certification.update({
    where: { id },
    data,
    include: { user: true, course: true }
  })
}

export const deleteCertification = async (id: string) => {
  return prisma.certification.delete({ where: { id } })
}
