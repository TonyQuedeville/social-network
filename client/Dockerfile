# Utilisez une image Node.js officielle pour Node.js 14 (ou la version de votre choix)
FROM node:14

# Créez un répertoire de travail pour l'application React
WORKDIR /usr/src/app

# Copiez le fichier package.json et le fichier package-lock.json (s'ils existent)
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez le reste de l'application dans le conteneur
COPY . .

# Construisez l'application React pour la production
RUN npm run build

# Exposez le port sur lequel l'application écoute (par défaut 3000)
EXPOSE 3000

# Commande pour exécuter l'application (peut varier en fonction de votre configuration)
CMD ["npm", "start"]
