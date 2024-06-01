
//css
import styles from './Footer.module.css'

const Footer = () => {
  return ( 
    <div className={styles.footerContainer}>
      <div>Read More about Shelved at </div>
      <a href="https://github.com/Reizor-75/Shelved-front-end" className={styles.GitLink}> GitHub
        <i className="fa-brands fa-github">
        </i>
      </a>
    </div>
  );
}

export default Footer;