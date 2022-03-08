const btn = document.querySelector('button')
const allCells = document.querySelectorAll('.cell')
const allCellIds = []
let turns = 0
let testCount = 0
let playing = false
for (let i = 0; i < allCells.length; i++) {
  allCellIds.push(allCells[i].getAttribute('id'))
}
let tileQueue = [3, 2, 1, 6, 2, 1, 3, 6, 384, 384, 12, 12]

const clearBoard = () => {
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

const squeezeMaker = (allIds, allTiles, idCheck1, idCheck2, test) => {
  testCount++
  let check1Index = allIds.indexOf(idCheck1)
  let check2Index = allIds.indexOf(idCheck2)
  let check1Class = allTiles[check1Index].getAttribute('class')
  let num1 = check1Class.slice(5, check1Class.length)
  let check2Class = allTiles[check2Index].getAttribute('class')
  let num2 = check2Class.slice(5, check2Class.length)
  let combineResult = combineBoolean(num1, num2)
  if (combineResult && !test) {
    let firstTileIndexToRemove = allIds.indexOf(idCheck1)
    let secondTileIndexToRemove = allIds.indexOf(idCheck2)
    removeTile(allTiles[firstTileIndexToRemove], idCheck1)
    removeTile(allTiles[secondTileIndexToRemove], idCheck2)
    const newTile = document.createElement('img')
    let tileNum = parseInt(num1) + parseInt(num2)
    newTile.setAttribute('src', `tile${tileNum}.png`)
    newTile.setAttribute('class', `tile ${tileNum}`)
    newTile.setAttribute('id', idCheck1)
    allCells[allCellIds.indexOf(idCheck1)].appendChild(newTile)
  }
  return combineResult
}

const squeezeLoopSetter = (allIds, allTiles, dir, test) => {
  // Can we make this more dry?
  // The content within the loop is the same, but every loop setting is minimally different
  switch (dir) {
    case 'up':
      for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 4; j++) {
          let idCheck1 = j.toString() + i.toString()
          let idCheck2 = (j + 1).toString() + i.toString()
          if (!allIds.includes(idCheck1) || !allIds.includes(idCheck2)) {
            break
          } else {
            let madeNewCombo = squeezeMaker(
              allIds,
              allTiles,
              idCheck1,
              idCheck2,
              test
            )
            if (madeNewCombo) {
              break
            }
          }
        }
      }
      break
    case 'right':
      for (let i = 1; i < 5; i++) {
        for (let j = 4; j > 0; j--) {
          let idCheck1 = i.toString() + j.toString()
          let idCheck2 = i.toString() + (j - 1).toString()
          if (!allIds.includes(idCheck1) || !allIds.includes(idCheck2)) {
            break
          } else {
            let madeNewCombo = squeezeMaker(
              allIds,
              allTiles,
              idCheck1,
              idCheck2,
              test
            )
            if (madeNewCombo) {
              break
            }
          }
        }
      }
      break
    case 'down':
      for (let i = 1; i < 5; i++) {
        for (let j = 4; j > 0; j--) {
          let idCheck1 = j.toString() + i.toString()
          let idCheck2 = (j - 1).toString() + i.toString()
          if (!allIds.includes(idCheck1) || !allIds.includes(idCheck2)) {
            break
          } else {
            let madeNewCombo = squeezeMaker(
              allIds,
              allTiles,
              idCheck1,
              idCheck2,
              test
            )
            if (madeNewCombo) {
              break
            }
          }
        }
      }
      break
    case 'left':
      for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 4; j++) {
          let idCheck1 = i.toString() + j.toString()
          let idCheck2 = i.toString() + (j + 1).toString()
          if (!allIds.includes(idCheck1) || !allIds.includes(idCheck2)) {
            break
          } else {
            let madeNewCombo = squeezeMaker(
              allIds,
              allTiles,
              idCheck1,
              idCheck2,
              test
            )
            if (madeNewCombo) {
              break
            }
          }
        }
      }
      break
  }
}

const moveDirection = (dir) => {
  // Get all of the image tiles and id's
  let allTiles = document.querySelectorAll('.tile')
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
  let test = false

  switch (dir) {
    case 'up':
      invalidMoves.push('11', '12', '13', '14')
      adjustment = -10
      squeezeLoopSetter(allIds, allTiles, 'up', test)
      break
    case 'right':
      invalidMoves.push('14', '24', '34', '44')
      adjustment = 1
      squeezeLoopSetter(allIds, allTiles, 'right', test)
      break
    case 'down':
      invalidMoves.push('41', '42', '43', '44')
      adjustment = 10
      squeezeLoopSetter(allIds, allTiles, 'down', test)
      break
    case 'left':
      invalidMoves.push('11', '21', '31', '41')
      adjustment = -1
      squeezeLoopSetter(allIds, allTiles, 'left', test)
      break
  }
  // Determine additional invalid moves based on presence of tiles

  allTiles = document.querySelectorAll('.tile')
  allIds = []

  for (let i = 0; i < allTiles.length; i++) {
    allIds.push(allTiles[i].getAttribute('id'))
  }

  for (let j = 0; j < 3; j++) {
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

makeTurn = (side) => {
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
  console.log(`${turns} turns and tilequeue ${tileQueue}`)

  if (possLocations.length > 0) {
    turns++
    if (turns === 12) {
      tileQueue = makeTileQueue()
      turns = 0
    }
    const newTile = document.createElement('img')
    let tileNum = tileQueue.pop()
    newTile.setAttribute('src', `tile${tileNum}.png`)
    newTile.setAttribute('class', `tile ${tileNum}`)

    let randomPossLocation = Math.floor(Math.random() * possLocations.length)
    let newTileId = possLocations[randomPossLocation]
    newTile.setAttribute('id', newTileId)

    let cellIndex = allCellIds.indexOf(newTileId)
    allCells[cellIndex].appendChild(newTile)
  }
}

const gameOverCheck = () => {
  let test = true
  let allTiles = document.querySelectorAll('.tile')
  allIds = []

  for (let i = 0; i < allTiles.length; i++) {
    allIds.push(allTiles[i].getAttribute('id'))
  }

  if (allTiles.length < 16) {
    return false
  } else {
    testCount = 0
    const directions = ['up', 'right', 'down', 'left']
    for (let i = 0; i < directions.length; i++) {
      squeezeLoopSetter(allIds, allTiles, directions[i], test)
    }
    if (testCount === 48) {
      return true
    }
  }
}

btn.addEventListener('click', async () => {
  document.querySelector('main').setAttribute('id', 'playing')
  console.log('new game')
  startTiles()
  playing = true

  document.onkeydown = function (keyPressed) {
    if (playing) {
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
      if (gameOverCheck()) {
        document.querySelector('main').setAttribute('id', 'game-over')
        playing = false
      }
    }
  }
})
