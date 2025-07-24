import { Router, Request, Response } from 'express'
import { prisma } from '../utils/prisma'

const router = Router()

router.get('/verify/:hash', async (req: Request, res: Response) => {
  const { hash } = req.params

  const cert = await prisma.certification.findUnique({
    where: { certificateHash: hash },
    include: {
      user: true,
      course: true
    }
  })

  if (!cert) {
    res.status(404).json({ valid: false, message: 'Certificate not found' })
    return
  }

  res.json({
    valid: true,
    name: cert.user.name,
    course: cert.course.title,
    issuedAt: cert.issuedAt,
    certificateUrl: cert.certificateUrl
  })
})

export default router
