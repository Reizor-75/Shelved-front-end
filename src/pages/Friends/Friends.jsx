//npm module
import { useLocation } from "react-router-dom";

//component
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";

//css
import styles from "./Friends.module.css"

const Friends = () => {
  const { state } = useLocation()

console.log(state)
  return (      
    <main className={styles.container}>
      <div className={styles.friendsTitle}>{state.name}'s Friends</div>

      {state.following ? 
        <>
          {state.following.map(friend =>
            <ProfileIcon key={friend._id} profile={friend}/>
          )}
        </>
        : 
        <>No friends</>
      }

    </main>
  );
}

export default Friends;