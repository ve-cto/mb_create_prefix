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

// when page loads randomise the background colours
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

    // log searched colour
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

function generateThreeColorGradient(startColor, middleColor, endColor, steps) {
    const startToMiddleSteps = Math.ceil(steps / 2);
    const middleToEndSteps = steps - startToMiddleSteps;

    const start = new tinycolor(startColor);
    const middle = new tinycolor(middleColor);
    const end = new tinycolor(endColor);
    const gradient = [];

    for (let i = 0; i < startToMiddleSteps; i++) {
        const color = tinycolor.mix(start, middle, (i / (startToMiddleSteps - 1)) * 100).toHex();
        gradient.push(color);
    }

    for (let i = 0; i < middleToEndSteps; i++) {
        const color = tinycolor.mix(middle, end, (i / (middleToEndSteps - 1)) * 100).toHex();
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

        const colourA = `#${getHexColor(document.getElementById("colourA").value)}`;
        const colourB = `#${getHexColor(document.getElementById("colourB").value)}`;
        const colourCInput = document.getElementById("colourC").value;

        let gradientColors;
        if (colourCInput) {
            const colourC = `#${getHexColor(colourCInput)}`;
            document.body.style.setProperty('--colourC', colourC);
            gradientColors = generateThreeColorGradient(colourA, colourC, colourB, textToColour.length);
        } else {
            gradientColors = generateGradient(colourA, colourB, textToColour.length);
        }

        document.body.style.setProperty('--colourA', colourA);
        document.body.style.setProperty('--colourB', colourB);

        // generate rank
        const coloredRank = Array.from(textToColour).map((char, index) => `{#${gradientColors[index].toUpperCase()}}${char}`).join('');

        const resultText = `&7[${coloredRank}&7]&f`;

        document.getElementById("result").textContent = resultText;
        document.getElementById("command").textContent = `/lp user ${username} meta setprefix ${resultText}`;
        
        // log
        console.log("Generated prefix:", resultText);
        console.log("Generated command:", `/lp user ${username} meta setprefix ${resultText}`);
        
        // make visible if not
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.style.height = "auto";
        resultContainer.style.opacity = 1;
    });
}


function clearPrefixContents() {
    document.getElementById('colourA').reset();
    document.getElementById('colourB').reset();
    document.getElementById('colourC').reset();
}

function generateColours() {
    let resultText = "";

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

    // split the text into parts divided by num of colouras
    let split = [];
    let partLength = Math.ceil(textToColour.length / colours.length);
    for (let index = 0; index < colours.length; index++) {
        split[index] = textToColour.slice(index * partLength, (index + 1) * partLength);
        resultText += `${colours[index]}${split[index]}`;
    }

    // Display the result
    const resultElement = document.getElementById("result");
    resultElement.textContent = resultText;

    const commandElement = document.getElementById("command");
    if (commandElement) {
        commandElement.textContent = resultText;
    } else {
        console.error("Command element not found.");
    }

    const resultContainer = document.getElementById("resultContainer");
    resultContainer.style.height = "auto"; // trigger
    resultContainer.style.opacity = 1;
}

function copyToClipboard(elementId) {
    const textElement = document.getElementById(elementId);
    console.log(textElement);

    if (textElement) {
        let textContent = textElement.textContent;
        console.log(textContent);

        if (elementId === "result") {
            console.log("result ID did the thing");
            const prefixIndex = textContent.indexOf('&');
            if (prefixIndex !== -1) {
                textContent = textContent.substring(prefixIndex);
            }
        }

        // area to copy text
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = textContent;

        // append
        document.body.appendChild(tempTextArea);

        // select the text
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999); // For mobile devices

        // copy
        document.execCommand("copy");

        // remove temporary element
        document.body.removeChild(tempTextArea);

        console.log("text to copy...");
        console.log(document);
        console.log('Text copied to clipboard');
    } else {
        console.error("Failed to copy text: Element not found.");
    }
}

