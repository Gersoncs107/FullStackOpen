const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok) {
        throw new Error('Failed to fetch anecdotes')
    }
    return response.json()
}

export const createAnecdote = async (content) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, votes: 0 })
    }

    const response = await fetch(baseUrl, options)
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error)
    }
    return response.json()
}

export const updateAnecdote = async (updatedAnecdote) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAnecdote)
    }

    const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)
    if (!response.ok) {
        throw new Error('Failed to update anecdote')
    }
    return response.json()
}