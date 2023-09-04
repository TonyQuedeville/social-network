# Utilisation de l'image Go
FROM golang:latest

# Répertoire de travail dans le conteneur
WORKDIR /app-social-network

# Copier les fichiers de l'application
COPY . .

# Construire l'application Go
RUN go build -o app-social-network

# Exposer un port
EXPOSE 8080

# Commande de démarrage
CMD ["./app-social-network"]
