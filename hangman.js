const inquirer = require("inquirer"), Word = require("./word.js"), Letter = require("./letter.js");

let newWord, letterArr, guessArr, totalRight, wrongLeft;

function startGame() {
	newWord = new Word(), letterArr = [], guessArr = [], totalRight = 0, wrongLeft = 9;
	for (let i = 0; i < newWord.chosen.length; i++) letterArr.push(new Letter(newWord.chosen[i]));
	displayGame();
	userPrompt();
}

function displayGame(guess) {
	let displayArr = [], nowRight = 0;
	for (let letter of letterArr) {
		let match = false;
		for (let guess of guessArr) if (letter.visible == guess) match = true;
		match ? (displayArr.push(letter.visible), nowRight++) : displayArr.push(letter.hidden);
	}
	if (guess && nowRight > totalRight) {
		console.log(`\nCorrect!`);
		totalRight = nowRight;
		console.log(`\n${displayArr.join(" ")}\n`);
	}
	else if (guess) {
		wrongLeft--;
		if (wrongLeft > 1) console.log(`\nIncorrect! ${wrongLeft} guesses remaining!\n`);
		else if (wrongLeft) console.log(`\nIncorrect! ${wrongLeft} guess remaining!\n`);
	}
	else console.log(`\n${displayArr.join(" ")}\n`);
}

function validateNew(letter) {
	if (letter == "exit") return true;
	let noMatch = true;
	for (let guess of guessArr) if (letter == guess) noMatch = false;
	return (letter.match(/^[A-Za-z]+$/) && letter.length == 1) ? noMatch || "You've already guessed that letter!" : false || "Invalid guess!";
}

function userPrompt() {
	inquirer
		.prompt([ {type: "input", message: "Guess a letter!", name: "guess", validate: validateNew }])
		.then((response)=>{
			if (response.guess == "exit") return;
			guessArr.push(response.guess.toLowerCase());
			displayGame(true);
			totalRight == newWord.chosen.length 
				? (console.log(`You win! The word was "${newWord.chosen}".\n`), playAgain())
				: wrongLeft == 0 
					? (console.log(`\nYou lose! The word was "${newWord.chosen}".\n`), playAgain())
					: userPrompt();
		});
}

function playAgain() { inquirer.prompt([{ type: "confirm", message: "Play again?", name: "replay" }]).then((response)=>{ if (response.replay) startGame(); }); }

startGame();