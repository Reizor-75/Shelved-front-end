//npm modules
import { useEffect, useRef, useState } from 'react'

//service
import * as bookService from '../../services/bookService'

//components
import BookCard from '../../components/BookCard/BookCard'

// css
import styles from './Landing.module.css'

const Landing = () => {
  const [recent, setRecent] = useState()
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() =>{
    const fetchRecent = async () => {
      const recentData = await bookService.recent()
      setRecent(recentData)
    }
    fetchRecent()
  }, [])

  const containerRef = useRef()

  const handleScroll = (scrollAmount)=>{
    let newPosition = scrollPosition;
    if(scrollPosition + scrollAmount >= 0 && scrollPosition + scrollAmount <= 1200)
    {newPosition = scrollPosition + scrollAmount}

    setScrollPosition(newPosition) 
    containerRef.current.scrollLeft = newPosition
  }

  return (
    <main className={styles.container}>
      <h1>Recent Releases</h1>
      <div className={styles.slideContainer} > 
      <div className={styles.navButton} onClick={()=>handleScroll(-220)}><i className="fa-solid fa-circle-arrow-left"></i></div>
        <div className={styles.bookselection} ref={containerRef}>
          {recent?.map(book => (
          <BookCard key={book.OLID} book={book}/>
        ))}
        </div>
        <div className={styles.navButton} onClick={()=>handleScroll(220)}><i className="fa-solid fa-circle-arrow-right"></i></div>
      </div>
      <h1>Fan Favorites</h1>
      <div className={styles.slideContainer}>

      </div>
    </main>
  )
}

export default Landing
