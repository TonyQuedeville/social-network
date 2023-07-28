/*
	Projet Zone01 : Social network
	Tony Quedeville 
	28/07/2023
	Permet d'extraire les id d'un objet json (retour de requete server)
*/

function extractIdsFromList(list) {
  if (!Array.isArray(list) || list.length === 0) {
    return [];
  }

  return list.map(item => item.id);
}


export default extractIdsFromList
