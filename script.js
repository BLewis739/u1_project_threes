const btn = document.querySelector('button')
const allCells = document.querySelectorAll('.cell')
const allCellIds = []
let turns = 0
const topRow = ['11', '12', '13', '14']
const bottomRow = ['41', '42', '43', '44']
const rightColumn = ['14', '24', '34', '44']
const leftColumn = ['11', '21', '31', '41']
for (let i = 0; i < allCells.length; i++) {
  allCellIds.push(allCells[i].getAttribute('id'))
}
let tileQueue = [3, 2, 1, 6, 2, 1, 3, 6, 1, 3, 2, 6]

const clearBoard = () => {
  console.log('Clear Board')
  for (let i = 0; i < allCells.length; i++) {
    if (allCells[i].hasChildNodes()) {
      const oldTile = allCells[i].firstElementChild
      allCells[i].removeChild(oldTile)
    }
  }
}

const startTiles = () => {
  clearBoard()

  startingNums = []
  while (startingNums.length < 4) {
    let num = Math.floor(Math.random() * 16)
    if (!startingNums.includes(num)) {
      startingNums.push(num)
    }
  }

  for (let i = 0; i < startingNums.length; i++) {
    const newTile = document.createElement('img')
    let tileNum = '1'
    if (i % 2 === 0) {
      tileNum = '2'
    }
    newTile.setAttribute('src', `tile${tileNum}.png`)
    newTile.setAttribute('class', 'tile')
    const cellId = allCells[startingNums[i]].getAttribute('id')
    newTile.setAttribute('id', cellId)
    allCells[startingNums[i]].appendChild(newTile)
  }
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
  // Determine additional invalid moves based on presence of tiles

  for (let i = 0; i < 3; i++) {
    for (let i = 0; i < allIds.length; i++) {
      if (invalidMoves.includes(allIds[i])) {
        let newInvalidMove = (parseInt(allIds[i]) - adjustment).toString()
        if (!invalidMoves.includes(newInvalidMove)) {
          invalidMoves.push(newInvalidMove)
        }
      }
    }
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
    }
  }
}

makeTileQueue = () => {
  const tileQueue = [3, 2, 1, 6, 2, 1, 3, 6, 1, 3, 2, 6]
  return tileQueue
}

makeNewTile = (side) => {
  if (turns === 12) {
    tileQueue = makeTileQueue()
    turns = 0
  }
  const newTile = document.createElement('img')
  let tileNum = tileQueue.pop()
  newTile.setAttribute('src', `tile${tileNum}.png`)
  newTile.setAttribute('class', 'tile')
  let possLocations = []

  const allTiles = document.querySelectorAll('.tile')
  const allTileIds = []

  for (let i = 0; i < allTiles.length; i++) {
    allTileIds.push(allTiles[i].getAttribute('id'))
  }

  switch (side) {
    case 'up':
      possLocations = ['41', '42', '43', '44']
      break
    case 'right':
      possLocations = ['11', '21', '31', '41']
      break
    case 'down':
      possLocations = ['11', '12', '13', '14']
      break
    case 'left':
      possLocations = ['14', '24', '34', '44']
      break
  }

  for (let i = 0; i < allTileIds.length; i++) {
    let cellId = allTileIds[i]
    if (possLocations.includes(cellId)) {
      let possLocIndex = possLocations.indexOf(cellId)
      possLocations.splice(possLocIndex, 1)
    }
  }

  let randomPossLocation = Math.floor(Math.random() * possLocations.length)
  let newTileId = possLocations[randomPossLocation]
  newTile.setAttribute('id', newTileId)

  let cellIndex = allCellIds.indexOf(newTileId)
  allCells[cellIndex].appendChild(newTile)
}

btn.addEventListener('click', async () => {
  console.log('new game')
  startTiles()
})

document.onkeydown = function (keyPressed) {
  turns += 1
  switch (keyPressed.key) {
    case 'ArrowUp':
      moveDirection('up')
      makeNewTile('up')
      break
    case 'ArrowRight':
      moveDirection('right')
      makeNewTile('right')
      break
    case 'ArrowDown':
      moveDirection('down')
      makeNewTile('down')
      break
    case 'ArrowLeft':
      moveDirection('left')
      makeNewTile('left')
      break
  }
}
