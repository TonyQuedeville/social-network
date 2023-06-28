# social-network
Projet Zone01 Reseaux social

Créer un dossier "server"
  - go mod init

Creation du projet reactJS:
  1 - lancer "yarn create react-app client" à la racine "Social-Network"
  2 - "cd client" -> "yarn start" pour lancer l'appli front coté client
  3 - "yarn" pour installer les dépendences (version 17 pour ce projet galère de config avec la 18)
  4 - "yarn add react-router-dom" Librarie Router (version spécifique yarn add react-router-dom@6.10.0 pour ce projet)
  5 - "yarn add prop-types" Pour le typage des composants
  6 - "yarn add styled-components" pour scoper le style au composants (appliquer du css en JS)


A retenir :
Le state local est présent à l’intérieur d’un composant : ce composant peut être re-render autant de fois que l'on veut, mais les données seront préservées. Pour cela on utilise "useState", un hook qui permet d'ajouter un state local dans un composant fonction.

useEffect est également un hook, qui permet d'exécuter des actions après le render de nos composants, en choisissant à quel moment et à quelle fréquence cette action doit être exécutée, avec le tableau de dépendances.

useEffect nous permettra de déclencher le fetch.
useState permettra de stocker le retour de l'API dans le  state

useContext permet de mettre en place les providers évitant ainsi le passage des props en cascade de parents à enfants.

 - Simulation reponse server Alann: /Desktop/Div-01/Users$ ./test-api 