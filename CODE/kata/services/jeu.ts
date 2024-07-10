class Jeu {
    carte: Carte;
    survivant: Survivant;

    constructor(carte: Carte, survivant: Survivant) {
        this.carte = carte;
        this.survivant = survivant;
    }

    explorer(commandes: string[]) {
        for (const commande of commandes) {
            switch (commande) {
                case 'nord':
                    this.survivant.deplacer(0, -1);
                    break;
                case 'sud':
                    this.survivant.deplacer(0, 1);
                    break;
                case 'est':
                    this.survivant.deplacer(1, 0);
                    break;
                case 'ouest':
                    this.survivant.deplacer(-1, 0);
                    break;
            }

            const ressource = this.carte.ressources[this.survivant.y][this.survivant.x];
            if (ressource) {
                this.survivant.ramasserRessource(ressource);
                this.carte.ressources[this.survivant.y][this.survivant.x] = null;
            }

            this.rencontrerZombie();
        }
    }

    rencontrerZombie() {
        for (const zombie of this.carte.zombies) {
            if (zombie.x === this.survivant.x && zombie.y === this.survivant.y) {
                this.survivant.sante -= 20;
            }
        }
    }
}