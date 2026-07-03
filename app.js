const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const drop = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");

for(let select of drop){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    } 
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

const updateFlag = (element)=>{
    let currCode = element.value
    let countryCode = countryList[currCode];
    let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    element.parentElement.querySelector("img").src = newLink;
}


btn.addEventListener("click" , async (evt)=>{
    evt.preventDefault();
    let amt = document.querySelector(".amount input")
    let amtValue = amt.value;
    if(amtValue ==="" || amtValue < 1){
        amtValue = 1;
        amt.value = "1";
    }

    const URLFinal = `${URL}/${fromCurr.value.toLowerCase()}.min.json`;

    let response = await fetch(URLFinal);
    let data = await response.json();

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

    let rate = data[from][to];
    let finalAmt = amtValue * rate;

    msg.innerText = `${amtValue} ${from.toUpperCase()} = ${finalAmt.toFixed(2)} ${to.toUpperCase()}`;
})

