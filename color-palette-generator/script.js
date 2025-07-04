const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

function generatePalette() {
    const colors = [];
    paletteContainer.innerHTML = "";
    for (let i = 0; i < 5; i++) {
        const color = getRandomColor();
        colors.push(color);
        createColorBox(color);
    }
}

function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, "0")}`;
}

function createColorBox(color) {
    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");

    const colorDiv = document.createElement("div");
    colorDiv.classList.add("color");
    colorDiv.style.backgroundColor = color;

    const colorInfo = document.createElement("div");
    colorInfo.classList.add("color-info");

    const colorCode = document.createElement("span");
    colorCode.classList.add("color-code");
    colorCode.textContent = color;
    colorInfo.appendChild(colorCode);
    const copyBtn = document.createElement("i");
    copyBtn.classList.add("fas", "fa-copy");
    copyBtn.addEventListener("click", () => {
        navigator.clipboard
            .writeText(color)
            .then(() => {
                alert(`Color ${color} copied to clipboard!`);
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    });
    colorInfo.appendChild(copyBtn);

    colorBox.appendChild(colorDiv);
    colorBox.appendChild(colorInfo);
    paletteContainer.appendChild(colorBox);
}

generatePalette();
