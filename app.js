const base_url = ('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')

const dropdowns = document.querySelectorAll(".dropdown select")

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

