// Character Data
var player = {};








// Dialog typewriter effect
var i = 0;
var txt = 'Hey man, how are you?';
var speed = 50;


function typeWriter() {
    if (i < txt.length) {
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
        document.getElementById("demo").scrollIntoView({behavior: `smooth`, block:`end`,});
    }
}

function typeWriterClear() {
    document.getElementById(`demo`).innerHTML = ``;
    i = 0;
    typeWriter();
}

// Character Dialog image changer

const test = "url(images/characters/goblin.png)";

const mentor = "url(images/characters/goblin2.png)";



function characterChange(newCharacter) {
    document.getElementsByClassName(`npc`)[0].style.backgroundImage = newCharacter;
}


// Speaking Character swap

let speaker1 = document.getElementsByClassName(`mainCharacter`)[0].id;


function speakerSwap() {
    if (speaker1 == `speaking`) {
        document.getElementsByClassName(`mainCharacter`)[0].id = `idle`;
        document.getElementsByClassName(`npc`)[0].id = `speaking`;
        speaker1 = document.getElementsByClassName(`mainCharacter`)[0].id;
    } else if (speaker1 != `speaking`) {
        document.getElementsByClassName(`mainCharacter`)[0].id = `speaking`;
        document.getElementsByClassName(`npc`)[0].id = `idle`;
        speaker1 = document.getElementsByClassName(`mainCharacter`)[0].id;
    }
}

// skill bar overlay
function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

// Conversation Data
const optionButtonsElement = document.getElementById(`option-buttons`);

// const textNodes = [
//     {
//         // intro
//         id: 1,
//         text: ``,
//         options: [
//             {
//                 text: `Continue`
//                 nextText: 1,
//             },
//         ]
//     }
// ]

let response = `Fortnite is an online video game and game platform developed by Epic Games and released in 2017. It is available in seven distinct game mode versions that otherwise share the same general gameplay and game engine: Fortnite Battle Royale, a battle royale game in which up to 100 players fight to be the last person standing; Fortnite: Save the World, a cooperative hybrid tower defense-shooter and survival game in which up to four players fight off zombie-like creatures and defend objects with traps and fortifications they can build; Fortnite Creative, in which players are given complete freedom to create worlds and battle arenas; Lego Fortnite, an open world game collection divided between survival game Lego Fortnite Odyssey and social game Lego Fortnite Brick Life; Rocket Racing, a racing game; Fortnite Festival, a rhythm game; and Fortnite Ballistic, a tactical first-person shooter currently in early access. All game modes except Save the World are free-to-play.`;

function conversationCont(reply) {
    speakerSwap();
    txt = reply;
    typeWriterClear();
}

// progress bar
var i = 0;
function move() {
    if (i == 0) {
        i = 1;
        var lol = document.getElementById("mainBar");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            } else {
                width++;
                lol.style.width = width + "%";
            }
        }
    }
}


