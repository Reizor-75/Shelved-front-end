//npm modules
import { useEffect, useState } from 'react'

//service
import * as bookService from '../../services/bookService'

//components
import BookCard from '../../components/BookCard/BookCard'

// css
import styles from './Landing.module.css'

const Landing = () => {
  const [recent, setRecent] = useState()

  useEffect(() =>{
  }, [])

  return (
    <main className={styles.container}>
      <h1>Recent Releases</h1>
      <div className={styles.slideContainer}>
        {recent.map(book => (
          <BookCard key={book.OLID} book={book}/>
        ))}
      </div>
      <h1>Fan Favorites</h1>
      <div className={styles.slideContainer}>

      </div>
    </main>
  )
}

export default Landing
