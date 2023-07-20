/*
	Projet Zone01 : Social network
	Tony Quedeville 
	10/07/2023
	Hook personalisé : Envoi la requete de téléchargement d'image au server app-image-storage
*/

import { useState } from 'react'
import axios from 'axios'

const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  const uploadImage = async (imageFile) => {
    try {
      const imageFormData = new FormData()
      imageFormData.append('image', imageFile)

      const response = await axios.post(`http://${window.location.hostname}:4000/upload`, imageFormData)

      setImageUrl(response.data.filename)
      setSelectedImage(imageFile)
    } catch (err) {
      console.error('Erreur lors du téléchargement de l\'image :', err)
    }
  }

  const resetImage = () => {
    setImageUrl('')
    setSelectedImage(null)
  }

  return { imageUrl, setImageUrl, selectedImage, setSelectedImage, uploadImage, resetImage }
}

export default useImageUpload
