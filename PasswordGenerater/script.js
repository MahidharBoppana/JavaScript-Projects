function generatePassword(length, includeLowerCaseChars, includeUpperCaseChars, includeNumberChars, includeSymbolChars) {
    
    let lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    let upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numberChars = "1234567890";
    let symbolChars = "!@#$%^&*/"

    let allowedChars = "";
    let passWord = "";

    allowedChars += includeLowerCaseChars ? lowerCaseChars : "";
    allowedChars += includeUpperCaseChars ? upperCaseChars : "";
    allowedChars += includeNumberChars ? numberChars : "";
    allowedChars += includeSymbolChars ? symbolChars : "";

    if (length <= 0) {
        return "(Password length must be atleast 1)";
    } 
    if (allowedChars.length === 0) {
        return "(Password must be atleast 1 set of chars)";
    }

    for (let i = 0; i < length; i++) {
        const radomIndex = Math.floor(Math.random() * allowedChars.length);

        passWord += allowedChars[radomIndex]
        
    }
    return passWord

}


const passWordLength = 12;
const includeLowerCaseChars = false;
const includeUpperCaseChars = true;
const includeNumberChars = false;
const includeSymbolChars = true;


let password = generatePassword(passWordLength, includeLowerCaseChars, includeUpperCaseChars, includeNumberChars, includeSymbolChars);

console.log(`Generate Password: ${password}`);
