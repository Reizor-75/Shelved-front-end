// npm modules
import { NavLink } from 'react-router-dom';

// css
import styles from './BookCard.module.css'

const BookCard = ({book}) => {
  return ( 
    <NavLink to={`/books/${book._id}`}>
      <div className={styles.card}>   
        {book.coverPhoto ?   
          <img 
            src={`https://covers.openlibrary.org/b/olid/${book.coverPhoto}-M.jpg`} /** {book.cover} */
            alt={`${book.title} Cover Image`} 
            className={styles.cover}
            />
          :
          <div className={styles.bookTitle}>{book.title}</div>
        }

        {/* <h1 className={styles.bookTitle}>{book.title}</h1>
        <h2 className={styles.bookAuthor}>{book.author}</h2> */}
      </div>
    </NavLink>
  );
}

export default BookCard;