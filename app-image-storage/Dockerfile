# Utilisation de l'image Node.js
FROM node:latest

# Répertoire de travail dans le conteneur
WORKDIR /app-image-storage

# Copier les fichiers de l'application
COPY . .

# Installation des dépendances
RUN npm install

# Exposer un port
EXPOSE 4000

# Commande de démarrage
CMD ["node", "server.js"]
