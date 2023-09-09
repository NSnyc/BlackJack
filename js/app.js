/*------------------------------Constants-------------------------*/
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const suits = ['♠', '♥', '♣', '♦']
const hitBtn = document.getElementById('hit')
const stayBtn = document.getElementById('stay')
const dealBtn = document.getElementById('deal')
const borrowBtn = document.getElementById('borrowBtn')
const bets = [1, 10, 25, 50, 100]
const initialBalance = 200


const shuffleSound = new Audio('../assets/audio/shuffling-cards.wav')
shuffleSound.volume = .70
const flipSound = new Audio('../assets/audio/flip-card.mp3')
flipSound.volume = .30
const dealSound = new Audio('../assets/audio/deal-card.wav')
dealSound.volume = .50
const cheerSound = new Audio('../assets/audio/cheer.wav')
cheerSound.volume = .75

/*-------------------------------Variables---------------------------*/
let playerBalance = initialBalance
let currentBet = 0
let playerHand = []
let dealerHand = []
let deck = []
let isDealerTurn = false
let messageContent = document.getElementById('message')
let sumContent = document.getElementById('sum')
let dealerContent = document.getElementById('dealerhand')
let playerContent = document.getElementById('playerhand')

/*---------------------------Cache Element References----------------*/
document.getElementById('bet1').addEventListener('click', () => placeBet(1))
document.getElementById('bet10').addEventListener('click', () => placeBet(10))
document.getElementById('bet25').addEventListener('click', () => placeBet(25))
document.getElementById('bet50').addEventListener('click', () => placeBet(50))
document.getElementById('bet100').addEventListener('click', () => placeBet(100))

hitBtn.addEventListener('click', handleClick)
stayBtn.addEventListener('click', handleClick)
dealBtn.addEventListener('click', () => {
  dealCards()
  checkForBlackjacks()
  showSums()
  dealBtn.disabled = true
  hitBtn.disabled = false
  stayBtn.disabled = false
})

/*-------------------------------Functions------------------------------*/
init()

function init() {
  playerHand = []
  dealerHand = []
  messageContent.innerHTML = ""
  hitBtn.disabled = true
  stayBtn.disabled = true
  isDealerTurn = false
  currentBet = 0
  createDeck()
  render()
}

function handleClick(event) {
  if (event.target.id === "hit") {
    dealSound.play()
    playerHand.push(deck.pop())
    render()
    const currentPlayerSum = sumHand(playerHand)
    if (currentPlayerSum >= 21) {
      hitBtn.disabled = true
      dealerTurn()
      endPlayerTurn()
      return
    }
  } else if (event.target.id === "stay") {
    dealerTurn()
    endPlayerTurn()
  }
}

function createDeck() {
  let cards = []
  values.forEach((value) => {
    suits.forEach((suit) => {
      const card = suit + value
      cards.push(card)
    })
  })
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]
  }
  deck = cards
}

function dealCards() {
  shuffleSound.play()
  playerHand.length = 0;
  dealerHand.length = 0
  dealerContent.innerHTML = ""
  playerContent.innerHTML = ""
  stayBtn.disabled = true
  dealBtn.disabled = true
  playerHand.push(deck.pop())
  playerHand.push(deck.pop())
  dealerHand.push(deck.pop())
  dealerHand.push(deck.pop())
  let cardImg = document.createElement("img")
  cardImg.src = `../assets/images/backs/red.svg`
  cardImg.className = "hidden"
  cardImg.dataset.card = dealerHand[0]
  dealerContent.appendChild(cardImg)
  let cardImg2 = document.createElement("img")
  cardImg2.src = `../assets/images/cards/${dealerHand[1]}.svg`
  dealerContent.appendChild(cardImg2)
  playerHand.forEach(card => {
      let cardImg = document.createElement("img")
      cardImg.src = `../assets/images/cards/${card}.svg`
      playerContent.appendChild(cardImg)
  })
  if (sumHand(dealerHand) === 21) {
    checkForWinner()
  }
  messageContent.innerHTML = ""
}


function cardValue(card) {
  const face = card.slice(1)
  if (face === 'A') {
    return 11
  } else if (face === 'J' || face === 'Q' || face === 'K') {
    return 10
  } else {
    return parseInt(face, 10)
  }
}

function sumHand(hand) {
  let sum = 0
  let aces = 0
  hand.forEach(card => {
    const value = cardValue(card)
    sum += value
    if (value === 11) {
      aces += 1
    }
  })
  while (sum > 21 && aces > 0) {
    sum -= 10
    aces -= 1
  }
  return sum
}

function showSums() {
  let playerSum = sumHand(playerHand)
  sumContent.innerHTML = `Player Hand: ${playerSum}`
}

function render() {
  dealerContent.innerHTML = ""
  playerContent.innerHTML = ""
  dealerHand.forEach((card, index) => {
  let cardImg = document.createElement("img")
  if (index === 0 && !isDealerTurn) {
    cardImg.src = `../assets/images/backs/red.svg`
    cardImg.className = "hidden"
    cardImg.dataset.card = card
  } else {
    cardImg.src = `../assets/images/cards/${card}.svg`
  }
  dealerContent.appendChild(cardImg)
  })
  playerHand.forEach(card => {
    let cardImg = document.createElement("img")
    cardImg.src = `../assets/images/cards/${card}.svg`
    playerContent.appendChild(cardImg)
  })
  showSums()
}


function checkForWinner() {
  const playerTotal = sumHand(playerHand)
  const dealerTotal = sumHand(dealerHand)
  if (playerTotal > 21) {
      messageContent.innerHTML = "Player Busted! <p> Dealer Wins!"
      playerBalance -= currentBet
      currentBet = 0
  } else if (dealerTotal > 21) {
      messageContent.innerHTML = "Dealer Busted! <p> Player Wins!"
      playerBalance += currentBet
      currentBet = 0
  } else if (playerTotal > dealerTotal) {
      messageContent.innerHTML = "Player Wins!"
      playerBalance += currentBet
      currentBet = 0
  } else if (dealerTotal > playerTotal) {
      messageContent.innerHTML = "Dealer Wins!"
      playerBalance -= currentBet
      currentBet = 0
  } else {
      messageContent.innerHTML = "It's a tie! Push!"
  }
  endPlayerTurn()
}

function dealerTurn() {
  stayBtn.disabled = true
  hitBtn.disabled = true
  isDealerTurn = true
  revealHiddenCard()
  while (sumHand(dealerHand) < 17) {
    dealerHand.push(deck.pop())
    dealSound.play()
    render()
  }
  checkForWinner()
}

function revealHiddenCard() {
  let hiddenCard = dealerContent.querySelector('.hidden')
  if (hiddenCard) {
    flipSound.play()
    hiddenCard.classList.remove('hidden')
    hiddenCard.src = `../assets/images/cards/${hiddenCard.dataset.card}.svg`
  }
}

function endPlayerTurn() {
  dealBtn.disabled = false
  hitBtn.disabled = true
  stayBtn.disabled = true
}

function checkForBlackjacks() {
  const playerTotal = sumHand(playerHand)
  const dealerTotal = sumHand(dealerHand)
  if (playerTotal === 21 && playerHand.length === 2 && dealerTotal !== 21) {
      messageContent.innerHTML = "Player wins with a Blackjack!"
      playerBalance += Math.floor(1.5 * currentBet)
      currentBet = 0 
      endPlayerTurn()
      return true
  }
  if (dealerTotal === 21 && dealerHand.length === 2 && playerTotal !== 21) {
      messageContent.innerHTML = "Dealer Wins with Blackjack!"
      playerBalance -= currentBet
      currentBet = 0
      endPlayerTurn()
      return true
  }
  if (dealerTotal === 21 && dealerHand.length === 2 && playerTotal === 21) {
      messageContent.innerHTML = "Both have Blackjack! Push!"
      endPlayerTurn()
      return true
  }
  return false
}