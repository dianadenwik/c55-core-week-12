// database.js
// Your task: implement each function below using better-sqlite3.
// The function signatures are identical to storage.js so you can
// compare the two files side by side.
//
// When every function works correctly, `node app.js` should
// print exactly the same output as it did with storage.js.

import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_FILE = join(__dirname, "../data/flashcards.db");

const db = new Database(DB_FILE);

// ----------------------------------------------------------------
// Decks
// ----------------------------------------------------------------

export function getAllDecks() {
  const decks = db.prepare("SELECT * FROM decks").all();
  return decks;
}

export function getDeckById(id) {
  const stmt = db.prepare("SELECT * FROM decks WHERE id = ?");
  const deck = stmt.get(id);
  return deck;
}

export function addDeck(name, description) {
  const insertDecks = db.prepare(`
  INSERT INTO decks (name, description)
  VALUES (@name, @description)
`);
  const info = insertDecks.run({
    name: name,
    description: description,
  });

  return {
    id: info.lastInsertRowid,
    name: name,
    description: description,
  };
}

export function deleteDeck(deckId) {
  const info = db.prepare("DELETE FROM decks WHERE id = ?").run(deckId);
  return info.changes > 0;
}

// ----------------------------------------------------------------
// Cards
// ----------------------------------------------------------------

export function getAllCardsForDeck(deckId) {
  const stmt = db.prepare(
    `SELECT id, question, answer, learned, deck_id AS deckId FROM cards WHERE deck_id = ?`,
  );
  const cards = stmt.all(deckId);
  return cards;
}

export function addCard(question, answer, deckId) {
  const insertCards = db.prepare(`
  INSERT INTO cards (question, answer, deck_id)
  VALUES (@question, @answer,  @deckId)`);

  const info = insertCards.run({
    question: question,
    answer: answer,
    deckId: deckId,
  });

  return {
    id: info.lastInsertRowid,
    question: question,
    answer: answer,
    deckId: deckId,
  };
}
export function markCardLearned(cardId) {
  db.prepare('UPDATE cards SET learned = 1 WHERE id = ?').run(cardId);
  const card = db.prepare('SELECT * FROM cards WHERE id = ?').get(cardId);
  if (!card) return null;
  card.learned = true;
  return card;
}

export function deleteCard(cardId) {
  const deleteCard = db.prepare("DELETE FROM cards WHERE id = ?");
  const info = deleteCard.run(cardId);
  return info.changes > 0;
}
