interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): { dailyExercises: number[], target: number } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const values = args.slice(2);

  if (values.some(value => isNaN(Number(value)))) {
    throw new Error("Provided values were not numbers!");
  }

  const numbers = values.map(Number);
  const target = numbers[numbers.length - 1];
  const dailyExercises = numbers.slice(0, -1);

  return { dailyExercises, target };
};

export const calculateExercises = (dailyExercises: number[], target: number): ExerciseResult => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(day => day > 0).length;
  const totalHours = dailyExercises.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  let rating: number;
  let ratingDescription: string;

  if (success) {
    rating = 3;
    ratingDescription = "great";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "bad";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (require.main === module) {
  try {
    const { dailyExercises, target } = parseArguments(process.argv);
    console.log(calculateExercises(dailyExercises, target));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}