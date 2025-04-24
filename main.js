// Character Data
var player = {};

// States
let talent = {}
let spy = {}
let cheater = {}


// Active/Inactive Displays

// as long as something has a class, this will work
// just make sure to add the quotations in the parameter
// Ex: displayVisibility(`dialog`)

function displayVisiblity(display) {
    if(document.getElementsByClassName(display)[0].id !== `inactive`){
        document.getElementsByClassName(display)[0].id = `inactive`;
    } else if (document.getElementsByClassName(display)[0].id !== `active`){
        document.getElementsByClassName(display)[0].id = `active`;
    }
}


// Dialog typewriter effect
var i = 0;
var txt = '';
var speed = 35;


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

// Character Images

const hero = "url(images/characters/goblin.png)";
const heroRear = "url(images/characters/goblinBack1.png)"
const heroRearAlt = `url(images/characters/goblinBack2.png)`
const mentor = "url(images/characters/goblinmentor.png)";
const goblinResist = `url(images/characters/goblin2.png)`;
const goblinClan = `url(images/characters/goblin3.png)`
const sans = "url(images/characters/goblinSans.png)";

// Background Images

const casinoInner = `url(images/environment/goblincasinointerior.jpg)`;
const testBg = `url(images/environment/casinobg.jpg)`;
const epiloguebg = `url(images/environment/epiloguebg.png)`;

// Character Dialog image changer

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

let functions = {
    displayVisChar:function() {displayVisiblity(`dialogCharacter`)},
    speakerSwap:function() {speakerSwap()},
    pass: function(){ return 1},
    clanPortrait:function() {characterChange(goblinClan)},
    resistPortrait:function() {characterChange(goblinResist)},
    mentorPortrait:function() {characterChange(mentor)},
    

}

const optionButtonsElement = document.getElementsByClassName(`option`)[0];


function startGame() {
    displayVisiblity(`loading`)
    sceneChange(epiloguebg)
    displayVisiblity(`dice-container`)
    displayVisiblity(`box`)
    displayVisiblity(`diceSystem`)
    displayVisiblity(`dialogCharacter`)
    displayVisiblity(`skillCheck`)
    spy = {}
    talent = {}
    cheater = {}
    showTextNode(1)
    typeWriterClear()
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    txt = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement(`button`)
            button.innerText = option.text
            button.classList.add(`button`)
            button.addEventListener(`click`, () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function runFunc(option) {
    functions[option.funcRun]();
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    runFunc(option)
    spy = option.setSpy
    talent = option.setTalent
    cheater = option.setCheater
    console.log(talent)
    showTextNode(nextTextNodeId)
    typeWriterClear()
}



const textNodes = [
    {
        // intro
        id: 1,
        text: `A couple millennium ago, the first goblin societies began to form. They were few and far between, with the most successful of them having populations numbering only in the dozens. Then they had a breakthrough, they created the first set of dice. This invention revolutionized the way that goblin society worked. The creation of these first dice allowed the goblins of old to unite, creating the megacity of Qhrazrindrit. The usage of dice began to intertwine with the day-to-day lives of every goblin. They used these dice to determine how successful they were going to be at an action, and because they believed it would work, it did.`,
        options: [
            {
                text: `Continue`,
                nextText: 2,
                funcRun: `pass`,
            },
        ]
    },
    {
        id: 2,
        text:`For a while, life as a goblin was good, that was until the creation of the casino. The prospect of being able to gain wealth from gambling led many goblins to begin cheating. They began creating various ways to cheat: uneven dice, loaded dice, magnetic dice, and various other ways to cheat.`,
        options: [
            {
                text:`Continue`,
                nextText: 3,
                funcRun: `pass`,
            }
        ]
    },
    {
        id: 3,
        text: ` At first, these cheats were only used within casinos, but the eventual spread of these cheats would lead to the collapse of a majority of organized governments. In their place, a small few cheated their way to power, establishing large clans to enforce their rule. The largest of these clans is stationed within Qhrazrindrit, where they repurposed many old buildings to create casinos.`,
        options: [
            {
                text:`Continue`,
                nextText: 4,
                funcRun: `pass`,
            }
        ]
    },
    {
        id: 4,
        text: `They have begun setting up casinos in various cities nearby to expand their control, but lately there has been some resistance. The Resistance is made up of a relatively large number of goblins from all around the world. This group has one goal in mind; to wipe out the clan and restore order to goblinkind.`,
        options: [
            {
                text:`Continue`,
                nextText: 5,
                funcRun: `pass`,
            }
        ]
    },
    {
        id: 5,
        text: `Your story begins in the small rural village of Thornbrook. You are a small goblin who lives a quiet life in this quiet village.`,
        options: [
            {
                text:`Continue`,
                nextText: 6,
                funcRun: `pass`,
            }
        ]
    },
    {
        id: 6,
        text: `What is your talent?`,
        options: [
            {
                text: `Slight of Hand: You have an easier time cheating`,
                setTalent: 1,
                nextText: 7,
                funcRun: `pass`,
            },
            {
                text: `Keen Eyes: Enemies have a harder time cheating `,
                setTalent: 2,
                nextText: 7,
                funcRun: `pass`,
            },
            {
                text: `Overseer: Stops everyone from cheating for a turn`,
                setTalent: 3,
                nextText: 7,
                funcRun: `pass`,
            }
        ]
    },
    {
        id: 7,
        text: `While cooking a delicious stew, you begin to hear shouting outside your home. You go to take a look (goblins are very nosey after all) and you see what seems to be two groups yelling at eachother.`,
        options: [
            {
                text:`Figure out who the two parties are`,
                nextText: 8,
                funcRun: `clanPortrait`,
            }
        ]
    },
    {
        id: 8,
        text: `Upon closer inspection, you realize that they are members of the clan and resistance.`,
        options: [
            {
                text:`Continue`,
                nextText: 9,
                funcRun: `displayVisChar`,
                
            }
        ]
    },
    {
        id: 9,
        text: `Hey you!`,
        options: [
            {
                text:`Answer rudely`,
                nextText:10,
                funcRun: `speakerSwap`,
            },
            {
                text:`Answer respectfully`,
                nextText:11,
                funcRun: `speakerSwap`,
            }
        ]
    },
    {
        id: 10,
        text: `What could you possibly want from me ya idiots?`,
        options: [
            {
                text: `Continue`,
                nextText: 12,
                funcRun: `speakerSwap`,
            }
        ]
    },
    {
        id: 11,
        text: `How may I be of your assistance my good sir?`,
        options: [
            {
                text: `Continue`,
                nextText: 13,
                funcRun: `speakerSwap`,
            }
        ]
    },
    {
        id: 12,
        text: `We just need your help solving a little... dispute, that's all.`,
        options : [
            {
                text: `Continue`,
                nextText: 14,
                funcRun: `resistPortrait`
            }
        ]
    },
    {
        id: 13,
        text: `Well Mr. Fancy-Pants, we need you to mediate a disagreement between us and some friends of ours.`,
        options : [
            {
                text: `Continue`,
                nextText: 14,
                funcRun: `resistPortrait`
            }
        ]
    },
    {
        id: 14,
        text: `Yeah, these guys are intruding on OUR TURF, now tell 'em to GET LOST!`,
        options: [
            {
                text: `Tell the clan members get lost`,
                nextText: 16,
                funcRun: `speakerSwap`
            },
            {
                text: `Hear what the clan has to say`,
                nextText: 15,
                funcRun: `clanPortrait`,
            }
        ]
    },
    {
        id: 15,
        text: `Don't listen to these idiots, we were just doing a routine inspection under direct orders from the Archboss.`,
        options: [
            {
                text:`Tell the resistance that they are in the wrong`,
                
            },
            {
                text:`Tell the clan that they still need to get lost`,
                nextText: 16,
                funcRun:`speakerSwap`,
            },
            {
                text:`Insult the two parties and tell them to get out of your town NOW`,
            }
        ]
    },

]

function conversationCont(reply) {
    speakerSwap();
    txt = reply;
    typeWriterClear();
}

// Background Scene Change
let backgroundScene = document.getElementById(`body`);



function sceneChange(newScene) {
    backgroundScene.style.background = newScene;
    backgroundScene.style.backgroundSize = `cover`;
    backgroundScene.style.backgroundRepeat = `no-repeat` 
    backgroundScene.style.backgroundPosition = `center`;
}

let response = `Fortnite is an online video game and game platform developed by Epic Games and released in 2017. It is available in seven distinct game mode versions that otherwise share the same general gameplay and game engine: Fortnite Battle Royale, a battle royale game in which up to 100 players fight to be the last person standing; Fortnite: Save the World, a cooperative hybrid tower defense-shooter and survival game in which up to four players fight off zombie-like creatures and defend objects with traps and fortifications they can build; Fortnite Creative, in which players are given complete freedom to create worlds and battle arenas; Lego Fortnite, an open world game collection divided between survival game Lego Fortnite Odyssey and social game Lego Fortnite Brick Life; Rocket Racing, a racing game; Fortnite Festival, a rhythm game; and Fortnite Ballistic, a tactical first-person shooter currently in early access. All game modes except Save the World are free-to-play.`;



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


// Inventory )?
function openBackpack(evt, backpackName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(backpackName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  // Get the element with id="defaultOpen" and click on it
//   document.getElementById("defaultOpen").click();

function preLoad() {
    
    setTimeout(startGame, 8000);
}


//   Dice Progress Bar JS (written by copilot)
function diceProgressBar() {
    const diceElements = document.querySelectorAll(".dice");
    let progress = 0;

    const interval = setInterval(() => {
        if (progress < diceElements.length) {
            diceElements[progress].style.color = "white"; // Change color to white progressively
            progress++;
        } else {
            clearInterval(interval);
        }
    }, 1000); // Adjust speed of progress (500ms per dice)
}

// Start the dice progress bar when the page loads
window.onload = diceProgressBar;

// Roll Dice System(combat system)
function rollSingleDie() {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  function rollDice() {
    const die1 = document.getElementById("die1");
    const die2 = document.getElementById("die2");
    const disSum = document.getElementById("sum");
  
    const result1 = rollSingleDie();
    const result2 = rollSingleDie();
  
    const sum = result1 + result2;
  
    die1.innerHTML = result1;
    die2.innerHTML = result2;
    disSum.innerHTML = "Sum: " + sum;
    // add animation class
  
    die1.classList.add("roll");
    die2.classList.add("roll");
  
    setTimeout(() => {
      die1.classList.remove("roll");
      die2.classList.remove("roll");
    }, 500);
  
    // Remove animation class
    die1.classList.remove("roll");
    die2.classList.remove("roll");
  
    // Trigger reflow
    void die1.offsetWidth;
    void die2.offsetWidth;
  
    // Add animation class
    die1.classList.add("roll");
    die2.classList.add("roll");
  }


// preLoad();
startGame();