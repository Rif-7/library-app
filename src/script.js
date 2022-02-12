const formDiv = document.querySelector(".new-book-form");
const form = document.querySelector("form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");

import "./style.css";

const errorField = document.querySelector(".error-field");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  static myLibrary = [];

  info() {
    if (this.read) {
      return `${this.title} by ${this.author}, ${this.pages} pages, finished reading`;
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
  }

  static getLibrary() {
    return Book.myLibrary;
  }

  static addBookToLibrary(book) {
    Book.myLibrary.push(book);
    return;
  }

  static removeFromLibrary(index) {
    Book.myLibrary.splice(index, 1);
  }
}

function showBooks(books) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    let div = document.createElement("div");
    let removeBtn = document.createElement("button");
    let buttonDiv = document.createElement("div");
    removeBtn.classList.add("btn");
    removeBtn.setAttribute("data-bookno", `${i}`);
    removeBtn.textContent = "Remove Book";
    removeBtn.addEventListener("click", removeButton);

    div.textContent = books[i].info();
    div.classList.add(`item`);
    if (!books[i].read) {
      let readBtn = document.createElement("button");
      readBtn.textContent = "Mark as Read";
      readBtn.classList.add("btn");
      readBtn.style.marginRight = "3px";
      readBtn.addEventListener("click", () => {
        books[i].read = true;
        showBooks(Book.getLibrary());
        return;
      });
      buttonDiv.appendChild(readBtn);
    }

    buttonDiv.appendChild(removeBtn);
    div.appendChild(buttonDiv);
    container.appendChild(div);
  }
}

function removeButton(e) {
  let pos = Number(e.target.getAttribute("data-bookno"));
  Book.removeFromLibrary(pos);
  showBooks(Book.getLibrary());
}

const addButton = document.querySelector(".add-btn");
addButton.addEventListener("click", () => {
  formDiv.style.display = "block";
  return;
});

const saveButton = document.querySelector(".save-btn");
saveButton.addEventListener("click", () => {
  let read = document.querySelector('input[name="read"]:checked');

  if (!form.checkValidity()) {
    errorField.style.display = "block";

    if (!title.checkValidity()) {
      errorField.textContent = "Title is not valid";
    } else if (!author.checkValidity()) {
      errorField.textContent = "Author is not valid";
    } else if (!pages.checkValidity()) {
      errorField.textContent = "Pages should be greater than or equal to zero";
    } else if (!read) {
      errorField.textContent = "Select option for read";
    }

    return;
  }

  read = read.value === "yes" ? true : false;
  let newBook = new Book(title.value, author.value, pages.value, read);

  form.reset();

  Book.addBookToLibrary(newBook);
  showBooks(Book.getLibrary());
  formDiv.style.display = "none";
  errorField.textContent = "";
  errorField.style.display = "none";
});

const cancelButton = document.querySelector(".cancel-btn");
cancelButton.addEventListener("click", () => {
  formDiv.style.display = "none";
  errorField.textContent = "";
  errorField.style.display = "none";
  form.reset();
});
