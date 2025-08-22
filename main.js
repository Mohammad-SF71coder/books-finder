import { navBarTools } from "./navbar.js";
import { fetchAPI , searchByTitleAPI,searchByYearAPI ,searchByCategorieAPI} from "./API.js";
import { favoriteList} from "./favorite.js";
window.addEventListener("DOMContentLoaded", async()=>{
    await fetchAPI();
    await searchByTitleAPI();
    await searchByYearAPI();
    await searchByCategorieAPI();
    await favoriteList();
    navBarTools();
});