const myLibrary = [];
let bookTable = document.querySelector(".book-section table");
let firstRowTable = document.querySelector("table tr:first-child");
bookTable.style.display = "none";
firstRowTable.style.display = "none";
let contentContainer = document.querySelector(".book-section")
let btnNewBook = document.querySelector("#newBook");
let warningText = document.createElement("p");
let tableRow = document.createElement("tr");
let dropdownContainer = document.createElement("div");
let dropdown = document.createElement("div");
let optionOne = document.createElement("p");
let optionTwo = document.createElement("p");
let inputContainer = document.createElement("div");
let iconContainer = document.createElement("div");
let dropdownIcon = document.createElement("img");
let checkConfirmation;


class Book {
  constructor(name, author, year, pages, isRead) {
    this.name = name,
    this.author = author,
    this.year = year,
    this.pages = pages,
    this.isRead = isRead
  }
};

function addBookToLibrary(name, author, year, pages, isRead) {
    if (isRead.checked === true){
        checkConfirmation = "Completed"
    } else {
        checkConfirmation = "Not finished"
    };
    let BookInst = new Book(name, author, year, pages, checkConfirmation);
    myLibrary.push(BookInst);
    dropdownContainer = document.createElement("div");
    BookInst.isRead = dropdownContainer; 
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

    let fieldSet = document.createElement("fieldset");
    bookForm.appendChild(fieldSet);

    let inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "input-container");
    fieldSet.appendChild(inputContainer);

    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.textContent = "Book name";
    let nameInput = document.createElement("input");
    setAttributes(nameInput, [
        ["type", "text"],
        ["id", "name"],
        ["name", "name"],
        ["placeholder", "Name"],
        ["required", ""],
        ["class", "field"]
    ]);
    inputContainer.appendChild(nameLabel);
    inputContainer.appendChild(nameInput);
    

    inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "input-container");
    fieldSet.appendChild(inputContainer);


    let authorLabel = document.createElement("label");
    authorLabel.setAttribute("for", "author");
    authorLabel.textContent = "Author";
    let authorInput = document.createElement("input");
    setAttributes(authorInput, [
        ["type", "text"],
        ["id", "author"],
        ["name", "author"],
        ["placeholder", "Author"],
        ["required", ""],
        ["class", "field"]
    ]);
    inputContainer.appendChild(authorLabel);
    inputContainer.appendChild(authorInput);
    

    inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "input-container");
    fieldSet.appendChild(inputContainer);

    let yearLabel = document.createElement("label");
    yearLabel.setAttribute("for", "year");
    yearLabel.textContent = "Publishing year";
    let yearInput = document.createElement("input");
    setAttributes(yearInput, [
        ["type", "tel"],
        ["id", "year"],
        ["name", "year"],
        ["placeholder", "Year"],
        ["required", ""],
        ["class", "field"]
    ]);
    inputContainer.appendChild(yearLabel);
    inputContainer.appendChild(yearInput);


    inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "input-container");
    fieldSet.appendChild(inputContainer);
    let pagesLabel = document.createElement("label");
    pagesLabel.setAttribute("for", "pages");
    pagesLabel.textContent = "Pages";
    let pagesInput = document.createElement("input");
    setAttributes(pagesInput, [
        ["type", "number"],
        ["id", "pages"],
        ["name", "pages"],
        ["placeholder", "Number of pages"],
        ["required", ""],
        ["class", "field"]
    ]);
    inputContainer.appendChild(pagesLabel);
    inputContainer.appendChild(pagesInput);


    inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "input-container");
    bookForm.appendChild(inputContainer);
    let completeLabel = document.createElement("label");
    completeLabel.setAttribute("for", "completionCheck");
    completeLabel.textContent = "Have you read the book?";
    let completeInput = document.createElement('input');
    setAttributes(completeInput, [
        ["type", "checkbox"], 
        ["id", "completionCheck"], 
        ["name", "completionCheck"],
        ["required", ""],
        ["value", "on"],
        ["class", "check"]
    ])
    inputContainer.appendChild(completeLabel);
    inputContainer.appendChild(completeInput);
    
    btnConfirm = document.createElement('button');
    setAttributes(btnConfirm, [
        ["type", "button"]
    ]);
    btnConfirm.textContent = "CONFIRM";
    bookForm.appendChild(btnConfirm);
    

    btnConfirm.addEventListener('click', (event) => {
        let canBeAdded = true;
        let btnRemove;
        let addBookButton;
        
        for (element of document.querySelectorAll("form input")) {
          if (element.value === "") {
             canBeAdded = false;
         }
        }; 
        if (canBeAdded) {
         // Hides table heading and warning text for empty fields;
         firstRowTable.style.display = "table-row";
         warningText.style.display = "none";
         bookTable.style.display = "block";
         bookForm.style.display = "none";
         addBookButton = document.createElement("button");
         addBookButton.textContent = "Add new book!";
         addBookButton.setAttribute("class", "add-book-button");
         contentContainer.appendChild(addBookButton);
         addBookButton.style.display = "inilne-block";

         // Adds a book to the library 
         let addedBook = addBookToLibrary(nameInput.value, authorInput.value, yearInput.value, pagesInput.value, completeInput)
         tableRow = document.createElement("tr");
         tableRow.setAttribute("class", "table-row")
         bookTable.appendChild(tableRow);
         let properties = Object.keys(addedBook);
         let tableCell;
         for (let i = 0; i < properties.length; i++){
              tableCell = document.createElement("td");
              tableRow.appendChild(tableCell);
              if ((typeof addedBook[properties[i]]) === "string") {
              tableCell.textContent = addedBook[properties[i]];
              } else if ((typeof addedBook[properties[i]]) === "object") {
                tableCell.appendChild(addedBook[properties[i]]);
                dropdown = document.createElement("div");
                optionOne = document.createElement("p");
                iconContainer = document.createElement("div");
                iconContainer.setAttribute("class", "icon-container");
                dropdownIcon = document.createElement("img");
                dropdownIcon.setAttribute("src", "icons/arrow.svg");
                optionTwo = document.createElement("p");
                dropdownContainer.setAttribute("class", "dropdown-container");
                dropdownContainer.appendChild(dropdown);
                dropdown.setAttribute("class", "dropdown");
                dropdown.appendChild(optionOne);
                dropdown.appendChild(optionTwo);
                optionOne.appendChild(iconContainer);
                iconContainer.append(dropdownIcon);
                addedBook[properties[i]] = checkConfirmation;
              }
          };

          // Creates remove button 
         tableCell = document.createElement("td");
         tableRow.appendChild(tableCell);
         btnRemove = document.createElement("button");
         btnRemove.textContent = "Remove!";
         tableCell.appendChild(btnRemove);
         btnRemove.setAttribute("class", "btnRemove");

         for (let element of document.querySelectorAll("form .field")){
            // console.log(element.value);
            element.value = "";
        };

        document.querySelector("form .check").checked = false;

        } else {
             warningText.style.display = "block";
             warningText.textContent = "Please, fill all fields!"
             let body = document.querySelector("body");
             body.appendChild(warningText);
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
    
            // console.log(btnRemoveList);
            // console.log(tableRowList);
    
            for (let i = 0; i < tableRowListLength; i++) {
                // console.log(tableRowList);
                // console.log(event.target.index === tableRowList[i].index);
                if (event.target.index === tableRowList[i].index){
                    tableRowList[i].remove();
                    myLibrary.splice([i],1);
                }
            };

            if (bookTable.querySelectorAll("table .table-row")[0] === undefined) {
                bookTable.style.display = "none";
                warningText.style.display = "none";
            }
        });

        if (checkConfirmation === "Completed") {
            optionOne.textContent = "Completed";
            optionTwo.textContent = "Not finished";
        } else { 
            optionOne.textContent = "Not finished";
            optionTwo.textContent = "Completed";
        }
        let optionOneList = bookTable.querySelectorAll("tr .dropdown p:first-child");
        let optionTwoList = bookTable.querySelectorAll("tr .dropdown p:last-child");
        let dropdownContainerList = bookTable.querySelectorAll("tr .dropdown-container");
        let tableRowList = bookTable.querySelectorAll("table .table-row");
        let dropdownList = bookTable.querySelectorAll("tr .dropdown");
        
        // Displays dropdown by clicking 
        dropdown.addEventListener("click", (event) => {

            optionOneList = bookTable.querySelectorAll("tr .dropdown p:first-child");
            optionTwoList = bookTable.querySelectorAll("tr .dropdown p:last-child");
            dropdownList = bookTable.querySelectorAll("tr .dropdown");
            dropdownContainerList = bookTable.querySelectorAll("tr .dropdown-container");
            tableRowList = bookTable.querySelectorAll("table .table-row");

            for (let i = 0; i < optionOneList.length; i++){
                optionOneList[i].index = i;
            } 

            for (let i = 0; i < optionTwoList.length; i++){
                optionTwoList[i].index = i;
            } 

            for (let i = 0; i < tableRowList.length; i++){
                tableRowList[i].index = i;
            } 
            
            for (let i = 0; i < optionOneList.length; i++) {
                if (event.target.index === optionOneList[i].index){
                    if (dropdownContainerList[i].style.overflow === "hidden" || dropdownContainerList[i].style.overflow === "") {
                        function checker(){
                            if (tableRowList[i+1] === undefined) {
                                return i;
                            } else {
                                return i+1;
                            }
                        };
                        if (Number(tableRowList[checker()].style.zIndex) > tableRowList[i].style.zIndex){
                            tableRowList[i].style.zIndex = `${Number(tableRowList[checker()].style.zIndex) + 1}`;
                        } else {
                            tableRowList[i].style.zIndex = `${Number(tableRowList[i].style.zIndex) + 1}`;
                        };

                        tableRowList[i].style.position = "relative";
                        dropdownContainerList[i].style.overflow = "visible";
                        dropdownContainerList[i].style.border = "none";
                        dropdownList[i].style.border = "2px solid black";
                        dropdownList[i].style.borderRadius = "8px";
                        optionTwoList[i].style.display = "block";
                        dropdownContainerList[i].style.height = "20px";
                    } else {
                        tableRowList[i].style.zIndex = "0";
                        dropdownContainerList[i].style.border = "2px solid black";
                        dropdownContainerList[i].style.overflow = "hidden";
                        dropdownContainerList[i].style.height = "initial";
                        dropdownList[i].style.border = "none";
                        optionTwoList[i].style.display = "none";                        
                    }
                }
            };


        });

        optionTwo.addEventListener("click", (event) => {
            for (let i = 0; i < optionOneList.length; i++) {
                if (event.target.index === optionTwoList[i].index) {
                    optionOneList[i].textContent = optionOneList[i].textContent === "Completed" ? "Not finished" : "Completed";
                    optionTwoList[i].textContent = optionTwoList[i].textContent === "Not finished" ? "Completed" : "Not finished"; 
                    myLibrary[i].isRead = optionOneList[i].textContent; 
                }
               }
        })
        
        addBookButton.addEventListener("click", ()=> {
            addBookButton.style.display = "none";
            bookForm.style.display = "flex";
        })
    })


})

