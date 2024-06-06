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

  const handleChange = evt => {
    let sortedBooks = [...books]
    if(evt.target.value === "title"){
      sortedBooks.sort((a,b) => (a.name > b.name) ? 1:-1)
    }
    else if(evt.target.value === "author"){
      sortedBooks.sort((a,b) => (a.authors[0] > b.authors[0]) ? 1:-1)
    }
    else{
      sortedBooks.sort((a,b) => (a.firstPublished - b.firstPublished ))
    }
    setBooks(sortedBooks)
  }

  if (!books.length) {
    return (
      <main className={styles.container}>
        <div className={styles.error}>Loading Catalog..</div>
      </main>
    )
  }

  return (  
    <main className={styles.container}>
      <div className={styles.booksHeader}>
        <div className={styles.pageTitle}>Books</div>
        <select
          name="sortBy"
          onChange={handleChange}
          className={styles.sortSelect}
        >
          <option value="recent">Recent</option>
          <option value="title">Title: A-Z</option>
          <option value="author">Author: A-Z</option>
        </select>
      </div>
      <div className={styles.cardContainer}>
        {books.map(book => (
          <BookCard key={book.OLID} book={book}/>
        ))}
      </div>
    </main>
  );
}

export default Books;