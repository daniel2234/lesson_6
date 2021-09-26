// https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript

// Rules of Twenty-One
// Deck: 
// Start with a standard 52-card deck consisting of the 4 suits (Hearts, Diamonds, Clubs, and Spades), and 13 values (2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace).

//Goal: The goal of Twenty-One is to try to get as close to 21 as possible without going over. If you go over 21, it's a bust, and you lose.

//future ideas
//https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript


//make one line card hands
//https://replit.com/talk/ask/How-to-make-everything-on-one-line/40891

const readline = require('readline-sync');

//declare card elements
let suits = ["S", "D", "C", "H"];
let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q","K"]
let playerGameScore = 0;
let dealerGameScore = 0;

function createDeck(){
  //empty array to contains card
  let deck = [];

  //create a deck of cards
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      let card = [suits[i], values[j]];
      deck.push(card);
    }
  }
  return deck;
}

function dealHand(deck) {
  let card;
  let playerhand = [];
  let playerScore = 0;
  for (let i = 0; i < 2; i++){
    card = deck.pop();
    playerhand.push(card)
    renderPlayerCard(card);
  }
  playerScore = total(playerhand);
  console.log(playerScore);
  return [playerhand, playerScore]
}

function dealDealerHand(deck) {
  let dealerCard;
  let dealerHand = [];
  let dealerScore = 0;
  for (let i = 0; i < 2; i++){
    dealerCard = deck.pop();
    dealerHand.push(dealerCard);
    renderDealerCard(dealerCard);
  }
  dealerScore = total(dealerHand);
  console.log(dealerScore);
  return [dealerHand, dealerScore];
}

//calculates the total in hand 
function total(cards) {
  // cards = [['H', '3'], ['S', 'Q'], ... ]
  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === "A") {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values.filter(value => value === "A").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }
  return array
}

function renderPlayerCard(card) {
  console.log(`+----------+ `);
  console.log(`+          + `);
  console.log(`+          + `);
  console.log(`+   ${card[0]} ${card[1]}    +`);
  console.log(`+          + `);
  console.log(`+          + `);
  console.log(`+----------+ `);
}


function renderDealerCard(card) {
  console.log(`+----------+ `);
  console.log(`+          + `);
  console.log(`+          + `);
  console.log(`+   ${card[0]} ${card[1]}    +`);
  console.log(`+          + `);
  console.log(`+          + `);
  console.log(`+----------+ `);
}

function hitMe(deck, playerHand) {
  let newTotal = 0;
  let hitCard = deck.pop();
  playerHand[0].push(hitCard);
  newTotal = total(playerHand[0])
  playerHand[1] = newTotal
  renderPlayerCard(hitCard);
  return playerHand;
}

function showScore(playerGameScore, dealerGameScore, playerHand, dealerHand) {
  playerGameScore = playerHand[1];
  dealerGameScore = dealerHand[1];
  console.log(`Player Score: ${playerGameScore} Dealer Score: ${dealerGameScore}`);
}

while(true) {
  console.log('Welcome to Twenty One!')

  let deck = createDeck(); //create the deck
  console.log(shuffle(deck)); //shuffle the deck

  console.log('Dealer Hand') //display dealer title hand
  let dealerHand = dealDealerHand(deck); //deal dealer hand
  console.log(dealerHand);

  console.log('Player Hand'); //display player title hand
  let playerHand = dealHand(deck);
  console.log(playerHand); // show player hand 

  while(true) {
    console.log("(h)it or (s)tay?");
    let answer = readline.question();
    if (answer === 'hit' || answer === 'h') {
      playerHand = hitMe(deck, playerHand);
      showScore(playerGameScore, dealerGameScore, playerHand, dealerHand);
      if (playerHand[1] > 21) break;
    } else if ( answer === 'stay' || answer === 's') {
        while (dealerHand[1] <= 21) {
          if(dealerHand[1] >= 17) break;
          dealerHand = hitMe(deck, dealerHand);
        }
      showScore(playerGameScore, dealerGameScore, playerHand, dealerHand);  
      if(dealerHand[1] >= 17) break;
    }
  }

  console.log('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    console.log('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;

}