import { useState, useEffect } from 'react'
import axios from 'axios'
import type { DiaryEntry, DiaryFormValues } from './types'
import diaryService from './services/diaryService'
import AddDiaryForm from './components/AddDiaryForm'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data)
    })
  }, [])

  const addDiary = (values: DiaryFormValues) => {
    diaryService.create(values)
      .then(data => {
        setDiaries(prev => prev.concat(data))
      })
      .catch(error => {
        if (axios.isAxiosError(error) && error.response) {
          const issues = error.response.data?.error
          const message = Array.isArray(issues)
            ? issues.map((issue: { message: string }) => issue.message).join(', ')
            : 'Failed to create diary entry'
          setErrorMessage(message)
        } else {
          setErrorMessage('An unexpected error occurred')
        }
        setTimeout(() => setErrorMessage(null), 5000)
      })
  }

  return (
    <div>
      <h1>Add new entry</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <AddDiaryForm onSubmit={addDiary} />

      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default App