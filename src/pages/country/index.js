const btnDarkMode = document.querySelector(".button-darkmode")
const imgDarkMode = document.querySelector(".img-darkmode")
const textDarkMode = document.querySelector(".text-button-darkmode")
const htmlDarkMode = document.querySelector("html")
const btnHome = document.querySelector(".button-home")







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

    btnHome.addEventListener("click",(e)=>{
        window.location.replace("../home/index.html")
    })



})