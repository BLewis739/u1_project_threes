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
let tileQueue = [3, 2, 1, 6, 2, 1, 3, 6, 384, 384, 12, 12]

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
    newTile.setAttribute('class', `tile ${tileNum}`)
    const cellId = allCells[startingNums[i]].getAttribute('id')
    newTile.setAttribute('id', cellId)
    allCells[startingNums[i]].appendChild(newTile)
  }
}

const moveTile = (tile) => {
  const tileNum = tile.getAttribute('src')
  const tileClass = tile.getAttribute('class')
  const newTile = document.createElement('img')
  newTile.setAttribute('src', tileNum)
  const tileId = tile.getAttribute('id')
  newTile.setAttribute('id', tileId)
  newTile.setAttribute('class', tileClass)
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

const combineBoolean = (num1, num2) => {
  if (num1 === '1' || num2 === '1') {
    if (num1 === '2' || num2 === '2') {
      return true
    }
  } else if (num1 === '2' || num2 === '2') {
    if (num1 === '1' || num2 === '1') {
      return true
    }
  } else if (num1 === num2) {
    return true
  } else {
    return false
  }
}

const squeezeChecker = (allIds, allTiles, dir) => {
  combineResult = false
  let squeezeCombos = []
  switch (dir) {
    case 'up':
      for (let i = 1; i < 5; i++) {
        console.log('i loop ' + i.toString())
        for (let j = 1; j < 4; j++) {
          console.log('j loop' + j.toString())
          let idCheck1 = j.toString() + i.toString()
          let idCheck2 = (j + 1).toString() + i.toString()
          console.log(idCheck1 + ' ' + idCheck2)
          if (!allIds.includes(idCheck1) || !allIds.includes(idCheck2)) {
            console.log('no combo possible')
            break
          } else {
            console.log(
              'Possible squeeze combo at ' + idCheck1 + ' ' + idCheck2
            )
            let check1Index = allIds.indexOf(idCheck1)
            let check2Index = allIds.indexOf(idCheck2)
            let check1Class = allTiles[check1Index].getAttribute('class')
            let num1 = check1Class.slice(5, check1Class.length)
            let check2Class = allTiles[check2Index].getAttribute('class')
            let num2 = check2Class.slice(5, check2Class.length)
            let combineResult = combineBoolean(num1, num2)
            if (combineResult) {
              squeezeCombos.push([idCheck1, idCheck2])
              break
            }
          }
        }
      }
      console.log(squeezeCombos)
      break
    case 'right':
      break
    case 'down':
      break
    case 'left':
      break
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

  // Determine if squeeze combos will happen

  let adjustment = 0
  let invalidMoves = []

  switch (dir) {
    case 'up':
      invalidMoves.push('11', '12', '13', '14')
      adjustment = -10
      squeezeChecker(allIds, allTiles, 'up')
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

  // Get the new tile ids
  // let newTileIds = []

  // for (let i = 0; i < allTiles.length; i++) {
  //   newTileIds.push(allTiles[i].getAttribute('id'))
  // }

  // This was an attempt to log the tiles that didn't move -- it didn't work

  // possTileCombos = []

  // for (let i = 0; i < allIds.length; i++) {
  //   if (newTileIds.includes(allIds[i])) {
  //     possTileCombos.push(allIds[i])
  //   }
  // }

  // console.log(possTileCombos)
}

makeTileQueue = () => {
  const tileQueue = [3, 2, 1, 6, 2, 1, 3, 6, 1, 3, 2, 6]
  return tileQueue
}

makeTurn = (side) => {
  if (turns === 12) {
    tileQueue = makeTileQueue()
    turns = 0
  }
  const newTile = document.createElement('img')
  let tileNum = tileQueue.pop()
  newTile.setAttribute('src', `tile${tileNum}.png`)
  newTile.setAttribute('class', `tile ${tileNum}`)
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
      makeTurn('up')
      break
    case 'ArrowRight':
      moveDirection('right')
      makeTurn('right')
      break
    case 'ArrowDown':
      moveDirection('down')
      makeTurn('down')
      break
    case 'ArrowLeft':
      moveDirection('left')
      makeTurn('left')
      break
  }
}
