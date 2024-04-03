// npm modules
import { useState } from 'react'

//services
import  * as bookService from '../../services/bookService'

// css
import styles from './Search.module.css'

const Search = () => {
  const [search, setSearch] = useState({})
  const [formData, setFormData] = useState({     
    category: "",
    searchStr: ""
  })

  const handleSubmit= async evt => {
    evt.preventDefault()
    try{
      const data = await bookService.search(formData)
      setSearch(data)
    } catch(err){
      console.log(err)
    }
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  return (  
    <main className={styles.container}>
      <h1>Search</h1>
      <form autoComplete="off" onSubmit={handleSubmit} className='form'>
        <select
          name="category"          
          onChange={handleChange}
        >
          <option value="" selected disabled hidden>Search By</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="ISBN">ISBN</option>
        </select>
        <input 
          type="text" 
          name="searchStr"
          placeholder='Search'
          onChange={handleChange}
        />
        <button type='submit'> <i className="fa-solid fa-magnifying-glass"></i></button>
      </form>

      {!search.length ? 
        <>No Books Avaiable</>:
        <>Books</> }
    </main>
  );
}

export default Search;