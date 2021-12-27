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
  document.querySelector(".new-book-form").style.display = "block";
  return;
});

const saveButton = document.querySelector(".save-btn");
saveButton.addEventListener("click", () => {
  document.querySelector("new-book-form").display = "none";
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  let read = document.querySelector('input[name="read"]:checked').value;

  read = read === "yes" ? true : false;
  newBook = new Book(title, author, pages, read);
  Book.addBookToLibrary(newBook);
  showBooks(Book.getLibrary());
});
