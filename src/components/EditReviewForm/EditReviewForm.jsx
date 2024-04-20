// npm modules
import { useState } from 'react';

// css
import styles from './EditReviewForm.module.css'

const EditReviewForm = ({review, handleUpdateReview}) => {
  const [formData, setFormData] = useState({
    title: review.title,
    content: review.content,
    rating: review.rating,
  })

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmitEdit = async evt => {
    evt.preventDefault()
    handleUpdateReview(review._id, formData)
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmitEdit} className={styles.reviewForm}>
      <div className={styles.formHeader}>
        <div className={styles.left}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder='Title'
            className={styles.reviewInput}
            value={formData.title}
          />
          <div className={styles.starSelect}>
            <label htmlFor="1star">
              <input
                type="radio"
                value="1"
                name="rating"
                id='1star'
                onChange={handleChange}
              />               
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span>
            </label>
            <label htmlFor="2star">
              <input
                type="radio"
                value="2"
                name="rating"
                id='2star'
                onChange={handleChange}
              />               
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span> 
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span>
            </label>               
            <label htmlFor="3star">
              <input
                type="radio"
                value="3"
                name="rating"
                id='3star'
                onChange={handleChange}
              />
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span> 
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span> 
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span>
            </label>
            <label htmlFor="4star">
              <input
                type="radio"
                value="4"
                name="rating"
                id='4star'
                onChange={handleChange}
              />
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span> 
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span> 
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span>
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span>
            </label>
            <label htmlFor="5star">
              <input
                type="radio"
                value="5"
                name="rating"
                id='5star'
                onChange={handleChange}
              />
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span> 
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span> 
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span>
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span>
              <span className={styles.icon}> <i className="fa-solid fa-star "></i></span>
            </label>
          </div>     
        </div>   
        <button type='submit'  onSubmit={handleSubmitEdit} className={styles.submitReivew}><i className="fa-solid fa-up-right-from-square"></i></button>   
      </div>
      <textarea
        type="text"
        name="content"
        onChange={handleChange}
        placeholder='Write Your Review'
        value={formData.content}
      />                
    </form>
  );
}

export default EditReviewForm;