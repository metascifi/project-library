const myLibrary = [];
let bookTable = document.querySelector(".book-section table");
let firstRowTable = document.querySelector("table tr:first-child");
firstRowTable.style.display = "none";
let contentContainer = document.querySelector(".book-section")
let btnNewBook = document.querySelector("#newBook");
let warningText = document.createElement("p");
let tableRow = document.createElement("tr");


function Book(name, author, year, pages, isRead) {
  this.name = name,
  this.author = author,
  this.year = year,
  this.pages = pages,
  this.isRead = isRead
}

function addBookToLibrary(name, author, year, pages, isRead) {
    if (isRead.checked === true){
        isRead = "Completed"
    } else {
        isRead = "Not finished"
    };
    let BookInst = new Book(name, author, year, pages, isRead);
    myLibrary.push(BookInst);
    return BookInst;
}

btnNewBook.addEventListener("click", (event) => {
    
    
    btnNewBook.style.display = "none";
   

    function setAttributes (element, attributes) {
        for (let i = 0; i < attributes.length; i++) {
            element.setAttribute(attributes[i][0], attributes[i][1]);
        }
    }

    let bookForm = document.createElement("form");
    setAttributes(bookForm, [["method", "get"], ["action", "#"]]);
    contentContainer.appendChild(bookForm);

    let nameInput = document.createElement("input");
    setAttributes(nameInput, [
        ["type", "text"],
        ["id", "name"],
        ["name", "name"],
        ["placeholder", "Name"],
        ["required", ""],
        ["class", "field"]
    ]);
    bookForm.appendChild(nameInput);
    
    let authorInput = document.createElement("input");
    setAttributes(authorInput, [
        ["type", "text"],
        ["id", "author"],
        ["name", "author"],
        ["placeholder", "Author"],
        ["required", ""],
        ["class", "field"]
    ]);
    bookForm.appendChild(authorInput);
    
    let yearInput = document.createElement("input");
    setAttributes(yearInput, [
        ["type", "tel"],
        ["id", "year"],
        ["name", "year"],
        ["placeholder", "Year"],
        ["required", ""],
        ["class", "field"]
    ]);
    bookForm.appendChild(yearInput);

    let pagesInput = document.createElement("input");
    setAttributes(pagesInput, [
        ["type", "number"],
        ["id", "pages"],
        ["name", "pages"],
        ["placeholder", "Number of pages"],
        ["required", ""],
        ["class", "field"]
    ]);
    bookForm.appendChild(pagesInput);

    let completeInput = document.createElement('input');
    setAttributes(completeInput, [
        ["type", "checkbox"], 
        ["id", "completionCheck"], 
        ["name", "completionCheck"],
        ["required", ""],
        ["value", "on"],
        ["class", "check"]
    ])
    bookForm.appendChild(completeInput);
    
    btnConfirm = document.createElement('button');
    setAttributes(btnConfirm, [
        ["type", "button"]
    ]);
    btnConfirm.textContent = "CONFIRM";
    bookForm.appendChild(btnConfirm);
    

    btnConfirm.addEventListener('click', (event) => {
        let canBeAdded = true;
        let btnRemove;
        
        for (element of document.querySelectorAll("form input")) {
          if (element.value === "") {
             canBeAdded = false;
         }
        }; 
        if (canBeAdded) {
         // Hides table heading and warning text for empty fields;
         firstRowTable.style.display = "table-row";
         warningText.style.display = "none";

         // Adds a book to the library 
         let addedBook = addBookToLibrary(nameInput.value, authorInput.value, yearInput.value, pagesInput.value, completeInput)
         tableRow = document.createElement("tr");
         tableRow.setAttribute("class", "table-row")
         bookTable.appendChild(tableRow);
         let properties = Object.keys(addedBook);
         for (let i = 0; i < properties.length; i++){
              tableCell = document.createElement("td");
              tableRow.appendChild(tableCell);
              tableCell.textContent = addedBook[properties[i]];
          };

          // Creates remove button 
         btnRemove = document.createElement("button");
         btnRemove.textContent = "Remove!";
         tableRow.appendChild(btnRemove);
         btnRemove.setAttribute("class", "btnRemove");

         for (let element of document.querySelectorAll("form .field")){
            element.value = "";
        };
        } else {
             warningText.style.display = "block";
             warningText.textContent = "Please, fill all fields!"
             contentContainer.appendChild(warningText);
        }; 

        //Removes a book from list 
        btnRemove.addEventListener("click", (event) => {
            let btnRemoveList = bookTable.querySelectorAll("tr button");
            for (let i = 0; i < btnRemoveList.length; i++){
                btnRemoveList[i].index = i;
            } 
    
            let tableRowList = bookTable.querySelectorAll("table .table-row");
    
            for (let i = 0; i < tableRowList.length; i++) {
                tableRowList[i].index = i;
            }
    
            let tableRowListLength = tableRowList.length;
    
            console.log(btnRemoveList);
            console.log(tableRowList);
    
            for (let i = 0; i < tableRowListLength; i++) {
                console.log(tableRowList);
                if (event.target.index === tableRowList[i].index){
                    tableRowList[i].remove();
                    myLibrary.splice([i],1);
            }
                }
        });
    })


})

