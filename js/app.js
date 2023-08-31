console.log('connected')

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

// /*----------Functions---------------*/

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
