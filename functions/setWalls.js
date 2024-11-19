const walls = require('./walls')

function setWalls(wallsToSet) {
    walls.vertical = wallsToSet.vertical
    walls.horizontal = wallsToSet.horizontal
}
module.exports = setWalls;