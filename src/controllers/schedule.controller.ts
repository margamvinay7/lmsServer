import { Request, Response } from 'express'
import { CreateScheduleInput, UpdateScheduleInput } from '../validators/schedule.schema'
import * as scheduleService from '../services/schedule.service'
import { ValidateRequest } from '../middleware/validate'
import { returnNotFound, returnServerError } from '../utils/errorHandler'
import { AuthRequest } from '../middleware/auth'

interface ScheduleRequest extends ValidateRequest,AuthRequest{}

// import { addDays, addWeeks, addMonths, isBefore } from 'date-fns'

// function generateRepeatingDates(start: Date, end: Date, freq: string, until: Date) {
//   const dates: { start: Date; end: Date }[] = []
//   let currentStart = new Date(start)
//   let currentEnd = new Date(end)

//   const addFn = freq === 'DAILY' ? addDays : freq === 'WEEKLY' ? addWeeks : addMonths

//   while (isBefore(currentStart, until)) {
//     dates.push({ start: new Date(currentStart), end: new Date(currentEnd) })
//     currentStart = addFn(currentStart, 1)
//     currentEnd = addFn(currentEnd, 1)
//   }

//   return dates
// }

export const createSchedule = async (req:ScheduleRequest, res: Response): Promise<void> => {
    try {
      const input = req.validated as CreateScheduleInput
      const userId = req.user?.id as string
      const schedule = await scheduleService.createSchedule(input, userId)
      res.status(201).json(schedule)
    } catch (err) {
      returnServerError(res, err instanceof Error ? err.message : String(err))
    }
  }

// export const createSchedule = async (data: CreateScheduleInput, userId: string) => {
//     const baseData = {
//       title: data.title,
//       description: data.description,
//       courseId: data.courseId,
//       userId
//     }
  
//     if (data.repeatFrequency && data.repeatUntil) {
//       const repeatDates = generateRepeatingDates(new Date(data.start), new Date(data.end), data.repeatFrequency, new Date(data.repeatUntil))
//       const createMany = repeatDates.map(d => ({
//         ...baseData,
//         start: d.start,
//         end: d.end,
//         repeatFrequency: data.repeatFrequency,
//         repeatUntil: new Date(data.repeatUntil)
//       }))
//       return prisma.schedule.createMany({ data: createMany })
//     }
  
//     return prisma.schedule.create({
//       data: {
//         ...baseData,
//         start: new Date(data.start),
//         end: new Date(data.end)
//       },
//       include: { user: true, course: true }
//     })
//   }
  

export const getAllSchedules = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '10', courseId } = req.query
    const user = req.user as { id: string; role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN' }

    const schedules = await scheduleService.getAllSchedules({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      userId: user.id,
      courseId: courseId as string,
      role: user.role
    })

    res.json(schedules)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}


export const getScheduleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const schedule = await scheduleService.getScheduleById(id)
    if (!schedule){
        // res.status(404).json({ message: 'Schedule not found' })
        returnNotFound(res,'Schedule not found')
        return 
    }
    res.json(schedule)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}

export const updateSchedule = async (req: ValidateRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const data = req.validated as UpdateScheduleInput
    const updated = await scheduleService.updateSchedule(id, data)
    res.json(updated)
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}

export const deleteSchedule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    await scheduleService.deleteSchedule(id)
    res.status(204).send()
  } catch (err) {
    returnServerError(res, err instanceof Error ? err.message : String(err))
  }
}

//   export const getCalendar = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { userId } = req.query
//       const calendarView = await scheduleService.getCalendarView(userId as string)
//       res.json(calendarView)
//     } catch (err) {
//       returnServerError(res, err instanceof Error ? err.message : String(err))
//     }
//   }
