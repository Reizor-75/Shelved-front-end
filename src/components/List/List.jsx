// npm modules
import { NavLink } from "react-router-dom";

// css
import styles from "./List.module.css"

const List = ({list, handleClick}) => {
  return ( 
    <>
      {list.map(book =>
        <div key={book._id} className={styles.book}>
          <NavLink  to={`/books/${book._id}`}>{book.title} </NavLink>
          <button  onClick={()=>handleClick(book._id)}><i className="fa-solid fa-eraser"></i></button>
        </div>
      )}
    </>
  );
}

export default List;