import { NavLink } from 'react-router-dom';

// css
import styles from './BookCard.module.css'

const BookCard = ({book}) => {


  return ( 
  <NavLink to={`/books/${book.key.substring(7)}`}  state={book}>

    <div className={styles.card}>   
      {book.cover_edition_key ?   
        <img 
          src={`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`} /** {book.cover} */
          alt={`${book.title} Cover Image`} 
          className={styles.cover}
          />
        :
        <h1 className={styles.bookTitle}>{book.title}</h1>
      }

      {/* <h1 className={styles.bookTitle}>{book.title}</h1>
      <h2 className={styles.bookAuthor}>{book.author}</h2> */}
    </div>
  </NavLink>  
  );
}

export default BookCard;