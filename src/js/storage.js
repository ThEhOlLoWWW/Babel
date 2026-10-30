export function saveBooks(books) {
  localStorage.setItem("babel-books", JSON.stringify(books));
}

export function loadBooks() {
  const booksArray = localStorage.getItem("babel-books");
  if (booksArray === null) {
    return [];
  } else {
    return JSON.parse(booksArray);
  }
}
