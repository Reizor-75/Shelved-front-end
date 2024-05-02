//npm modules
import { useEffect, useState } from "react"
import { Popover } from "react-tiny-popover"

// css
import styles from "./ListButton.module.css"

const ListButton = ({type, handleClickFunction, profile, bookId}) => {
  const [disabledButton, setDisabledButton] = useState(false)  
  const [isPopoverOpen, setIsPopoverOpen]= useState( false )
  
  useEffect(() =>{
    if(type === "Read List"){
      if(profile?.readList.some(book => book._id === bookId))setDisabledButton(true)
    }
    else {
      if(profile?.wishList.some(book => book._id === bookId))setDisabledButton(true)
    }
  },[bookId, type, profile])

  const handleClick = async () =>{
    setIsPopoverOpen(true)
    handleClickFunction()
    setDisabledButton(true)
  } 

  return (  
    <Popover 
      isOpen={isPopoverOpen}
      transform={{ top: 40, left: 20 }}
      transformMode='relative'
      onClickOutside={() => setIsPopoverOpen(false)}
      content={() => ( 
        <div className={styles.popoverMessage}>
          Added to {type}
        </div>
      )}
    >      

    {type === "Read List" ?
      disabledButton ?
        <button onClick={handleClick} className={styles.addToList} disabled>
          <i className="fa-solid fa-book-open-reader"></i>
        </button>   
        :
        <button onClick={handleClick} className={styles.addToList} >
          <i className="fa-solid fa-book-open-reader"></i>   
        </button> 
      :
      disabledButton ?      
        <button onClick={handleClick} className={styles.addToList} disabled>
          <i className="fa-solid fa-heart"></i>
        </button>   
        :
        <button onClick={handleClick} className={styles.addToList}>
          <i className="fa-solid fa-heart"></i> 
        </button> 
    }   
    </Popover>
  );
}

export default ListButton;