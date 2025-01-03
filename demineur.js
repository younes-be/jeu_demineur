//Initialisation des variables globales

let grille = []; //matrice contenant les emplacements des mines et le nombre de mines adjacentes à chaque case
let hauteur = 7; //première dimension de grille
let largeur = 7; //deuxième dimension de grille
let nombre_mines = 10 ; //nombre de mines dans grille
let premier_click = true ; //indique si la partie est déjà commencée ou non
let arret=0; //indique si une partie est en cours ou non
let cases_restantes = hauteur*largeur - nombre_mines ; //nombre de cases à révéler pour gagner la partie


function gererOptions() {
    //Lors de la sauvegarde des options, vérifie que les dimensions et le nombre de mines entrés par l'utilisateur sont acceptables, met à jour les varaibles globales appropriées et redémarre la partie
    
    const newHauteur = parseInt(document.getElementById('hauteur').value);
    const newLargeur = parseInt(document.getElementById('largeur').value);
    const newNumberMines = parseInt(document.getElementById('nombre_mines').value);

    if (newHauteur > 12 || newLargeur > 12) {
        alert("Les dimensions ne doivent pas dépasser 12x12.");
        return;
    }


    const maxMines = newHauteur * newLargeur - 1;
    if (newNumberMines < 1 || newNumberMines > maxMines) {
        alert(`Le nombre de mines doit être entre 1 et ${maxMines}.`);
        return;
    }

    hauteur = newHauteur;
    largeur = newLargeur;
    nombre_mines = newNumberMines;

    document.getElementById('options-popup').classList.remove('show');
    document.getElementById("affichage_nombre_mines").innerText = "Nombre total de mines : " + nombre_mines.toString() ;
    resetJeu();
}

function options() {
    //Lors d'un click sur le bouton Options, affiche le popup permettant de changer les options et active les boutons
    document.getElementById("options-popup").classList.add("show");

    document.getElementById('close-options').addEventListener('click', () => {
        document.getElementById('options-popup').classList.remove('show');
    });

    // Ajout de l'écouteur d'événement
    document.getElementById('save-options').addEventListener('click', gererOptions);
}




function entierRandom(maxi) { //renvoie un entier aléatoire entre 0 et maxi
    return Math.floor(Math.random() * maxi);
}



function MontrerMines() { //révèle toutes les mines sur le plateau après un essai raté
    for (let i = 0; i < hauteur; i++) {
        for (let j = 0; j < largeur; j++) {
            if (grille[i][j] === 9) {
                const mineCase = document.getElementById(i + "_" + j);
		mineCase.src = "case_9.png";
		mineCase.alt = "Mine" ;
                mineCase.classList.add("buttonRevealed");
            }
        }
    }
}

function creerGrille(haut, larg, mine_nb, x_premier, y_premier) {
    //(Ré)initialise la variable globale grille pour qu'elle contienne une matrice d'entiers de dimensions hautxlarg contenant mine_nb mines (représentées par des 9) avec les autres cases contenant le nombre de mines dans les cases adjacentes.
    //La case de position (x_premier, y_premier) ne peut pas contenir de mines.
    //Les positions des mines sont aléatoires
    
    grille.length = haut;
    for (var i = 0; i < haut; i++) { //dimensionnement et mise à 0 de grille
        grille[i] = Array(larg);
        for (var j = 0; j < larg; j++) {
            grille[i][j] = 0;
        }
    }

    for (var k = 0; k < mine_nb; k++) { //placement des mines
        let nouv_x = entierRandom(larg);
        let nouv_y = entierRandom(haut);

        while (grille[nouv_y][nouv_x] == 9 || (nouv_y == y_premier && nouv_x == x_premier)) {
            nouv_x = entierRandom(larg);
            nouv_y = entierRandom(haut);
        }

        grille[nouv_y][nouv_x] = 9;

	//incrémentation des cases adjacentes à la mine
        for (var m = Math.max(0, nouv_y - 1); m < Math.min(haut, nouv_y + 2); m++) {
            for (var n = Math.max(0, nouv_x - 1); n < Math.min(larg, nouv_x + 2); n++) {
                if (grille[m][n] != 9) {
                    grille[m][n]++;
                }
            }
        }
    }
}


//Fonction pour créer un cookie.
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
// Fonction pour lire un cookie
function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}


function sleep(ms){ //prend ms millisecondes à se résoudre
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function chrono(){ //incrémente de 1 la valeur Temps affichée en haut de la page toutes les 1000ms jusqu'à ce que la variable arret soit mise à 1
    let k=document.getElementById("temps").value;
    const myButton = document.getElementById("fin_game");
    arret = 0 ;
    
    while(arret==!1) {
	await sleep(1000);
	if (arret==!1){
	    document.getElementById("temps").value=document.getElementById("temps").value*1+1;
	
	}
    }
}



// Fonction pour créer un cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Fonction pour lire un cookie
function getCookie(name) {
    return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

 
function cookie(){ //crée le popup qui questionne l'utilisateur sur son choix de cookie
    
	const popup = document.getElementById('cookies-popup');
	const close_popup_button = document.getElementById('accept-button');
	const keep_popup_button = document.getElementById('refuse-button');
	// Fonction pour afficher la pop-up
	popup.classList.add('show');

	keep_popup_button.addEventListener('click', () => {
		keep_popup_button.style.display = 'none';
	});
	
	// Fonction pour fermer la pop-up
	close_popup_button.addEventListener('click', () => {
		setCookie('cookiesAccepted', 'true', 1); // Stocke l'acceptation pendant 1 jour
		popup.classList.remove('show');
	});
	
}



function selectImage(idCase) { //détermine l'image à affecter à la case d'id idCase et effectue les opérations annexes à la révélation de la case
    
    //détermine la position dans grille correspondant à la case d'id idCase  
    const coords = idCase.split("_") ;
    const y = parseInt(coords[0]) ;
    const x = parseInt(coords[1]) ;

    //si la partie n'était pas encore commencée, initialise grille avec les positions des mines et les nombres dans les autres cases et démarre le chrono
    if (premier_click) {
	creerGrille(hauteur,largeur,nombre_mines,x,y) ;
	premier_click = false ;
	chrono() ;
    }


    //si la case révélée n'est adjacente à aucune mine, révèle également les cases adjacentes 
    if (grille[y][x] == 0) {
	for (var m = Math.max(0, y - 1); m < Math.min(hauteur, y + 2); m++) {
            for (var n = Math.max(0, x - 1); n < Math.min(largeur, x + 2); n++) {
		const currentCase = document.getElementById(m.toString() + "_" + n.toString()) ;
                if (!(currentCase.classList.contains("buttonRevealed"))) {
                    changeImage(currentCase) ;
                }
            }
        }
    }

    //renvoie le numéro contenu dans grille à la position de la case 
    return(grille[y][x].toString());
}


function changeImage(caseCible) {
    //Change l'image d'une case caseCible et appelle selectImage sur l'id de cette case.
    //Si la case révélée était une mine, arrête la partie, affiche toutes les mines et un message de perte
    //Si c'est la dernière case ne contenant pas de mine, arrete la partie et affiche un message de victoire
    
    if (!(caseCible.classList.contains("buttonFlagged"))) {
	
	caseCible.classList.add("buttonRevealed") ;
	const nombreCase = selectImage(caseCible.id) ;
	caseCible.src= "case_" + nombreCase + ".png" ;

	if (nombreCase == "9") { //test de perte

	    caseCible.alt = "Mine" ;
	    if (arret == 0) {
		arret = 1;
		const time = document.getElementById("temps").value;
		alert(`Vous avez perdu ! Temps passé : ${time} secondes.`);
		MontrerMines();
	    }
	} else { //sinon, test de victoire
	    
	    caseCible.alt = nombreCase ;

	    cases_restantes = cases_restantes - 1 ;

	    if (cases_restantes == 0 && arret == 0) {
		arret = 1 ;
		const time = document.getElementById("temps").value;
		alert(`Félicitations ! Vous avez gagné ! Temps passé : ${time} secondes.`);
	    }
	}
    }   
}



function changeImageClick(mouseEvent) { //Lors d'un évènement click sur la case ciblée par mouseEvent, si elle n'est pas déjà révélée, la révèle
    if (!(mouseEvent.target.classList.contains("buttonRevealed"))) {
	changeImage(mouseEvent.target) ;
    }
}


function changeImageFlag(rightClick) {
    //Lors d'un évènement click droit rightClick sur une case, change l'image de la cible de rightClick pour y mettre un drapeau et change ses classes pour empêhcer de la révéler avec un clic gauche.
    //Si la case a déjà un drapeau, l'opération inverse est effectuée.
    
    rightClick.preventDefault() ;
    if (rightClick.target.classList.contains("buttonRevealed")) {
	return 0 ;
    } else if (rightClick.target.classList.contains("buttonFlagged")) {
	rightClick.target.src="case_vide.png" ;
	rightClick.target.alt = "Case" ;
	rightClick.target.classList.remove("buttonFlagged") ;
    } else {
	rightClick.target.src="case_flag.png" ;
	rightClick.target.alt = "Flag" ;
	rightClick.target.classList.add("buttonFlagged") ;
    }
}


function resetJeu() { //supprime la grille actuelle, arrête la partie, recrée une grille et remet les variables globales appropriées à leurs valeurs initiales
    
    const divJeu = document.getElementById("jeu") ;
    divJeu.removeChild(divJeu.children[0]) ;
    grilleButtons(hauteur, largeur) ;
    cases_restantes = hauteur*largeur - nombre_mines ;
    arret = 1 ;
    premier_click = true ;	
    document.getElementById("temps").value=0;   
   
}


function grilleButtons(haut, larg) {

    //crée dans la div jeu une div grille de type grid et de dimensions haut par larg
    //et y ajoute les images représentant les cases du jeu de démineur en les liants aux fonctions adéquates
    
    const divJeu = document.getElementById("jeu") ;
    var divGrille = document.createElement("DIV") ;
    divGrille.id = "grille";
    divGrille.style.display = "grid";
    let taille = "50px " ;
    let taille_cols = taille.repeat(larg) ;
    let taille_rows = taille.repeat(haut) ;
    divGrille.style.gridTemplateColumns = taille_cols ;
    divGrille.style.gridTemplateRows = taille_rows ;
    divJeu.appendChild(divGrille) ;

    for (var i=0;i<haut;i++) { //ajout des cases
	for (var j=0;j<larg;j++){
	    
	    var nouvCase = document.createElement("IMG") ;
	    nouvCase.style.gridRow=(i+1).toString() ;
	    nouvCase.style.gridColumn = (j+1).toString() ;
	    nouvCase.classList.add("button_case") ;
	    nouvCase.id = i.toString() + "_" + j.toString() ;
	    nouvCase.src="case_vide.png" ;
	    nouvCase.alt = "Case";
	    nouvCase.addEventListener("click", changeImageClick);
	    nouvCase.addEventListener("contextmenu", changeImageFlag);
	    divGrille.appendChild(nouvCase) ;
	    
	}
    }        
}

//Lors de la première visite de la page, vérifie si les cookies ont déjà été acceptés et sinon, demande à l'utilisateur sa préférence
const cookieAccepted = getCookie('cookiesAccepted');

if (!cookieAccepted){
	cookie();
}

//Première initialisation de la grille au démarrage de la page avec les valeurs par défaut
grilleButtons(hauteur,largeur) ;
