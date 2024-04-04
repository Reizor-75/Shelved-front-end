// npm modules
import { useNavigate } from 'react-router-dom';

// css
import styles from './BookCard.module.css'

// services
import * as bookService from '../../services/bookService'

const BookCard = ({book}) => {
  const navigate = useNavigate()

  const handleClick = async () =>{
    const bookData = {
      OLID: book.key.substring(7),    
      title: book.title,
      authors: [ book.author_name[0] ],
      firstPublished: book.first_publish_year,
      coverPhoto: book.cover_edition_key,
    }
    await bookService.create(bookData)
    navigate(`/books`)
  }

  return ( 
    <div className={styles.card} onClick={handleClick}>   
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
  );
}

export default BookCard;