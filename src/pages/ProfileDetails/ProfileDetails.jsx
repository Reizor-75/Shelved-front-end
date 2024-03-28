// npm modules
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

// services
import * as profileServices from '../../services/profileService'

// css
import styles from './ProfileDetails.module.css'

const ProfileDetails = () => {
  const { profileId } = useParams()
  const [profile, setProfile] = useState()

  useEffect(() =>{
    const fetchBook= async () => {
      const data = await profileServices.getProfile(profileId)
      setProfile(data)
    }
    fetchBook()
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
      <h1>{profile.name}</h1>
      <h2>Member since {date}</h2>
      <div className={styles.ReadList}>
        <div className={styles.ReadListTitle}>Completed List</div>
          {profile.readList.length ? 
            <>
              {profile.readList.map(book =>
                <div key={book._id}>
                  {book.title}
                  <button onClick={()=>handleRemoveRead(book._id)}>🗑️</button>
                </div>
              )}
            </>
            :
            <> No Books Available</>
          }
      </div>
      <div className={styles.WishList}>        
        <div className={styles.WishListTitle}>Wish List</div>
          {profile.wishList.length ? 
            <>
              {profile.wishList.map(book =>
                <div key={book._id}>{book.title}    
                <button onClick={()=>handleMoveBook(book._id)}> Move to Completed List </button>            
                <button onClick={()=>handleRemoveWish(book._id)}>🗑️</button>
                </div>
              )}
            </>
            :
            <> No Books Available</>
          }
        </div>
    </main>
  );
}

export default ProfileDetails;