class Case {
    constructor(x, y) {
	this.posX = x;
	this.posy = y;
	this.isMine = false;
	this.number = 0;
	this.hidden = true;
    }

    get imageName() {
	return this.getImageName();
    }
    
}

let grille = [];

function creerGrille(haut, larg) {
    grille.length = haut;
    let i = 0;
    let j = 0;
    while (i < haut) {
	grille[i] = Array(larg);
	j = 0;
	while (j<larg) {
	    grille[i][j] = new Case(j, i);
	    j = j + 1 ;
	}
	i = i + 1;
    }
    
}

