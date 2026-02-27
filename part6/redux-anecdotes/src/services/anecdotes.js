const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  
  return response.json()
}

const createNew = async (content) => {

  const options =  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content, votes: 0 })
  }
  
  const response = await fetch(baseUrl, options)

  if (!response.ok) {
    throw new Error('Failed to create new anecdote')
  }

  return response.json()
}

const update = async (id, newObject) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newObject)
  }

  const response = await fetch(`${baseUrl}/${id}`, options)
  
  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return response.json()
}

export default { getAll, createNew, update }