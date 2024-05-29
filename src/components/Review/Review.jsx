// components
import ProfileIcon from '../ProfileIcon/ProfileIcon';

// css
import styles from './Review.module.css'

const Review = ({user, review, handleEditReview, handleDeleteReview}) => {
  const renderStars = (numOfStars) =>{
    let stars = []
    for(let i =0; i < numOfStars; i++){
      stars.push(<i className="fa-solid fa-star" id={styles.filled} key={i}></i>)
    }
    for(let i = numOfStars; i < 5; i++){
      stars.push(<i className="fa-solid fa-star" key={i}></i>)
    }
    return stars;
  }

  return (  
    <div key={review._id} className={styles.review}>              
      <div className={styles.reviewHeader}>
        <div className={styles.reviewStars}>{renderStars(review.rating)}</div>
        <div className={styles.reviewTitle}> {review.title} </div>        
      </div>
      <div className={styles.reviewContent}>{review.content}</div>
      <div className={styles.bottomRow}>
        <div className={styles.reviewerInfo}>
          <ProfileIcon profile={review.reviewer} />
        </div>
        {review.reviewer._id === user?.profile &&
          <div className={styles.reviewerButtons}>
            <button onClick={()=>handleEditReview(review)} ><i className="fa-solid fa-file-pen"></i></button>
            <button onClick={()=>handleDeleteReview(review._id)}><i className="fa-solid fa-trash"></i></button>
          </div>
        }
        
      </div>
      <hr />   
    </div>
  );
}

export default Review;