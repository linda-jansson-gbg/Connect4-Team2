// Selectors
let game 
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
const reset = document.querySelector('#reset')


twoPlayerBtn.addEventListener('click', (e) => {
    document.querySelector('.enter-names').style.display = 'block'
    document.querySelector('.select-game').style.display = 'none'
  })


let game = new Game()

const renderGame = () => {
  console.log(game.board.rows)
  renderBoard(game.board)
  renderCurrentPlayer(game.players)
}

const renderCurrentPlayer = players => {
  console.log('our players:', players)
  document.querySelector('.enter-names').style.display = 'none'
  const activePlayer = game.getActivePlayer().name
  console.log('active player:', activePlayer)
  playerTurn.textContent = `${activePlayer}'S turn!`
  gameTable.style.display = 'block'
}

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

//  for (let i = 0; i < tableCell.length; i++) {
//   tableCell[i].addEventListener('click', e => {
//     console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`)
//   })
// }

twoPlayerBtn.addEventListener('click', e => {
  console.log('ehj')
  document.querySelector('.enter-names').style.display = 'block'
  document.querySelector('.select-game').style.display = 'none'
})

let nrOfMoves1 = 0
let nrOfMoves2 = 0
const player1Color = '#EC9EB1'
const player2Color = '#E8EA8B'

  startGameBtn.addEventListener('click', (e) => {
    console.log('start game')
    player1 = document.querySelector('#player1').value
    player2 = document.querySelector('#player2').value
    document.querySelector('.enter-names').style.display = 'none'
   gameTable.style.display = 'block'

     game = new Game(player1, player2)
     renderGame();
  })


  const renderGame=()=>{
   renderBoard(game.board)
    renderCurrecntPlayer(game.players)
}
function changeColor (e) {
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
          if (
            horizontalCheck() ||
            verticalCheck() ||
            diagonalCheck1() ||
            diagonalCheck2()
          ) {
            playerTurn.textContent = `${player1} Wins`
            winner = true
            setTimeout(function () {
              showWinnerOverlay()
            }, 3000)
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
          if (
            horizontalCheck() ||
            verticalCheck() ||
            diagonalCheck1() ||
            diagonalCheck2()
          ) {
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

  function showWinnerOverlay () {
    winnerOverlay.style.visibility = 'visible'
  }

const renderCurrecntPlayer=(players)=>{
    const activePlayer=game.getActivePlayer().name
    console.log('active player:', activePlayer)
    playerTurn.textContent = `${activePlayer}'s turn!`
}

const renderBoard = (board) => {
console.log('board rendered')
    document.querySelector(".game--board").innerHTML=""

    for(const row of board.spaces){
      
        const rowElement=document.createElement('div')
      
        for(const column of row){

            const columnElement = document.createElement('div')
            columnElement.classList.add('slot');
            columnElement.setAttribute('id', column.id)
            if(column.token){
         
                const tokenElement = document.createElement('div')
                tokenElement.classList.add('token');
                tokenElement.style.background = column.token.owner.color  ;
                columnElement.appendChild(tokenElement)
            }
            rowElement.appendChild(columnElement)

       }

       document.querySelector(".game--board").appendChild(rowElement)
    }

    const handelSpaceClick = (spaceId) => {
        /** Find the space that was clicked */
        let clickedSpace = null
        for (const row of game.board.spaces){
             clickedSpace = row.find(space => space.id == spaceId) 
            if(clickedSpace){
                break
            }

        }
        console.log('clicked space:', clickedSpace)
      

        /** Check if the move is valid (can't add token to a full column) */
        if(game.board.columnIsFull(clickedSpace.y)){
            alert("Column is full");
            return
        }
    
        console.log( game.getActivePlayer().name, 'has' , game.getActivePlayer().tokens.length)
    
        //when the move is valid
        game.board.addToken(clickedSpace.y , game.getActivePlayer().tokens.pop())
     
        console.log( game.getActivePlayer().name, 'has' ,game.getActivePlayer().tokens.length)
  
        game.switchPlayer();
        renderGame()
       
    }

    document.addEventListener('click',function(e){
        //  console.log('e.target:', e.target)
          if(e.target && e.target.id){
              if(e.target.id.startsWith("space")){
                  //catch the space clicked on
                  console.log( 'space with id:', e.target.id);
                  handelSpaceClick(e.target.id)
              }
           }
       });

    // console.log('board:', board)
    // console.log('board:', board.spaces.space)
    // const div = document.querySelector('.game--board')
    //   let gameBoardStr = ''
    //   for (const spaceArray of board.spaces) {
    //     gameBoardStr = gameBoardStr.concat('<div>')
    //     for (const space of spaceArray) {
    //       gameBoardStr = gameBoardStr.concat(board.spaces.Space.render())
    //     }
    //     gameBoardStr = gameBoardStr.concat('</div>')
    //   }
    //   div.innerHTML = gameBoardStr
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
    return currentPlayer === 1
      ? (playerTurn.textContent = `${player1}'s turn`)
      : (playerTurn.textContent = `${player2}'s turn`)
  })
})

startGameBtn.addEventListener('click', e => {
  console.log('start game')
  renderGame()
})
