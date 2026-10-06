import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, Select, MenuItem, InputLabel, OutlinedInput, Checkbox, ListItemText, SelectChangeEvent } from "@mui/material";
import { Diagnosis, HealthCheckRating, NewHealthCheckEntry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewHealthCheckEntry) => void;
  diagnoses: Diagnosis[];
}

const PatientEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes
    });
  };

  return (
    <div style={{ border: "1px dashed black", padding: "1em", marginBottom: "1em" }}>
      <h3>New HealthCheck entry</h3>
      <form onSubmit={addEntry}>
        <TextField
          label="Description" fullWidth
          value={description} onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date" type="date" fullWidth
          InputLabelProps={{ shrink: true }}
          value={date} onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist" fullWidth
          value={specialist} onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel sx={{ marginTop: 2 }}>Healthcheck rating</InputLabel>
        <Select
          fullWidth
          value={healthCheckRating}
          onChange={onHealthCheckRatingChange}
        >
          <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
          <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
          <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
          <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
        </Select>

        <InputLabel sx={{ marginTop: 2 }}>Diagnosis codes</InputLabel>
        <Select
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
          input={<OutlinedInput label="Diagnosis codes" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {diagnoses.map(diagnosis => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              <Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
              <ListItemText primary={`${diagnosis.code} ${diagnosis.name}`} />
            </MenuItem>
          ))}
        </Select>

        <Grid sx={{ marginTop: 2 }}>
          <Grid item>
            <Button color="secondary" variant="contained" style={{ float: "left" }} type="button" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button style={{ float: "right" }} type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PatientEntryForm;