// src/controllers/auth.controller.ts
import { Request, Response } from 'express'
import * as authService from '../services/auth.service'
import { returnServerError, returnUnauthorized } from '../utils/errorHandler'
import { LoginInput } from '../validators/auth.schema'
import { AuthRequest } from '../middleware/auth'
import { CreateUserInput } from '../validators/user.schema'
import { createUser } from '../services/user.service'

export const login = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body as LoginInput
    )
    authService.setAuthCookies(res, accessToken, refreshToken)
    res.json({ user })
  } catch (error: any) {
    returnUnauthorized(res, error.message)
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body as CreateUserInput)
    res.status(201).json(newUser)
  } catch (error: any) {
    returnServerError(res, error)
  }
}

export const refresh = (req: Request, res: Response) => {
  try {
    const newAccessToken = authService.refreshAccessToken(req.cookies.refreshToken)
    // We only need to set the access token here, as the refresh token is still valid.
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: 'Access token refreshed' })
  } catch (error: any) {
    returnUnauthorized(res, error.message)
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')
  res.status(200).json({ message: 'Logged out successfully' })
}

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    // The user's ID is attached to the request by the `authenticate` middleware
    if (!req.user?.id) {
      returnUnauthorized(res, 'Not authenticated')
      return
    }
    const user = await authService.getMe(req.user.id)
    res.json(user)
  } catch (error: any) {
    returnServerError(res, error)
  }
}
