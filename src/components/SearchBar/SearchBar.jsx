// npm modules
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// services
import  * as bookService from '../../services/bookService'

// css
import styles from './SearchBar.module.css'

const SearchBar = ({handleSearch}) => {
  const [formData, setFormData] = useState({     
    category: "title",
    searchStr: ""
  })

  const handleSubmit= async evt => {
    evt.preventDefault() 

    try{
      const data = await bookService.search(formData)
      handleSearch(data)
    } catch(err){
      console.log(err)
    } 
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  return ( 
    <div className={styles.searchBar}>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <select
          name="category"          
          onChange={handleChange}
          defaultValue="title"
          className={styles.typeSelect}
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="ISBN">ISBN</option>
        </select>
        <input 
          type="text" 
          name="searchStr"
          placeholder='Search'
          onChange={handleChange}
          className={styles.searchInput}
        />        
        <button type='submit' className={styles.searchButton}><i className="fa-solid fa-magnifying-glass"></i></button>
      </form>
    </div>
  );
}

export default SearchBar;