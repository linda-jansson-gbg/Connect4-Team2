// Selectors
const gameTable = document.querySelector('.game')
const tableRow = document.getElementsByTagName('tr')
const tableCell = document.getElementsByTagName('td')
const tableSlot = document.querySelectorAll('.slot')
const twoPlayerBtn = document.querySelector('#twoPlayerBtn')
// const playerCPUBtn = document.querySelector('#playerCPUBtn')
const startGameBtn = document.querySelector('#startGameBtn')
const winnerOverlay = document.querySelector('#winner-overlay')
let player1 = ''
let player2 = ''
let winner = false
const playerTurn = document.querySelector('.player-turn')
const reset = document.querySelector('#reset')


/*let count
count = 20
const timeElem = document.getElementById('clock')
const timerUnit = setInterval(countdown, 1000)
countdown();
let count
count = 20
const timeElem = document.getElementById('clock')
const timerUnit = setInterval(countdown, 1000)

function countdown () {
  if (count === 0) {
    clearTimeout(timerUnit)
    clearInterval(timerUnit)
    timeupMessage()
  } else if (count === 1) {
    timeElem.innerHTML = count + ' second remaining'
    count--
  } else {
    timeElem.innerHTML = count + ' seconds remaining'
    count--
  }
}

// Timeup message
function timeupMessage () {
  timeElem.innerText = ''
  document.getElementById('end-statement').innerText = '🤭 You ran out of time. ⌛'
  clearInterval(timerUnit)
}*/


for (let i = 0; i < tableCell.length; i++) {
  tableCell[i].addEventListener('click', (e) => {
    console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`)
  })
}

twoPlayerBtn.addEventListener('click', (e) => {
  document.querySelector('.enter-names').style.display = 'block'
  document.querySelector('.select-game').style.display = 'none'
})

startGameBtn.addEventListener('click', (e) => {
  console.log('start game')
  player1 = document.querySelector('#player1').value
  player2 = document.querySelector('#player2').value
  console.log(player1)
  console.log(player2)
  document.querySelector('.enter-names').style.display = 'none'
  playerTurn.textContent = `${player1}' turn!`
  gameTable.style.display = 'block'
})

let nrOfMoves1 = 0
let nrOfMoves2 = 0
const player1Color = '#EC9EB1'
const player2Color = '#E8EA8B'

let currentPlayer = 1

Array.prototype.forEach.call(tableCell, (cell) => {
  cell.addEventListener('click', changeColor)
  cell.style.backgroundColor = 'white'
})

function changeColor(e) {
  const column = e.target.cellIndex
  const row = []
  if (!winner) {
    for (let i = 5; i > -1; i--) {
      if (tableRow[i].children[column].style.backgroundColor === 'white') {
        row.push(tableRow[i].children[column])
        console.log('currentPlayer', currentPlayer)
        
        
        if (currentPlayer === 1) {
          nrOfMoves1++
          console.log('nrOfMoves1 of player 1', nrOfMoves1)
          row[0].style.background = player1Color
          if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
            playerTurn.textContent = `${player1} Wins`
            winner = true
            setTimeout(function(){ showWinnerOverlay(); }, 3000)
          } else if (drawCheck()) {
            playerTurn.textContent = 'Game is a draw'
            winner = true
          } else {
            playerTurn.textContent = `${player2}'s turn`
            currentPlayer = 2
            return currentPlayer
          }
        } else {
          nrOfMoves2++
          console.log('nrOfMoves2 of player 2', nrOfMoves2)
          row[0].style.backgroundColor = player2Color
          if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
            playerTurn.textContent = `${player2} Wins`
            winner = true
          } else if (drawCheck()) {
            playerTurn.textContent = 'Game is a draw'
            winner = true
          } else {
            playerTurn.textContent = `${player1}'s turn`
            currentPlayer = 1
            return currentPlayer
          }
        }
      }
    }
  }

  function showWinnerOverlay() {
    winnerOverlay.style.visibility = "visible"
  }

  function colorMatchCheck (one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'white')
  }

  function horizontalCheck () {
    for (let row = 0; row < tableRow.length; row++) {
      for (let col = 0; col < 4; col++) {
        if (colorMatchCheck(
          tableRow[row].children[col].style.backgroundColor,
          tableRow[row].children[col + 1].style.backgroundColor,
          tableRow[row].children[col + 2].style.backgroundColor,
          tableRow[row].children[col + 3].style.backgroundColor)) {
          return true
        }
      }
    }
  }

  function verticalCheck () {
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        if (colorMatchCheck(
          tableRow[row].children[col].style.backgroundColor,
          tableRow[row + 1].children[col].style.backgroundColor,
          tableRow[row + 2].children[col].style.backgroundColor,
          tableRow[row + 3].children[col].style.backgroundColor)) {
          return true
        }
      }
    }
  }

  function diagonalCheck1 () {
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (colorMatchCheck(
          tableRow[row].children[col].style.backgroundColor,
          tableRow[row + 1].children[col + 1].style.backgroundColor,
          tableRow[row + 2].children[col + 2].style.backgroundColor,
          tableRow[row + 3].children[col + 3].style.backgroundColor)) {
          return true
        }
      }
    }
  }

  function diagonalCheck2 () {
    for (let col = 0; col < 4; col++) {
      for (let row = 5; row > 2; row--) {
        if (colorMatchCheck(
          tableRow[row].children[col].style.backgroundColor,
          tableRow[row - 1].children[col + 1].style.backgroundColor,
          tableRow[row - 2].children[col + 2].style.backgroundColor,
          tableRow[row - 3].children[col + 3].style.backgroundColor)) {
          return true
        }
      }
    }
  }

  function drawCheck () {
    const fullSlot = []
    for (let i = 0; i < tableCell.length; i++) {
      if (tableCell[i].style.backgroundColor !== 'white') {
        fullSlot.push(tableCell[i])
      }
    }
    if (fullSlot.length === tableCell.length) {
      return true
    } else {
      return false
    }
  }
}
// Function for when the players want a rematch 
reset.addEventListener('click', () => {
  // Change the color of the slots to white
  tableSlot.forEach(slot => {
    slot.style.backgroundColor = 'white'
    // Set the winner to false
    winner = false
      //document.getElementById('end-statement').innerText = ''
      //count = 20
    // Hide the winner overlay
    winnerOverlay.style.visibility = 'hidden'
    // Set the current player back to 1 and change the text
    return (currentPlayer === 1 ? playerTurn.textContent = `${player1}'s turn` :
       playerTurn.textContent = `${player2}'s turn`)
  })
})
