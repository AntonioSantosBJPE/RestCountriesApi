import {apiFilterAllNamesOfCountries} from "../../scripts/api.js"
import {renderListCountries,renderSearchCountryByPartialName} from "../../scripts/render.js"


const btnPageRight = document.querySelector(".button-page-right")
const btnPageLeft = document.querySelector(".button-page-left")
const inputTextPage = document.querySelector("#input-text-page")
const btnDarkMode = document.querySelector(".button-darkmode")
const imgDarkMode = document.querySelector(".img-darkmode")
const textDarkMode = document.querySelector(".text-button-darkmode")
const htmlDarkMode = document.querySelector("html")
const btnSearchCountries = document.querySelector(".button-filter-country")
const inputSearchCountries = document.querySelector(".input-filter-country")
const btnClearFilters = document.querySelector(".button-clear-filters")
const boxPages = document.querySelector(".box-pages")

window.addEventListener("DOMContentLoaded",async (e)=>{
    
    if(localStorage.getItem("@Country:Darkmode")){
        
        if (JSON.parse(localStorage.getItem("@Country:Darkmode"))==="true"){
            textDarkMode.innerText = "Light Mode"
            imgDarkMode.src = "../../assets/img/btn-sun.png"
            htmlDarkMode.classList.toggle("darkmode")
          
        }
    }else{
        localStorage.setItem("@Country:Darkmode",JSON.stringify("false"))
    }
    
    if (localStorage.getItem("@Country:NamesOfCountries")){

    }else{
        const dateNameCountries = await apiFilterAllNamesOfCountries()
        localStorage.setItem("@Country:NamesOfCountries",JSON.stringify(dateNameCountries))
    }
    
   
    if(localStorage.getItem("@Country:Page")){
        inputTextPage.value = JSON.parse(localStorage.getItem("@Country:Page"))
        renderListCountries()
    }else{
        localStorage.setItem("@Country:Page",JSON.stringify("1"))
        inputTextPage.value = "1"
        renderListCountries()
    }
    
   
    
    btnPageLeft.addEventListener("click",(e)=>{
        let pages= Number(JSON.parse(localStorage.getItem("@Country:Page")))
        
        if(pages>1){
            pages--
            localStorage.setItem("@Country:Page",JSON.stringify(pages))
            renderListCountries()
            inputTextPage.value = pages
        }
        
    })
    btnPageRight.addEventListener("click",(e)=>{
        let pages= Number(JSON.parse(localStorage.getItem("@Country:Page")))
        
        if(pages<28){
            pages++
            localStorage.setItem("@Country:Page",JSON.stringify(pages))
            renderListCountries()
            inputTextPage.value = pages
        }
    })

    inputTextPage.addEventListener("keypress",(e)=>{
        if(e.key==="Enter"){
            let value = Number(inputTextPage.value)
            if (value<29 && value>=1){
             
                localStorage.setItem("@Country:Page",JSON.stringify(value))
                renderListCountries()
            } else if(value<=0){
                inputTextPage.value = "1"
                localStorage.setItem("@Country:Page","1")
                renderListCountries()
            } else if(value>=29){
                inputTextPage.value = "28"
                localStorage.setItem("@Country:Page","28")
                renderListCountries() 
            }
        }
    })

    btnDarkMode.addEventListener("click",(e)=>{
    
        if (textDarkMode.innerText==="Dark Mode"){
            textDarkMode.innerText = "Light Mode"
            imgDarkMode.src = "../../assets/img/btn-sun.png"
            htmlDarkMode.classList.toggle("darkmode")
            localStorage.setItem("@Country:Darkmode",JSON.stringify("true"))
        }else{
            textDarkMode.innerText = "Dark Mode"
            imgDarkMode.src = "../../assets/img/btn-monn.png"
            htmlDarkMode.classList.toggle("darkmode")
            localStorage.setItem("@Country:Darkmode",JSON.stringify("false"))
        }
        
    })


    btnSearchCountries.addEventListener("click",(e)=>{
        if (inputSearchCountries.value.length>=3){
            console.log(inputSearchCountries.value.length)
            renderSearchCountryByPartialName(inputSearchCountries.value)
        }
        
    })

    btnClearFilters.addEventListener("click",(e)=>{
        
        const ul = document.querySelector(".list-countries")
        ul.innerHTML =""

        localStorage.setItem("@Country:Page",JSON.stringify("1"))
        inputTextPage.value = "1"

        boxPages.style.display= "flex"
        inputSearchCountries.value = ""

        renderListCountries()
    })

})