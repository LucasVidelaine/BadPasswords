function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPartialLeetSpeak(str){
    const leetMap = { 'e': '3', 'a': '@', 's': '5', 'o': '0' };
    // Iterate through the characters of the string
    for (let i = 0; i < str.length; i++) {
        // Check if the current character has a leetspeak equivalent
        if (leetMap.hasOwnProperty(str[i])) {
            // Replace the first occurrence of the character with its leetspeak equivalent
            const leetspeakChar = leetMap[str[i]];
            const partLeetStr = str.substring(0, i) + leetspeakChar + str.substring(i + 1);
            return partLeetStr;
        }
    }
    // If no leetspeak conversion is possible, return null
    return null;
}

function toFullLeetSpeak(str) {
    const leetMap = { 'e': '3', 'a': '@', 's': '5', 'o': '0' };
    const fullLeetStr = str.toLowerCase().split('').map(char => leetMap[char] || char).join('');
    if (fullLeetStr === str) {
        return null;
    } else {
        return fullLeetStr;
    }
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

    const partLeetString = toPartialLeetSpeak(baseString);
    if (partLeetString != null){
        addVariations(partLeetString);
        addVariations(partLeetString + '2023');
        addVariations(partLeetString + '2024');
        addVariations(partLeetString + '123');
        addVariations(partLeetString + '1234');
    }

    const leetString = toFullLeetSpeak(baseString);
    if (leetString != null){
        addVariations(leetString);
        addVariations(leetString + '2023');
        addVariations(leetString + '2024');
        addVariations(leetString + '123');
        addVariations(leetString + '1234');
    }

    const result = new Set();

    for (const variation of Array.from(variations)) {
        result.add(variation);
        result.add(capitalizeFirstLetter(variation));
    }
  
    return Array.from(result);
}
  
function generatePasswords() {
    const baseString = document.getElementById('baseString').value;
    if (baseString != ''){
        const weakPasswords = generateWeakPasswords(baseString);
        
        document.getElementById('result').innerHTML = weakPasswords.join('<br>');
        document.getElementById('hideandseek').style.visibility = "visible";
        document.getElementById('alert').innerHTML = "";
        document.getElementById('baseString').style.borderColor = "";

    } else {
        document.getElementById('alert').innerHTML = "Error, you must provide a name.";
        document.getElementById('baseString').style.borderColor = "red";
        document.getElementById('result').innerHTML = "";
    }
}

function copyPasswords(){
    const passwords = document.getElementById('result').innerHTML;
    navigator.clipboard.writeText(passwords.replace(/<br>/g, '\n'));
}