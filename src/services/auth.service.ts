import { prisma } from '../utils/prisma'
import { Role } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { LoginInput } from '../validators/auth.schema'
import { findUserByEmail, findUserById } from './user.service'
import type { Response } from 'express'

// --- Token Generation ---

const generateAccessToken = (user: { id: string; role: Role }) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '15m',
  })
}

const generateRefreshToken = (user: { id: string; role: Role }) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d',
  })
}

// --- Cookie Management ---

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProduction = process.env.NODE_ENV === 'production'
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
  })
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })
}

// --- Core Authentication Services ---

export const login = async ({ email, password }: LoginInput) => {
  const user = await findUserByEmail(email)

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password')
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  const { password: _, ...userWithoutPassword } = user
  return { user: userWithoutPassword, accessToken, refreshToken }
}

export const refreshAccessToken = (refreshToken: string) => {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {
      id: string
      role: Role
    }
    const newAccessToken = generateAccessToken(payload)
    return newAccessToken
  } catch (error) {
    throw new Error('Invalid or expired refresh token')
  }
}

export const getMe = async (userId: string) => {
  const user = await findUserById(userId)
  if (!user) {
    throw new Error('User not found')
  }
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export { setAuthCookies, generateAccessToken }
