import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = ({ show }) => {
  const userResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (userResult.loading || booksResult.loading) {
    return <p>Loading...</p>
  }

  if (userResult.error) {
    return <p>Error: {userResult.error.message}</p>
  }

  if (booksResult.error) {
    return <p>Error: {booksResult.error.message}</p>
  }

  const favoriteGenre = userResult.data.me.favoriteGenre
  const books = booksResult.data.allBooks
  const recommendedBooks = books.filter((book) => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations