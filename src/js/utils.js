export function searchBooks(books, query) {
  const normalizedQuery = query.trim().toLowerCase();

  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(normalizedQuery) ||
      book.author.toLowerCase().includes(normalizedQuery),
  );
}

export function sortBooksByTitle(books) {
  return [...books].sort((a, b) => a.title.localeCompare(b.title));
}

export function sortBooksByAuthor(books) {
  return [...books].sort((a, b) => a.author.localeCompare(b.author));
}

export function sortBooksByYear(books) {
  return [...books].sort((a, b) => {
    if (a.year === null) return 1;
    if (b.year === null) return -1;

    return a.year - b.year;
  });
}
