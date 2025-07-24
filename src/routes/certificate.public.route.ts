import { Router, Request, Response } from 'express'
import { prisma } from '../utils/prisma'

const router = Router()

router.get('/verify/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  const cert = await prisma.certification.findUnique({
    where: { id },
    include: {
      student: { include: { user: true } },
      course: true
    }
  })

  if (!cert) {
    res.status(404).json({ valid: false, message: 'Certificate not found' })
    return
  }

  res.json({
    valid: true,
    name: cert.student.user.name,
    course: cert.course.title,
    issuedAt: cert.issuedAt
  })
})

export default router
