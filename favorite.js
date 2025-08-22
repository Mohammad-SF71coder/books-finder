import {apiKey, bookFlippening} from './API.js';

const favoriteBtn = document.querySelector(".favorites");
const containerEl = document.querySelector(".container");

export function favoriteList(){
    favoriteBtn.addEventListener("click", async()=>{
        let bookIds = JSON.parse(localStorage.getItem("bookId")) || [];
        try {
            // Get Data from API:
            containerEl.innerHTML = `<h3 class="message">Loading...</h3>`;
            const promises = bookIds.map((book)=>{
                return fetch(`https://www.googleapis.com/books/v1/volumes/${book}?key=${apiKey}`).then(res => res.json())
            })
            console.log(promises)
            const books = await Promise.all(promises);
            containerEl.innerHTML = "";
            books.forEach(book=>{
                createBookEl(book);
            });
        } catch (error) {
            console.log(error)
            containerEl.innerHTML = `<h3 class="message">An error happened, please try again later</h3>`
        }
    })
}



function createBookEl(book){
    let bookIds = JSON.parse(localStorage.getItem("bookId")) || [];
    if(bookIds.length<1){
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
        bookEl.children[0].classList.add("active");
        containerEl.appendChild(bookEl);
        bookFlippening(bookEl, book);
        removeFavorite(bookEl)
        }
        
}

export function removeFavorite(bookEl, book){
    bookEl.children[0].addEventListener("click", (e)=>{
        e.stopPropagation();
        bookEl.children[0].classList.toggle("active");
        let bookIds = JSON.parse(localStorage.getItem("bookId")) || [];
        if(!bookEl.children[0].classList.contains("active")){
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

