import { Link } from 'react-router-dom';

// css
import styles from './BookCard.module.css'


const BookCard = ({book}) => {


  return ( 
  <Link to={`/books/${book.key.substring(7)}`}>
    
    <div className={styles.card}>   
      {book.cover_i ?   
        <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={`${book.title} Cover Image`} />
        :
        <h1 className={styles.bookTitle}>{book.title}</h1>
      }

      {/* <h1 className={styles.bookTitle}>{book.title}</h1>
      <h2 className={styles.bookAuthor}>{book.author}</h2> */}
    </div>
  </Link>  
  );
}

export default BookCard;