import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import axios from "axios";
import { HospitalEntryDetails, OccupationalHealthcareEntryDetails, HealthCheckEntryDetails } from "../PatientDetails";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient, Gender, Diagnosis, Entry, NewHealthCheckEntry } from "../../types";
import patientService from "../../services/patients";
import PatientEntryForm from "../EntryForm/PatientEntryForm";

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    default:
      return <TransgenderIcon />;
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const fetchedPatient = await patientService.getById(id);
        setPatient(fetchedPatient);
      }
    };
    void fetchPatient();
  }, [id]);

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  const submitNewEntry = async (values: NewHealthCheckEntry) => {
    if (!id) return;
    try {
      const updatedPatient = await patientService.addEntry(id, values);
      setPatient(updatedPatient);
      setFormOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const data = e.response?.data;
        if (data && Array.isArray(data.error)) {
          setError(data.error.map((i: { message: string }) => i.message).join(', '));
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        {patient.name}
        <GenderIcon gender={patient.gender} />
      </Typography>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      {error && <Typography color="error">{error}</Typography>}

      {formOpen
  ? <PatientEntryForm onCancel={() => setFormOpen(false)} onSubmit={submitNewEntry} diagnoses={diagnoses} />
  : <Button variant="contained" onClick={() => setFormOpen(true)}>Add New Entry</Button>
}

      <div>
        <h2>entries</h2>
        {patient.entries.map(entry => (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
            <ul>
              {entry.diagnosisCodes?.map(code => (
                <li key={code}>{code} - {getDiagnosisName(code)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;