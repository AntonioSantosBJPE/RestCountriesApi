import {apiGetCountriesByAll,apiGetCountriesByPartialName} from "./api.js"
import {apiGetCountriesByFullName,apiGetCountriesByRegion} from "./api.js"
import {apiGetCountriesByCurrency,apiFilterAllNamesOfCountries} from "./api.js"


export async function renderSearchCountryByPartialName(nameCountry){
   
    const textErrorSearch = document.querySelector(".search-error")

    const dateCountries = await apiGetCountriesByPartialName(nameCountry)
    
    if (dateCountries.message){
        textErrorSearch.style.display = "flex"
        setTimeout(()=>{
            textErrorSearch.style.display = "none"
        },2000)
    }else{
        const ul = document.querySelector(".list-countries")
        ul.innerHTML =""
        const boxPages = document.querySelector(".box-pages")
        boxPages.style.display= "none"

        dateCountries.forEach( async (element)=>{
            renderCardSearchCountry(element)
        })

    }

    
}


export async function renderListCountries(){
    const ul = document.querySelector(".list-countries")
    ul.innerHTML =""
    let pages= Number(JSON.parse(localStorage.getItem("@Country:Page")))
    
    let pagesInitial 
    let pagesFinal
       
   if (pages<28){
    pagesInitial = 9*(pages-1)
    pagesFinal = 9*pages
   }else{
    pagesInitial = 9*(pages-1)
    pagesFinal = (9*pages)-2
   }
        
    const dateNameCountries = JSON.parse(localStorage.getItem("@Country:NamesOfCountries"))
    const dateInfosCountries =[]
    for(let i=pagesInitial; i<pagesFinal; i++){
        const response = await apiGetCountriesByFullName(dateNameCountries[i])
        dateInfosCountries.push(response)
    }  

    dateInfosCountries.forEach((element)=>{
        renderOnlyCardCountry(element)
    })
}

export async function renderOnlyCardCountry(element){
   
    const ul = document.querySelector(".list-countries")
    const li = document.createElement("li")
    ul.appendChild(li)
    li.classList = "card-countries flex flex-col justify-between"   

        const img = document.createElement("img")
        li.appendChild(img)
        img.classList = "img-card-countries"
        img.alt = "bandeira do pais"
        img.src = element[0].flags.svg

        const h3 = document.createElement("h3")
        li.appendChild(h3)
        h3.classList = "name-card-countries"
        h3.innerText = element[0].name.common
        
        const div = document.createElement("div")
        li.appendChild(div)
        div.classList = "infos-card-countries flex flex-col justify-around"

            const population = document.createElement("div")
            div.appendChild(population)
            population.classList = "population-card-countries"
            
                const spanPopulationLeft = document.createElement("span")
                population.appendChild(spanPopulationLeft)
                spanPopulationLeft.innerText = "População: "
                
                const spanPopulationRight = document.createElement("span")
                population.appendChild(spanPopulationRight)
                spanPopulationRight.innerText = element[0].population
                
                
            const continent = document.createElement("div")
            div.appendChild(continent)
            continent.classList = "continent-card-countries"
                
                const spancontinentLeft = document.createElement("span")
                continent.appendChild(spancontinentLeft)
                spancontinentLeft.innerText = "Continente: "
                    
                const spancontinentRight = document.createElement("span")
                continent.appendChild(spancontinentRight)
                spancontinentRight.innerText = element[0].continents[0]

            const capital = document.createElement("div")
            div.appendChild(capital)
            capital.classList = "capital-card-countries"
                    
                const spancapitalLeft = document.createElement("span")
                capital.appendChild(spancapitalLeft)
                spancapitalLeft.innerText = "Capital: "
                        
                const spancapitalRight = document.createElement("span")
                capital.appendChild(spancapitalRight)
                spancapitalRight.innerText = element[0].capital
                            
}


export async function renderCardSearchCountry(element){
   
    const ul = document.querySelector(".list-countries")
    const li = document.createElement("li")
    ul.appendChild(li)
    li.classList = "card-countries flex flex-col justify-between"   

        const img = document.createElement("img")
        li.appendChild(img)
        img.classList = "img-card-countries"
        img.alt = "bandeira do pais"
        img.src = element.flags.svg

        const h3 = document.createElement("h3")
        li.appendChild(h3)
        h3.classList = "name-card-countries"
        h3.innerText = element.name.common
        
        const div = document.createElement("div")
        li.appendChild(div)
        div.classList = "infos-card-countries flex flex-col justify-around"

            const population = document.createElement("div")
            div.appendChild(population)
            population.classList = "population-card-countries"
            
                const spanPopulationLeft = document.createElement("span")
                population.appendChild(spanPopulationLeft)
                spanPopulationLeft.innerText = "População: "
                
                const spanPopulationRight = document.createElement("span")
                population.appendChild(spanPopulationRight)
                spanPopulationRight.innerText = element.population
                
                
            const continent = document.createElement("div")
            div.appendChild(continent)
            continent.classList = "continent-card-countries"
                
                const spancontinentLeft = document.createElement("span")
                continent.appendChild(spancontinentLeft)
                spancontinentLeft.innerText = "Continente: "
                    
                const spancontinentRight = document.createElement("span")
                continent.appendChild(spancontinentRight)
                spancontinentRight.innerText = element.continents[0]

            const capital = document.createElement("div")
            div.appendChild(capital)
            capital.classList = "capital-card-countries"
                    
                const spancapitalLeft = document.createElement("span")
                capital.appendChild(spancapitalLeft)
                spancapitalLeft.innerText = "Capital: "
                        
                const spancapitalRight = document.createElement("span")
                capital.appendChild(spancapitalRight)
                spancapitalRight.innerText = element.capital
                            
}


