
// css
import styles from './Review.module.css'

const Review = ({review, handleDeleteReview}) => {
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

  return (  
    <div key={review._id} className={styles.review}>              
      <div className={styles.reviewHeader}>
        <div className={styles.reviewTitle}> {review.title} </div>
        <div className={styles.reviewStars}>{renderStars(review.rating).map(ele => <span key={review.title}>{ele}</span>)}</div>
      </div>
      <div className={styles.reviewContent}>{review.content}</div>
      <div className={styles.bottomRow}>
        <div className={styles.reviewerButtons}>
          <button ><i className="fa-solid fa-file-pen"></i></button>
          <button onClick={()=>handleDeleteReview(review._id)}><i className="fa-solid fa-trash"></i></button>
        </div>
        <div className={styles.reviewerInfo}>
          {review.reviewer.name}
          <img src={review.reviewer.photo} alt={`${review.reviewer.name}'s avatar`} />
        </div>
      </div>
      <hr />   
    </div>
  );
}

export default Review;