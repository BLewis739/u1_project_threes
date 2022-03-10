const btn = document.querySelector('button')
const allCells = document.querySelectorAll('.cell')
const allCellIds = []
for (let i = 0; i < allCells.length; i++) {
  allCellIds.push(allCells[i].getAttribute('id'))
}
const nextTile = document.querySelector('.next')
let turns = 0
let testCount = 0
let playing = false

let tileQueue = []

const allNums = [
  1, 2, 3, 6, 12, 24, 48, 96, 192, 384, 768, 1536, 3072, 6144, 12288
]

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
  makeFirstTileQueue()
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

  const previewTile = document.querySelector('.next')
  if (previewTile.hasChildNodes()) {
    previewTile.removeChild(previewTile.children[0])
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

makeNewTileQueue = (highest) => {
  const newTileQueue = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 6]
  let highestIndex = allNums.indexOf(highest)

  let decrement = 1
  for (let i = 0; i < 3; i++) {
    let newHighIndex = highestIndex - Math.floor(Math.random() * 2 + decrement)
    if (newHighIndex < 2) {
      newHighIndex = 2
    }
    if (newHighIndex > 6) {
      newHighIndex -= Math.floor(Math.random() * 4)
    }
    decrement++
    newTileQueue.push(allNums[newHighIndex])
  }

  let finalTileQueue = []
  for (let i = 20; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    finalTileQueue.push(newTileQueue[randomIndex])
    newTileQueue.splice(randomIndex, 1)
  }

  return finalTileQueue
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

  if (possLocations.length > 0) {
    // Update the tile preview

    const newPreviewTile = document.createElement('img')
    let previewTileNum = tileQueue.pop()
    newPreviewTile.setAttribute('src', `tile${previewTileNum}.png`)
    newPreviewTile.setAttribute('class', `${previewTileNum}`)

    const currentPreview = nextTile.children[0]
    const newGameTile = document.createElement('img')
    let gameTileNum = currentPreview.getAttribute('class')
    newGameTile.setAttribute('class', `tile ${gameTileNum}`)
    newGameTile.setAttribute('src', `tile${gameTileNum}.png`)

    let randomPossLocation = Math.floor(Math.random() * possLocations.length)
    let newGameTileId = possLocations[randomPossLocation]
    newGameTile.setAttribute('id', newGameTileId)

    let cellIndex = allCellIds.indexOf(newGameTileId)
    allCells[cellIndex].appendChild(newGameTile)

    nextTile.removeChild(currentPreview)
    nextTile.appendChild(newPreviewTile)

    // Pop from the tileQueue or refill the tileQueue
    turns++
    if (tileQueue.length === 0) {
      // Get the highest tile value

      const allTileValues = []
      for (let i = 0; i < allTiles.length; i++) {
        let tileClass = allTiles[i].getAttribute('class')
        let tileNum = tileClass.slice(5, tileClass.length)
        allTileValues.push(parseInt(tileNum))
      }

      let maxValue = allTileValues[0]
      allTileValues.forEach((item) => {
        if (item > maxValue) {
          maxValue = item
        }
      })

      newQueueTiles = makeNewTileQueue(maxValue)
      newQueueTiles.forEach((item) => {
        tileQueue.push(item)
      })
    }
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

const setHeaderImages = () => {
  const headerLeft = document.querySelector('.header-left')
  const headerRight = document.querySelector('.header-right')
  const defaulTileNums = [1, 2, 3, 6, 12]
  let randomTileIndex = Math.floor(Math.random() * 15)
  defaulTileNums.push(allNums[randomTileIndex])
  const headingTileNums = []
  for (let i = 6; i > 0; i--) {
    let newRandomIndex = Math.floor(Math.random() * i)
    headingTileNums.push(defaulTileNums[newRandomIndex])
    defaulTileNums.splice(i, 1)
  }
  for (let i = 0; i < headingTileNums.length; i++) {
    const newHeadingTile = document.createElement('img')
    newHeadingTile.setAttribute('src', `tile${headingTileNums[i]}.png`)
    newHeadingTile.setAttribute('class', 'heading-tile')
    if (i % 2 === 0) {
      headerLeft.appendChild(newHeadingTile)
    } else {
      headerRight.appendChild(newHeadingTile)
    }
  }
}

const updateScore = () => {
  const allTiles = document.querySelectorAll('.tile')
  let allTileValues = []
  for (let i = 0; i < allTiles.length; i++) {
    let tileClass = allTiles[i].getAttribute('class')
    let tileNum = tileClass.slice(5, tileClass.length)
    allTileValues.push(parseInt(tileNum))
  }

  let tileValuesNo1or2 = allTileValues.filter((val) => {
    return val > 2
  })

  let allTileExponents = tileValuesNo1or2.map((val) => {
    return 1 + Math.log2(val / 3)
  })

  let score = 0
  for (let i = 0; i < allTileExponents.length; i++) {
    score += Math.pow(3, allTileExponents[i])
  }

  const scoreBox = document.querySelector('.score-box')
  scoreBoxText = document.createTextNode(score.toString())
  scoreBox.innerText = ''
  scoreBox.appendChild(scoreBoxText)
}

const makeFirstTileQueue = () => {
  tileQueue = []
  console.log(tileQueue)
  let ones = 0
  let twos = 0
  let threes = 0
  while (tileQueue.length < 25) {
    let newNum = Math.floor(Math.random() * 3) + 1
    switch (newNum) {
      case 1:
        if (ones < 9) {
          tileQueue.push(newNum)
          ones++
        }
        break
      case 2:
        if (twos < 9) {
          tileQueue.push(newNum)
          twos++
        }
        break
      case 3:
        if (threes < 7) {
          tileQueue.push(newNum)
          threes++
        }
        break
    }
  }
}

setHeaderImages()
console.log(tileQueue)

btn.addEventListener('click', async () => {
  document.querySelector('.board').setAttribute('id', 'playing')
  startTiles()
  const tilePreview = document.createElement('img')
  let firstPreviewTileNum = tileQueue.pop()
  tilePreview.setAttribute('src', `tile${firstPreviewTileNum}.png`)
  tilePreview.setAttribute('class', `${firstPreviewTileNum}`)
  nextTile.appendChild(tilePreview)
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
      console.log(tileQueue)
      updateScore()
      if (gameOverCheck()) {
        document.querySelector('.board').setAttribute('id', 'game-over')
        playing = false
      }
    }
  }
})
