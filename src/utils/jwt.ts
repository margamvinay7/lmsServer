import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'secret'

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' })
}

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' })
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET)
}