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