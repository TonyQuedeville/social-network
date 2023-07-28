package group

import (
	"testing"

	"github.com/TonyQuedeville/social-network/database-manager/database"
)

func TestAddGroupMember(t *testing.T) {
	// Initialiser la base de données ou simuler un objet de la base de données pour les tests
	database.OpenDatabase()
	defer database.CloseDatabase()

	// Créer un objet Group pour les tests
	group := &Group{
		Id: 1, // Remplacez cette valeur par un ID de groupe valide pour vos tests
	}

	// Appeler la fonction AddGroupMember avec des valeurs de test appropriées
	memberID := uint64(1) // Remplacez cette valeur par un ID de membre valide pour vos tests
	err := group.AddGroupMember(memberID)
	// Vérifier que l'erreur est nulle (pas d'erreur)
	if err != nil {
		t.Errorf("AddGroupMember a retourné une erreur: %v", err)
	}

	// Vérifier que les données ont été correctement insérées dans la base de données (vous devrez peut-être interroger la base de données pour vérifier cela)

	// Autres assertions de test si nécessaire
}
