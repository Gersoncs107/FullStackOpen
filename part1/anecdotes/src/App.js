import { useState } from 'react'

const Vote = ({vote, text}) => {
  return (
    <button onClick={vote}>{text}</button>
  )
}

const NextButton = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts to do something, do it more often.',
    'Hiring manpower for a software project that is already late makes it even later!',
    'The first 90% of the code accounts for the first 10% of the development time... The other 10% of the code accounts for the other 90% of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'First of all, debugging is twice as hard as writing the code. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without the extremely heavy use of console.log is the same as a doctor refusing to use X-rays or blood tests when diagnosing patients.',
    'The only way to go fast is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandom = (min, max) =>{
  return Math.floor(Math.random() * (max - min + 1)) + min
}

  const handleNext = () => {
  return setSelected(getRandom(0, anecdotes.length - 1))
}

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes) 
  }

  const maxVotes = Math.max(...votes)

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Index: {selected}</p>
      <Vote vote={handleVote} text={'Vote'}/>
      <NextButton onClick={handleNext} text={'Next Anecdote'} />
      <h1>Anecdote with Most Votes</h1>
      <p>{anecdotes[votes.indexOf(maxVotes)]}</p>
      <p>Votes: {maxVotes}</p>
     
    </div>
  )
}

export default App