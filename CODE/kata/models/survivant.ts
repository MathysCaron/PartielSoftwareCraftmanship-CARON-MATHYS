class Survivant {
    x: number;
    y: number;
    sante: number;
    inventaire: Ressource[];

    constructor(x: number, y: number, sante: number = 100) {
        this.x = x;
        this.y = y;
        this.sante = sante;
        this.inventaire = [];
    }

    deplacer(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }

    ramasserRessource(ressource: Ressource) {
        this.inventaire.push(ressource);
    }
}