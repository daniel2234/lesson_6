const readline = require('readline-sync');

function displayBoard(board) {
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

function initializeBoard() {
  let board = {}

  for(let square = 1; square <= 9; square++) {
    board[String(square)] = ' ';
  }

  return board;
}

function playerChoosesSquare(board){
  let square; //declared here so you can use outside the loop

  //valid squares choices are those 'board' keys whose values are spaces
  let emptySquares = Object.keys(board).filter(key => board[key] === ' ');

  while(true) {
    prompt('Choose a square(1-9):');
    square = readline.question().trim(); //input trimmed to allows spaces in input
    if (emptySquares.includes(square)) {
      break; //break is it is a valid square
    } else {
      prompt("Sorry, that's not a valid choice");
    }
  }  
  board[square] = 'X';
}

let board = initializeBoard();
displayBoard(board);

playerChoosesSquare(board);
displayBoard(board);

