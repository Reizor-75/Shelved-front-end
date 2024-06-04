//npm module
import { useLocation } from "react-router-dom";

//component
import ProfileCard from "../../components/ProfileCard/ProfileCard";

//css
import styles from "./Friends.module.css"

const Friends = () => {
  const { state } = useLocation()

  return (      
    <main className={styles.container}>
      <div className={styles.friendsTitle}>{state.name}'s Friends</div>

      {state.following ? 
        <>
          {state.following.map(friend =>
            <ProfileCard key={friend._id} profile={friend}/>
          )}
        </>
        : 
        <>No friends Available</>
      }

    </main>
  );
}

export default Friends;