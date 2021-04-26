// Selectors
const highscoreContainer = document.querySelector('.highscore')

// Array of colors for the top players
let colors = ['#EC9EB1', '#E8EA8B', '#20A899', '#9CE2DB', '#5F6368', '#C8E0C0', '#20A899', '#DADCE0', '#E86367', '#55B8CA']
// Create an array to collect the winners from local storage
let winners = []
// Set a max length for the list
let maxLength = 10
// Create the start of the ul-list
let highscoreList = '<p class="highscore__heading">Moves</p><ul>'

getWinners()

function getWinners() {
  // Get the winners from local storage
  if (window.localStorage.getItem('winners')) {
    try {
      winners = JSON.parse(localStorage.getItem('winners'))
      // Sort the list of winners
      sortWinners(winners)
      createListOfWinners()
    } catch (e) {
      window.localStorage.removeItem('winners')
    }
  } else {
    highscoreList += `<li>No winners yet</li>`
    highscoreList += '</ul>'
    highscoreContainer.innerHTML = highscoreList
  }
}
// Sort the list according to the number of moves
function sortWinners(winners) {
  winners.sort(function (a, b) {
    return a.nrMoves - b.nrMoves
  })
}

function createListOfWinners() {
  // Set the maximum number of list items to the arrays length if it is under 11
  if (winners.length < 11) {
    maxLength = winners.length
  }

  // Create the list of top 10 players (if )
  for (let i = 0; i < maxLength; i++) {
    highscoreList += `<li><span class="leader" style="background-color: ${colors[i]}">P${i+1}</span><p class="name">${winners[i].winningPlayer}</p><span class="moves">${winners[i].nrMoves}</span></li>`
  }

  highscoreList += '</ul>'
  highscoreContainer.innerHTML = highscoreList
}
  