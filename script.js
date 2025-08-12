const library = document.querySelector('.library');
const dialog = document.getElementById('form-dialog');
const newBookBtn = document.getElementById('new-book');
const addBookBtn = document.getElementById('add-btn');


let myLibrary = [];

function Book(title, author, pages, hasRead) {
   if (!new.target) {
    throw Error ('You must use the "new" operator when calling the constructor')
   } 

   this.title = title;
   this.author = author;
   this.pages = pages;
   this.hasRead = hasRead;

   this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.hasRead ? "read" : "not read yet"}`
   }
};

Book.prototype.toggleRead = function () {
   this.hasRead = this.hasRead === "Yes" ? "No" : "Yes";
}

function addBookToLibrary(title, author, pages, hasRead) {
   title = document.getElementById('title').value;
   author = document.getElementById('author').value;
   pages = document.getElementById('pages').value;
   hasRead = document.getElementById('read').value;

   if (title !== "" && author !== "" && pages !== ""){
   const book = new Book(title, author, pages, hasRead);
   book.id = crypto.randomUUID();
   myLibrary.push(book);
   displayLibrary();
   } else {
      alert("Please fill all the required fields")
   }
};

function displayLibrary() {
   library.innerHTML = "";
   myLibrary.forEach((book) => {
      library.innerHTML += `
            <div id=${book.id} class="book-card">
               <dl>
                <dt>Title:</dt>   <dd>${book.title}</dd>
                <dt>Author:</dt>  <dd>${book.author}</dd>
                <dt>Pages:</dt>   <dd>${book.pages}</dd>
                <dt>Read?:</dt>   <dd>${book.hasRead}</dd>
                <dt>Id:</dt>   <dd>${book.id}</dd>
               </dl>
            
               <div class="button-container">
                <button class="has-read">Read?</button>
                <button class="remove-book">Remove Book</button>
               </div>
            </div>
      ` ;
   } )
};



// buttons

newBookBtn.addEventListener('click', () => {
   dialog.showModal();
});

addBookBtn.addEventListener('click', (e) => {
   e.preventDefault();
   addBookToLibrary();
} );

// remove book button with event delgation & read toggle
library.addEventListener('click', (e) => {
   const card = e.target.closest('.book-card')
   
   if (e.target.classList.contains('remove-book')) {
      card.remove();
      myLibrary.filter((book) => book !== card.id)
   }

   if (e.target.classList.contains('has-read')) {
     const bookTarget = myLibrary.find(({id}) => id === card.id);
     bookTarget.toggleRead();
     displayLibrary();
   }
})

// toggle read


