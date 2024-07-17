const base_url = ('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies')

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

// populating options in select
for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value= currCode

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        } else if(select.name ==="to" && currCode==="NPR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}
//updates flags with the selected options
const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

btn.addEventListener("click", (e) => {
    e.preventDefault() // to prevent the default action of the button click, such as submitting a form or navigating to a new page
    updateExchangeRate()
})

const updateExchangeRate = async () =>{
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value

    if (amtVal==="" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    const url = `${base_url}/${fromCurr.value.toLowerCase()}.json`
    const response = await fetch(url)
    let data = await response.json()
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    

    let finalAmt = amtVal * rate
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value} `
}

//when the user load the website for first time it shows the default updated value in msg
window.addEventListener("load",  ()=>{
    updateExchangeRate()

})
