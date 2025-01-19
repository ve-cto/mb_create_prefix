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

function generatePrefix() {
    let resultText = "";
    const bracketColour = '{#gray}';

    const username = document.getElementById("username").value;
    const textToColour = document.getElementById("textToColour").value;

    let colourA = document.getElementById("colourA").value;
    colourA = "{#" + colourA + ">}";

    let colourB = document.getElementById("colourB").value;
    colourB = "{#" + colourB + "<}";

    const hasTransition = document.getElementById("hasTransition").value.toLowerCase();

    let colours;
    if (hasTransition === "yes") {
        let colourC = document.getElementById("colourC").value;
        colourC = "{#" + colourC + "<>}";
        colours = [colourA, colourC, colourB];
    } else {
        colours = [colourA, colourB];
    }

    if (hasTransition !== "yes") {
        resultText += `${bracketColour}[${colourA}${textToColour}${colourB}${bracketColour}]&f`;
    } else {
        const split1 = textToColour.slice(0, Math.ceil(textToColour.length / 2));
        const split2 = textToColour.slice(Math.ceil(textToColour.length / 2));
        resultText += `${bracketColour}[${colourA}${split1}${colours[1]}${split2}${colourB}${bracketColour}]&f`;
    }

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `This is the resulting prefix:<br>${resultText}`;
    const commandElement = document.getElementById("command");
    if (commandElement) {
        commandElement.innerHTML = `This is the command to change their prefix:<br>/lp user ${username} meta setprefix ${resultText}`;
    } else {
        console.error("Command element not found.");
    }

    const resultContainer = document.getElementById("resultContainer");
    resultContainer.style.height = "auto"; // Trigger the transition
    resultContainer.style.opacity = 1;
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
