import { books } from "./state.js";
import { saveBooks } from "./storage.js";
import { searchBooks } from "./utils.js";
import { sortBooksByAuthor } from "./utils.js";
import { sortBooksByTitle } from "./utils.js";
import { sortBooksByYear } from "./utils.js";

export const formSection = document.getElementById("book-form-section");
export const form = document.getElementById("book-form");
export const title = document.getElementById("title");
export const author = document.getElementById("author");
export const genre = document.getElementById("genre");
export const year = document.getElementById("year");
export const status = document.getElementById("status");
export const description = document.getElementById("description");

export const formError = document.getElementById("form-error");

export const botona = document.getElementById("toggle-form-btn");
export const cancel = document.getElementById("cancel-form-btn");

export const searchInput = document.getElementById("search-input");

export const sortSelect = document.getElementById("sort-select");

export const emptyState = document.getElementById("empty-state");

export const booksGrid = document.getElementById("books-grid");

let editingBookId = null;

botona.addEventListener("click", () => {
  formSection.classList.toggle("hidden");
});

cancel.addEventListener("click", () => {
  editingBookId = null;
  form.reset();
  formError.classList.add("hidden");
  formSection.classList.add("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookTitle = title.value.trim();
  const bookAuthor = author.value.trim();
  const bookGenre = genre.value.trim();
  const bookYear = year.value.trim();
  const bookStatus = status.value.trim();
  const bookDescription = description.value.trim();

  if (bookTitle.length === 0 || bookAuthor.length === 0) {
    formError.classList.remove("hidden");
    return;
  } else {
    formError.classList.add("hidden");
  }

  const bookData = {
    title: bookTitle,
    author: bookAuthor,
    genre: bookGenre,
    year: bookYear === "" ? null : Number(bookYear),
    status: bookStatus,
    description: bookDescription,
  };

  if (editingBookId !== null) {
    const book = books.find((book) => book.id === editingBookId);

    Object.assign(book, bookData);
  } else {
    const newBook = {
      id: crypto.randomUUID(),
      ...bookData,
    };

    books.push(newBook);
  }

  saveBooks(books);
  renderBooks(books);
  editingBookId = null;
  form.reset();

  formSection.classList.add("hidden");
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();

    const results = searchBooks(books, query);
    renderBooks(results);
  }
});

sortSelect.addEventListener("change", () => {
  if (sortSelect.value === "title") {
    const sortTitle = sortBooksByTitle(books);
    renderBooks(sortTitle);
  } else if (sortSelect.value === "author") {
    const sortAuthor = sortBooksByAuthor(books);
    renderBooks(sortAuthor);
  } else if (sortSelect.value === "year") {
    const sortYear = sortBooksByYear(books);
    renderBooks(sortYear);
  }
});

booksGrid.addEventListener("click", (e) => {
  const button = e.target.closest('[data-action="edit"]');

  if (!button) return;

  const article = button.closest("article");
  const bookId = article.dataset.id;

  const book = books.find((book) => book.id === bookId);

  console.log(book);
  editingBookId = book.id;

  title.value = book.title;
  author.value = book.author;
  genre.value = book.genre;
  year.value = book.year ?? "";
  status.value = book.status;
  description.value = book.description;

  formSection.classList.remove("hidden");
});

booksGrid.addEventListener("click", (e) => {
  const button = e.target.closest('[data-action="delete"]');

  if (!button) return;

  const article = button.closest("article");
  const bookId = article.dataset.id;

  const confirmed = confirm("Are you sure you want to delete this book?");

  if (!confirmed) return;
  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) return;

  books.splice(bookIndex, 1);

  saveBooks(books);
  renderBooks(books);
});

export function renderBooks(books) {
  if (books.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  const booksGrid = document.getElementById("books-grid");
  booksGrid.innerHTML = "";
  books.forEach((book) => {
    const article = document.createElement("article");
    article.className =
      "group bg-[#FDFBF7] rounded-3xl border border-[#E6E0D6] p-6 shadow-2xs hover:shadow-md hover:border-[#D5CEC2] transition-all flex flex-col justify-between";

    article.dataset.id = book.id;

    const title = document.createElement("h3");
    title.textContent = book.title;
    title.className =
      "font-['Newsreader',serif] text-2xl font-medium text-[#1C1B18] mt-5 leading-snug";
    article.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `by ${book.author}`;
    author.className = "text-sm text-[#78736A] mt-1";
    article.appendChild(author);

    if (book.year !== null && book.year !== undefined) {
      const year = document.createElement("p");
      year.textContent = `Published in ${book.year}`;
      year.className = "text-xs text-[#78736A] mt-2";

      article.appendChild(year);
    }

    const description = document.createElement("p");
    description.textContent = book.description;
    description.className =
      "text-sm text-[#4A463F] mt-4 leading-relaxed line-clamp-3";
    article.appendChild(description);

    const genre = document.createElement("span");
    genre.textContent = book.genre;
    genre.className =
      "inline-block rounded-full bg-[#E6EFEA] text-[#2C4A3E] px-3 py-1 text-xs font-medium";
    article.appendChild(genre);

    const status = document.createElement("span");
    status.textContent = book.status.replace("-", " ");
    status.className =
      "inline-block rounded-full bg-[#F2ECE1] text-[#78736A] px-2.5 py-1 text-[11px] font-medium";
    article.appendChild(status);

    const action = document.createElement("div");
    action.className = "flex items-center gap-2";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.dataset.action = "edit";
    editButton.className = "edit-btn";
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    action.appendChild(editButton);
    action.appendChild(deleteButton);
    article.appendChild(action);

    booksGrid.appendChild(article);
  });
}
