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
    const fetchRecent = async () => {
      const recentData = await bookService.recent()
      setRecent(recentData)
    }
    fetchRecent()
  }, [])

  return (
    <main className={styles.container}>
      <h1>Recent Releases</h1>
      <div className={styles.slideContainer}>
        <div className={styles.navButton}><i className="fa-solid fa-circle-arrow-left"></i></div>
        <div className={styles.bookselection}>{recent?.map(book => (
          <BookCard key={book.OLID} book={book}/>
        ))}
        </div>
        <div className={styles.navButton}><i className="fa-solid fa-circle-arrow-right"></i></div>
      </div>
      <h1>Fan Favorites</h1>
      <div className={styles.slideContainer}>

      </div>
    </main>
  )
}

export default Landing
