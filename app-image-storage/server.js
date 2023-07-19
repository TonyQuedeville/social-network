/*
	Projet Zone01 : Social network
	Tony Quedeville 
	18/07/2023
	App-image_storage : Server nodeJS pour stocker les images téléchargées par les utilisateurs
*/

const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const fs = require('fs');

const app = express()
const upload = multer({ dest: 'uploads/' }) // Le dossier où les fichiers téléchargés seront stockés

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('image'), (req, res) => {
  //console.log('req.file:', req.file)

  // Vérifier si un fichier a été téléchargé
  if (!req.file) {
		res.status(400).json({ error: 'Aucun fichier téléchargé' })
    return
  }

  // Obtenir les détails du fichier téléchargé
  const { originalname, filename, path: filePath } = req.file
  const extension = path.extname(originalname)
  const newFilename = filename + extension
  const newPath = filePath + extension

  // Renommer le fichier avec l'extension
  fs.renameSync(filePath, newPath)

  // Répondre avec une confirmation de réussite
  res.status(200).json({ message: 'Fichier téléchargé avec succès', filename: newFilename, path: newPath })
})

// Configurations du serveur
app.listen(4000, () => {
  console.log('Serveur app-image-storage en cours d\'exécution sur le port 4000')
})

