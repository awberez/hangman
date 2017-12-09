const randomWords = require("random-words"), Letter = require("./letter.js");

let Word = function() { this.word = randomWords(); }

Word.prototype.createLetters = function() {
	let array = [];
	for (let i = 0; i < this.word.length; i++) array.push(new Letter(this.word[i]));
	return array;
}

module.exports = Word;