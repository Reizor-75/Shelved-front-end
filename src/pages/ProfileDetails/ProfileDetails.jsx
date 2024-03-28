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

  return (  
    <main className={styles.container}>
      <div className={styles.ReadList}>
        <div className={styles.ReadListTitle}>Completed List</div>
        {profile.readList.length ? 
          <>
          {profile.readList.map(book =>
            <div key={book._id}>book.title</div>
            )}
          </>
          :
          <> No Books Available</>
          }
      </div>
      <div className={styles.WishList}>        
      <div className={styles.WishListTitle}>Wish List</div>
      </div>
    </main>
  );
}

export default ProfileDetails;