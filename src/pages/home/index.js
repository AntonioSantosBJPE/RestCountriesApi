import {apiGetCountriesByAll,apiGetCountriesByPartialName} from "../../scripts/api.js"
import {apiGetCountriesByFullName,apiGetCountriesByRegion} from "../../scripts/api.js"
import {apiGetCountriesByCurrency,apiFilterAllNamesOfCountries} from "../../scripts/api.js"
import {renderListCountries,renderOnlyCardCountry} from "../../scripts/render.js"


const btnPageRight = document.querySelector(".button-page-right")
const btnPageLeft = document.querySelector(".button-page-left")
const inputTextPage = document.querySelector("#input-text-page")
const btnDarkMode = document.querySelector(".button-darkmode")
const imgDarkMode = document.querySelector(".img-darkmode")
const textDarkMode = document.querySelector(".text-button-darkmode")
const htmlDarkMode = document.querySelector("html")

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
    
    
    const dateNameCountries = await apiFilterAllNamesOfCountries()
    localStorage.setItem("@Country:NamesOfCountries",JSON.stringify(dateNameCountries))
    
    localStorage.setItem("@Country:Page",JSON.stringify("1"))
    inputTextPage.value = "1"
    renderListCountries()
    
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
        
        if(pages<29){
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
            } else{
              
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

})