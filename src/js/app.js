import { books } from "./state.js";
import { loadBooks } from "./storage.js";
import { renderBooks } from "./ui.js";
books.push(...loadBooks());
renderBooks(books);
