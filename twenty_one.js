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
let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]
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


// # TO_DO
//hitme should update the total score
function hitMe(deck, playerHand) {
  let newTotal = 0;
  let hitCard = deck.pop();
  playerHand[0].push(hitCard);
  console.log(playerHand);

  newTotal = total(playerHand[0])
  playerHand[0][1] = newTotal
  renderPlayerCard(hitCard);
  return playerHand[0][1];
}

function showScore(playerGameScore, dealerGameScore, playerHand, dealerHand) {
  playerGameScore = playerHand[1];
  dealerGameScore = dealerHand[1];
  console.log(`Player Score: ${playerGameScore} Dealer Score: ${dealerGameScore}`);
}

let deck = createDeck(); //create the deck
 
console.log(deck); // show deck
console.log(shuffle(deck)); //shuffle the deck
console.log(deck); //show shuffled deck


console.log('Dealer Hand') //display dealer title hand
console.log(dealDealerHand(deck)); //show dealerhand, one card and one unknown card


// let dealerHand = dealDealerHand(deck); //deal dealer hand


console.log('Player Hand'); //display player title hand
let playerHand = dealHand(deck);
console.log(playerHand); // show player hand 

//ask to hit or stay?


//if hit 
console.log(hitMe(deck, playerHand), 'this is called');
// console.log(hitMe(deck, dealerHand));

//if stay?


// let playerHand = dealHand(deck); //deal player hand


// console.log(hitMe(deck, playerHand));
// console.log(hitMe(deck, dealerHand));

// showScore(playerGameScore, dealerGameScore, playerHand, dealerHand);

// console.log(hitMe(deck, playerHand));
// showScore(playerGameScore, dealerGameScore, playerHand, dealerHand);


// stay -> conditional calculates and ends game


// console.log(deck);

// 1. Initialize deck
// 2. Deal cards to player and dealer
// 3. Player turn: hit or stay
//    - repeat until bust or stay
// 4. If player bust, dealer wins.
// 5. Dealer turn: hit or stay
//    - repeat until total >= 17
// 6. If dealer busts, player wins.
// 7. Compare cards and declare winner.

// while(true) {
//   console.log('Welcome to Twenty One!')

//   let deck = createDeck(); //create the deck
//   console.log(shuffle(deck)); //shuffle the deck
//   console.log('Dealer Hand') //display dealer title hand
//   console.log(dealDealerHand(deck)); //show dealerhand, one card and one unknown card
//   console.log('Player Hand'); //display player title hand
//   console.log(dealHand(deck)); // show player hand 

//   console.log('(h)it or (s)tay')
//   let answer = readline.question();
//   if (answer === 'hit' || answer === 'h'){
//       hitMe(deck, playerHand)
//   }
// }

// while (true) {
//   prompt("hit or stay?");
//   let answer = readline.question();
//   if (answer === 'hit') {
//     hitCard();
//   }
//   if (answer === 'stay') break;
// }