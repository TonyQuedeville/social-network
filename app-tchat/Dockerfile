# Utilisation de l'image Node.js
FROM node:latest

# Répertoire de travail dans le conteneur
WORKDIR /app-tchat

# Copier les fichiers de l'application
COPY . .

# Installation des dépendances
RUN npm install

# Exposer un port
EXPOSE 3001

# Commande de démarrage
CMD ["node", "server.js"]
