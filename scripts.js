function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomBackground() {
    const colourA = generateRandomColor();
    const colourB = generateRandomColor();
    document.body.style.setProperty('--colourA', colourA);
    document.body.style.setProperty('--colourB', colourB);
}

// Call setRandomBackground on page load for all pages
window.onload = function() {
    setRandomBackground();
    // print("load")
};

document.getElementById("hasTransition").addEventListener("input", function() {
    const transitionDiv = document.getElementById("transitionColourDiv");
    if (this.value.toLowerCase() === "yes") {
        transitionDiv.style.display = "block";
    } else {
        transitionDiv.style.display = "none";
    }
});

function loadColors() {
    return fetch('colors.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Error loading JSON:', error);
            return null;
        });
}

function findHexValue(colorsDict, colorName) {
    if (!colorsDict) {
        return null;
    }

    const formattedColorName = colorName.replace('_', '').toLowerCase();

    // Reduce console log output
    console.log(`Searching for: '${formattedColorName}'`);

    for (const color in colorsDict) {
        const hexCode = colorsDict[color];
        if (color.replace('_', '').toLowerCase() === formattedColorName) {
            return hexCode;
        }
    }

    return null;
}

function generateGradient(startColor, endColor, steps) {
    const start = new tinycolor(startColor);
    const end = new tinycolor(endColor);
    const gradient = [];

    for (let i = 0; i < steps; i++) {
        const color = tinycolor.mix(start, end, (i / (steps - 1)) * 100).toHex();
        gradient.push(color);
    }

    return gradient;
}

function generatePrefix() {
    loadColors().then(colorsDict => {
        if (!colorsDict) {
            console.error("Failed to load colors from JSON.");
            return;
        }

        const username = document.getElementById("username").value;
        const textToColour = document.getElementById("textToColour").value;

        function getHexColor(inputPrompt) {
            const colorName = inputPrompt;
            let hexValue = findHexValue(colorsDict, colorName);
            if (hexValue) {
                return hexValue;
            } else {
                console.warn(`Color '${colorName}' not found. Using the input as a hex value directly.`);
                return colorName;
            }
        }

        const colourA = getHexColor(document.getElementById("colourA").value);
        const colourB = getHexColor(document.getElementById("colourB").value);

        const gradientColors = generateGradient(colourA, colourB, textToColour.length);

        const coloredRank = Array.from(textToColour).map((char, index) => `&#${gradientColors[index]}${char}`).join('');
        
        const resultText = `&7[${coloredRank}&7]&r`;

        document.getElementById("result").innerHTML = `This is the resulting prefix:<br>${resultText}`;
        document.getElementById("command").innerHTML = `This is the command to change their prefix:<br>/lp user ${username} meta setprefix ${resultText}`;
        
        // Ensure the result container is visible
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.style.height = "auto";
        resultContainer.style.opacity = 1;
    });
}

function generateColours() {
    let resultText = "";
    const bracketColour = '{#gray}';

    // const username = document.getElementById("username").value;
    const textToColour = document.getElementById("textToColour").value;

    let colour1 = document.getElementById("colour1").value;
    colour1 = "{#" + colour1 + ">}";

    let colour2 = document.getElementById("colour2").value;
    if (colour2 !== '') {
        colour2 = "{#" + colour2 + "<>}";
    }

    let colour3 = document.getElementById("colour3").value;
    if (colour3 !== '') {
        colour3 = "{#" + colour3 + "<>}";
    }

    let colour4 = document.getElementById("colour4").value;
    if (colour4 !== '') {
        colour4 = "{#" + colour4 + "<>}";
    }

    let colour5 = document.getElementById("colour5").value;
    colour5 = "{#" + colour5 + "<}";

    let colours = [colour1, colour2, colour3, colour4, colour5];

    // Create the initial resultText
    // resultText += `${colour1}${textToColour}${colour5}`;

    // Split textToColour into equal parts based on the number of colours
    let split = [];
    let partLength = Math.ceil(textToColour.length / colours.length);
    for (let index = 0; index < colours.length; index++) {
        split[index] = textToColour.slice(index * partLength, (index + 1) * partLength);
        resultText += `${colours[index]}${split[index]}`;
    }

    // Display the result
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `This is the resulting string:<br>${resultText}`;

    const commandElement = document.getElementById("command");
    if (commandElement) {
        commandElement.innerHTML = `${resultText}`;
    } else {
        console.error("Command element not found.");
    }

    const resultContainer = document.getElementById("resultContainer");
    resultContainer.style.height = "auto"; // Trigger the transition
    resultContainer.style.opacity = 1;
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard');
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
    });
}
