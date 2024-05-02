// npm modules
import { useState, useEffect } from 'react'
import { NavLink, useParams } from "react-router-dom";

// services
import * as profileService from '../../services/profileService'

// component
import List from '../../components/List/List';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

// css
import styles from './ProfileDetails.module.css'

const ProfileDetails = ({user}) => {
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
        <div className={styles.profileData}>
          <div className={styles.editProfileData}>
            <h1 className={styles.profileName}>{profile.name}</h1>
            { user?.profile === profileId &&
              <NavLink to="edit" state={profile}><i className="fa-solid fa-pen-to-square"></i></NavLink>
            }
          </div>
            {profile.following.length ?
              <div className={styles.friendsContainer}> 
                {profile.following.length} Friends
                {profile.following?.map(friend =>
                  <ProfileCard key={friend._id} profile={friend}/>
                )}
              </div>
              :
              <> No Friends</>
            }
        </div>
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
              <List type={"Wish List"}list={profile.wishList} handleClick={handleRemoveWish} handleMoveBook={handleMoveBook}/>
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