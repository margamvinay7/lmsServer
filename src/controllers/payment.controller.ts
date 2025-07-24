import { Request, Response } from 'express'
import { ValidateRequest } from '../middleware/validate'
import * as paymentService from '../services/payment.service'
import { CreatePaymentInput, UpdatePaymentInput } from '../validators/payment.schema'
import { returnServerError } from '../utils/errorHandler'

export const createPayment = async (req: ValidateRequest, res: Response) => {
  try {
    const input = req.validated as CreatePaymentInput
    const payment = await paymentService.createPayment(input)
    res.status(201).json(payment)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}

export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const { userId, status, page = '1', limit = '10' } = req.query
    const result = await paymentService.getAllPayments({
      userId: userId as string,
      status: status as string,
      page: parseInt(page as string),
      limit: parseInt(limit as string)
    })
    res.json(result)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id)
    if (!payment){
        res.status(404).json({ message: 'Not found' })
        return
    }
    res.json(payment)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}

export const updatePayment = async (req: ValidateRequest, res: Response) => {
  try {
    const input = req.validated as UpdatePaymentInput
    const payment = await paymentService.updatePayment(req.params.id, input)
    res.json(payment)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}

export const deletePayment = async (req: Request, res: Response) => {
  try {
    await paymentService.deletePayment(req.params.id)
    res.status(204).send()
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}
