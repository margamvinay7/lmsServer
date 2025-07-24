import { Response } from 'express'

export const returnUnauthorized = (res: Response, message = 'Unauthorized') => {
  return res.status(401).json({ error: message })
}

export const returnForbidden = (res: Response, message = 'Forbidden') => {
  return res.status(403).json({ error: message })
}

export const returnBadRequest = (res: Response, message = 'Bad Request') => {
  return res.status(400).json({ error: message })
}

export const returnNotFound = (res: Response, message = 'Not Found') => {
  return res.status(404).json({ error: message })
}

export const returnServerError = (res: Response, message = 'Internal Server Error') => {
  return res.status(500).json({ error: message })
}
