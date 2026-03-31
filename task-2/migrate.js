import fs from "node:fs";
import path from "path";
import Database from "better-sqlite3";

const dataPath = path.join("data", "data.json");
const data = fs.readFileSync(dataPath, "utf-8");
const res = JSON.parse(data);

// Open the database file.
// If the file doesn't exist, better-sqlite3 will create it.
const db = new Database("data/flashcards.db");

const insertDecks = db.prepare(`
  INSERT INTO decks (name, description)
  VALUES (@name, @description)
`);

for (const deck of res.decks) {
  insertDecks.run({
    name: deck.name,
    description: deck.description,
  });
}


const insertCards = db.prepare(`
  INSERT INTO cards (question, answer, learned, deck_id)
  VALUES (@question, @answer, @learned, @deck_id)
`);

for (const card of res.cards) {
  insertCards.run({
    question: card.question,
    answer: card.answer,
    learned: card.learned ? 1 : 0,
    deck_id: card.deckId

  });
}