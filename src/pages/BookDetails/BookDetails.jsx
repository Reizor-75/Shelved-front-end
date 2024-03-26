// npm modules
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

// services
import * as bookService from '../../services/bookService'

// css
import styles from './Books.module.css'

const Books = () => {
  const { bookId } = useParams()
  const [book, setBook] = useState

  useEffect(() =>{
    const fetchWorkshop= async () => {
      const data = await bookService.showWorkshop(bookId)
      setBook(data)
    }
    fetchWorkshop()
  })
  
  return (  
    <main className={styles.container}>
      <h1>{book.title}</h1>
    
    </main>
  );
}

export default Books;