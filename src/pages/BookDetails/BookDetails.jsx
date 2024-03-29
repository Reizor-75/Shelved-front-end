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
  const renderStars = (numOfStars) =>{
    const stars = []
    for(let i =0; i < numOfStars; i++){
      stars.push(<i className="fa-solid fa-star" id={styles.filled}></i>)
    }
    for(let i = numOfStars; i < 5; i++){
      stars.push(<i className="fa-solid fa-star "></i>)
    }
    return stars;
  }
  
  const averageRating = (reviews) =>{
    const stars = []

    reviews
    
    return stars;
  }

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

  return (  
    <main className={styles.container}>
      <div className={styles.bookContainer}>
        <img src="" alt={`${book.title}'s Cover`} />
        <div className={styles.bookInfo}>
          <div className={styles.bookTitle}> {book.title} </div>          
          <div className={styles.bookAuthors}> by
            {book.authors.map(author =>
              <span key={author}> {author}</span>
            )}
          </div>
          {averageRating(book.reviews)}

          <div className={styles.bookPublished}>Published in {date}</div>            
          {book.genre.map(singleGenre =>
            <span key={singleGenre}>{singleGenre} </span>
          )}          
        </div>

        <div className={styles.addToList}>
          <button onClick={handleAddToRead} className={styles.addToCompleted}><i className="fa-solid fa-square-check"></i></button>
          <button onClick={handleAddToWish} className={styles.addToWish}><i className="fa-solid fa-heart"></i></button>
        </div>
      </div>
      <div className={styles.reviewContainerHeader}>Reviews</div>         
      {user && !book.reviews.find(review => review.reviewer._id === user.profile) &&   
        <form autoComplete="off" onSubmit={handleSubmitReview} className={styles.form}>
          <div className={styles.formHeader}>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              placeholder='Title'
            />
            <div className={styles.starSelect}>
              Rating
              <input
                type="radio"
                value="1"
                name="rating"
                id='1star'
                onChange={handleChange}
              /> <label htmlFor="1star"><i className="fa-solid fa-star "></i></label>
              <input
              type="radio"
              value="2"
              name="rating"
              id='2star'
              onChange={handleChange}
            /> <label htmlFor="2star"><i className="fa-solid fa-star "></i></label>
              <input
              type="radio"
              value="3"
              name="rating"
              id='3star'
              onChange={handleChange}
            /> <label htmlFor="3star"><i className="fa-solid fa-star "></i></label>
              <input
              type="radio"
              value="4"
              name="rating"
              id='4star'
              onChange={handleChange}
            /> <label htmlFor="4star"><i className="fa-solid fa-star "></i></label>
              <input
              type="radio"
              value="5"
              name="rating"
              id='5star'
              onChange={handleChange}
            /> <label htmlFor="5star"><i className="fa-solid fa-star "></i></label>
            </div>
          </div>
          <textarea
            type="text"
            name="content"
            onChange={handleChange}
            placeholder='Write Your Review'
          />          
          <button type='submit' onClick={handleSubmitReview}><i className="fa-solid fa-comments"></i></button>         
        </form>
      }
      <div className={styles.reviewsContainer}>
        {book.reviews.length ?
          <>
            {book.reviews.map(review =>
              <div key={review._id} className={styles.review}>               
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewTitle}> {review.title} </div>
                  <div className={styles.reviewStars}>{renderStars(review.rating)}</div>
                </div>
                <div className={styles.reviewContent}>{review.content}</div>
                <div className={styles.bottomRow}>
                  <div className={styles.reviewerButtons}>
                    <button><i className="fa-solid fa-file-pen"></i></button>
                    <button><i className="fa-solid fa-trash"></i></button>
                  </div>
                  <div className={styles.reviewerInfo}>
                    {review.reviewer.name}
                    <img src={review.reviewer.photo} alt={`${review.reviewer.name}'s avatar`} />
                  </div>
                </div>
                <hr />
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