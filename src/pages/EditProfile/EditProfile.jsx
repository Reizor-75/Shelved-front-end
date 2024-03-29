
// css
import styles from './EditProfile.module.css'

const EditProfile = (profile) => {
  return (  
    <main className={styles.container}>
      <div>Edit {profile.name}'s Profile </div>
    </main>
  );
}

export default EditProfile;