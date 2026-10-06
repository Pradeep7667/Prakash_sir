
/* =========================================
   GET ELEMENTS
========================================= */

const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");

const mainScreen = document.getElementById("mainScreen");

const textSection = document.getElementById("textSection");
const animatedText = document.getElementById("animatedText");

const gallerySection = document.getElementById("gallerySection");
const galleryTrack = document.getElementById("galleryTrack");

const finalSection = document.getElementById("finalSection");

const birthdaySong = document.getElementById("birthdaySong");
const birthdayMessage = document.getElementById("birthdayMessage");


/* =========================================
   TEXT SETTINGS
========================================= */

const textSequence = [

    {
        text: "1",
        time: 700
    },

    {
        text: "2",
        time: 700
    },

    {
        text: "3",
        time: 700
    },

    {
        text: "HAPPY",
        time: 1100
    },

    {
        text: "BIRTHDAY",
        time: 1300
    },

    {
        text: "TO MY ",
        time: 1000
    },

    {
        text: "LOVELY GURU JI ❤️❤️💕🎂🍰🍥",
        time: 1600
    }

];


/* =========================================
   START BUTTON
========================================= */

startButton.addEventListener("click", startSurprise);


/* =========================================
   MAIN START FUNCTION
========================================= */

async function startSurprise() {

    console.log("Birthday surprise started.");


    /* -----------------------------------------
       Start Music
    ----------------------------------------- */

    try {

        birthdaySong.currentTime = 0;

        await birthdaySong.play();

        console.log("Music started.");

    } catch (error) {

        console.log(
            "Music could not start:",
            error
        );

    }


    /* -----------------------------------------
       Hide Start Screen
    ----------------------------------------- */

    startScreen.classList.add("hidden");


    /* -----------------------------------------
       Show Main Screen
    ----------------------------------------- */

    mainScreen.classList.remove("hidden");


    /* -----------------------------------------
       Play Text Animation
    ----------------------------------------- */

    await playTextSequence();


    /* -----------------------------------------
       Start Gallery
    ----------------------------------------- */

    await startGallery();


    /* -----------------------------------------
       Show Final Screen
    ----------------------------------------- */

    showFinalScreen();

}


/* =========================================
   TEXT SEQUENCE
========================================= */

function playTextSequence() {

    return new Promise((resolve) => {

        let index = 0;


        function showNextText() {

            /* Sequence completed */

            if (index >= textSequence.length) {

                resolve();

                return;

            }


            const item = textSequence[index];


            /* Remove old animation */

            animatedText.classList.remove("glitch");


            /* Force animation restart */

            void animatedText.offsetWidth;


            /* Set new text */

            animatedText.textContent = item.text;


            /* Start animation */

            animatedText.classList.add("glitch");


            console.log(
                "Showing:",
                item.text
            );


            /* Wait before next text */

            setTimeout(() => {

                index++;

                showNextText();

            }, item.time);

        }


        showNextText();

    });

}


/* =========================================
   GALLERY
========================================= */

function startGallery() {

    return new Promise((resolve) => {

        console.log("Gallery started.");


        /* Hide text section */

        textSection.classList.add("hidden");


        /* Show gallery */

        gallerySection.classList.remove("hidden");


        /* Get photos */

        const photos =
            galleryTrack.querySelectorAll(".photo-card");


        /* No photos */

        if (photos.length === 0) {

            console.log("No photos found.");

            resolve();

            return;

        }


        let currentIndex = 0;


        /* Reset gallery position */

        galleryTrack.style.transform =
            "translateX(0)";


        /* Start after one second */

        setTimeout(
            moveNextPhoto,
            1000
        );


        function moveNextPhoto() {

            currentIndex++;


            /* All photos completed */

            if (currentIndex >= photos.length) {

                setTimeout(() => {

                    resolve();

                }, 1000);

                return;

            }


            const photoWidth =
                photos[0].getBoundingClientRect().width;


            const gap = 18;


            /* Calculate movement */

            const moveDistance =
                currentIndex *
                (photoWidth + gap);


            galleryTrack.style.transform =
                `translateX(-${moveDistance}px)`;


            console.log(
                "Showing photo:",
                currentIndex + 1
            );


            /* Move to next photo */

            setTimeout(
                moveNextPhoto,
                1300
            );

        }

    });

}


/* =========================================
   FINAL SCREEN
========================================= */

function showFinalScreen() {

    console.log("Final screen started.");


    /* Hide gallery */

    gallerySection.classList.add("hidden");


    /* Show final section */

    finalSection.classList.remove("hidden");


    /* Reset message scroll */

    birthdayMessage.scrollTop = 0;


    /* Start typing after one second */

    setTimeout(() => {

        typeBirthdayMessage();

    }, 1000);

}


/* =========================================
   BIRTHDAY TYPEWRITER
========================================= */

function typeBirthdayMessage() {

    const message =

`Wishing you a very Happy Birthday, Dear Guru Ji! ❤️

May your life always be filled with happiness, good health, peace and success.

Your guidance, support and kind words have always been truly valuable. You have always inspired the people around you with your knowledge, kindness and positive nature.

On this special day, I just want to say thank you for being such a wonderful person and an amazing guide.

May every new year of your life bring new opportunities, beautiful memories and countless reasons to smile.

Stay blessed, stay happy and keep inspiring us always.

Once again, a very Happy Birthday, Guru Ji! 🎂❤️✨`;


    /* Clear old message */

    birthdayMessage.textContent = "";


    let index = 0;


    /* Typing speed */

    const typingSpeed = 35;


    function typeNextCharacter() {

        /* Typing completed */

        if (index >= message.length) {

            console.log(
                "Birthday message completed."
            );

            return;

        }


        /* Add next character */

        birthdayMessage.textContent +=
            message.charAt(index);


        index++;


        /* -----------------------------------------
           AUTO SCROLL INSIDE MESSAGE BOX
        ----------------------------------------- */

        birthdayMessage.scrollTop =
            birthdayMessage.scrollHeight;


        /* Default typing speed */

        let delay = typingSpeed;


        const currentCharacter =
            message.charAt(index - 1);


        /* Pause after full stop */

        if (currentCharacter === ".") {

            delay = 350;

        }


        /* Pause after comma */

        if (currentCharacter === ",") {

            delay = 180;

        }


        /* Pause after new line */

        if (currentCharacter === "\n") {

            delay = 500;

        }


        setTimeout(
            typeNextCharacter,
            delay
        );

    }


    typeNextCharacter();

}


/* =========================================
   KEEP MUSIC PLAYING
========================================= */

birthdaySong.addEventListener(
    "ended",
    () => {

        birthdaySong.currentTime = 0;

        birthdaySong.play().catch(() => {

            console.log(
                "Music could not restart."
            );

        });

    }
);


/* =========================================
   DEBUG
========================================= */

console.log(
    "%c Birthday Website Loaded Successfully ❤️ ",
    "color:#ff00aa;font-size:16px;font-weight:bold;"
);
