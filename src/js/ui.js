import { books } from "./state.js";
import { saveBooks } from "./storage.js";

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

botona.addEventListener("click", () => {
  formSection.classList.toggle("hidden");
});

cancel.addEventListener("click", () => {
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

  const newBook = {
    id: crypto.randomUUID(),
    title: bookTitle,
    author: bookAuthor,
    genre: bookGenre,
    year: bookYear === "" ? null : Number(bookYear),
    status: bookStatus,
    description: bookDescription,
  };

  books.push(newBook);

  saveBooks(books);
  renderBooks(books);

  form.reset();

  formSection.classList.add("hidden");
});

export function renderBooks(books) {
  const booksGrid = document.getElementById("books-grid");
  booksGrid.innerHTML = "";
  books.forEach((book) => {
    const article = document.createElement("article");
    article.className =
      "group bg-[#FDFBF7] rounded-3xl border border-[#E6E0D6] p-6 shadow-2xs hover:shadow-md hover:border-[#D5CEC2] transition-all flex flex-col justify-between";

    const title = document.createElement("h3");
    title.textContent = book.title;
    title.className =
      "font-['Newsreader',serif] text-2xl font-medium text-[#1C1B18] mt-5 leading-snug";
    article.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `by ${book.author}`;
    author.className = "text-sm text-[#78736A] mt-1";
    article.appendChild(author);

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
