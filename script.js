// ===== BLOOM ANIMATION STATE MACHINE =====

// Bloom elements
const bloomContainer = document.getElementById("bloom-intro-container");
const pixelPot = document.getElementById("pixel-pot");
const pixelStem = document.getElementById("pixel-stem");
const pixelBud = document.getElementById("pixel-bud");

// Animation state
let bloomState = "idle"; // idle → growing → budding → blooming → envelopeReady
let animationLocked = false;

// Pot click handler - starts bloom sequence
pixelPot.addEventListener("click", () => {
    if (bloomState !== "idle" || animationLocked) return;

    animationLocked = true;
    bloomState = "growing";

    // Disable pot clicks
    pixelPot.style.pointerEvents = "none";

    // Start stem growth
    pixelStem.classList.add("growing");

    // Wait for stem animation to complete
    pixelStem.addEventListener("animationend", onStemGrowComplete, { once: true });
});

function onStemGrowComplete() {
    bloomState = "budding";

    // Show bud at top of stem
    pixelBud.classList.add("appearing");

    // Wait for bud appear animation
    pixelBud.addEventListener("animationend", onBudAppearComplete, { once: true });
}

function onBudAppearComplete() {
    // Remove appearing class and add pulsing
    pixelBud.classList.remove("appearing");
    pixelBud.classList.add("pulsing");

    // Let bud pulse for 1 second, then morph to envelope
    setTimeout(() => {
        bloomState = "blooming";

        // Remove pulsing, start morph
        pixelBud.classList.remove("pulsing");
        pixelBud.classList.add("morphing");

        // Wait for morph animation
        pixelBud.addEventListener("animationend", onBudMorphComplete, { once: true });
    }, 1000);
}

function onBudMorphComplete() {
    bloomState = "envelopeReady";

    // Hide bloom container
    bloomContainer.classList.add("complete");

    // Reveal envelope with pop-in animation
    envelope.classList.add("revealed");

    animationLocked = false;
}

// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Music Player Elements
const backgroundMusic = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const muteBtn = document.getElementById("mute-btn");
const volumeSlider = document.getElementById("volume-slider");

// Music Player State
let isPlaying = false;
let isMuted = false;

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
        confetti.style.animationName = 'fall';
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        confetti.style.animationTimingFunction = 'linear';
        confetti.style.animationFillMode = 'forwards';

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

// ===== MUSIC PLAYER FUNCTIONALITY =====

// Initialize volume
backgroundMusic.volume = volumeSlider.value / 100;

// Auto-play music on page load
backgroundMusic.play().then(() => {
    musicToggle.classList.add("playing");
    isPlaying = true;
}).catch(error => {
    console.log("Autoplay blocked by browser:", error);
    // Music button will allow manual start if autoplay is blocked
});

// Play/Pause Toggle
musicToggle.addEventListener("click", () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.remove("playing");
        isPlaying = false;
    } else {
        backgroundMusic.play().catch(error => {
            console.log("Autoplay prevented:", error);
            // Browser blocked autoplay, user needs to interact
        });
        musicToggle.classList.add("playing");
        isPlaying = true;
    }
});

// Auto-play music when envelope is clicked
envelope.addEventListener("click", () => {
    if (!isPlaying) {
        backgroundMusic.play().then(() => {
            musicToggle.classList.add("playing");
            isPlaying = true;
        }).catch(error => {
            console.log("Autoplay prevented:", error);
            // User can manually start music with the button
        });
    }
});

// Volume Control
volumeSlider.addEventListener("input", (e) => {
    const volume = e.target.value / 100;
    backgroundMusic.volume = volume;

    // Update mute button if volume is 0
    if (volume === 0) {
        muteBtn.textContent = "🔇";
        isMuted = true;
    } else {
        muteBtn.textContent = "🔊";
        isMuted = false;
    }
});

// Mute/Unmute Toggle
muteBtn.addEventListener("click", () => {
    if (isMuted) {
        backgroundMusic.muted = false;
        muteBtn.textContent = "🔊";
        isMuted = false;
    } else {
        backgroundMusic.muted = true;
        muteBtn.textContent = "🔇";
        isMuted = true;
    }
});
