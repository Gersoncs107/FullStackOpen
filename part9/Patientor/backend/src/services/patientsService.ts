import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients';
import { Patient, PatientDetails } from '../types';

const patients: Patient[] = patientsData;

const getEntries = (): PatientDetails[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, ssn, entries }) => ({
    id, name, dateOfBirth, gender, occupation, ssn, entries
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: Omit<Patient, 'id'>): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getEntries, addPatient, getPatientById };