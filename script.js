

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
   SETTINGS
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
        text: "TO MY",
        time: 1000
    },

    {
        text: "LOVE",
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

    /*
        Browser audio autoplay restriction solved:
        The audio is started from the user's button click.
    */

    try {

        birthdaySong.currentTime = 0;

        await birthdaySong.play();

        console.log("Music started.");

    } catch (error) {

        console.log("Music could not start:", error);

    }


    /* Hide start screen */

    startScreen.classList.add("hidden");


    /* Show main screen */

    mainScreen.classList.remove("hidden");


    /* Start text sequence */

    await playTextSequence();


    /* Start gallery */

    await startGallery();


    /* Show final screen */

    showFinalScreen();

}


/* =========================================
   TEXT SEQUENCE
========================================= */

function playTextSequence() {

    return new Promise((resolve) => {

        let index = 0;


        function showNextText() {

            /*
                Sequence complete
            */

            if (index >= textSequence.length) {

                resolve();

                return;

            }


            const item = textSequence[index];


            /*
                Remove old animation
            */

            animatedText.classList.remove("glitch");


            /*
                Force browser reflow.
                This makes animation restart every time.
            */

            void animatedText.offsetWidth;


            /*
                Set new text
            */

            animatedText.textContent = item.text;


            /*
                Start animation
            */

            animatedText.classList.add("glitch");


            console.log("Showing:", item.text);


            /*
                Wait before next text
            */

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


        /*
            Hide text
        */

        textSection.classList.add("hidden");


        /*
            Show gallery
        */

        gallerySection.classList.remove("hidden");


        /*
            Get all photos
        */

        const photos =
            galleryTrack.querySelectorAll(".photo-card");


        /*
            No photos found
        */

        if (photos.length === 0) {

            console.log("No photos found.");

            resolve();

            return;

        }


        let currentIndex = 0;


        /*
            Reset gallery position
        */

        galleryTrack.style.transform =
            "translateX(0)";


        /*
            Wait before moving first photo
        */

        setTimeout(moveNextPhoto, 1000);


        function moveNextPhoto() {

            currentIndex++;


            /*  All photos completed  */

            if (currentIndex >= photos.length) {

                setTimeout(() => {

                    resolve();

                }, 1000);

                return;

            }


            const photoWidth =
                photos[0].getBoundingClientRect().width;


            const gap = 18;


            /*
                Calculate movement
            */

            const moveDistance =
                currentIndex * (photoWidth + gap);


            galleryTrack.style.transform =
                `translateX(-${moveDistance}px)`;


            console.log(
                "Showing photo:",
                currentIndex + 1
            );


            /*
                Move to next photo
            */

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

/* =========================================
   FINAL SCREEN
========================================= */

function showFinalScreen() {

    console.log("Final screen started.");

    /*
        Hide gallery
    */

    gallerySection.classList.add("hidden");


    /*
        Show final screen
    */

    finalSection.classList.remove("hidden");


    /*
        Start typing message
        after a small delay
    */

    setTimeout(() => {

        typeBirthdayMessage();

    }, 1000);

}











/* =========================================
   BIRTHDAY TYPEWRITER
========================================= */

/* =========================================
   BIRTHDAY TYPEWRITER
========================================= */

function typeBirthdayMessage() {

 const message =`Wishing you a very Happy Birthday, Dear Guru Ji! ❤️

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

        if (index < message.length) {

            birthdayMessage.textContent +=
                message.charAt(index);

            index++;


            /*
                Automatically scroll ONLY
                inside the birthday message box
            */

            birthdayMessage.scrollTop = birthdayMessage.scrollHeight;


            let delay = typingSpeed;


            const currentCharacter =
                message.charAt(index - 1);


            /*
                Natural pauses
            */

            if (currentCharacter === ".") {

                delay = 350;

            }


            if (currentCharacter === ",") {

                delay = 180;

            }


            if (currentCharacter === "\n") {

                delay = 500;

            }


            setTimeout(
                typeNextCharacter,
                delay
            );

        }

    }


    typeNextCharacter();

}


















/* =========================================
   OPTIONAL:
   KEEP MUSIC PLAYING
========================================= */

birthdaySong.addEventListener("ended", () => {

    /*
        If you don't want the song to repeat,
        remove the code below.
    */

    birthdaySong.currentTime = 0;

    birthdaySong.play().catch(() => {
        console.log("Music ended.");
    });

});


/* =========================================
   DEBUG MESSAGE
========================================= */

console.log(
    "%c Birthday Website Loaded Successfully ❤️ ",
    "color:#ff00aa;font-size:16px;font-weight:bold;"
);