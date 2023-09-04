# Social-Network

Projet Zone01 Reseaux social:

  Une application de réseau social à titre pédagogique dans le cadre de la formation.
  C'est une application complète qui comprend un serveur Go, un gestionnaire de base de données, un service de stockage d'images, 
  un service de chat, et un client React.

  Lancer l'application app-social-network : go run app-social-network/main.go
  Lancer l'application app-image-storage : node server.js
  Lancer l'application app-tchat : node server.js
  Lancer l'application client : yarn start (option --clear-cach pour vider le cache)

## Architecture

L'application est divisée en plusieurs services, chacun ayant un rôle spécifique :

1. **app-social-network** : 
    port localhost:8080
    Le serveur principal de l'application Social-Network développé en Go. Il gère les fonctionnalités principales du réseau social. 

2. **database-manager** : 
    Le gestionnaire de base de données qui s'occupe des migrations et du stockage des données pour app-social-network.

3. **app-image-storage** : 
    port localhost:4000
    Service de stockage d'images pour le téléchargement et le partage d'images sur le réseau social.

4. **app-tchat** : 
    port localhost:3001
    Service de chat en temps réel pour les conversations entre les utilisateurs.

5. **client** : 
    port localhost:3000
    L'interface utilisateur du réseau social développée en React.

## Configuration

Avant de démarrer l'application, assurez-vous de configurer les variables d'environnement appropriées pour chaque service, notamment les informations de base de données, les ports, etc. Consultez la documentation de chaque service pour plus de détails.

## Installation

1. Clonez ce dépôt : 
    git clone https://github.com/TonyQuedeville/social-network.git

2. Allez dans le répertoire du projet :
    cd Social-Network

3. Construisez et lancez les conteneurs Docker en utilisant Docker Compose :
    docker-compose up --build

4. L'application sera accessible via un navigateur à l'adresse : `http://localhost:3000`

## Utilisation

- Accédez au client en ouvrant un navigateur et en allant sur `http://localhost:3000`.
- Vous pouvez consulter la listes des utilisateurs: (2ème icone dans la barre de navigation: http://localhost:3000/users)
- Vous pouvez consulter la listes des groupes de discutions: (3ème icone dans la barre de navigation: http://localhost:3000/groups)
- Cliquez sur "Créer un compte" (http://localhost:3000/register)
- Connectez-vous en cliquant sur "Se connecter". (http://localhost:3000/login)
- Explorez les fonctionnalités de l'application, y compris la publication de messages, le chat en temps réel, la gestion des groupes, etc.

## Contribuer

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à Social-Network, veuillez ouvrir une issue et nous faire part
de vos remarques.

## Licence

Ce projet est une exercice d'école et libre de droit sans aucune licence particulière.

---

**Auteurs** : 
    Quedeville Tony (Frontend React + server node) 
    Alann Schnebelen (Backend server Go + BDD Sqlite)

**Contact** : tonyquedeville@gmail.com
