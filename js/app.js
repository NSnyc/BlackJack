/*------------------------------Constants-----------------------------------------------*/
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const suits = ['♠', '♥', '♣', '♦']
const hitBtn = document.getElementById('hit')
const stayBtn = document.getElementById('stay')
const startBtn = document.getElementById('start')
const cardEl = document.createElement('div')
cardEl.classList.add('card')

/*-------------------------------Variables-----------------------------------------------*/
let playerHand = []
let dealerHand = []
let deck = []
let playerSum = 0
let dealerSum = 0
let message = ""
let playerAceCount = 0
let dealerAceCount = 0
let isDealerTurn = false
let messageContent = document.getElementById('message')
let sumContent = document.getElementById('sum')
let dealerContent = document.getElementById('dealerhand')
let playerContent = document.getElementById('playerhand')

/*---------------------------Cache Element References------------------------------------*/
hitBtn.addEventListener('click', handleClick)
stayBtn.addEventListener('click', handleClick)
startBtn.addEventListener('click', init)


/*-------------------------------Functions------------------------------------*/
init()

function init() {
  playerHand = []
  dealerHand = []
  message = ""
  hitBtn.disabled = false
  stayBtn.disabled = false
  isDealerTurn = false
  createDeck()
  dealCards()
  render()
  showSums()
  checkForWinner()
}

function handleClick(event) {
  const currentPlayerSum = sumHand(playerHand)
  if (event.target.id === "hit" && currentPlayerSum < 21) {
      playerHand.push(deck.pop())
      render()
  } else if (event.target.id === "stay") {
      dealerTurn()
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
  playerHand.push(deck.pop())
  playerHand.push(deck.pop())
  dealerHand.push(deck.pop())
  dealerHand.push(deck.pop())
  let cardImg = document.createElement("img")
  cardImg.src = `../assets/images/backs/blue.svg`
  cardImg.className = "hidden"
  cardImg.dataset.card = dealerHand[0]
  dealerContent.appendChild(cardImg)
  let cardImg2 = document.createElement("img")
  cardImg2.src = `../assets/images/cards/${dealerHand[1]}.svg`
  dealerContent.appendChild(cardImg2)
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
  let dealerSum = sumHand(dealerHand)
  sumContent.innerHTML = `Player Hand: ${playerSum}`
}

function render() {
  dealerContent.innerHTML = ""
  playerContent.innerHTML = ""
  dealerHand.forEach((card, index) => {
    let cardImg = document.createElement("img")
    if (index === 0 && !isDealerTurn) {
      cardImg.src = `../assets/images/backs/blue.svg`
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
  if (dealerHand.length === 2 && sumHand(dealerHand) === 21) {
    revealHiddenCard()
    messageContent.innerHTML = "Dealer has Blackjack! Dealer Wins!"
      return
  }
  const playerTotal = sumHand(playerHand)
  const dealerTotal = sumHand(dealerHand)
  if (playerTotal > 21) {
      messageContent.innerHTML = "Player Busted! Dealer Wins!"
  } else if (dealerTotal > 21) {
      messageContent.innerHTML = "Dealer Busted! Player Wins!"
  } else if (dealerTotal === playerTotal) {
      messageContent.innerHTML = "It's a tie!"
  } else if (playerTotal > dealerTotal) {
      messageContent.innerHTML = "Player Wins!"
  } else {
      messageContent.innerHTML = "Dealer Wins!"
  }
}

function dealerTurn() {
  stayBtn.disabled = true
  hitBtn.disabled = true
  isDealerTurn = true
  revealHiddenCard()
  if (sumHand(dealerHand) < 17) {
      dealerHand.push(deck.pop())
      render()
  }
  checkForWinner()
}

function revealHiddenCard() {
  let hiddenCard = dealerContent.querySelector('.hidden')
  if (hiddenCard) {
      hiddenCard.classList.remove('hidden')
      hiddenCard.src = `../assets/images/cards/${hiddenCard.dataset.card}.svg`
  }
}