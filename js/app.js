// Main Function:
////   Initialize deck of card array
////   Shuffle deck of cards
////   Initialize player and dealer hands as empty
//   Some message to start game

//// While playing:
////   Deal cards to player and dealer (one dealer card face down)
////   Output initial game state (player's cards and dealer cards)	

// While player's turn:
////   Ask player if they want to "hit" or "stand"
//     Make “hit” and “stand” buttons

//// If player chooses to "hit":
////   Add a card to player's hand
////   Output updated game state
////   Check if player is bust (cards total over 21)
////     If bust, end player's turn
////       Else: Still player’s turn

// While dealer's turn:
//   If dealer hand is less than 17: Add a card to dealer's hand
//     Else: End dealer's turn     

//// Determine winner based on rules (who is closer to 21 without going over)
////   Output winner

//// Reset Button: Ask player if they want to play another round
//   Make the buttons look pretty or Ben will strangle me

// Add betting and odds:commit -m
//   $10, $25, $50, $100 buttons to bet. (Maximum bet of $500?)
/*------------------------------Constants-----------------------------------------------*/
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const suits = ['♠', '♥', '♣', '♦']
const hitBtn = document.getElementById('hit', handleClick)
const stayBtn = document.getElementById('stay', handleClick)
const startBtn = document.getElementById('start', dealCards)
const cardEl = document.createElement('div')
cardEl.classList.add('card')
/*---------------------------Cache Element References------------------------------------*/
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
      if (sumHand(playerHand) > 21) {
          messageContent.innerHTML = "Player Busted! Dealer Wins!"
      }
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
  let cardImg = document.createElement("img");
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
  sumContent.innerHTML = `Player Sum: ${playerSum}, Dealer Sum: ${dealerSum}`
}

function render() {
  dealerContent.innerHTML = ""
  playerContent.innerHTML = ""
  dealerHand.forEach((card, index) => {
    let cardImg = document.createElement("img")
    // If it's the first card of the dealer and it's not dealer's turn, render it as hidden
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
    let hiddenCard = dealerContent.querySelector('.hidden')
    if (hiddenCard) {
        hiddenCard.classList.remove('hidden')
        hiddenCard.src = `../assets/images/cards/${hiddenCard.dataset.card}.svg` 
    }
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
  let hiddenCard = dealerContent.querySelector('.hidden');
  if (hiddenCard) {
    hiddenCard.classList.remove('hidden');
    hiddenCard.src = `../assets/images/cards/${hiddenCard.dataset.card}.svg`;
  }
  if (sumHand(dealerHand) < 17) {
      dealerHand.push(deck.pop())
      render()
  }
  checkForWinner()
}