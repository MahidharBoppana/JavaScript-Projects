function rollDice() {
    
    let numOfDice = document.getElementById("numOfDice").value
    let diceResult = document.getElementById("diceResult")
    let diceImages = document.getElementById("diceImages")
    let values = []
    let images = []

    for (let i = 0; i < numOfDice; i++) {
        const value = Math.floor(Math.random() * 6) + 1
        values.push(value)
        images.push(`<img src="./diceImages/dice${value}.png" alt="${value}">`);
    }
    diceResult.textContent = `dice: ${values.join(", ")}`;
    diceImages.innerHTML = images.join('')
}