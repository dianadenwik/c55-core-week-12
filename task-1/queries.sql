---- Queries


--Question 1** — List the title and published year of every book in the `'Science Fiction'` genre, ordered by published year (oldest first).
SELECT books.title, books.published_year
FROM books
WHERE genre = 'Science Fiction'
ORDER BY books.published_year ASC;

--Question 2** — Show every book published before 1950. Display the title and year only.
SELECT books.title, books.published_year FROM books
 WHERE published_year < 1950;


--Question 3** — Show every book in the database along with its author's full name. Combine `first_name` and `last_name` into a single column called `author`. *(Hint: you will need a JOIN.)*
SELECT b.title, a.first_name || ' ' || a.last_name AS author
FROM books b
JOIN authors a ON a.id = b.author_id


--Question 4** — List all books written by Stephen King. Show the title and published year, ordered by year. *(Hint: JOIN the two tables and filter on the author's name.)*
SELECT b.title, b.published_year
FROM books b
JOIN authors a ON a.id = b.author_id
WHERE a.first_name = 'Stephen' AND a.last_name = 'King'
ORDER BY b.published_year;

--Question 5** — Add yourself as a new author. Use your real name, or make one up. Pick any nationality and birth year.
INSERT INTO authors (first_name, last_name, nationality, birth_year) 
VALUES ('Diana', 'Chukhrai', 'Ukrainian', 2001);


--Question 6** — Add one book for the author you just inserted. It can be a real book or a made-up one.
INSERT INTO books (title, published_year, genre, author_id) 
VALUES ('Spaces',2005, 'Fantasy', 25);

--Question 7** — The genre for "The Dark Tower: The Gunslinger" was entered incorrectly as `'Fantasy'`. It should be `'Horror'`. Write an UPDATE to fix it, then verify the change with a SELECT.
UPDATE books 
SET genre = 'Horror'
WHERE title = 'The Dark Tower: The Gunslinger';



--Question 8** — Delete the book you added in Question 6. Make sure your query targets only that specific row.
DELETE FROM books
WHERE books.id = 101;
---

-- ### Bonus questions _(optional)_

-- These cover topics slightly beyond the core material. Have a go if you finish early.

--**Bonus A** — How many books are there per genre? Show the genre name and the count, ordered from most to fewest books.
SELECT genre, COUNT(*) AS book_count
FROM books
GROUP BY genre
ORDER BY book_count DESC;

--**Bonus B** — Find any authors in the database who have no books at all. *(Hint: you will need a LEFT JOIN and check for NULL.)*
SELECT a.first_name, a.last_name
FROM authors a
LEFT JOIN books b ON b.author_id = a.id
WHERE b.id IS NULL;
