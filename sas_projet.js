const prompt = require('prompt-sync')();

// Liste initiale avec des candidats et partis politiques réels du Maroc
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
        cin: "D345678",
        nom: "Benabdallah",
        prenom: "Nabil",
        partiPolitique: "PPS",
        age: 65,
        electeurs: []
    },
    {
        cin: "E901234",
        nom: "Lachgar",
        prenom: "Driss",
        partiPolitique: "USFP",
        age: 70,
        electeurs: []
    }
];

let choix = "";

while (choix !== "0") {
    console.log("\n================ MENU PRINCIPAL ================");
    console.log("1. Ajouter un nouveau candidat");
    console.log("2. Ajouter plusieurs candidats à la fois");
    console.log("3. Afficher la liste des candidats");
    console.log("4. Voter pour un candidat");
    console.log("5. Modifier les informations d'un candidat");
    console.log("6. Supprimer un candidat");
    console.log("7. Rechercher un candidat par Nom");
    console.log("8. Statistiques de l'élection");
    console.log("0. Quitter");
    console.log("================================================");

    choix = prompt("Choisissez une option (0-8) : ");

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

        case "8":
            afficherStatistiques();
            break;

        case "0":
            console.log("Au revoir !");
            break;

        default:
            console.log("Choix invalide. Veuillez réessayer.");
    }
}

// 1. Ajouter un seul candidat
function ajouterUnCandidat() {
    console.log("\n--- Ajouter un candidat ---");
    let cin = prompt("Entrez le CIN du candidat : ");

    let existe = false;
    for (let i = 0; i < candidats.length; i++) {
        if (candidats[i].cin === cin) {
            existe = true;
            break;
        }
    }

    if (existe) {
        console.log("Erreur : Un candidat existe déjà avec ce numéro de CIN !");
        return;
    }

    let nom = prompt("Entrez le nom : ");
    let prenom = prompt("Entrez le prénom : ");
    let partiPolitique = prompt("Entrez le parti politique (ex: RNI, PAM, Istiqlal) : ");
    let age = parseInt(prompt("Entrez l'âge : "));

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

// 2. Ajouter plusieurs candidats
function ajouterPlusieursCandidats() {
    console.log("\n--- Ajouter plusieurs candidats ---");
    let nombre = parseInt(prompt("Combien de candidats voulez-vous ajouter ? "));

    for (let i = 0; i < nombre; i++) {
        console.log(`\n--- Candidat N°${i + 1} ---`);
        let cin = prompt("Entrez le CIN : ");

        let existe = false;
        for (let j = 0; j < candidats.length; j++) {
            if (candidats[j].cin === cin) {
                existe = true;
                break;
            }
        }

        if (existe) {
            console.log("Erreur : Un candidat existe déjà avec ce CIN ! Candidat ignoré.");
            continue;
        }

        let nom = prompt("Entrez le nom : ");
        let prenom = prompt("Entrez le prénom : ");
        let partiPolitique = prompt("Entrez le parti politique : ");
        let age = parseInt(prompt("Entrez l'âge : "));

        candidats.push({
            cin: cin,
            nom: nom,
            prenom: prenom,
            partiPolitique: partiPolitique,
            age: age,
            electeurs: []
        });
    }
    console.log("Opération terminée avec succès !");
}

// 3. Afficher les candidats
function afficherCandidats() {
    console.log("\n--- Afficher la liste des candidats ---");
    if (candidats.length === 0) {
        console.log("Aucun candidat dans la liste.");
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
            if (c.partiPolitique.toLowerCase() === partiRecherche.toLowerCase()) {
                console.log(`CIN: ${c.cin} | Nom: ${c.nom} ${c.prenom} | Parti: ${c.partiPolitique} | Âge: ${c.age} | Votes: ${c.electeurs.length}`);
                trouve = true;
            }
        }

        if (!trouve) {
            console.log("Aucun candidat trouvé pour ce parti.");
        }
    }
}

// 4. Voter
function voter() {
    console.log("\n--- Voter pour un candidat ---");
    let cinElecteur = prompt("Entrez votre CIN (CIN de l'électeur) : ");

    for (let i = 0; i < candidats.length; i++) {
        if (candidats[i].electeurs.includes(cinElecteur)) {
            console.log("Attention : Ce numéro de CIN a déjà été utilisé pour voter !");
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

// 5. Modifier
function modifierCandidat() {
    console.log("\n--- Modifier un candidat ---");
    let cinModif = prompt("Entrez le CIN du candidat à modifier : ");

    for (let i = 0; i < candidats.length; i++) {
        if (candidats[i].cin === cinModif) {
            let nouveauParti = prompt(`Nouveau parti politique (Actuel: ${candidats[i].partiPolitique}) : `);
            let nouvelAge = parseInt(prompt(`Nouvel âge (Actuel: ${candidats[i].age}) : `));

            candidats[i].partiPolitique = nouveauParti;
            candidats[i].age = nouvelAge;

            console.log("Informations modifiées avec succès !");
            return; 
        }
    }

    console.log("Candidat introuvable.");
}

// 6. Supprimer
function supprimerCandidat() {
    console.log("\n--- Supprimer un candidat ---");
    let cinSupp = prompt("Entrez le CIN du candidat à supprimer : ");

    for (let i = 0; i < candidats.length; i++) {
        if (candidats[i].cin === cinSupp) {
            candidats.splice(i, 1);
            console.log("Candidat supprimé avec succès !");
            return;
        }
    }

    console.log("Aucun candidat trouvé avec ce CIN.");
}

// 7. Rechercher par nom
function rechercherParNom() {
    console.log("\n--- Rechercher des candidats ---");
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

// 8. Statistiques
function afficherStatistiques() {
    console.log("\n--- Statistiques de l'élection ---");

    console.log(`Nombre total de candidats : ${candidats.length}`);

    let totalVotes = 0;
    for (let i = 0; i < candidats.length; i++) {
        totalVotes += candidats[i].electeurs.length;
    }
    console.log(`Nombre total de votes : ${totalVotes}`);

    let liste = [...candidats];

    for (let i = 0; i < liste.length - 1; i++) {
        for (let j = i + 1; j < liste.length; j++) {
            if (liste[i].electeurs.length < liste[j].electeurs.length) {
                let temp = liste[i];
                liste[i] = liste[j];
                liste[j] = temp;
            }
        }
    }

    console.log("\nTop 3 des candidats :");
    for (let i = 0; i < liste.length; i++) {
        if (i === 3) break;
        let c = liste[i];
        let rang = i + 1;
        console.log(`${rang}. ${c.nom} ${c.prenom} - ${c.electeurs.length} votes`);
    }

    console.log("\nNombre de candidats par parti :");
    let partis = {};
    for (let i = 0; i < candidats.length; i++) {
        let p = candidats[i].partiPolitique;
        if (partis[p]) {
            partis[p] += 1;
        } else {
            partis[p] = 1;
        }
    }

    for (let p in partis) {
        console.log(`- ${p} : ${partis[p]}`);
    }
}