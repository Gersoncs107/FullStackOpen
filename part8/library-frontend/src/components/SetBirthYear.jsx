import { useState } from "react"
import { EDIT_BORN, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client/react"

const SetBirthYear = (props) => {
  const [name, setName] = useState(props.authors[0]?.name ?? '')
  const [born, setBorn] = useState('')

  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ]
  })

  const submit = async (event) => {
    event.preventDefault()

    editBorn({
      variables: {
        name,
        setBornTo: parseInt(born)
      }
    })
    console.log('edit author...', { name, setBornTo: parseInt(born) })
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {props.authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
