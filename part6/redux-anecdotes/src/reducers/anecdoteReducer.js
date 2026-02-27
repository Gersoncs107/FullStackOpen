import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    replaceAnecdote(state, action) {
      const changedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      )
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes, replaceAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdoteService.update(anecdote.id, changedAnecdote)
    dispatch(replaceAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer

