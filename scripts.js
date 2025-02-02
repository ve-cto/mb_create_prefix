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

        const colourA = `#${getHexColor(document.getElementById("colourA").value)}`;
        const colourB = `#${getHexColor(document.getElementById("colourB").value)}`;
        document.body.style.setProperty('--colourA', colourA);
        document.body.style.setProperty('--colourB', colourB);


        const gradientColors = generateGradient(colourA, colourB, textToColour.length);

        // Generate colored rank without introducing unwanted characters
        const coloredRank = Array.from(textToColour).map((char, index) => `{#${gradientColors[index].toUpperCase()}}${char}`).join('');

        const resultText = `&7[${coloredRank}&7]&r`;

        document.getElementById("result").textContent = resultText;
        document.getElementById("command").textContent = `/lp user ${username} meta setprefix ${resultText}`;
        
        // Print the generated output to console
        console.log("Generated prefix:", resultText);
        console.log("Generated command:", `/lp user ${username} meta setprefix ${resultText}`);
        
        // Ensure the result container is visible
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.style.height = "auto";
        resultContainer.style.opacity = 1;
    });
}

function clearPrefixContents() {
    document.getElementById('colourA').reset();
    document.getElememtById('colourB').reset();
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

    // Split textToColour into equal parts based on the number of colours
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
    resultContainer.style.height = "auto"; // Trigger the transition
    resultContainer.style.opacity = 1;
}

function copyToClipboard(elementId) {
    const textElement = document.getElementById(elementId);
    console.log(textElement);

    if (textElement) {
        // Get the text content
        let textContent = textElement.textContent;
        console.log(textContent);

        if (elementId === "result") {
            console.log("result ID did the thing");
            // Find the position of the first occurrence of '&' for the result element
            const prefixIndex = textContent.indexOf('&');
            if (prefixIndex !== -1) {
                // Update the text content to start from the first occurrence of '&'
                textContent = textContent.substring(prefixIndex);
            }
        }

        // Create a temporary textarea element to copy the text
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = textContent;

        // Append the textarea element to the body
        document.body.appendChild(tempTextArea);

        // Select the text content
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999); // For mobile devices

        // Copy the selected text
        document.execCommand("copy");

        // Remove the temporary textarea element
        document.body.removeChild(tempTextArea);

        console.log("text to copy...");
        console.log(document);
        console.log('Text copied to clipboard');
    } else {
        console.error("Failed to copy text: Element not found.");
    }
}

