import { Request, Response } from 'express'
import { ValidateRequest } from '../middleware/validate'
import * as certificationService from '../services/certificate.service'
import { CreateCertificationInput, UpdateCertificationInput } from '../validators/certificate.schema'
import { returnServerError } from '../utils/errorHandler'

export const createCertification = async (req: ValidateRequest, res: Response): Promise<void> => {
  try {
    const input = req.validated as CreateCertificationInput
    const cert = await certificationService.createAndGenerateCertificate(input)
    res.status(201).json(cert)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}



export const getAllCertifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, courseId } = req.query
    const certs = await certificationService.getAllCertifications({
      userId: userId as string,
      courseId: courseId as string
    })
    res.json(certs)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}

export const getCertificationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const cert = await certificationService.getCertificationById(id)
    if (!cert){
       res.status(404).json({ message: 'Certification not found' })
       return 
    }
    res.json(cert)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}

export const updateCertification = async (req: ValidateRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const input = req.validated as UpdateCertificationInput
    const updated = await certificationService.updateCertification(id, input)
    res.json(updated)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}

export const deleteCertification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    await certificationService.deleteCertification(id)
    res.status(204).send()
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}
