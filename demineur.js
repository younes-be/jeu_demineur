//Initialisation des constantes

let grille = [];
let hauteur = 7;
let largeur = 7;
let nombre_mines = 10 ;
let premier_click = true ;
let arret=0;
let cases_restantes = hauteur*largeur - nombre_mines ;

//Assignation de leurs fonctions aux différents boutons

document.getElementById('options-button').addEventListener('click', () => {
    document.getElementById('options-popup').classList.add('show');
});

document.getElementById('close-options').addEventListener('click', () => {
    document.getElementById('options-popup').classList.remove('show');
});

document.getElementById('save-options').addEventListener('click', () => {
    hauteur = parseInt(document.getElementById('hauteur').value);
    largeur = parseInt(document.getElementById('largeur').value);
    nombre_mines = parseInt(document.getElementById('nombre_mines').value);
    document.getElementById('options-popup').classList.remove('show');
    resetJeu();
});

document.getElementById("fin_game").addEventListener("click", resetJeu) ;



function getRandomInt(maxi) { //fonction pour obtenir un entier aléatoire entre 0 et maxi
    return Math.floor(Math.random() * maxi);
}

function jeuFini() {
    for (let i = 0; i < hauteur; i++) {
        for (let j = 0; j < largeur; j++) {
            const caseElement = document.getElementById(i + "_" + j);
            const caseData = grille[i][j];

            if (caseData === 9) { // Case contenant une mine
                if (!caseElement.classList.contains("buttonFlagged")) {
                    return false; // Une mine n'est pas marquée
                }
            } else { // Case ne contenant pas de mine
                if (!caseElement.classList.contains("buttonRevealed")) {
                    return false; // Une case non-mine n'est pas révélée
                }
            }
        }
    }
    return true; // Toutes les conditions sont remplies
}

function MontrerMines() { //fonction pour révéler toutes les mines sur le plateau après un essai raté
    for (let i = 0; i < hauteur; i++) {
        for (let j = 0; j < largeur; j++) {
            if (grille[i][j] === 9) {
                const mineCase = document.getElementById(i + "_" + j);
                mineCase.style.background = "url('case_9.png')";
                mineCase.classList.add("buttonRevealed");
            }
        }
    }
}

function creerGrille(haut, larg, mine_nb, x_premier, y_premier) {
    grille.length = haut;
    for (var i = 0; i < haut; i++) {
        grille[i] = Array(larg);
        for (var j = 0; j < larg; j++) {
            grille[i][j] = 0;
        }
    }

    for (var k = 0; k < mine_nb; k++) {
        let nouv_x = getRandomInt(larg);
        let nouv_y = getRandomInt(haut);

        while (grille[nouv_y][nouv_x] == 9 || (nouv_y == y_premier && nouv_x == x_premier)) {
            nouv_x = getRandomInt(larg);
            nouv_y = getRandomInt(haut);
        }

        grille[nouv_y][nouv_x] = 9;
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


function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function chrono(){
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
async function reset(){
	
    document.getElementById("temps").value=0;

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


function cookie(){
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


const cookieAccepted = getCookie('cookiesAccepted');

if (!cookieAccepted){
	cookie();
}

function selectImage(idCase) {
    const coords = idCase.split("_") ;
    const y = parseInt(coords[0]) ;
    const x = parseInt(coords[1]) ;

    if (premier_click) {
	creerGrille(hauteur,largeur,nombre_mines,x,y) ;
	premier_click = false ;
	chrono() ;
    }

    if (grille[y][x] === 9 && arret == 0) {
	arret = 1;
        alert("Vous avez perdu !");
        MontrerMines();
    }
    
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
    
    return("url('case_" + grille[y][x].toString() + ".png')");
}


function changeImage(targetCase) {
    if (!(targetCase.classList.contains("buttonFlagged"))) {
	targetCase.classList.add("buttonRevealed") ;
	targetCase.style.background= selectImage(targetCase.id) ;

	cases_restantes = cases_restantes - 1 ;

	if (cases_restantes == 0 && arret == 0) {
	    arret = 1 ;
            alert("Félicitations ! Vous avez gagné !");
	}
    }
    
}


function resetJeu() {
    
    const divJeu = document.getElementById("jeu") ;
    divJeu.removeChild(divJeu.children[0]) ;
    grilleButtons(hauteur, largeur) ;
    cases_restantes = hauteur*largeur - nombre_mines ;
    arret = 1 ;
    premier_click = true ;
    
}


function changeImageClick(mouseEvent) {
    if (!(mouseEvent.target.classList.contains("buttonRevealed"))) {
	changeImage(mouseEvent.target) ;
    }
}


function changeImageFlag(rightClick) {
    
    rightClick.preventDefault() ;
    if (rightClick.target.classList.contains("buttonRevealed")) {
	return 0 ;
    } else if (rightClick.target.classList.contains("buttonFlagged")) {
	rightClick.target.style.background="url('case_vide.png')" ;
	rightClick.target.classList.remove("buttonFlagged") ;
    } else {
	rightClick.target.style.background="url('case_flag.png')" ;
	rightClick.target.classList.add("buttonFlagged") ;
    }
}

function grilleButtons(haut, larg) {
    
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

    for (var i=0;i<haut;i++) {
	for (var j=0;j<larg;j++){
	    var nouvCase = document.createElement("BUTTON") ;
	    nouvCase.style.gridRow=(i+1).toString() ;
	    nouvCase.style.gridColumn = (j+1).toString() ;
	    nouvCase.classList.add("button_case") ;
	    nouvCase.id = i.toString() + "_" + j.toString() ;
	    nouvCase.style.background="url('case_vide.png')" ;
	    nouvCase.addEventListener("click", changeImageClick);
	    nouvCase.addEventListener("contextmenu", changeImageFlag);
	    divGrille.appendChild(nouvCase) ;
	    
	}
    }        
}

grilleButtons(hauteur,largeur) ;
