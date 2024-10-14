const myLibrary = [];
let bookTable = document.querySelector(".book-section table");
let firstRowTable = document.querySelector("table tr:first-child");
firstRowTable.style.display = "none";
let contentContainer = document.querySelector(".book-section")
let btnNewBook = document.querySelector("#newBook");
let warningText = document.createElement("p");
let tableRow = document.createElement("tr");
let dropdownContainer = document.createElement("div");
let dropdown = document.createElement("div");
let optionOne = document.createElement("p");
let optionTwo = document.createElement("p");
let checkConfirmation;



function Book(name, author, year, pages, isRead) {
  this.name = name,
  this.author = author,
  this.year = year,
  this.pages = pages,
  this.isRead = isRead
}

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
              if ((typeof addedBook[properties[i]]) === "string") {
              tableCell.textContent = addedBook[properties[i]];
              } else if ((typeof addedBook[properties[i]]) === "object") {
                tableCell.appendChild(addedBook[properties[i]]);
                dropdown = document.createElement("div");
                optionOne = document.createElement("p");
                optionTwo = document.createElement("p");
                dropdownContainer.setAttribute("class", "dropdown-container");
                dropdownContainer.appendChild(dropdown);
                dropdown.setAttribute("class", "dropdown");
                dropdown.appendChild(optionOne);
                dropdown.appendChild(optionTwo);
                addedBook[properties[i]] = checkConfirmation;
              }
          };

          // Creates remove button 
         btnRemove = document.createElement("button");
         btnRemove.textContent = "Remove!";
         tableRow.appendChild(btnRemove);
         btnRemove.setAttribute("class", "btnRemove");

         for (let element of document.querySelectorAll("form .field")){
            console.log(element.value);
            element.value = "";
        };

        document.querySelector("form .check").checked = false;

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
                console.log(event.target.index === tableRowList[i].index);
                if (event.target.index === tableRowList[i].index){
                    tableRowList[i].remove();
                    myLibrary.splice([i],1);
                }
            };

            if (bookTable.querySelectorAll("table .table-row")[0] === undefined) {
                firstRowTable.style.display = "none";
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
        
        // Displays dropdown by clicking 
        dropdown.addEventListener("click", (event) => {

            optionOneList = bookTable.querySelectorAll("tr .dropdown p:first-child");
            optionTwoList = bookTable.querySelectorAll("tr .dropdown p:last-child");
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
                    } else {
                        tableRowList[i].style.zIndex = "0";
                        dropdownContainerList[i].style.overflow = "hidden";
                    }
                }
            };


        });

        optionTwo.addEventListener("click", (event) => {
            for (let i = 0; i < optionOneList.length; i++) {
                if (event.target.index === optionTwoList[i].index) {
                   optionOneList[i].textContent = optionOneList[i].textContent === "Completed" ? "Not finished" : "Completed";
                   optionTwoList[i].textContent = optionTwoList[i].textContent === "Not finished" ? "Completed" : "Not finished"; 
                   myLibrary[i].isRead = optionOne.textContent; 
                }
               }
        })
        
    })


})

