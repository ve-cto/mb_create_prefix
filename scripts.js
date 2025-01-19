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
    } else if (randomize == true) {
        colourA = generateRandomColor();
        colourB = generateRandomColor();
        colourA = "{" + colourA + ">}";
        colourB = "{" + colourB + "<}";
        colours = [colourA, colourB];

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
    resultElement.innerHTML = resultText;
    const commandElement = document.getElementById("command");
    if (commandElement) {
        commandElement.innerHTML = `/lp user ${username} meta setprefix ${resultText}`;
    } else {
        console.error("Command element not found.");
    }

    // Make the copy buttons visible
    document.getElementById("copyResultBtn").style.display = 'inline-block';
    document.getElementById("copyCommandBtn").style.display = 'inline-block';
    randomize = false
}

function copyToClipboard(elementId) {
    const textElement = document.getElementById(elementId).innerText;
    const text = textElement.split('<br>')[1] || textElement; // Extract the prefix or command

    navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard');
    }).catch(function(err) {
        console.error('Failed to copy text: ', err);
    });
}

function randomizePrefixColour() {   
    randomize = true
    generatePrefix()
}