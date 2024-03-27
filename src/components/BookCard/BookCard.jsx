import { Link } from 'react-router-dom';

// css
import styles from './BookCard.module.css'


const BookCard = ({book}) => {
  return ( 
  <Link to={`/books/${book._id}`}>
    <div className={styles.card}>
      <h1 className={styles.bookTitle}>{book.title}</h1>
      <h2 className={styles.bookAuthor}>{book.author}</h2>
    </div>
  </Link>  
  );
}

export default BookCard;