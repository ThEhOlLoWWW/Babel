import { captureOwnerStack } from "react";

export const botona = document.getElementById("toggle-form-btn");
export const form = document.getElementById("book-form-section");
export const cancel = document.getElementById("cancel-form-btn");

botona.addEventListener("click", (e) => {
  form.classList.toggle("hidden");
});

cancel.addEventListener("click", (e) => {
  form.classList.toggle("hidden");
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

    booksGrid.appendChild(article);
  });
}
