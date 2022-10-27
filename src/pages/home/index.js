import {apiGetCountriesByAll,apiGetCountriesByPartialName} from "../../scripts/api.js"
import {apiGetCountriesByFullName,apiGetCountriesByRegion} from "../../scripts/api.js"
import {apiGetCountriesByCurrency,apiFilterAllNamesOfCountries} from "../../scripts/api.js"
import {renderListCountries,renderOnlyCardCountry} from "../../scripts/render.js"


const btnPageRight = document.querySelector(".button-page-right")
const btnPageLeft = document.querySelector(".button-page-left")
const textPage = document.querySelector(".text-page")
const inputTextPage = document.querySelector("#input-text-page")



window.addEventListener("DOMContentLoaded",async (e)=>{
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
            textPage.innerText = pages.toString()
            inputTextPage.value = pages
        }
        
    })
    btnPageRight.addEventListener("click",(e)=>{
        let pages= Number(JSON.parse(localStorage.getItem("@Country:Page")))
        
        if(pages<29){
            pages++
            localStorage.setItem("@Country:Page",JSON.stringify(pages))
            renderListCountries()
            textPage.innerText = pages.toString()
            inputTextPage.value = pages
        }
    })

    inputTextPage.addEventListener("keypress",(e)=>{
        if(e.key==="Enter"){
            let value = Number(inputTextPage.value)
            if (value<29 && value>=1){
             
                localStorage.setItem("@Country:Page",JSON.stringify(value))
                renderListCountries()
                textPage.innerText = value.toString()
            } else{
              
            }
        }
    })
})