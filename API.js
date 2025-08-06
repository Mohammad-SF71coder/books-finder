export const apiKey = "AIzaSyBedCQt5r0UNPkpMR-374TmUq4Hs2uKKec";    
const containerEl = document.querySelector(".container");
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const yearFilter = document.getElementById("year");
const categorieFilter = document.getElementById("categories");




const indexPage = Math.floor(Math.random()*100);
export async function fetchAPI() {
    try {
        // Get Data from API:
        containerEl.innerHTML = `<h3 class="message">Loading...</h3>`;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=startIndex=${indexPage}&maxResults=40&key=${apiKey}`)
        const results = await response.json();
        console.log(results)

        // Create a Bool Element:
        containerEl.innerHTML = "";
        results.items.forEach(book => {
            createBookEl(book);
        });
    } catch (error) {
        console.log(error)
        containerEl.innerHTML = `<h3 class="message">An error happened, please try again later</h3>`
    }
}


async function searchByTitle(){;
    inputEl.blur();
    try {
        // Get Data from API:
        containerEl.innerHTML = `<h3 class="message">Loading...</h3>`;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${inputEl.value}&startIndex=${indexPage}&maxResults=40&key=${apiKey}`)
        const results = await response.json();
        console.log("serch by title");

        if(results.totalItems<1){
            containerEl.innerHTML = `<h3 class="message">Items not found</h3>`;
        }else{
            containerEl.innerHTML = "";
            results.items.forEach(book => {
                createBookEl(book);
            });
        }
        inputEl.value = "";
    } catch (error) {
        console.log(error);
        containerEl.innerHTML = `<h3 class="message">An error happened, please try again later</h3>`
    }
};



async function searchByYear(){
    inputEl.blur();
    try {   
            // Get data from API:
            containerEl.innerHTML = `<h3 class="message">Loading...</h3>`;

            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${inputEl.value}&startIndex=${indexPage}&maxResults=40&key=${apiKey}`)
            const results = await response.json();

            containerEl.innerHTML = "";

            // filter for the year:
            const bookYear = results.items.filter(year => {
                const published = year.volumeInfo.publishedDate;
                return published && published.slice(0, 4) === inputEl.value
            })
            console.log("serch by year")

            // create a book elements:
            if(bookYear.length === 0){
                containerEl.innerHTML = `<h3 class="message">Items not found</h3>`
            }else{
                bookYear.forEach(book=>{
                    createBookEl(book);
                })
            }
            
        } catch (error){
            console.log(error);
            containerEl.innerHTML = `<h3 class="message">An error happened, please try again later</h3>`
        }
}

async function  searchByCategorie() {
    inputEl.blur();
    try {
        // Get Data from API:
        containerEl.innerHTML = containerEl.innerHTML = `<h3 class="message">Loading...</h3>`;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${inputEl.value}&startIndex=${indexPage}&maxResults=40&key=${apiKey}`);
        const results = await response.json();
        console.log('search by categorie')
        containerEl.innerHTML = "";
        // Filter for the categorie:
        const filteredBook = results.items.filter(categorie =>{
            const filtered = categorie.volumeInfo.categories;
            return filtered && filtered.some((cat)=>cat.toLowerCase()=== inputEl.value.toLowerCase())
        });
        // create Books Elements:
        if(filteredBook.length === 0){
            containerEl.innerHTML = `<h3 class="message">Items not found</h3>`
        }else{
            filteredBook.forEach(book=>{
                createBookEl(book);
            })
        }
    } catch (error) {
        console.log(error)
        containerEl.innerHTML = `<h3 class="message">An error happened, please try again later</h3>`
    }
}


function handletitleSearch(event){
    event.preventDefault();
    searchByTitle();
}

function handleYearSearch(event){
    event.preventDefault();
    searchByYear();
}

function handleCategoriesearch(event){
    event.preventDefault();
    searchByCategorie();
}


export function searchByTitleAPI(){
    inputEl.value = "";
    formEl.addEventListener("submit", handletitleSearch);
    formEl.removeEventListener("submit", handleYearSearch);
    formEl.removeEventListener("submit", handleCategoriesearch);
}

export function searchByYearAPI(){
    yearFilter.addEventListener("click", ()=>{
        inputEl.value = "";
        inputEl.placeholder = "Search By Year";
        formEl.removeEventListener("submit", handletitleSearch);
        formEl.removeEventListener("submit", handleCategoriesearch);
        formEl.addEventListener("submit",handleYearSearch);
    })
}

export function searchByCategorieAPI(){
    categorieFilter.addEventListener("click", ()=>{
        inputEl.value = "";
        inputEl.placeholder = "Search By Categorie";
        formEl.removeEventListener("submit", handletitleSearch);
        formEl.removeEventListener("submit", handleYearSearch);
        formEl.addEventListener("submit", handleCategoriesearch);
    })
}



export function createBookEl(book){
    if(book.totalItems<1){
        containerEl.innerHTML = `<h3 class="message">Items not found</h3>`
    }else{
        const bookEl = document.createElement("div");
        bookEl.classList.add("book");
        bookEl.innerHTML = `
        <i class="fa-solid fa-heart"></i>
        <div class="page">
            <div class="front"></div>
            <div class="back">
                <p><span>Name:</span> ${book.volumeInfo.title}</p>
                <p><span>Authors:</span> ${book.volumeInfo.authors}</p>
                <p><span>Language:</span> ${book.volumeInfo.language}</p>
                <p><span>Year:</span> ${book.volumeInfo.publishedDate}</p>
                <p><span>Publisher:</span> ${book.volumeInfo.publisher}</p>
            </div>
        </div>
        <div class="second-page">
            <div class="front">
                <p><span>Description:</span> ${book.volumeInfo.description}</p>
            </div>
            <div class="back"></div>
        </div>`;
        const coverPage = bookEl.querySelector(".page .front");
        if(book && 
            book.volumeInfo &&  
            book.volumeInfo.imageLinks && 
            book.volumeInfo.imageLinks.smallThumbnail){
            coverPage.style.background = `url("${book.volumeInfo.imageLinks.smallThumbnail}")`;
        }else{
            coverPage.style.background = `url("https://clipart-library.com/2024/questionmark-clipart/questionmark-clipart-21.png")`;
        }
        
        coverPage.style.backgroundSize = "cover";
        containerEl.appendChild(bookEl);
        bookFlippening(bookEl, book);
        }
    
}



export function bookFlippening(bookEl, book){
    bookEl.addEventListener("click",()=>{
        bookEl.children[1].classList.toggle("flipe");
        bookEl.children[1].children[1].style.transform = "rotateY(-180deg)";
        bookEl.children[1].children[1].style.borderRight = "1px solid black";
        bookEl.children[2].style.width = "150px"
        if(bookEl.children[1].classList.contains("flipe")){
            setTimeout(() => {
                bookEl.children[0].style.display = "none";
            }, 100);
            
            setTimeout(() => {
                bookEl.style.width = "300px";
                bookEl.style.display = "flex";
            }, 500);
            
        }else{
            bookEl.style.width = "150px";
            setTimeout(() => {
                bookEl.children[0].style.display = "block";
            }, 1000);
        };
    });
    addToFavorite(bookEl, book)
};


function addToFavorite(bookEl, book){
    bookEl.children[0].addEventListener("click", (e)=>{
        e.stopPropagation();
        bookEl.children[0].classList.toggle("active");
        let bookIds = JSON.parse(localStorage.getItem("bookId")) || [];
        if(bookEl.children[0].classList.contains("active")){
            bookEl.id = book.id;
            bookIds.push(bookEl.id)
            localStorage.setItem("bookId",JSON.stringify(bookIds))
        }else{
            let index =  bookIds.indexOf(bookEl.id);
            bookIds.splice(index, 1);
            localStorage.setItem("bookId",JSON.stringify(bookIds));
            bookEl.remove();
        }
    })
}