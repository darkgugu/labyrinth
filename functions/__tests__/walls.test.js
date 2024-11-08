const walls = require('../walls')

describe('Tests de la fonction getWalls', () => {
    it('Retourne un objet contenant un tableau vertical et un tableau horizontal', () => {
        expect(walls).toHaveProperty('vertical');
        expect(walls).toHaveProperty('horizontal');
    })
})