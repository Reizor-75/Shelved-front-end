// npm modules
import { NavLink } from "react-router-dom";

// css
import styles from "./List.module.css"

const List = ({type, list, handleClick, handleMoveBook}) => {
  return ( 
    <>
      {list.map(book =>
        <div key={book._id} className={styles.book}>
          <NavLink to={`/books/${book._id}`}>{book.title} </NavLink>
          <div> 
            {type === "Wish List" && <button onClick={()=>handleMoveBook(book._id)}><i className="fa-solid fa-square-check"></i></button>}
            <button onClick={()=>handleClick(book._id)}><i className="fa-solid fa-eraser"></i></button>
          </div>
        </div>
      )}
    </>
  );
}

export default List;

// {profile.wishList.map(book =>
//   <div key={book._id} className={styles.book}>
//     <NavLink to={`/books/${book._id}`}>{book.title} </NavLink>
//     <div>
//       <button onClick={()=>handleMoveBook(book._id)}>
//         <i className="fa-solid fa-square-check"></i> 
//       </button>
//     </div>
//   </div>
// )}