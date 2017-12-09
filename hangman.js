const inquirer = require("inquirer"), colors = require("colors"), Word = require("./word.js"), Validation = require("./validate.js");

let newWord, letterArr, guessArr, totalRight, wrongLeft, winStreak = 0;

function startGame() {
	newWord = new Word(), letterArr = newWord.createLetters(), guessArr = [], totalRight = 0, wrongLeft = 9;
	console.log(`\n${`${letterArr.map(Letter => Letter.hidden).join(' ')}`.blue.bold}\n`);
	userPrompt();
}

function userPrompt() {
	inquirer
		.prompt([ {type: "input", message: "Guess a letter!".gray.reset, name: "guess", validate: validCheck }])
		.then((response)=>{
			guessArr.push(response.guess.toLowerCase());
			displayGuess();
			totalRight == newWord.word.length
				? (winStreak++, console.log(`${'YOU WIN!'.green.bold} ${'The word was:'.yellow} ${`${newWord.word}`.cyan}\n\n${'Current winning streak:'.yellow} ${`${winStreak}`.magenta}\n`), playAgain())
				: !wrongLeft
					? (winStreak = 0, console.log(`\n${'YOU LOSE!'.red.bold} ${'The word was:'.yellow} ${`${newWord.word}`.cyan}\n`), playAgain())
					: userPrompt();
		});
}

function validCheck(guess) { return new Validation(guess, guessArr).check(); }

function displayGuess() {
	let resultArr = [], nowRight = 0, wrong = false;
	for (let letter of letterArr) resultArr.push(letter.guessCheck(guessArr));
	for (let result of resultArr) if (result != "_") nowRight++;
	totalRight < nowRight ? (totalRight = nowRight, console.log(`\n${'Correct!'.green.bold}\n\n${`${resultArr.join(" ")}`.blue.bold}\n`)) : (wrong = true, wrongLeft--);
	if (wrong && wrongLeft) console.log(`\n${'Incorrect!'.red.bold} ${'Wrong guesses remaining:'.yellow} ${`${wrongLeft}`.magenta}\n`);
}

function playAgain() { inquirer.prompt([{ type: "confirm", message: "Play again?".gray.reset, name: "replay" }]).then((response)=>{ if (response.replay) startGame(); }); }

startGame();