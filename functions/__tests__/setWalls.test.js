const setWalls = require('../setWalls')
const walls = require('../walls')

describe('Tests setWalls', () => {
    it('Should modify the walls value', () => {
        const wallsAfter = {"vertical":[[1,0,0],[1,0,0],[1,1,1],[1,1,1]],"horizontal":[[1,1,1,1],[0,1,1,1],[0,0,0,1]]}
        const wallsBefore = walls
        expect(walls).toEqual(wallsBefore)
        setWalls(wallsAfter)
        expect(walls).toEqual(wallsAfter)
    })
})