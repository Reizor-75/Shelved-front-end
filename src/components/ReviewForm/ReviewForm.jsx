
// css
import styles from './ReviewForm.module.css'

const ReviewForm = ({handleChange, handleSubmitReview}) => {
  return (  
    <form autoComplete="off" onSubmit={handleSubmitReview} className={styles.reviewForm}>
      <div className={styles.formHeader}>
        <div className={styles.left}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder='Title'
            className={styles.reviewInput}
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
        <button type='submit' onClick={handleSubmitReview} className={styles.submitReivew}><i className="fa-solid fa-up-right-from-square"></i></button>   
      </div>
      <textarea
        type="text"
        name="content"
        onChange={handleChange}
        placeholder='Write Your Review'
      />                
    </form>
  );
}

export default ReviewForm;