// npm modules
import { useState, useRef } from "react";

// components
import BookCard from "../BookCard/BookCard";

// css
import styles from './Slider.module.css'

const Slider = ({bookSet}) => {  
  const [scrollPosition, setScrollPosition] = useState(0)

  const containerRef = useRef()

  const handleScroll = (scrollAmount)=>{
    let newPosition = scrollPosition;
    if(scrollPosition + scrollAmount >= 0 && scrollPosition + scrollAmount <= 1200)
    {newPosition = scrollPosition + scrollAmount}

    setScrollPosition(newPosition) 
    containerRef.current.scrollLeft = newPosition
  }

  return ( 
    <div className={styles.slideContainer} > 
        <div className={styles.navButton} onClick={()=>handleScroll(-220)}><i className="fa-solid fa-circle-arrow-left"></i></div>
          <div className={styles.bookselection} ref={containerRef}>
            {bookSet?.map(book => (
            <BookCard key={book.OLID} book={book}/>
          ))}
          </div>
        <div className={styles.navButton} onClick={()=>handleScroll(220)}><i className="fa-solid fa-circle-arrow-right"></i></div>
      </div>
  );
}

export default Slider;