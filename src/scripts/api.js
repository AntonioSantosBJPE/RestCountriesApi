



export async function apiGetCountriesByAll(){
    const data = await fetch("https://restcountries.com/v3.1/all")
    const dataJson = await data.json()
    return dataJson
}

export async function apiGetCountriesByPartialName(nameCountry){
    const data = await fetch(`https://restcountries.com/v3.1/name/${nameCountry}`)
    const dataJson = await data.json()
    return dataJson
}

export async function apiGetCountriesByFullName(nameCountry){
    const data = await fetch(`https://restcountries.com/v3.1/name/${nameCountry}?fullText=true`)
    const dataJson = await data.json()
    return dataJson
}

//Search by Region: Africa, Americas, Asia, Europe, Oceania. 
//The search can be using the full region’s name or just part of it
export async function apiGetCountriesByRegion(nameRegion){
    const data = await fetch(`https://restcountries.com/v3.1/region/${nameRegion}`)
    const dataJson = await data.json()
    return dataJson
}

export async function apiGetCountriesByCurrency(nameCurrency){
    const data = await fetch(`https://restcountries.com/v3.1/currency/${nameCurrency}`)
    const dataJson = await data.json()
    return dataJson
}

export async function apiFilterAllNamesOfCountries(){

    const dataCountries = await apiGetCountriesByAll()
    const dataNameCountries = []
    //console.log(dataCountries[0].name.common)
    dataCountries.forEach(element => {
        dataNameCountries.push(element.name.common)
    });
    //console.log(dataNameCountries)
    // const teste = await apiGetCountriesByPartialName(dataNameCountries[20])
    // console.log(teste) 
    return dataNameCountries
}

