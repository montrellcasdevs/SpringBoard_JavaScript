const { MarkovMachine } = require('./markov');

test('makeChains builds correct chains', () => {
  let mm = new MarkovMachine("the cat in the hat");
  expect(mm.chains.get("the")).toEqual(["cat", "hat"]);
  expect(mm.chains.get("cat")).toEqual(["in"]);
  expect(mm.chains.get("in")).toEqual(["the"]);
  expect(mm.chains.get("hat")).toEqual([null]);
});

test('makeText returns words from chains and honors numWords', () => {
  let mm = new MarkovMachine("the cat in the hat");
  let txt = mm.makeText(10);
  let words = txt.split(/\s+/).filter(Boolean);
  expect(words.length).toBeLessThanOrEqual(10);
  for (let w of words) {
    expect(mm.chains.has(w)).toBe(true);
  }
});

test('makeText stops when null is reached', () => {
  let mm = new MarkovMachine("a b");
  let txt = mm.makeText(100);
  let words = txt.split(/\s+/).filter(Boolean);
  expect(words[words.length - 1]).toBe('b');
});
