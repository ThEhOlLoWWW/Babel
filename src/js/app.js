import { books } from "./state.js";
import { loadBooks } from "./storage.js";
import { form } from "./ui.js";
import { cancel } from "./ui.js";
books.push(...loadBooks());
