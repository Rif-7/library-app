class Book {
    constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    }

    info() {
        if (this.read) {
            return `${this.title} by ${this.author}, ${this.pages} pages, finished reading`;
        } 
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
    
}

const myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
    return;
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
                showBooks(myLibrary);
                return;
            })
            buttonDiv.appendChild(readBtn);
        }

        buttonDiv.appendChild(removeBtn);
        div.appendChild(buttonDiv);
        container.appendChild(div);
    }
}

function removeButton(e) {
    let pos = Number(e.target.getAttribute("data-bookno"));
    console.log(pos);
    myLibrary.splice(pos, 1);
    showBooks(myLibrary);
};




const addButton = document.querySelector(".add-btn");
addButton.addEventListener("click", () => {
    let newBook = prompt("Title, Author, Pages, Read(y/n): ");
    newBook = newBook.split(", ");
    newBook = new Book(newBook[0], newBook[1], newBook[2], (newBook[3] === "y") ? true : false);
    addBookToLibrary(newBook);
    showBooks(myLibrary);
    return;
});


const removeBtns = document.querySelectorAll(".remove-btn");
removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", removeButton)
});


