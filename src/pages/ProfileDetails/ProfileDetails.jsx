// npm modules
import { useState, useEffect } from 'react'
import { NavLink, useParams } from "react-router-dom";

// services
import * as profileServices from '../../services/profileService'

// css
import styles from './ProfileDetails.module.css'

const ProfileDetails = () => {
  const { profileId } = useParams()
  const [profile, setProfile] = useState()

  useEffect(() =>{
    const fetchProfile= async () => {
      const data = await profileServices.getProfile(profileId)
      setProfile(data)
    }
    fetchProfile()
  },[profileId])

  const handleRemoveRead = async (bookId)=>{
    const data = await profileServices.deleteRead(bookId)
    setProfile(data)
  }

  const handleRemoveWish = async (bookId)=>{
    const data = await profileServices.deleteWish(bookId)
    setProfile(data)
  }

  const handleMoveBook = async (bookId)=>{
    const data = await profileServices.moveBook(bookId)
    setProfile(data)
  }

  if(!profile)
    return <main className={styles.container}><h1>Loading...</h1></main>

  const date = new Date(profile.createdAt).toLocaleDateString()

  return (  
    <main className={styles.container}>
      <h1>{profile.name} 
        <NavLink to="edit" state={profile}><i className="fa-solid fa-pen-to-square"></i></NavLink>
      </h1>
      <h2>Member since {date}</h2>
      <div className={styles.listContainer}>
        <div className={styles.list}>
          <div className={styles.listTitle}>Completed List</div>
          <div className={styles.listContent}>
            {profile.readList.length ? 
              <>
                {profile.readList.map(book =>
                  <div key={book._id}>
                    <NavLink to={`/books/${book._id}`}>{book.title} </NavLink>
                    <button onClick={()=>handleRemoveRead(book._id)}><i className="fa-solid fa-heart-circle-xmark"></i></button>
                  </div>
                )}
              </>
              :
              <>No Books Available</>
            }
            </div>
        </div>
        <div className={styles.list}>        
          <div className={styles.listTitle}>Wish List</div>
          <div className={styles.listContent}>
            {profile.wishList.length ? 
              <>
                {profile.wishList.map(book =>
                  <div key={book._id} className={styles.book}>
                    <NavLink to={`/books/${book._id}`}>{book.title} </NavLink>
                    <button onClick={()=>handleMoveBook(book._id)}>
                      <i className="fa-solid fa-square-check"></i> 
                    </button>            
                    <button onClick={()=>handleRemoveWish(book._id)}><i className="fa-solid fa-eraser"></i></button>
                  </div>
                )}
              </>
              :
              <> No Books Available</>
            }
            </div>
        </div>
      </div>
    </main>
  );
}

export default ProfileDetails;