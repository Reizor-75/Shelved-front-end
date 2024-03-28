// npm modules
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

// services
import * as bookService from '../../services/bookService'

// css
import styles from './BookDetails.module.css'

const Books = () => {
  const { bookId } = useParams()
  const [book, setBook] = useState()

  
  useEffect(() =>{
    const fetchBook= async () => {
      const data = await bookService.getBook(bookId)
      setBook(data)
    }
    fetchBook()
  },[bookId])
  
  if(!book){
    return (
      <>
        <h1>No Such Book</h1>
      </>
    )
  }

  const date = new Date(book.firstPublished).getFullYear()

  const handleAddToRead = async ()=>{
    await bookService.addToRead(bookId)
  }
  const handleAddToWish = async ()=>{
    await bookService.addToWish(bookId)
  }

  return (  
    <main className={styles.container}>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <h2>{date}</h2>
      {book.genre.map(singleGenre =>
        <span key={singleGenre}>{singleGenre} </span>
        ) }
      <div className={styles.reviewsContainer}>
        <h2>Reviews</h2>

        {book.reviews.length ?
          <>has reviews</>
          :
          <h3>No Reviews available</h3>
        }
      </div>

      <div className={styles.addToList}>
        <button onClick={handleAddToRead} className={styles.addToCompleted}>Add to Completed List</button>
        <button onClick={handleAddToWish} className={styles.addToWish}>Add to Wish List</button>
      </div>
    </main>
  );
}

export default Books;