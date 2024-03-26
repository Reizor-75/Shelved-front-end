// npm modules
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

// services
import * as bookService from '../../services/bookService'

// css
import styles from './BookDetails.module.css'

const Books = () => {
  const { bookId } = useParams()
  const [book, setBook] = useState()

  useEffect(() =>{
    const fetchBook= async () => {
      const data = await bookService.getBook(bookId)
      setBook(data)
    }
    fetchBook()
  },[bookId])
  
  if(!book){
    return (
      <>
        <h1>No Such Book</h1>
      </>
    )
  }

  return (  
    <main className={styles.container}>
      <h1>{book.title}</h1>
    
    </main>
  );
}

export default Books;