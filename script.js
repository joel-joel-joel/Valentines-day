// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Click Envelope

envelope.addEventListener("click", () => {
    // Add opening animation class
    envelope.classList.add("opening");

    // Show letter container
    letter.style.display = "flex";

    // After animation completes, hide envelope
    setTimeout(() => {
        envelope.style.display = "none";
    }, 800);

    // Open letter window
    setTimeout( () => {
        document.querySelector(".letter-window").classList.add("open");
    }, 400);
});

// Logic to move the NO btn

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Logic to make YES btn to grow

// let yesScale = 1;

// yesBtn.style.position = "relative"
// yesBtn.style.transformOrigin = "center center";
// yesBtn.style.transition = "transform 0.3s ease";

// noBtn.addEventListener("click", () => {
//     yesScale += 2;

//     if (yesBtn.style.position !== "fixed") {
//         yesBtn.style.position = "fixed";
//         yesBtn.style.top = "50%";
//         yesBtn.style.left = "50%";
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }else{
//         yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
//     }
// });

// Function to create confetti
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#ff69b4', '#ff1493', '#ff69b4', '#ffb6c1', '#ff85c0'];
    const shapes = ['❤', '💕', '💖', '✨', '💝'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];

        // Position and styling
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';

        // Animation properties
        const duration = (Math.random() * 3 + 2);
        const drift = (Math.random() - 0.5) * 100; // Random horizontal drift
        confetti.style.setProperty('--drift', drift + 'px');
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        confetti.style.animation = 'fall linear forwards';

        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, (duration + 0.5) * 1000);
    }
}

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "cat_dance.gif";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";

    // Trigger confetti
    createConfetti();
});
