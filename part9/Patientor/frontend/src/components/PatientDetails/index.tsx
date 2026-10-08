import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, HealthCheckRating } from "../../types";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => (
  <div style={{ border: "1px solid black", borderRadius: "5px", padding: "0.5em", marginBottom: "0.5em" }}>
    <p>{entry.date} <LocalHospitalIcon /></p>
    <p><i>{entry.description}</i></p>
    <p>discharge: {entry.discharge.date}, {entry.discharge.criteria}</p>
    <p>diagnose by {entry.specialist}</p>
  </div>
);

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => (
  <div style={{ border: "1px solid black", borderRadius: "5px", padding: "0.5em", marginBottom: "0.5em" }}>
    <p>{entry.date} <WorkIcon /> {entry.employerName}</p>
    <p><i>{entry.description}</i></p>
    <p>diagnose by {entry.specialist}</p>
  </div>
);

const healthCheckColor = (rating: HealthCheckRating): string => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return "green";
    case HealthCheckRating.LowRisk:
      return "yellow";
    case HealthCheckRating.HighRisk:
      return "orange";
    case HealthCheckRating.CriticalRisk:
      return "red";
    default:
      return assertNever(rating);
  }
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => (
  <div style={{ border: "1px solid black", borderRadius: "5px", padding: "0.5em", marginBottom: "0.5em" }}>
    <p>{entry.date}</p>
    <p><i>{entry.description}</i></p>
    <FavoriteIcon style={{ color: healthCheckColor(entry.healthCheckRating) }} />
    <p>diagnose by {entry.specialist}</p>
  </div>
);

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export { HospitalEntryDetails, OccupationalHealthcareEntryDetails, HealthCheckEntryDetails };