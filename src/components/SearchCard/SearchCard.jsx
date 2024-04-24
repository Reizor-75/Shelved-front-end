// npm modules
import { NavLink } from 'react-router-dom';

// services
import * as bookService from '../../services/bookService'

// css
import styles from './SearchCard.module.css'

const searchCard = ({foundBook}) => {

  const handleClick = async () =>{
    
    const bookData = {
      OLID: foundBook.key.substring(7),    
      title: foundBook.title,
      authors: [ foundBook.author_name[0] ],
      firstPublished: new Date(foundBook.first_publish_year,0,0),
      coverPhoto: foundBook.cover_edition_key,
    }
    await bookService.create(bookData)
  }

  return ( 
    <NavLink to={`/books/`}>
      <div className={styles.card} onClick={handleClick}>   
        {foundBook.cover_edition_key ?   
          <img 
            src={`https://covers.openlibrary.org/b/olid/${foundBook.cover_edition_key}-M.jpg`} 
            alt={`${foundBook.title} Cover Image`} 
            className={styles.cover}
            />
          :
            <div className={styles.bookTitle}>{foundBook.title}</div>
        }

        {/* <h1 className={styles.bookTitle}>{book.title}</h1>
        <h2 className={styles.bookAuthor}>{book.author}</h2> */}
      </div>
    </NavLink>
  );
}

export default searchCard;