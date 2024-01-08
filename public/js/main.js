function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toLeetSpeak(str) {
    const leetMap = { 'e': '3', 'a': '4', 's': '5', 'o': '0' };
    const leetStr = str.toLowerCase().split('').map(char => leetMap[char] || char).join('');
    return leetStr;
}

function generateWeakPasswords(baseString) {
    const variations = new Set();

    function addVariations(inputString) {
        variations.add(inputString);
        variations.add(inputString + '!');
        variations.add(inputString + '!!');
    }

    baseString = baseString.toLowerCase();
    
    addVariations(baseString);
    addVariations(baseString + '2023');
    addVariations(baseString + '2024');
    addVariations(baseString + '123');
    addVariations(baseString + '1234');

    const leetString = toLeetSpeak(baseString);
    addVariations(leetString);
    addVariations(leetString + '2023');
    addVariations(leetString + '2024');
    addVariations(leetString + '123');
    addVariations(leetString + '1234');

    const result = new Set();

    for (const variation of Array.from(variations)) {
        result.add(variation);
        result.add(capitalizeFirstLetter(variation));
    }
  
    return Array.from(result);
}
  
function generatePasswords() {
    const baseString = document.getElementById('baseString').value;
    const weakPasswords = generateWeakPasswords(baseString);
    
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = weakPasswords.join('<br>');

    document.getElementById("hideandseek").style.visibility = "visible"; 
}

function copyPasswords(){
    const passwords = document.getElementById('result').innerHTML;
    navigator.clipboard.writeText(passwords.replace(/<br>/g, '\n'));
}