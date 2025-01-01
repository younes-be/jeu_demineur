let grille = [];
let hauteur = 7;
let largeur = 7;
let number_mines = 10 ;
let first_click = true ;
let arret=0;
let cases_restantes = hauteur*largeur - number_mines ;

document.getElementById('options-button').addEventListener('click', () => {
    document.getElementById('options-popup').classList.add('show');
});

document.getElementById('close-options').addEventListener('click', () => {
    document.getElementById('options-popup').classList.remove('show');
});

document.getElementById('save-options').addEventListener('click', () => {
    hauteur = parseInt(document.getElementById('hauteur').value);
    largeur = parseInt(document.getElementById('largeur').value);
    number_mines = parseInt(document.getElementById('number_mines').value);
    document.getElementById('options-popup').classList.remove('show');
    resetJeu();
});

document.getElementById("fin_game").addEventListener("click", resetJeu) ;


function getRandomInt(maxi) {
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

function MontrerMines() {
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

function creerGrille(haut, larg, mine_nb, x_first, y_first) {
    grille.length = haut;
    for (var i = 0; i < haut; i++) {
        grille[i] = Array(larg);
        for (var j = 0; j < larg; j++) {
            grille[i][j] = 0;
        }
    }

    for (var k = 0; k < mine_nb; k++) {
        let new_x = getRandomInt(larg);
        let new_y = getRandomInt(haut);

        while (grille[new_y][new_x] == 9 || (new_y == y_first && new_x == x_first)) {
            new_x = getRandomInt(larg);
            new_y = getRandomInt(haut);
        }

        grille[new_y][new_x] = 9;
        for (var m = Math.max(0, new_y - 1); m < Math.min(haut, new_y + 2); m++) {
            for (var n = Math.max(0, new_x - 1); n < Math.min(larg, new_x + 2); n++) {
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

    if (first_click) {
	creerGrille(hauteur,largeur,number_mines,x,y) ;
	first_click = false ;
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
    cases_restantes = hauteur*largeur - number_mines ;
    arret = 1 ;
    first_click = true ;
    
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
	    var newCase = document.createElement("BUTTON") ;
	    newCase.style.gridRow=(i+1).toString() ;
	    newCase.style.gridColumn = (j+1).toString() ;
	    newCase.classList.add("button_case") ;
	    newCase.id = i.toString() + "_" + j.toString() ;
	    newCase.style.background="url('case_vide.png')" ;
	    newCase.addEventListener("click", changeImageClick);
	    newCase.addEventListener("contextmenu", changeImageFlag);
	    divGrille.appendChild(newCase) ;
	    
	}
    }        
}

grilleButtons(hauteur,largeur) ;
