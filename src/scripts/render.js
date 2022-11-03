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
            renderOnlyCardCountry(element)
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
        renderOnlyCardCountry(element[0])
    })
}

export async function renderOnlyCardCountry(element){
    
    const numberFormat = new Intl.NumberFormat()

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
                spanPopulationRight.innerText = numberFormat.format(element.population)
                
                
                
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



        li.addEventListener("click",(e)=>{
            localStorage.setItem("@Country:DetailedInformation",JSON.stringify(element))
            window.location.replace("../country/index.html")
        })
                            
}


export async function renderPageCountry(){
    
    const numberFormat = new Intl.NumberFormat()
    const infosCountry = JSON.parse(localStorage.getItem("@Country:DetailedInformation"))
   
    const nativeName = Object.values(infosCountry.name.nativeName)[0].common
    const languages = Object.values(infosCountry.languages).join(", ")
    
    let borderCountries = ""   
        if(infosCountry.borders){
            borderCountries = infosCountry.borders.join(", ")
        }else{
            borderCountries = "The country has no border"
        }
   
    
    let currencies = ""
    Object.values(infosCountry.currencies).forEach((element)=>{
        currencies += `${element.name}, `
    })
    currencies = currencies.substring(0, currencies.length-2)
   
    
    const main = document.querySelector(".main")

    main.insertAdjacentHTML("beforeend",`
    <section class="section-infos-country container flex flex-col justify-between items-center">
             <h2 class="country-name">${infosCountry.name.common}</h2>    
                
            <div class="box flex"> 
                <div class="box-img-country">
                    <figure>
                        <img src=${infosCountry.flags.svg} alt="" >
                    </figure>
                </div >


                <div class="box-infos-country flex flex-col justify-between">
                    
                        <p><strong>Native Name: </strong>${nativeName}</p>
                        <p><strong>Population: </strong>${numberFormat.format(infosCountry.population)}</p>
                        <p><strong>Region: </strong>${infosCountry.region}</p>
                        <p><strong>Sub Region: </strong>${infosCountry.subregion}</p>
                        <p><strong>Capital: </strong>${infosCountry.capital}</p>
                        <p><strong>Top Level Domain: </strong>${infosCountry.tld[0]}</p>
                        <p><strong>Curencies: </strong>${currencies}</p>
                        <p><strong>Languagens: </strong>${languages}</p>
                        <p><strong>Border Countries: </strong>${borderCountries}</p>
                </div>

            </div>

        </section>
    
    `)



}