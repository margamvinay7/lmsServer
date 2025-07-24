import { prisma } from '../utils/prisma'
import { CreatePaymentInput, UpdatePaymentInput } from '../validators/payment.schema'

export const createPayment = async (data: CreatePaymentInput) => {
  return prisma.payment.create({
    data,
    include: { user: true }
  })
}

export const getAllPayments = async ({
  userId,
  status,
  page = 1,
  limit = 10
}: {
  userId?: string
  status?: string
  page?: number
  limit?: number
}) => {
  const where: any = {}
  if (userId) where.userId = userId
  if (status) where.status = status

  const [data, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
      include: { user: true }
    }),
    prisma.payment.count({ where })
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

export const getPaymentById = async (id: string) => {
  return prisma.payment.findUnique({
    where: { id },
    include: { user: true }
  })
}

export const updatePayment = async (id: string, data: UpdatePaymentInput) => {
  return prisma.payment.update({
    where: { id },
    data,
    include: { user: true }
  })
}

export const deletePayment = async (id: string) => {
  return prisma.payment.delete({ where: { id } })
}
