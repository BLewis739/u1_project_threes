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

const moveDirection = (dir) => {
  // Get all of the image tiles and id's
  const allTiles = document.querySelectorAll('.tile')
  let allIds = []

  for (let i = 0; i < allTiles.length; i++) {
    allIds.push(allTiles[i].getAttribute('id'))
  }

  // Determine if moves are valid
  // Invalid moves are tiles in row 1, or direclty under tiles in row 1

  // Adjustment varies based on direction of press
  let adjustment = 0
  let invalidMoves = []

  // if (dir === 'up') {
  //   adjustment = -10
  //   invalidMoves.push('11', '12', '13', '14')
  // }
  // console.log(invalidMoves)

  switch (dir) {
    case 'up':
      invalidMoves.push('11', '12', '13', '14')
      adjustment = -10
      break
    case 'right':
      invalidMoves.push('14', '24', '34', '44')
      adjustment = 1
      break
    case 'down':
      invalidMoves.push('41', '42', '43', '44')
      adjustment = 10
      break
    case 'left':
      invalidMoves.push('11', '21', '31', '41')
      adjustment = -1
      break
  }

  // Make all valid moves
  for (let i = 0; i < allTiles.length; i++) {
    if (!invalidMoves.includes(allIds[i])) {
      let tileId = parseInt(allIds[i])
      let oldId = tileId.toString()
      tileId += adjustment
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
      moveDirection('up')
      break
    case 'ArrowRight':
      console.log('Right')
      moveDirection('right')
      break
    case 'ArrowDown':
      console.log('Down')
      moveDirection('down')
      break
    case 'ArrowLeft':
      console.log('Left')
      moveDirection('left')
      break
  }
}
