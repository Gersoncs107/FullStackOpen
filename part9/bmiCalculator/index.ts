import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const bmi = calculateBmi(heightNumber, weightNumber);

  return res.json({
    height: heightNumber,
    weight: weightNumber,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }

  if (
    !Array.isArray(daily_exercises) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daily_exercises.some((value: any) => isNaN(Number(value))) ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyExercisesNumbers = daily_exercises.map((value: any) => Number(value));
  const targetNumber = Number(target);

  const result = calculateExercises(dailyExercisesNumbers, targetNumber);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});