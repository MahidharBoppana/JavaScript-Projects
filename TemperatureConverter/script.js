let input = document.getElementById("input")
let toFahrenheit = document.getElementById("toFahrenheit")
let toCelsius = document.getElementById("toCelsius")
let result = document.getElementById("result")
let temp;

document.getElementById("convert").addEventListener("click", function(e){
    e.preventDefault();
    if (toFahrenheit.checked) {
        temp = Number(input.value)
        temp = temp * 9/5 + 32;
        result.textContent = temp.toFixed(1) + " °F"
    }else if (toCelsius.checked) {
        temp = Number(input.value)
        temp = (temp - 32) * (5/9);
        result.textContent = temp.toFixed(1) + " °C"
    }else{
        result.textContent = "select a unit"
    }
})