const inputSlider = document.querySelector("[data_length_slider]");
const lengthDisplay = document.querySelector("[data_length]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg =document.querySelector("[data_copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data_indicator]");
const generateBtn = document.querySelector(".Generate");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbol="~`!@#$%^&*()_+-={[]}|\?/>.<,";
let password="";
let passwordLength =10;
let chechBox = 0;
handleSlider();
setIndicator('gray')
//set passwordLength
function handleSlider()
{
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize =((password-min)*100/(max-min)) + "% 100%"
}

//set color
function setIndicator( color)
{
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}
 
function rendomNumber( max,min)
{
    return Math.floor(Math.random()*(max-min)+min);
}
function generateRandomNumber()
{
    return rendomNumber(0,9);
}
function generateLowercase()
{
    return String.fromCharCode(rendomNumber(97,123));
}
function generateUppercase()
{
    return String.fromCharCode(rendomNumber(65,91));
}
function gentrateSymbol()
{
    return symbol.charAt(rendomNumber(0,symbol.length));
}
function calStrength()
{
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (lowercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNumber = true;
    if (symbolsCheck.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied"
    }
    catch (e) {
        // alert("Something went wrong in CopyContent");
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add('active');
 
    setTimeout(() => {
        copyMsg.classList.remove('active');
    }, 2000)
}

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
}) 

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})
function handleCheckBox()
{
    chechBox = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked)
            chechBox++;
    });

    //special condition
    if (passwordLength < chechBox) {
        passwordLength = chechBox;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBox)
})

generateBtn.addEventListener('click',()=>{
    if(chechBox<=0)
        return;
    if (passwordLength < chechBox) {
        passwordLength = chechBox;
        handleSlider();
    }
    console.log("generation start")
    password="";
    // if(uppercaseCheck.checked){
    //     password+=generateUppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generateLowercase();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=gentrateSymbol();
    // }

    let funcArr=[];
    if(uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(gentrateSymbol);
    }
    // Compulsory Addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    // Additional addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = rendomNumber(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    console.log("password generated")
    password = shuffle(Array.from(password));
    passwordDisplay.value = password;
    calStrength();
})
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}