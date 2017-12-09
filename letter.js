let Letter = function(letter) { this.visible = letter, this.hidden = "_"; }

Letter.prototype.guessCheck = function(array) {
	let match = false;
	for (let guess of array) if (this.visible == guess) match = true;
	return match ? this.visible : this.hidden;	
}

module.exports = Letter;