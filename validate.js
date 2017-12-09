let Validation = function(guess, guessArr) { this.guess = guess, this.guessArr = guessArr; }

Validation.prototype.check = function() {
	let noMatch = true;
	for (let prevGuess of this.guessArr) if (this.guess == prevGuess) noMatch = false;
	return (this.guess.match(/^[A-Za-z]+$/) && this.guess.length == 1) ? noMatch || "You've already guessed that letter!" : false || "Invalid guess!";
}

module.exports = Validation;