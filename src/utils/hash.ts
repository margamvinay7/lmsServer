import crypto from 'crypto'

export const generateCertificateHash = (userId: string, courseId: string) => {
  return crypto.createHash('sha256').update(`${userId}-${courseId}-${Date.now()}`).digest('hex')
}
