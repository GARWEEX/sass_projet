const prompt = require('prompt-sync')();

let candidats = [
    {
        cin: "A123456",
        nom: "Akhannouch",
        prenom: "Aziz",
        partiPolitique: "RNI",
        age: 63,
        electeurs: []
    },
    {
        cin: "B654321",
        nom: "Baraka",
        prenom: "Nizar",
        partiPolitique: "Istiqlal",
        age: 60,
        electeurs: []
    },
    {
        cin: "C789012",
        nom: "Ouahbi",
        prenom: "Abdellatif",
        partiPolitique: "PAM",
        age: 63,
        electeurs: []
    },
    {
        id: 1,
        cin: "AB123456",
        nom: "Boushaba",
        prenom: "Soufiane",
        partiPolitique: "Indépendant",
        age: 40,
        electeurs: []
    },
    {
        id: 2,
        cin: "CD987654",
        nom: "El Amrani",
        prenom: "Yassine",
        partiPolitique: "Parti A",
        age: 35,
        electeurs: []
    },
    {
        id: 3,
        cin: "EF555666",
        nom: "Benali",
        prenom: "Khadija",
        partiPolitique: "Parti A",
        age: 29,
        electeurs: []
    }
];

let choix = "";

while (choix !== "0") {
    console.log(`
========================================
 GESTION DES ÉLECTIONS - MENU PRINCIPAL
========================================
1. Ajouter un nouveau candidat
2. Ajouter plusieurs candidats à la fois
3. Afficher la liste des candidats
4. Voter pour un candidat
5. Modifier les informations d'un candidat
6. Supprimer un candidat
7. Rechercher un candidat par nom
8. Afficher les statistiques de l'élection
0. Quitter
========================================`);

    choix = prompt("Choisissez une option (0-7) : ");

    switch (choix) {
        case "1":
            ajouterUnCandidat();
            break;

        case "2":
            ajouterPlusieursCandidats();
            break;

        case "3":
            afficherCandidats();
            break;

        case "4":
            voter();
            break;

        case "5":
            modifierCandidat();
            break;

        case "6":
            supprimerCandidat();
            break;

        case "7":
            rechercherParNom();
            break;


        case "0":
            console.log("Au revoir !");
            break;

        default:
            console.log("Choix invalide. Veuillez réessayer.");
    }
}

function ajouterUnCandidat() {
    console.log("ajouter un candidat: ");
    let cin = prompt("ajouter le cin: ");
    let nom = prompt("ajouter le nom: ");
    let prenom = prompt("ajouter le prenom: ");
    let partiPolitique = prompt("ajouter la parti politique ou Indépendant: ");
    let age = Number(prompt("ajouter l'age: "));

    let candidat = {
        cin: cin,
        nom: nom,
        prenom: prenom,
        partiPolitique: partiPolitique,
        age: age,
        electeurs: []
    };

    candidats.push(candidat);
    console.log("Candidat ajouté avec succès !");
}

function ajouterPlusieursCandidats() {
    console.log("Ajouter plusieurs candidats");
    let nombre = Number(prompt("Combien de candidats voulez-vous ajouter ? "));

    for (let i = 0; i < nombre; i++) {
        console.log("Candidat " + (i + 1));
        ajouterUnCandidat();
    }
}

function afficherCandidats() {
    console.log("Afficher la liste des candidats");
    if (candidats.length == 0) {
        console.log("Aucun candidat.");
        return;
    }

    console.log("1. Afficher tous les candidats");
    console.log("2. Trier par nombre de votes (Ordre décroissant)");
    console.log("3. Filtrer par parti politique");
    let subChoix = prompt("Votre choix : ");

    if (subChoix === "1") {
        for (let i = 0; i < candidats.length; i++) {
            let c = candidats[i];
            console.log(`CIN: ${c.cin} | Nom: ${c.nom} ${c.prenom} | Parti: ${c.partiPolitique} | Âge: ${c.age} | Votes: ${c.electeurs.length}`);
        }
    } else if (subChoix === "2") {
        let listeTrie = [...candidats];
        for (let i = 0; i < listeTrie.length - 1; i++) {
            for (let j = i + 1; j < listeTrie.length; j++) {
                if (listeTrie[i].electeurs.length < listeTrie[j].electeurs.length) {
                    let temp = listeTrie[i];
                    listeTrie[i] = listeTrie[j];
                    listeTrie[j] = temp;
                }
            }
        }

        for (let i = 0; i < listeTrie.length; i++) {
            let c = listeTrie[i];
            console.log(`CIN: ${c.cin} | Nom: ${c.nom} ${c.prenom} | Parti: ${c.partiPolitique} | Âge: ${c.age} | Votes: ${c.electeurs.length}`);
        }
    } else if (subChoix === "3") {
        let partiRecherche = prompt("Entrez le nom du parti politique : ");
        let trouve = false;

        for (let i = 0; i < candidats.length; i++) {
            let c = candidats[i];
            if (c.partiPolitique && c.partiPolitique.toLowerCase() === partiRecherche.toLowerCase()) {
                console.log(`CIN: ${c.cin} | Nom: ${c.nom} ${c.prenom} | Parti: ${c.partiPolitique} | Âge: ${c.age} | Votes: ${c.electeurs.length}`);
                trouve = true;
            }
        }

        if (!trouve) {
            console.log("Aucun candidat trouvé pour ce parti.");
        }
    }
}

function voter() {
    console.log("Voter pour un candidat");
    let cinElecteur = prompt("Entrez le CIN de l'électeur : ");

    for (let i = 0; i < candidats.length; i++) {
        if (candidats[i].electeurs.includes(cinElecteur)) {
            console.log("Ce numéro de CIN a déjà été utilisé pour voter !");
            return;
        }
    }

    let cinCandidat = prompt("Entrez le CIN du candidat pour lequel vous voulez voter : ");

    for (let i = 0; i < candidats.length; i++) {
        if (candidats[i].cin === cinCandidat) {
            candidats[i].electeurs.push(cinElecteur);
            console.log("Votre vote a été enregistré avec succès !");
            return;
        }
    }

    console.log("Aucun candidat trouvé avec ce numéro CIN.");
}

function modifierCandidat() {
    console.log("Modifier un candidat");
    let cinModif = prompt("Entrez le CIN du candidat à modifier : ");

    for (let i = 0; i < candidats.length; i++) {
        if (candidats[i].cin === cinModif) {
            let nouveauParti = prompt(`Nouveau parti politique (Actuel: ${candidats[i].partiPolitique}) : `);
            let nouvelAge = Number(prompt(`Nouvel âge (Actuel: ${candidats[i].age}) : `));

            candidats[i].partiPolitique = nouveauParti;
            candidats[i].age = nouvelAge;

            console.log("Informations modifiées avec succès !");
            return; 
        }
    }

    console.log("Candidat introuvable.");
}

function supprimerCandidat() {
    console.log("Supprimer un candidat");
    let cinSupp = prompt("Entrez le CIN du candidat à supprimer : ");

    for (let i = 0; i < candidats.length; i++) {
        if (candidats[i].cin === cinSupp) {
            candidats.splice(i, 1); 
            console.log("Candidat supprimé avec succès.");
            return; 
        }
    }

    console.log("Aucun candidat trouvé avec ce CIN.");
}

function rechercherParNom() {
    console.log("Rechercher des candidats par nom. ");
    let nom = prompt("Entrez le nom du candidat : ");

    for (let i = 0; i < candidats.length; i++) {
        if (candidats[i].nom.toLowerCase() === nom.toLowerCase()) {
            let c = candidats[i];
            console.log(`CIN: ${c.cin} | Nom: ${c.nom} ${c.prenom} | Parti: ${c.partiPolitique} | Votes: ${c.electeurs.length}`);
            return; 
        }
    }

    console.log("Aucun candidat trouvé avec ce nom.");
}

