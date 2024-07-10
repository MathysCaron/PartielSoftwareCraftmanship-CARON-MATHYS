describe('Survivant', () => {
    it('le survivant avance vers le nord', () => {
        const survivant = new Survivant(10, 10);
        survivant.deplacer(0, -1);
        expect(survivant.y).toBe(4);
    });

    it('le survivant ramasse une ressource', () => {
        const survivant = new Survivant(10, 10);
        const ressource = new Ressource('Nourriture');
        survivant.ramasserRessource(ressource);
        expect(survivant.inventaire).toContain(ressource);
    });
});
