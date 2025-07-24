import { Request, Response } from 'express';
import { createCourse as createCourseService } from '../services/course.service';
import videoQueue from '../utils/queue';
import { CreateCourseSchema } from '../validators/course.schema';
import { z } from 'zod';
import { getAllCourses as getAllCoursesService } from '../services/course.service';
import { getCourseById as getCourseByIdService } from '../services/course.service';

export const createCourse = async (req: Request, res: Response):Promise<void> => {
  try {
    // Debug log incoming data
    console.log('REQ.BODY:', JSON.stringify(req.body));
    console.log('REQ.FILES:', JSON.stringify(req.files));

    const fields = req.body;
    const files = req.files as Record<string, Express.Multer.File[]>;

    // Debug logs to help diagnose issues
    console.log('FIELDS:', fields);
    console.log('FILES:', files);

    // Parse poster image
    const poster = files?.poster?.[0];
    const posterUrl = poster ? `/uploads/${poster.filename}` : '';

    // Parse categories
    const catField = fields['categories[]'];
    const categories: string[] = Array.isArray(catField)
      ? catField
      : typeof catField === 'string'
        ? [catField]
        : [];

    // Parse isPublished
    const isPublished = fields.isPublished === 'true';

    const input = {
      title: fields.title,
      description: fields.description,
      price: fields.price,
      instructorId: fields.instructorId,
      categories,
      isPublished,
      imageUrl: posterUrl,
    };

    // Validate using Zod
    const parsed = CreateCourseSchema.safeParse(input);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors });
      return;
    }

    // Save to DB
    const course = await createCourseService(parsed.data);
    res.status(201).json({ course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);
    const result = await getAllCoursesService({ page, limit });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const course = await getCourseByIdService(id);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};