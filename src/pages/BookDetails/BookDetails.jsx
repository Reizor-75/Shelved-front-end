// npm modules
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

// services
import * as bookService from '../../services/bookService'

// css
import styles from './BookDetails.module.css'

//components
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import Review from '../../components/Review/Review';
import EditReviewForm from '../../components/EditReviewForm/EditReviewForm';
import ListButton from '../../components/ListButton/ListButton';

const BookDetails = ({user, profile}) => {
  const { bookId } = useParams()
  const [book, setBook] = useState()
  const [edit, setEdit] = useState( false )
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
    let average = 0
    
    if(reviews.length) average = reviews.reduce((a,b) => a+b.rating, 0)/reviews.length
    for(let i = 0; i < Math.floor(average); i++){
      stars.push(<i className="fa-solid fa-star" id={styles.filled}></i>)
    }
    for(let i = Math.floor(average); i < 5; i++){
      stars.push(<i className="fa-solid fa-star"></i>)
    }
    return stars;
  }

  const handleAddToRead = async ()=>{
    await bookService.addToRead(bookId)
  }

  const handleAddToWish = async ()=>{
    await bookService.addToWish(bookId)
  }

  const handleAddReview = async (reviewFormData) => {    
    const data = await bookService.addReview(bookId, reviewFormData)
    setBook(data)
  }

  const handleEditReview = async () => {
    setEdit(true)
  }

  const handleUpdateReview = async (reviewId, reviewFormData) =>{
    const data = await bookService.editReview(bookId, reviewId, reviewFormData)
    setBook(data)
    setEdit(false)
  }

  const handleDeleteReview = async (reviewId) => {
    const data = await bookService.deleteReview(bookId, reviewId)
    setBook(data)
  }

  return (  
    <main className={styles.container}>
      <div className={styles.bookContainer}>
        {book.coverPhoto ?
          <img src={`https://covers.openlibrary.org/b/OLID/${book.coverPhoto}-L.jpg`} alt={`${book.title}'s Cover`} className={styles.bookCover}/>
          :
          <div className={styles.bookCover}>{book.title}</div>
          }
        <div className={styles.bookInfo}>
          <div className={styles.bookTitle}> 
            {book.title} 
            { user &&
              <div className={styles.List}>
                <ListButton
                  type={"Read List"}
                  handleClickFunction={handleAddToRead}
                  profile={profile}
                  bookId={bookId}
                />
                <ListButton
                  type={"Wish List"}
                  handleClickFunction={handleAddToWish}
                  profile={profile}
                  bookId={bookId}
                />
              </div>
            }
          </div>          
          <div className={styles.bookAuthors}> by {book.authors[0]}
          <div className={styles.bookPublished}>Published in {date}</div>       
          </div>
          <div className={styles.averageStars}>{averageRating(book.reviews)}</div>
          <div className={styles.bookDescription} >
            <p>
            {book.description ? book.description: <> No Synponsis Avaiable</>}
            </p>
          </div>     
        </div>
        
      </div>
      <div className={styles.reviewContainerHeader}>Reviews</div>         
      {user && !book.reviews?.find(review => review.reviewer._id === user.profile) &&   
        <ReviewForm 
          handleAddReview={handleAddReview}
        />  
      }
      <div className={styles.reviewsContainer}>
        {book.reviews?.length ?
          book.reviews.map(review =>
            <div key={review._id}>
              { edit===false ?
                <Review
                  user={user}
                  review={review}
                  handleEditReview={handleEditReview}
                  handleDeleteReview={handleDeleteReview}
                />
                :
                <EditReviewForm
                  review={review}
                  handleUpdateReview={handleUpdateReview}
                />
              }
            </div>
          )
          :
          <div className={styles.noReview} >No Reviews available</div>
        }      
      </div>
    </main>
  );
}

export default BookDetails;