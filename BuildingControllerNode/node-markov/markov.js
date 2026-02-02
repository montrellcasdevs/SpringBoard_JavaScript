/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      const next = i === this.words.length - 1 ? null : this.words[i + 1];
      if (!this.chains.has(word)) this.chains.set(word, []);
      this.chains.get(word).push(next);
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    if (this.words.length === 0) return "";
    const keys = Array.from(this.chains.keys());
    let word = keys[Math.floor(Math.random() * keys.length)];
    const out = [];
    for (let i = 0; i < numWords; i++) {
      if (word === null) break;
      out.push(word);
      const nextChoices = this.chains.get(word);
      if (!nextChoices) break;
      word = nextChoices[Math.floor(Math.random() * nextChoices.length)];
    }
    return out.join(" ");
  }
}

module.exports = { MarkovMachine };
