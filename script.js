const btn = document.querySelector('button')
const allCells = document.querySelectorAll('.cell')

const startTiles = () => {
  const newTile = document.createElement('img')
  newTile.setAttribute('src', 'tile1.png')
  newTile.setAttribute('class', 'tile')
  const cellId = allCells[15].getAttribute('id')
  newTile.setAttribute('id', cellId)
  allCells[15].appendChild(newTile)

  // Working on randomizing and adding to many spots
}

const moveTile = (tile) => {
  const tileNum = tile.getAttribute('src')
  const newTile = document.createElement('img')
  newTile.setAttribute('src', tileNum)
  const tileId = tile.getAttribute('id')
  newTile.setAttribute('id', tileId)
  newTile.setAttribute('class', 'tile')
  for (let i = 0; i < allCells.length; i++) {
    if (allCells[i].getAttribute('id') === tileId) {
      allCells[i].appendChild(newTile)
    }
  }
}

const removeTile = (tile, oldId) => {
  for (let i = 0; i < allCells.length; i++) {
    if (allCells[i].getAttribute('id') === oldId) {
      allCells[i].removeChild(tile)
    }
  }
}

const moveUp = () => {
  // Get all of the image tiles and id's
  const allTiles = document.querySelectorAll('.tile')
  let allIds = []

  for (let i = 0; i < allTiles.length; i++) {
    allIds.push(allTiles[i].getAttribute('id'))
  }
  console.log(allIds)
  // Determine if moves are valid
  // Invalid moves are tiles in row 1, or direclty under tiles in row 1
  const invalidMoves = ['11', '12', '13', '14']

  // Make all valid moves
  for (let i = 0; i < allTiles.length; i++) {
    if (!invalidMoves.includes(allIds[i])) {
      let tileId = parseInt(allIds[i])
      let oldId = tileId.toString()
      tileId -= 10
      tileId = tileId.toString()
      allTiles[i].setAttribute('id', tileId)
      moveTile(allTiles[i])
      removeTile(allTiles[i], oldId)
      console.log(oldId)
      console.log(tileId)
    }
  }
}

btn.addEventListener('click', () => {
  console.log('new game')
  startTiles()
})

document.onkeydown = function (keyPressed) {
  switch (keyPressed.key) {
    case 'ArrowUp':
      console.log('Up')
      moveUp()
      break
    case 'ArrowRight':
      console.log('Right')
      break
    case 'ArrowDown':
      console.log('Down')
      break
    case 'ArrowLeft':
      console.log('Left')
      break
  }
}
