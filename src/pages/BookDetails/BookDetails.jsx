// npm modules
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

// services
import * as bookService from '../../services/bookService'

// css
import styles from './BookDetails.module.css'

//components
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import Review from '../../components/Review/Review';

const BookDetails = ({user}) => {
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

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  } 
  
  const handleSubmitReview= async evt => {
    evt.preventDefault()
    const data = await bookService.addReview(bookId, formData)
    setBook(data)
  }

  const handleDeleteReview= async (reviewId) => {
    const data = await bookService.deleteReview(bookId, reviewId)
    setBook(data)
  }

  return (  
    <main className={styles.container}>
      <div className={styles.bookContainer}>
        <img src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`} alt={`${book.title}'s Cover`} />
        <div className={styles.bookInfo}>
          <div className={styles.bookTitle}> {book.title} </div>          
          <div className={styles.bookAuthors}> by
          {/* {book.author_name[0]} */}
            {book.authors.map(author =>
              <span key={author.author.key}>  
              </span>
            )}
          </div>
          {/* {averageRating(book.reviews)} */}
          <p>{book.description.value}</p>

          <div className={styles.bookPublished}>Published in {book.firstPublished}</div>            
          {/* {book.genre.map(singleGenre =>
            <span key={singleGenre}>{singleGenre} </span>
          )}           */}
        </div>

        { user &&
          <div className={styles.List}>
            <button onClick={handleAddToRead} className={styles.addToList}><i className="fa-solid fa-square-check"></i></button>
            <button onClick={handleAddToWish} className={styles.addToList}><i className="fa-solid fa-heart"></i></button>
          </div>
        }
      </div>
      <div className={styles.reviewContainerHeader}>Reviews</div>         
      {user && !book.reviews.find(review => review.reviewer._id === user.profile) &&   
        <ReviewForm 
          handleChange={handleChange}
          handleSubmitReview={handleSubmitReview}
        />  
      }
      <div className={styles.reviewsContainer}>
        {/* {book.reviews.length ?
          book.reviews.map(review =>
            <Review
              key={review._id}
              review={review}
              handleDeleteReview={handleDeleteReview}
            />
          )
          :
          <div className={styles.noReview} >No Reviews available</div>
        }       */}
      </div>
    </main>
  );
}

export default BookDetails;