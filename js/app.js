// Main Function:
////   Initialize deck of card array
////   Shuffle deck of cards
////   Initialize player and dealer hands as empty
//   Some message to start game

// While playing:
//   Deal cards to player and dealer (one dealer card face down)
//   Output initial game state (player's cards and dealer cards)	

// While player's turn:
//   Ask player if they want to "hit" or "stand"
//     Make “hit” and “stand” buttons

// If player chooses to "hit":
//   Add a card to player's hand
//   Output updated game state
//   Check if player is bust (cards total over 21)
//     If bust, end player's turn
//       Else: Still player’s turn

// While dealer's turn:
//   If dealer hand is less than 17: Add a card to dealer's hand
//     Else: End dealer's turn     

// Determine winner based on rules (who is closer to 21 without going over)
//   Output winner

// Reset Button: Ask player if they want to play another round
//   Make the buttons look pretty or Ben will strangle me

// Add betting and odds:
//   $10, $25, $50, $100 buttons to bet. (Maximum bet of $500?)
/*------------------------------Constants-----------------------------------------------*/
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const suits = ['♠', '♥', '♣', '♦']
const hitBtn = document.getElementById('hit')
const stayBtn = document.getElementById('stay')
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
/*------------------------------------Event Listeners------------------------------------*/
let messageContent = document.getElementById('message')
let sumContent = document.getElementById('sum')
let dealerContent = document.getElementById('dealerhand')
let playerContent = document.getElementById('playerhand')

/*-------------------------------Functions------------------------------------*/
init()

function init() {
  createDeck()
  dealCards()
  showSums()
}

function createDeck() {
  let cards = [];
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
    sum += value;
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


//// Initialize Deck Function:
////   Create a list of cards 2-10 and face cards (J, Q, K, A) for   each suit (Hearts, Diamonds, Clubs, Spades)
////   Return deck

//// Shuffle Deck Function:
////   Shuffle the list of cards
////   Return shuffled deck

//// Deal Initial Cards Function:
////   Pop two cards from deck to player hand
////   Pop two cards from deck to dealer hand
//   One Card is hidden (CSS)

// Output Game State Function:
//   Output player hand and sum
//   Output one dealer card

// isBust Function:
//   Calculate sum of hand
//     If sum > 21: Return True
//       Else: Return False

// Determine Winner Function:
//   Calculate sums for player and dealer hands
//   Determine winner based on Blackjack rules
//   Return winner
