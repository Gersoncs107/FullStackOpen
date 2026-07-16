import { useState } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client/react"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const genreFilter = selectedGenre && selectedGenre !== 'all genres' ? selectedGenre : null

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter }
  })

  const allBooksResult = useQuery(ALL_BOOKS)

  if (loading || allBooksResult.loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (allBooksResult.error) return <p>Error: {allBooksResult.error.message}</p>

  if (!props.show) {
    return null
  }

  const books = data.allBooks
  const genres = ['all genres', ...new Set(allBooksResult.data.allBooks.flatMap((b) => b.genres))]

  return (
    <div>
      <h2>books</h2>

      {genreFilter && (
        <p>in genre <strong>{genreFilter}</strong></p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            style={{ fontWeight: selectedGenre === genre ? 'bold' : 'normal' }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books