# Utilisez une image Docker officielle pour MySQL ou PostgreSQL, en fonction de votre base de données.
# Par exemple, pour MySQL :
FROM mysql:latest

# Copiez les fichiers de migration SQL dans le conteneur
COPY ./database/migrations /docker-entrypoint-initdb.d/

# Définissez les variables d'environnement pour la base de données (à personnaliser)
ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_DATABASE=database_name
ENV MYSQL_USER=user_name
ENV MYSQL_PASSWORD=user_password

# Commande d'initialisation du serveur de base de données (peut varier en fonction de la base de données)
# CMD ["mysqld"]
