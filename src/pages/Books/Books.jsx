// npm modules
import { useState, useEffect } from 'react'

// services
import * as bookService from '../../services/bookService'

import BookCard from '../../components/BookCard/BookCard'

// css
import styles from './Books.module.css'

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await bookService.getAllBooks()
      setBooks(booksData)
    }
    fetchBooks()
  }, [])

  if (!books.length) {
    return <main className={styles.container}><h1>Loading Books..</h1></main>
  }
  
  return (  
    <main className={styles.container}>
      <h1>Books</h1>
      <div className={styles.cardContainer}>
        {books.map(book => (
          <BookCard key={book.OLID} book={book}/>
        ))}
      </div>
    </main>
  );
}

export default Books;