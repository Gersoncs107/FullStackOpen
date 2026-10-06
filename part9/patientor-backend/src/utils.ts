import { z } from 'zod';
import { HealthCheckRating } from './types';

export const NewPatientEntrySchema = z.object({
  name: z.string().min(2).max(100),
  dateOfBirth: z.string().date(),
  ssn: z.string().length(11),
  gender: z.enum(['male', 'female', 'other']),
  occupation: z.string().min(2).max(100)
});

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string()
  })
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string().date(),
    endDate: z.string().date()
  }).optional()
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export const NewEntrySchema = z.discriminatedUnion('type', [
  HospitalEntrySchema,
  OccupationalHealthcareEntrySchema,
  HealthCheckEntrySchema
]);