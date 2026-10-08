import express, { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import patientsService from '../services/patientsService';
import { NewPatientEntrySchema, NewEntrySchema } from '../utils';
import { NewPatientEntry, NewEntry, Entry, Patient } from '../types';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.body = NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.get('/:id', (req: Request<{ id: string }>, res: Response<Patient | { error: string }>) => {
  const patient = patientsService.getPatientById(req.params.id);
  if (!patient) {
    res.status(404).send({ error: 'Patient not found' });
    return;
  }
  res.json(patient);
});

router.post(
  '/:id/entries',
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Patient | { error: string }>) => {
    const patient = patientsService.getPatientById(req.params.id);
    if (!patient) {
      res.status(404).send({ error: 'Patient not found' });
      return;
    }

    const newEntry: Entry = { ...req.body, id: randomUUID() };
    patient.entries.push(newEntry);
    res.json(patient);
  }
);

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = patientsService.addPatient({
    ...req.body,
    entries: []
  });
  res.json(addedEntry);
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;