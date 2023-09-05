// Main Function:
//   Initialize deck of card array
//   Shuffle deck of cards
//   Initialize player and dealer hands as empty
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
/*------------------------------Constants------------------------------------*/
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const suits = ['♠', '♥', '♣', '♦']
const hitBtn = document.getElementById('hit')
const stayBtn = document.getElementById('stay')

/*-------------------------------Variables------------------------------------*/
let sum = 0
let message = ""
let messageContent = document.getElementById('message')
let sumContent = document.getElementById('sum')
let cardsContent = document.getElementById('cards')

/*-------------------------------Functions------------------------------------*/
createDeck()

// function getRandomCard() {
//   let num = Math.floor(Math.random() * 13) + 1
//   if (num === 1) return 11
//   else if (num === 11 || num === 12 || num === 13) return 10
//   else return num
// }

function createDeck() {
  let cards = [];
  values.forEach((value) => {
    suits.forEach((suit) => {
      const card = value + suit
      cards.push(card)
    })
  })
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]
  }
  deck = cards
}

// Initialize Deck Function:
//   Create a list of cards 2-10 and face cards (J, Q, K, A) for   each suit (Hearts, Diamonds, Clubs, Spades)
//   Return deck

// Shuffle Deck Function:
//   Shuffle the list of cards
//   Return shuffled deck

// Deal Initial Cards Function:
//   Pop two cards from deck to player hand
//   Pop two cards from deck to dealer hand
//   One Card is hidden

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
