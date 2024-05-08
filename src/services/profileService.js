// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/profiles`

async function getAllProfiles() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function addPhoto(photoData) {
  try {
    const photoFormData = new FormData()
    photoFormData.append('photo', photoData)
    const profileId = tokenService.getUserFromToken().profile
    const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoFormData,
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function getProfile(profileId) {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}


async function deleteRead(bookId){
  try {
    const res = await fetch(`${BASE_URL}/readlist/${bookId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteWish(bookId){
  try {
    const res = await fetch(`${BASE_URL}/wishlist/${bookId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function moveBook(bookId){
  try {
    const res = await fetch(`${BASE_URL}/wishlist/${bookId}/updateList`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function updateProfile(formData, photoData){
  try {
    const res = await fetch(`${BASE_URL}/${formData._id}/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify(formData),
    })     
    const json = await res.json()
    if (json.err) throw new Error(json.err)

    if (photoData) {
      await addPhoto(photoData)
    }

  } catch (err) {
    throw new Error(err)
  }
}

async function addFriend(profileId){
  try {
    const res = await fetch(`${BASE_URL}/friend/${profileId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
  
}

export { 
  getAllProfiles,
  addPhoto,
  getProfile, 
  deleteRead,
  deleteWish,
  moveBook,
  updateProfile,
  addFriend,
}