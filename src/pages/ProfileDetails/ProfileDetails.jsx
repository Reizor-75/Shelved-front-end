// npm modules
import { useState, useEffect } from 'react'
import { NavLink, useParams } from "react-router-dom";

// services
import * as profileService from '../../services/profileService'

// component
import List from '../../components/List/List';

// css
import styles from './ProfileDetails.module.css'

const ProfileDetails = () => {
  const { profileId } = useParams()
  const [profile, setProfile] = useState()

  useEffect(() =>{
    const fetchProfile= async () => {
      const data = await profileService.getProfile(profileId)
      setProfile(data)
    }
    fetchProfile()
  },[profileId])

  const handleRemoveRead = async (bookId)=>{
    const data = await profileService.deleteRead(bookId)
    setProfile(data)
  }

  const handleRemoveWish = async (bookId)=>{
    const data = await profileService.deleteWish(bookId)
    setProfile(data)
  }

  const handleMoveBook = async (bookId)=>{
    const data = await profileService.moveBook(bookId)
    setProfile(data)
  }

  if(!profile)
    return <main className={styles.container}><h1>Loading...</h1></main>

  const date = new Date(profile.createdAt).toLocaleDateString()

  return (  
    <main className={styles.container}>
      <div className={styles.profileInfo}>
        {profile.photo ? 
          <img 
            src={profile.photo} 
            alt={`${profile.name}'s avatar`} 
            className={styles.profileAvatar}
          />
          :
          <i className={`fa-solid fa-circle-user ${styles.userIcon}` }></i>
          }
        <h1 className={styles.profileName}>{profile.name}</h1>
        <NavLink to="edit" state={profile}><i className="fa-solid fa-pen-to-square"></i></NavLink>
      </div>
      <h2>Member since {date}</h2>
      <div className={styles.listContainer}>
        <div className={styles.list}>
          <div className={styles.listTitle}>Completed List</div>
          <div className={styles.listContent}>
            {profile.readList.length ? 
              <List list={profile.readList} handleClick={handleRemoveRead}/>
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
                    <div>
                      <button onClick={()=>handleMoveBook(book._id)}>
                        <i className="fa-solid fa-square-check"></i> 
                      </button>            
                      <button onClick={()=>handleRemoveWish(book._id)}><i className="fa-solid fa-heart-circle-xmark"></i></button>
                    </div>
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