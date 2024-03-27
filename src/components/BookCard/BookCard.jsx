// css
import styles from './BookCard.module.css'


const BookCard = ({book}) => {
  return ( 
    <div className={styles.card}>
      <h1 className={styles.bookTitle}>{book.title}</h1>
      <h2 className={styles.bookAuthor}>{book.author}</h2>
    </div>
  );
}

export default BookCard;