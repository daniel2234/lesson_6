const readline = require('readline-sync');

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = '0';

const MAX_TOTAL_SCORE = 5;

const WINNING_LINES = [
  [1,2,3], [4,5,6], [7,8,9], //rows
  [1,4,7], [2,5,8], [3,6,9], //columns
  [1,5,9], [3,5,7],          //diagonals
];
function displayBoard(board) {
  // console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}. Max plays best of ${MAX_TOTAL_SCORE}`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function prompt(message){
  console.log(`=>${message}`);
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectWinner(board); //!! inverts that object boolean and turn 0, null, 0
}
//made a custom joinOr function
function joinOr(array, delimiter = ', ', orand = 'or') {

  if (array.length === 0) return "";
  if (array.length === 1) return String(array[0]);
  if (array.length === 2) return array.join(` ${orand} `);

  let firstSection =  array.slice(0, array.length - 1)
  let lastSection = array[array.length - 1];

  return firstSection.join(`${delimiter}`) + `${delimiter}` + `${orand} ` + lastSection;
}

//create a new board
function initializeBoard() {
  let board = {} //intialize and declare an empty board object

  for(let square = 1; square <= 9; square++) { //create an object that that has a key from 1-9 with an intial marker of ''
    board[String(square)] = INITIAL_MARKER;
  }

  return board; //return the board object once it has been created.
}

function playerSquaresBoard(board) {
  let square; //declared here so we can use it outside the loop

  while(true) {
    prompt(`Choose a square (${joinOr(emptySquares(board))}):`);
    square = readline.question().trim();
    
    if(emptySquares(board).includes(square)) break; 

    prompt("Sorry, that's not a valid choice.")
  }

  board[square] = HUMAN_MARKER;
}

function findAtRiskSquare(line, board, marker){
  let markersInLine = line.map(square => board[square]);
  console.log(markersInLine, 'markersInLine');
  
  if(markersInLine.filter(val => val === marker).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if(unusedSquare !== undefined){
      return unusedSquare;
    }
  }

  return null;
}

//Finding a defensive-minded square means finding an empty square in a line where the other two squares belong to the human player.

// Finding an offensive-minded square means finding an empty square in a line where the other two squares belong to the computer.
function computerSquaresBoard(board) {
  let square;
  //defense
  for (let index = 0; index < WINNING_LINES.length; index++) {
    let line = WINNING_LINES[index];
    square = findAtRiskSquare(line, board, HUMAN_MARKER);
    console.log(square, 'square called');
    if (square) break;
  }
  //offense
  if(!square){
    for (let index = 0; index < WINNING_LINES.length; index++) {
      let line = WINNING_LINES[index];
      square = findAtRiskSquare(line, board, COMPUTER_MARKER);
      if (square) break;
    }
  }

  if(!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }

  board[square] = COMPUTER_MARKER;
}

function detectWinner(board) {
  for(let line = 0; line < WINNING_LINES.length; line++){
    let [sq1, sq2, sq3] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer'
    } 
  }

  return null;
}


while (true) {
  let playerWins = 0;
  let computerWins = 0;

  while(true) {
    let board = initializeBoard();
  
    while (true) {
      displayBoard(board); 
      playerSquaresBoard(board);
      if(someoneWon(board) || boardFull(board)) break;
  
      computerSquaresBoard(board);
      if(someoneWon(board) || boardFull(board)) break;
    }
  
    displayBoard(board);
  
    if(someoneWon(board)) {
      if (detectWinner(board) === 'Player'){
        playerWins += 1;
        console.log(playerWins, 'Player Wins');
      } else {
        computerWins += 1;
        console.log(computerWins, 'Computer Wins')
      }
      prompt(`${detectWinner(board)} won!`);
    } else {
      prompt(`It's a tie!`);
    }
  
  
    prompt('Play again? (y or n)');
    let answer = readline.question().toLowerCase()[0];
    if (answer !== 'y') break;
  }
  break;
}

prompt('Thanks for playing Tic Tac Toe!');