import { useState } from "react";
import type { DiaryFormValues } from "../types";

interface AddDiaryFormProps {
  onSubmit: (values: DiaryFormValues) => void;
}

const AddDiaryForm = ({ onSubmit }: AddDiaryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

    const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit({ date, weather, visibility, comment });
    setDate("");
    setWeather("");
    setVisibility("");
    setComment("");
  }

    return (
    <form onSubmit={addDiary}>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="weather">Weather:</label>
        <input type="radio" id="sunny" name="weather" value="sunny" onChange={(e) => setWeather(e.target.value)} />
        <label htmlFor="sunny">Sunny</label>
        <input type="radio" id="cloudy" name="weather" value="cloudy" onChange={(e) => setWeather(e.target.value)} />
        <label htmlFor="cloudy">Cloudy</label>
        <input type="radio" id="rainy" name="weather" value="rainy" onChange={(e) => setWeather(e.target.value)} />
        <label htmlFor="rainy">Rainy</label>
        <input type="radio" id="stormy" name="weather" value="stormy" onChange={(e) => setWeather(e.target.value)} />
        <label htmlFor="stormy">Stormy</label>
        <input type="radio" id="windy" name="weather" value="windy" onChange={(e) => setWeather(e.target.value)} />
        <label htmlFor="windy">Windy</label>
      </div>
      <div>
        <label htmlFor="visibility">Visibility:</label>
        <input type="radio" id="great" name="visibility" value="great" onChange={(e) => setVisibility(e.target.value)} />
        <label htmlFor="great">Great</label>
        <input type="radio" id="good" name="visibility" value="good" onChange={(e) => setVisibility(e.target.value)} />
        <label htmlFor="good">Good</label>
        <input type="radio" id="ok" name="visibility" value="ok" onChange={(e) => setVisibility(e.target.value)} />
        <label htmlFor="ok">OK</label>
        <input type="radio" id="poor" name="visibility" value="poor" onChange={(e) => setVisibility(e.target.value)} />
        <label htmlFor="poor">Poor</label>
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit">Add Diary Entry</button>
    </form>
  );
}; 

export default AddDiaryForm;