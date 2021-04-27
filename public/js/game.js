// Selectors
const gameTable = document.querySelector('.game')
const tableRow = document.getElementsByTagName('tr')
const tableCell = document.getElementsByTagName('td')
const tableSlot = document.querySelectorAll('.slot')
const twoPlayerBtn = document.querySelector('#twoPlayerBtn')
// const playerCPUBtn = document.querySelector('#playerCPUBtn')
const startGameBtn = document.querySelector('#startGameBtn')


const winnerOverlay = document.querySelector('#winner-overlay')
const winnerName = document.querySelector('.winner--name')


let player1 = ''
let player2 = ''
let winner = false
const playerTurn = document.querySelector('.player-turn')
const reset = document.querySelector('.reset')


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
}

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

// Add eventlistener for the 2 player btn - US
twoPlayerBtn.addEventListener('click', e => {
  document.querySelector('.enter-names').style.display = 'block'
  document.querySelector('.select__player_container').style.display = 'none'
  document.querySelector('.artwork-robot-gamepage').style.display = 'none'
  document.querySelector('.artwork-twopeople').style.display = 'none'
  document.querySelector('.main__h1_game').style.display = 'none'
})

// Add eventlistener for the 1 player vs computer btn - US
playerCPUBtn.addEventListener('click', e => {
  document.querySelector('.enter-names').style.display = 'block'
  document.querySelector('.select__player_container').style.display = 'none'
  document.querySelector('#player2').value = 'computer'
})

// Add eventlistener for the start game btn - US
startGameBtn.addEventListener('click', e => {

  player1 = document.querySelector('#player1').value
  player2 = document.querySelector('#player2').value
  console.log(player1)
  console.log(player2)
  document.querySelector('.enter-names').style.display = 'none'
  playerTurn.textContent = `${player1}' turn!`
  gameTable.style.display = 'block'
})

const player1Color = '#EC9EB1'
const player2Color = '#E8EA8B'

let currentPlayer = 1


Array.prototype.forEach.call(tableCell, (cell) => {

// Loop through all the cells and add eventlisteners and background color - BO
Array.prototype.forEach.call(tableCell, cell => {

  cell.addEventListener('click', changeColor)
  cell.style.backgroundColor = 'white'
})

function changeColor (e) {

  const column = e.target.cellIndex

  let column = 0
  // If it´s a click event set column to the cellIndex, otherwise it´s a random number - US
  if (e.target === undefined) {
    column = e
  } else {
    column = e.target.cellIndex
  }


  const row = []
  if (!winner) {
    for (let i = 5; i > -1; i--) {

      if (tableRow[i].children[column].style.backgroundColor === 'white') {
        row.push(tableRow[i].children[column])
        console.log('currentPlayer', currentPlayer)
        if (currentPlayer === 1) {
          row[0].style.background = player1Color
          if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
            playerTurn.textContent = `${player1} Wins`
            winner = true
          } else if (drawCheck()) {

      // - BO
      // Only continue if the background color is white
      if (tableRow[i].children[column].style.backgroundColor === 'white') {
        // - BO
        row.push(tableRow[i].children[column]) // - BO
        if (currentPlayer === 1) {
          // - BO
          // Increase the number of moves and set style - US
          nrOfMoves1++
          setStyle(row, player1Color)
          if (
            horizontalCheck() ||
            verticalCheck() ||
            diagonalCheck1() ||
            diagonalCheck2()
          ) {
            //- BO
            playerTurn.textContent = `${player1} Wins` // - BO
            winner = true // - US
            // Set a timer and show the winner overlay - US
            setTimeout(function () {
              showWinnerOverlay(player1, nrOfMoves1)
            }, 2000)
            return winner
          } else if (drawCheck()) {
            // - BO

            playerTurn.textContent = 'Game is a draw'
            winner = true
          } else {
            playerTurn.textContent = `${player2}'s turn`
            currentPlayer = 2

            return currentPlayer
          }
        } else {
          row[0].style.backgroundColor = player2Color
          if (horizontalCheck() || verticalCheck() || diagonalCheck1() || diagonalCheck2()) {
            playerTurn.textContent = `${player2} Wins`
            winner = true

            // If player 2 is the computer call this function again with a delay and a random number between 0-6 - US
            if (player2 === 'computer') {
              let randomNumber = Math.floor(Math.random() * 7)
              setTimeout(function () {
                changeColor(randomNumber)
              }, 1000)
            }
            return currentPlayer
          }
        } else {
          nrOfMoves2++
          setStyle(row, player2Color)
          if (
            horizontalCheck() ||
            verticalCheck() ||
            diagonalCheck1() ||
            diagonalCheck2()
          ) {
            playerTurn.textContent = `${player2} Wins`
            winner = true
            setTimeout(function () {
              showWinnerOverlay(player2, nrOfMoves2)
            }, 2000)
            return winner

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

  //Set background color and shadow to the cell - US
  function setStyle (row, bgColor) {
    row[0].style.backgroundColor = bgColor
    row[0].style.boxShadow = '1px 3px 5px #4c928b'
  }

  //Show winner overlay
  function showWinnerOverlay (winningPlayer, nrMoves) {
    winnerOverlay.style.visibility = 'visible'
    winnerName.textContent = `${winningPlayer} Won!`
    //Only save the result if the winning player is not computer
    if (winningPlayer !== 'computer') {
      saveResult({ winningPlayer, nrMoves })
    }
  }

  //Get the localstorage and create a new array with the result if there are any - US
  function saveResult (newWinner) {
    let winners = []
    if (window.localStorage.getItem('winners')) {
      try {
        winners = JSON.parse(localStorage.getItem('winners'))
      } catch (e) {
        window.localStorage.removeItem('winners')
      }
    } else {
      window.localStorage.setItem('winners', JSON.stringify(newWinner))
    }
    winners.push(newWinner)
    window.localStorage.setItem('winners', JSON.stringify(winners))
  }

  // Check if there´s a color match by comparing 4 cells in a row - BO
  function colorMatchCheck (one, two, three, four) {
    return one === two && one === three && one === four && one !== 'white'
  }

  // Check horizontally for each column and row - BO
  function horizontalCheck () {
    for (let row = 0; row < tableRow.length; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          colorMatchCheck(
            tableRow[row].children[col].style.backgroundColor,
            tableRow[row].children[col + 1].style.backgroundColor,
            tableRow[row].children[col + 2].style.backgroundColor,
            tableRow[row].children[col + 3].style.backgroundColor
          )
        ) {
          // If it´s a match, set inner text of the markers to FOUR - US
          tableRow[row].children[col].innerText = 'F'
          tableRow[row].children[col + 1].innerText = 'O'
          tableRow[row].children[col + 2].innerText = 'U'
          tableRow[row].children[col + 3].innerText = 'R'

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

  // Check vertically for each column and row - BO
  function verticalCheck () {
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 3; row++) {
        if (
          colorMatchCheck(
            tableRow[row].children[col].style.backgroundColor,
            tableRow[row + 1].children[col].style.backgroundColor,
            tableRow[row + 2].children[col].style.backgroundColor,
            tableRow[row + 3].children[col].style.backgroundColor
          )
        ) {
          // If it´s a match, set inner text of the markers to FOUR - US
          tableRow[row].children[col].innerText = 'F'
          tableRow[row + 1].children[col].innerText = 'O'
          tableRow[row + 2].children[col].innerText = 'U'
          tableRow[row + 3].children[col].innerText = 'R'

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

  // Check diagonally in one direction for each column and row - BO
  function diagonalCheck1 () {
    for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 3; row++) {
        if (
          colorMatchCheck(
            tableRow[row].children[col].style.backgroundColor,
            tableRow[row + 1].children[col + 1].style.backgroundColor,
            tableRow[row + 2].children[col + 2].style.backgroundColor,
            tableRow[row + 3].children[col + 3].style.backgroundColor
          )
        ) {
          // If it´s a match, set inner text of the markers to FOUR - US
          tableRow[row].children[col].innerText = 'F'
          tableRow[row + 1].children[col + 1].innerText = 'O'
          tableRow[row + 2].children[col + 2].innerText = 'U'
          tableRow[row + 3].children[col + 3].innerText = 'R'

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

  // Check diagonally in the other direction for each column and row - BO
  function diagonalCheck2 () {
    for (let col = 0; col < 4; col++) {
      for (let row = 5; row > 2; row--) {
        if (
          colorMatchCheck(
            tableRow[row].children[col].style.backgroundColor,
            tableRow[row - 1].children[col + 1].style.backgroundColor,
            tableRow[row - 2].children[col + 2].style.backgroundColor,
            tableRow[row - 3].children[col + 3].style.backgroundColor
          )
        ) {
          // If it´s a match, set inner text of the markers to FOUR - US
          tableRow[row].children[col].innerText = 'F'
          tableRow[row - 1].children[col + 1].innerText = 'O'
          tableRow[row - 2].children[col + 2].innerText = 'U'
          tableRow[row - 3].children[col + 3].innerText = 'R'

          return true
        }
      }
    }
  }


  function drawCheck () {
    const fullSlot = []
    for (let i = 0; i < tableCell.length; i++) {

  // Check if the whole board is full - BO
  function drawCheck () {
    const fullSlot = []
    for (let i = 0; i < tableCell.length; i++) {
      // If the background color of the cell isn´t white push it to the array

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

reset.addEventListener('click', () => {
  tableSlot.forEach(slot => {
    slot.style.backgroundColor = 'white'

    document.getElementById('end-statement').innerText = ''
    count = 20

    slot.style.boxShadow = 'none' // - US
    slot.innerText = '' // - US
    // Hide the winner overlay, reset number of moves and winner is false - US
    winner = false
    winnerOverlay.style.visibility = 'hidden'
    nrOfMoves1 = 0
    nrOfMoves2 = 0
    // Set the current player back to 1 and change the text - BO
    return currentPlayer === 1
      ? (playerTurn.textContent = `${player1}'s turn`)
      : (playerTurn.textContent = `${player2}'s turn`)

  })
})
