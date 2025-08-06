import {searchByTitleAPI} from './API.js'
const serchIcon = document.querySelector(".fa-magnifying-glass");
const inputEl = document.querySelector(".input");
const burgerMenue = document.querySelector(".fa-bars");
const sideBarEl = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".remove-sidebar");
const filterIcon = document.querySelector(".fa-filter");
const navbarEl = document.querySelector(".navbar");
const filterBackground = document.querySelector(".filter");
const filterName = document.querySelectorAll(".filter-name");
const removeFilter = document.querySelector(".rmove-filter");
const containerEl = document.querySelector(".container");
const optionsEls = document.querySelectorAll(".options");
const latestUpdates = document.querySelector(".latest-updates");

export function navBarTools(){
    serchIcon.addEventListener("click", ()=>{
        inputEl.focus();
    })

    burgerMenue.addEventListener("click", ()=>{
        containerEl.style.overflow = "hidden";
        sideBarEl.style.left = "0px";
        setTimeout(() => {
            burgerMenue.style.opacity = "0"
        }, 500);
    });

    closeBtn.addEventListener("click", ()=>{
        sideBarEl.style.left = "-500px";
        burgerMenue.style.opacity = "1";
        containerEl.style.overflow = "auto";
    });

    filterIcon.addEventListener("click", ()=>{
        navbarEl.style.height = "120px";
        navbarEl.style.alignItems = "start";
        navbarEl.style.paddingTop = "15px";
        burgerMenue.style.marginTop = "10px";
        filterBackground.style.transition = "all 1s ease";
        filterBackground.style.top = "75%";
        filterIcon.style.backgroundColor = "#111111";
        filterIcon.style.color = "#ede6db";
        setTimeout(() => {
            filterBackground.style.right = "55px";
            filterBackground.style.backgroundColor = "#c4c3c3"
            setTimeout(() => {
                filterBackground.style.width = "85%";
                filterBackground.style.maxWidth = "450px";
                removeFilter.style.display = "block";
                setTimeout(() => {
                    removeFilter.style.opacity = "1";
                }, 400);
                filterName.forEach((filtername)=>{
                    filtername.style.transition = "all 0.5s ease";
                    filtername.style.display = "block";
                    setTimeout(() => {
                        filtername.style.opacity = "1";
                        filtername.style.color = "#ede6db";
                        filtername.style.backgroundColor = "#494949";
                    }, 300);
                });
                
            }, 500);
            
        }, 600);
    });


    removeFilter.addEventListener("click", ()=>{
        setTimeout(() => {
            filterBackground.style.width = "80px";
            setTimeout(() => {
                filterBackground.style.backgroundColor = "#ede6db";
                filterBackground.style.right = "10px";
                setTimeout(() => {
                    navbarEl.style.height = "70px";
                    navbarEl.style.padding = "15px 30px";
                    filterBackground.style.top = "50%";
                    filterIcon.style.backgroundColor = "#ede6db";
                    filterIcon.style.color = "#494949";

                }, 500);
            }, 200);
        }, 100);
        removeFilter.style.opacity = "0";
        setTimeout(() => {
            removeFilter.style.display = "none";
        }, 50);
        filterName.forEach((filtername)=>{
            filtername.style.transition = "all 0.5s ease";
            filtername.style.opacity = "0";
            setTimeout(() => {
                filtername.style.display = "none";
            }, 50);
            
        });
        inputEl.placeholder = "Search";
        searchByTitleAPI();
    });


    optionsEls.forEach((optionEl )=>{
        optionEl.addEventListener("click",()=>{
            sideBarEl.style.left = "-500px";
            burgerMenue.style.opacity = "1";
            containerEl.style.overflow = "auto";
        })
    });

    latestUpdates.addEventListener("click", ()=>{
        setTimeout(() => {
            location.reload();
        }, 700);
    })
};

