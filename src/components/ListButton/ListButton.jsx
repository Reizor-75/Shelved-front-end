//npm modules
import { useState } from "react"
import { Popover } from "react-tiny-popover"

// css
import styles from "./ListButton.module.css"

const ListButton = ({type, handleClickFunction}) => {  
  const [isPopoverOpen, setIsPopoverOpen]= useState( false )
  
  const handleClick = async () =>{
    setIsPopoverOpen(true)
    handleClickFunction()
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
        <button onClick={handleClick} className={styles.addToList}>
          {type === "Read List" ?
            <i className="fa-solid fa-book-open-reader"></i>
            :
            <i className="fa-solid fa-heart"></i>
          }
        </button>
      </Popover>
  );
}

export default ListButton;