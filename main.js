// Dialog typewriter effect
var i = 0;
var txt = 'Input some words here';
var speed = 50;

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}


// Character Dialog image changer

const test = "url(images/characters/goblin.png)";

const mentor = "url(images/characters/goblin2.png)";



function characterChange(newCharacter) {
    document.getElementsByClassName(`npc`).style.background = newCharacter;
    console.log(`boo`);
}