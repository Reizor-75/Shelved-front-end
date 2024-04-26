//npm modules
import { useEffect, useState } from 'react'

//service
import * as bookService from '../../services/bookService'

//components
import Slider from '../../components/Slider/Slider'

// css
import styles from './Landing.module.css'

const Landing = () => {
  const [recent, setRecent] = useState()
  const [favorite, setFavorite] = useState()

  useEffect(() =>{
    const fetchRecent = async () => {
      const recentData = await bookService.recent()
      setRecent(recentData)
      const favoriteData = await bookService.favorite()
      setFavorite(favoriteData)
    }
    fetchRecent()
  }, [])

  return (
    <main className={styles.container}>
      <h1>Recent Releases</h1>
      <Slider bookSet={recent}/>
      <h1>Fan Favorites</h1>
      <Slider bookSet={favorite}/>
    </main>
  )
}

export default Landing
