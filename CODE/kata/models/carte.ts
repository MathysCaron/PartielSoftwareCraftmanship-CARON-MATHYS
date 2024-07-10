class Carte {
    largeur: number;
    hauteur: number;
    ressources: (Ressource | null)[][];
    zombies: Zombie[];

    constructor(largeur: number, hauteur: number) {
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.ressources = Array.from({ length: hauteur }, () => Array(largeur).fill(null));
        this.zombies = [];
    }

    ajouterRessource(x: number, y: number, ressource: Ressource) {
        this.ressources[y][x] = ressource;
    }

    ajouterZombie(zombie: Zombie) {
        this.zombies.push(zombie);
    }
}