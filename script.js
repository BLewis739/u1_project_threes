btn = document.querySelector('button')
allCells = document.querySelectorAll('.cell')

const startTiles = () => {
  const newTile = document.createElement('img')
  newTile.setAttribute('src', 'tile1.png')
  allCells[0].appendChild(newTile)

  // Working on randomizing and adding to many spots

  // for (let i = 0; i < allCells.length; i++) {
  //   const newTile = document.createElement('img')
  //   newTile.setAttribute('src', 'tile1.png')
  //   allCells[i].appendChild(newTile)
  // }
}

btn.addEventListener('click', () => {
  console.log('new game')
  startTiles()
})

document.onkeydown = function (arrowPress) {
  console.log(arrowPress.key)
}
