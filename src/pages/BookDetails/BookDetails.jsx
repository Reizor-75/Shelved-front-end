// npm modules
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

// services
import * as bookService from '../../services/bookService'

// css
import styles from './BookDetails.module.css'

const Books = ({user}) => {
  const { bookId } = useParams()
  const [book, setBook] = useState()

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    rating: 5,
  })
  
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

  const handleSubmitReview= async evt => {
    evt.preventDefault()
    const data = await bookService.addReview(bookId, formData)
    setBook(data)
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const { title, content, rating } = formData

  return (  
    <main className={styles.container}>
      <div className={styles.userInfo}>
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <h2>{date}</h2>
      </div>
      {book.genre.map(singleGenre =>
        <span key={singleGenre}>{singleGenre} </span>
      )}
        

      <div className={styles.addToList}>
        <button onClick={handleAddToRead} className={styles.addToCompleted}>Add to Completed List</button>
        <button onClick={handleAddToWish} className={styles.addToWish}>Add to Wish List</button>
      </div>
      {user &&       
        <form autoComplete="off" onSubmit={handleSubmitReview} className={styles.form}>
          <h2>Reviews          
            <button onClick={handleSubmitReview}>Write a Review</button>
          </h2>
          <label className={styles.label}>
            Title
            <input
              type="text"
              value={title}
              name="title"
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Rating
            <input
              type="number"
              value={rating}
              name="rating"
              onChange={handleChange}
            />
          </label> 
          <label className={styles.label}>
            Review
            <textarea
              type="text"
              value={content}
              name="content"
              onChange={handleChange}
            />
          </label>          
        </form>
      }
      <div className={styles.reviewsContainer}>
        {book.reviews.length ?
          <>
            {book.reviews.map(review =>
              <div key={review._id}>
                <h2> {review.title} 
                {review.rating}</h2>
                {review.content}
                {review.reviewer.name}
              </div>
            )}
          </>
          :
            <h3>No Reviews available</h3>
        }
      </div>
    </main>
  );
}

export default Books;