const randomWords = require("random-words");

let Word = function() {
	this.chosen = randomWords();
}

module.exports = Word;