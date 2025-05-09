// Character Data
var player = {
  talent: 0,
  spy: 0,
  cheater: 0,
  quests: 0,
};

// States
let talent = {};
let spy = {};
let cheater = {};

// Active/Inactive Displays

// as long as something has a class, this will work
// just make sure to add the quotations in the parameter
// Ex: displayVisibility(`dialog`)

function displayVisiblity(display) {
  if (document.getElementsByClassName(display)[0].id !== `inactive`) {
    document.getElementsByClassName(display)[0].id = `inactive`;
  } else if (document.getElementsByClassName(display)[0].id !== `active`) {
    document.getElementsByClassName(display)[0].id = `active`;
  }
}

// Dialog typewriter effect
var i = 0;
var txt = "";
var speed = 35;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
    document
      .getElementById("demo")
      .scrollIntoView({ behavior: `smooth`, block: `end` });
  }
}

function typeWriterClear() {
  document.getElementById(`demo`).innerHTML = ``;
  i = 0;
  typeWriter();
}

// Character Images

const hero = "url(images/characters/goblin.png)";
const heroRear = "url(images/characters/goblinBack1.png)";
const heroRearAlt = `url(images/characters/goblinBack2.png)`;
const mentor = "url(images/characters/goblinmentor.png)";
const goblinResist = `url(images/characters/goblin2.png)`;
const goblinClan = `url(images/characters/goblin3.png)`;
const sans = "url(images/characters/goblinSans.png)";
const archie = `url(images/characters/ARCHBOSS.png)`;
const hulkGoblin = "url(images/characters/Hulk_goblin-removebg-preview.png)";

// Background Images

const casinoInner = `url(images/environment/goblincasinointerior.jpg)`;
const testBg = `url(images/environment/casinobg.jpg)`;
const epiloguebg = `url(images/environment/epiloguebg.png)`;
const hometownbg = `url(images/environment/hometown.jpg)`;
const obsidianbg = `url(images/environment/obsidiancrag.jpg)`;
const greenrockbg = `url(images/environment/greenrock.jpg)`;
const charcoalbg = `url(images/environment/charcoalquarry.jpg)`;
const tavernbg = `url(images/environment/tavern.jpg)`;
const mainbg = `url(images/hud/Home-screen.png)`;

// Character Dialog image changer

function characterChange(newCharacter) {
  document.getElementsByClassName(`npc`)[0].style.backgroundImage =
    newCharacter;
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
  displayVisChar: function () {
    displayVisiblity(`dialogCharacter`);
  },
  speakerSwap: function () {
    speakerSwap();
  },
  pass: function () {
    return 1;
  },
  clanPortrait: function () {
    characterChange(goblinClan);
  },
  hulkPortrait: function () {
    characterChange(hulkGoblin);
  },
  resistPortrait: function () {
    characterChange(goblinResist);
  },
  mentorPortrait: function () {
    characterChange(mentor);
  },
  archiePortrait: function () {
    displayVisiblity(`dialogCharacter`);
    characterChange(archie);
  },
  archiePortrait2: function () {
    characterChange(archie);
  },
  clanSpySpeak: function () {
    displayVisiblity(`dialogCharacter`);
    characterChange(sans);
  },
  clanSpeak: function () {
    characterChange(goblinClan);
    speakerSwap();
  },
  resistSpeak: function () {
    characterChange(goblinResist);
    speakerSwap();
  },
  mentorSpeak: function () {
    characterChange(mentor);
    speakerSwap();
  },
  bgSwapObsid: function () {
    sceneChange(obsidianbg);
  },
  bgSwapChar: function () {
    sceneChange(charcoalbg);
  },
  bgSwapGreen: function () {
    sceneChange(greenrockbg);
  },
  bgSwapHome: function () {
    sceneChange(hometownbg);
  },
  bgSwapCasinoIn: function () {
    sceneChange(casinoInner);
  },
  bgSwapEpilogue: function () {
    sceneChange(epiloguebg);
  },
  bgSwapTavern: function () {
    sceneChange(tavernbg);
  },
};

const optionButtonsElement = document.getElementsByClassName(`option`)[0];

function startGame() {
  displayVisiblity(`loading`)
  displayVisiblity(`dice-container`);
  showTextNode(1);
  typeWriterClear();
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  txt = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement(`button`);
      button.innerText = option.text;
      button.classList.add(`button`);
      button.addEventListener(`click`, () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function runFunc(option) {
  functions[option.funcRun]();
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  runFunc(option);
  if (option.setSpy == true) {
    spy = option.setSpy
  }
  if (option.setTalent == true) {
    talent = option.setTalen
  }
  if (option.setCheater == true) {
    cheater = option.setCheater
  }
  console.log(talent);
  showTextNode(nextTextNodeId);
  typeWriterClear();
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
    ],
  },
  {
    id: 2,
    text: `For a while, life as a goblin was good, that was until the creation of the casino. The prospect of being able to gain wealth from gambling led many goblins to begin cheating. They began creating various ways to cheat: uneven dice, loaded dice, magnetic dice, and various other ways to cheat.`,
    options: [
      {
        text: `Continue`,
        nextText: 3,
        funcRun: `bgSwapCasinoIn`,
      },
    ],
  },
  {
    id: 3,
    text: ` At first, these cheats were only used within casinos, but the eventual spread of these cheats would lead to the collapse of a majority of organized governments. In their place, a small few cheated their way to power, establishing large clans to enforce their rule. The largest of these clans is stationed within Qhrazrindrit, where they repurposed many old buildings to create casinos.`,
    options: [
      {
        text: `Continue`,
        nextText: 4,
        funcRun: `pass`,
      },
    ],
  },
  {
    id: 4,
    text: `They have begun setting up casinos in various cities nearby to expand their control, but lately there has been some resistance. The Resistance is made up of a relatively large number of goblins from all around the world. This group has one goal in mind; to wipe out the clan and restore order to goblinkind.`,
    options: [
      {
        text: `Continue`,
        nextText: 5,
        funcRun: `pass`,
      },
    ],
  },
  {
    id: 5,
    text: `Your story begins in the small rural village of Thornbrook. You are a small goblin who lives a quiet life in this quiet village.`,
    options: [
      {
        text: `Continue`,
        nextText: 6,
        funcRun: `bgSwapHome`,
      },
    ],
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
      },
    ],
  },
  {
    id: 7,
    text: `While cooking a delicious stew, you begin to hear shouting outside your home. You go to take a look (goblins are very nosey after all) and you see what seems to be two groups yelling at eachother.`,
    options: [
      {
        text: `Figure out who the two parties are`,
        nextText: 8,
        funcRun: `clanPortrait`,
      },
    ],
  },
  {
    id: 8,
    text: `Upon closer inspection, you realize that they are members of the clan and resistance.`,
    options: [
      {
        text: `Continue`,
        nextText: 9,
        funcRun: `displayVisChar`,
      },
    ],
  },
  {
    id: 9,
    text: `"Hey you!"`,
    options: [
      {
        text: `Answer rudely`,
        nextText: 10,
        funcRun: `speakerSwap`,
      },
      {
        text: `Answer respectfully`,
        nextText: 11,
        funcRun: `speakerSwap`,
      },
    ],
  },
  {
    id: 10,
    text: `What could you possibly want from me ya idiots?`,
    options: [
      {
        text: `Continue`,
        nextText: 12,
        funcRun: `speakerSwap`,
      },
    ],
  },
  {
    id: 11,
    text: `How may I be of your assistance my good sir?`,
    options: [
      {
        text: `Continue`,
        nextText: 13,
        funcRun: `speakerSwap`,
      },
    ],
  },
  {
    id: 12,
    text: `"We just need your help solving a little... dispute, that's all."`,
    options: [
      {
        text: `Continue`,
        nextText: 14,
        funcRun: `resistPortrait`,
      },
    ],
  },
  {
    id: 13,
    text: `"Well Mr. Fancy-Pants, we need you to mediate a disagreement between us and some friends of ours."`,
    options: [
      {
        text: `Continue`,
        nextText: 14,
        funcRun: `resistPortrait`,
      },
    ],
  },
  {
    id: 14,
    text: `"Yeah, these guys are intruding on OUR TURF, now tell 'em to GET LOST!"`,
    options: [
      {
        text: `Tell the clan members to get lost`,
        nextText: 16,
        funcRun: `speakerSwap`,
      },
      {
        text: `Hear what the clan has to say`,
        nextText: 15,
        funcRun: `clanPortrait`,
      },
    ],
  },
  {
    id: 15,
    text: `"Don't listen to these idiots, we were just doing a routine inspection under direct orders from the Archboss."`,
    options: [
      {
        text: `Tell the resistance that they are in the wrong`,
      },
      {
        text: `Tell the clan that they still need to get lost`,
        nextText: 16,
        funcRun: `speakerSwap`,
      },
      {
        text: `Insult the two parties and tell them to get out of your town NOW`,
      },
    ],
  },
  {
    id: 16,
    text: `Get lost you guys, you have no business being here anyways.`,
    options: [
      {
        text: `Continue`,
        nextText: 17,
        funcRun: `clanSpeak`,
      },
    ],
  },
  {
    id: 17,
    text: `"Ughhh, I didn't want to have to do this man, everyone, GET 'EM"`,
    options: [
      {
        text: `Continue`,
        nextText: 18,
        funcRun: `mentorPortrait`,
      },
    ],
  },
  {
    id: 18,
    text: `"STOP RIGHT THERE YOU... RAPSCALLIONS?... ruffians?... YES, RUFFIANS!" An old goblin runs at your newfound aggressors and beats them with a newspaper.`,
    options: [
      {
        text: `Continue`,
        nextText: 19,
        funcRun: `clanPortrait`,
      },
    ],
  },
  {
    id: 19,
    text: `"ACK! STOP YOU OLD MAN! THAT HURTS! BY THE AUTHORITY OF THE ARCHBOSS I ORDER YOU TO STOP! ARGH! IT'S TOO MUCH... RETREAT!"`,
    options: [
      {
        text: `Continue`,
        nextText: 20,
        funcRun: `resistPortrait`,
      },
    ],
  },
  {
    id: 20,
    text: `"Hey kid, you did pretty good out there too! Why don't you come and join us at our base camp nearby?"`,
    options: [
      {
        text: `Continue`,
        nextText: 21,
        funcRun: `mentorPortrait`,
      },
    ],
  },
  {
    id: 21,
    text: `"Remember what I said young one, 'Never cheat'!"`,
    options: [
      {
        text: `Follow your new resistance friends to their base`,
        nextText: 22,
        funcRun: `displayVisChar`,
      },
    ],
  },
  {
    id: 22,
    text: `You arrive at the small town of Greenrock. Here you will find a small shop and tavern, where you may be able to find some quests.`,
    options: [
      {
        text: `Enter and explore the town`,
        nextText: 23,
        funcRun: `bgSwapGreen`,
      },
    ],
  },
  {
    id: 23,
    text: `You find yourself standing in the middle of Greenrock. What do you wish to do?`,
    options: [
      {
        text: `Enter the tavern`,
        nextText: 24,
        funcRun: `bgSwapTavern`,
      },
    ],
  },
  {
    id: 24,
    text: `You find yourself standing in the tavern. To your right you see an odd-looking resistance member. To your left is the bar itself. What do you wish to do?`,
    options: [
      {
        text: `Speak to the resistance member`,
        nextText: 25,
        funcRun: `clanSpySpeak`,
      },
      {
        text: `Speak to the tavernkeep`,
        nextText: 26,
        funcRun: `archiePortrait`,
      },
    ],
  },
  {
    id: 25,
    text: `"Psssst, c'mere, have we met before? Nevermind, it doesn't matter, I got some orders from the A - R - C - B - O - S - S, if you know what I mean . . ."`,
    options: [
      {
        text: `Correct his spelling`,
        nextText: 27,
        funcRun: `speakerSwap`,
      },
      {
        text: `Nod in understanding`,
        nextText: 28,
        funcRun: `pass`
      },
      {
        text: `Deny knowing what he means`,
        nextText: 30,
        funcRun: `pass`,
      },
    ],
  },
  {
    id: 26,
    text: `Welcome to Archie's Tavern! You must be the new guy that the squad leader was talkin about. He needs you to prove your alligance to us by pickpocketing some goodies. Good luck!`,
    options: [
      {
        text: `Accept the quests`,
        nextText: 31,
        funcRun: `displayVisChar`,
      },
    ],
  },
  {
    id: 27,
    text: `You do know Archboss is spelt with an 'H', right?`,
    options: [
      {
        text: `Continue`,
        nextText: 28,
        funcRun: `speakerSwap`,
      }
    ]
  },
  {
    id: 28,
    text: `"So you DO know what I mean, good."`,
    options: [
      {
        text: `Continue`,
        nextText: 29,
        setSpy: true,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 29,
    text: `"Anyways, the Archboss is preparing a counterattack against the resistance's new plan, and he needs someone like you to tell us what the perfect time to strike is. That's the plan, we expect to hear from you soon."`,
    options: [
      {
        text: `Continue`,
        nextText: 24,
        funcRun: `displayVisChar`
      }
    ]
  },
  {
    id: 30,
    text: `"Then SCRAM!!!"`,
    options: [
      {
        text: `Continue`,
        nextText: 24,
        funcRun: `displayVisChar`
      }
    ]
  },
  {
    id: 31,
    text: `You look around the tavern, in the corner you see a familiar face. The hinges of the front door also seem to be exceptionally weak.`,
    options: [
      {
        text: `Go outside`,
        nextText: 32,
        funcRun: `bgSwapGreen`,
      },
      {
        text: `Go speak to the familiar goblin`,
        nextText: 33,
        funcRun: `mentorPortrait`,
      },
    ],
  },
  {
    id: 32,
    text: `You stand in front of the tavern exit`,
    options: [
      {
        text: `Gently open door and walk out`,
        nextText: 81,//not done
        funcRun: `speakerSwap`
      },
      {
        text: `Rudely kick out the door`,
        nextText: 82,
        funcRun: `archiePortrait`
      }
    ]
  },
  {
    id: 33,
    text: `You see your buddy, Old Crankle, but it seems he's had too much to drink.`,
    options: [
      {
        text: `Run his pockets`,
        nextText: 34,
        funcRun: `speakerSwap`,
      },
      {
        text: `Wake him up`,
        nextText: 35,
        funcRun: `displayVisChar`,
      }
    ]
  },
  {
    id: 34,
    text: `You take a small set of heavily worn dice, and a crudely carved wooden figurine of ... Old Crankle?`,
    options: [
      {
        text: `Continue`,
        nextText: 36,
        funcRun: `displayVisChar`
      }
    ]
  },
  {
    id: 35,
    text: `Old Crankle mumble and awake, then it suddenly turn its face, rudely shouting to you. Old Crankle shout: "You piece of !@#$%#@##, What the F@#! are you doing to my #$%$#^&%^^*&!$@%#^ POCKET!!!" `,
    options: [
      {
        text: `I-I-I only wanted to wake you up, I swear!`,
        nextText: 37,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 36,
    text: `As you slowly back away, Old Crankles eyes shoot open."Nice going there young one! I knew you had it in you!" He then proceeds to collapse back on to the table.`,
    options: [
      {
        text: `Continue`,
        nextText: 38,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 37,
    text: `"Old Crankle: Yayaya~ I just want to wake you up. WHAT THE F@#%^ DO YOU THINK I WOULD BELIEVE YOU? YOU F$%I@^&#@# !@#^&@ #$%$%%^@#! "`,
    options: [
      {
        text: `Ran out of the tavern and never get back`,
        nextText: 39,
        funcRun: `displayVisChar`
      }
    ]
  },
  {
    id: 38,
    text: `That was your first time robbing someone, it felt... exhilarating. What do you do now?`,
    options: [
      {
        text: `I should stop doing this`,
        nextText: 40,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 39,
    text: `You smash down the tavern door as you bolt outside. You hear Archie yell,"YOU NEED TO PAY FOR THAT YOU KNOW!"`,
    options: [
      {
        text: `Turn back`,
        nextText: 41,
        funcRun: `bgSwapGreen`
      },
      {
        text: `Continue`,
        nextText: 46,
        funcRun: `bgSwapGreen`
      }
    ]
  },
  {
    id: 40,
    text: `Even though stealing may be illegal, it's never going to stop you!`,
    options: [
      {
        text: `Target next `,
        nextText: 42,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 41,
    text: `You turn around to see Old Crankle and Archie chasing you.Just a moment later, you suddenly find yourself on the floor. Archie shouts,"Nobody who destroys my property gets to live to tell the tale!", before bringing a large cinder block down on your head.`,
    options: [
      {
        text: `Continue`,
        nextText: 43,
        funcRun: `pass`
      }
    ]
  }, 
  {
    id: 42,
    text: `You see another familiar goblin`,
    options: [
      {
        text: `Pickpocket him!`,
        nextText: 44,
        funcRun: `pass`
      },
      {
        text: `PLUNDER HIS PANTALOONS!`,
        nextText: 44,
        funcRun: `pass`
      },
      {
        text: `None of these are good options`,
        nextText: 44,
        funcRun: `pass`
      }
    ]
  }, 
  {
    id: 43, //Ending
    text: `YOU GOT KILLED`,
    options: [
      {
        text: `Restart`,
        nextText: 1,
        funcRun: `bgSwapEpilogue`
      }
    ]
  }, 
  {
    id: 44,
    text: `You approach the goblin that you intend to rob next, but as you reach for his pocket, whips around to face you`,
    options: [
      {
        text: `Rob him anyways`,
        nextText: 45,
        funcRun: `speakerSwap`
      }
    ]
  }, 
  {
    id: 45,
    text: `Old Crankle Ver.2: What are you doing, young gob?`,
    options: [
      {
        text: `Please don't STOP ME FROM ROBBING YOU!!!`,
        nextText: 47,
        funcRun: `speakerSwap`
      }
    ]
  }, 
  {
    id: 46,
    text: `You couldn't hear what Archie had said, nor did you really care, you just wanted to get outta there.`,
    options: [
      {
        text: `Continue`,
        nextText: 48,
        funcRun: `pass`
      }
    ]
  }, 
  {
    id: 47,
    text: `You don't want to miss out on the slight-of-hand experience, so you ignore Old Crankle Ver.2`,
    options: [
      {
        text: `Continue`,
        nextText: 49,
        funcRun: `speakerSwap`
      }
    ]
  }, 
  {
    id: 48,
    text: `You run for miles and miles, and find yourself back home to reflect on your choices so far.`,
    options: [
      {
        text: `I-I-I will NEVER help others again`,
        nextText: 50,
        funcRun: `pass`
      },
      {
        text: `Cry`,
        nextText: 50,
        funcRun: `pass`
      },
      {
        text: `🤬🤬🤬`,
        nextText: 50,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 49,
    text: `Old Crankle Ver.2 stares at you for a moment`,
    options: [
      {
        text: `Haven't you ever seen someone rob your pockets infront of you?`,
        nextText: 51,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 50,
    text: `I WILL NEVER HELP OTHERS AGAIN! With this in your mind, you decide to...`,
    options: [
      {
        text: `Calm your mind and restart your journey`,
        nextText: 52,
        funcRun: `pass`
      },
      {
        text: `Go back home and never leave`,
        nextText: 53,
        funcRun: `pass`
      },
      {
        text: `Curse`,
        nextText: 54,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 51,
    text: `...`,
    options: [
      {
        text: `...`,
        nextText: 55,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 52,
    text: `You can't give up now, your dream is to be the King of the Gamblers, you won't give up here.`,
    options: [
      {
        text: `I SHALL RESTART MY JOURNEY!!!!!`,
        nextText: 56,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 53,
    text: `This world is terrible, there is no hope anymore, NOBODY LIKES ME!`,
    options: [
      {
        text: `MOM!!! I WANT TO GO HOMEEEEEEE!!!`,
        nextText: 57,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 54,
    text: `I HATE THEM SO MUCH, I'M THE NICEST PERSON I KNOW, WHY WOULD HE BLAME ME!`,
    options: [
      {
        text: `Ponder`,
        nextText: 60,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 55,
    text: `......`,
    options: [
      {
        text: `......`,
        nextText: 59,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 56, //Ending
    text: `I WILL NEVER GIVE UP!! I will face and challenge all the problems this time.`,
    options: [
      {
        text: `Continue`,
        nextText: 1,
        funcRun: `bgSwapEpilogue`
      }
    ]
  },
  {
    id: 57,
    text: `You sprint back home, kick open your front door, then barricade it with all your furniture. You then curl up in a ball in your living room. You are never seen again.`,
    options: [
      {
        text: `Continue`,
        nextText: 58,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 58, //Ending
    text: `THE END`,
    options: [
      {
        text: `Restart`,
        nextText: 1,
        funcRun: `bgSwapEpilogue`
      }
    ]
  },
  {
    id: 59,
    text: `.........`,
    options: [
      {
        text: `.........`,
        nextText: 63,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 60,
    text: `Maybe..., it's my fault?`,
    options: [
      {
        text: `Yes`,
        nextText: 61,
        funcRun: `pass`
      },
      {
        text: `NO`,
        nextText: 62,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 61,
    text: `It's my fault, I shouldn't have awoken him, or maybe I should have just robbed someone else for experience.`,
    options: [
      {
        text: `Calm yourself`,
        nextText: 64,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 62,
    text: `no...noo.....NOO.......NOOOOOOOOOO!!!!!!`,
    options: [
      {
        text: `Continue`,
        nextText: 64,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 63,
    text: `................`,
    options: [
      {
        text: `Why we keep ...?`,
        nextText: 65,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 64,
    text: `IT CAN'T BE MY FAULT. IT'S HIS FAULT!!! IT'S THE WORLD'S FAULT!!! IT'S NOT MY FAULT!!!`,
    options: [
      {
        text: `Continue`,
        nextText: 66,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 65,
    text: `Old Crankle Ver.2:"Your just messing with me, right? Give that back to me, young gob!"`,
    options: [
      {
        text: `OK`,
        nextText: 67,
        funcRun: `speakerSwap`
      },
      {
        text: `OK(of course not)`,
        nextText: 68,
        funcRun: `pass`
      },
      {
        text: `NO :D`,
        nextText: 69,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 66,
    text: `As you sit there by yourself, everything begins to make sense! You realize that this must just be a dream, or, maybe this is just a simulation run by massive hairless beasts for their amusement. Either way, the answer is clear, none of this is real!`,
    options: [
      {
        text: `Continue`,
        nextText: 70,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 67,
    text: `You hand the coins back to Old Crankle Ver.2, as shame falls upon your face, you decide to `,
    options: [
      {
        text: `Run out of tavern`,
        nextText: 39,
        funcRun: `pass`
      },
      {
        text: `Rob him again`,
        nextText: 71,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 68,
    text: `You face Old Crankle Ver.2, you hold out a hand filled with his coins, when Old Crankle Ver.2 reaches out to grab them, you suddenly withdraw your hand and quickly pocket the loot.`,
    options: [
      {
        text: `Continue`,
        nextText: 72,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 69,
    text: `You smile at Old Crankle Ver.2. Old Crankle Ver.2 smile back to you, he then asks you"Young gob? Are you gonna give it back to me?"`,
    options: [
      {
        text: `Continue`,
        nextText: 73,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 70, //Ending
    text: `THE END`,
    options: [
      {
        text: `Play Again`,
        nextText: 1,
        funcRun: `bgSwapEpilogue`
      }
    ]
  },
  {
    id: 71,
    text: `Although you still feel the shame of getting caught robbing others, you can't just stop now! This is PRIME pickpocketing time! `,
    options: [
      {
        text: `Continue`,
        nextText: 74,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 72,
    text: `Old Crankle Ver.2 "??????"`,
    options: [
      {
        text: `RUN!`,
        nextText: 75,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 73,
    text: `NO, you respond, than quickly whirl around, flaring your cape up as you do so.`,
    options: [
      {
        text: `Very cool exit`,
        nextText: 76,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 74,
    text: `As Old Crankle Ver.2 turns back to his previous conversation, you quickly snatch to coins back out of his pocket!`,
    options: [
      {
        text: `Continue`,
        nextText: 77,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 75,
    text: `Using all the energy left in you, you sprint as fast as possible out of the tavern`,
    options: [
      {
        text: `Continue`,
        nextText: 77,
        funcRun: `bgSwapGreen`
      }
    ]
  },
  {
    id: 76,
    text: `Old Crankle Ver.2 watches as you exit the tavern, stunned for a moment by how stupid that exit was, he then realizes that HE WAS JUST ROBBED!`,
    options: [
      {
        text: `Continue`,
        nextText: 78,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 77,
    text: `You run as fast as you can, out of tavern, and begin your journey.`,
    options: [
      {
        text: `Continue`,
        nextText: 79,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 78,
    text: `As you walk out of tavern, you faintly hear Old Crankle Ver.2 shout from inside "GIVE THAT BACK TO ME, YOU LITTLE B%&# $&@&^@%@^%#@#!!!!!"`,
    options: [
      {
        text: `Continue`,
        nextText: 80,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 79,
    text: `Time to explore this town`,
    options: [
      {
        text: `Continue`,
        nextText: 81,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 80,
    text: `You ignore him, and prepare for a good old adventure!`,
    options: [
      {
        text: `Continue`,
        nextText: 81,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 81,
    text: `As you walked out you see bunch of Red goblin walking around, and you notice there is a familiar goblin, that is the goblin that on your quest!(Actually right now I ran out of idea, so it is a bit boring, no correct grammer or spelling, but don't mind it! I GOT THIS!😁(I lie!))`,
    options: [
      {
        text: ``, //not done, not finish
        nextText: 0,
        funcRun: ``
      }
    ]
  },
  {
    id: 82,
    text: `Archie glares at you. Then, he shouts"!@###!@ !@#$# HULK GOBLIN!!!, get here and DESTROY THIS !@#$!@!!! "`,
    options: [
      {
        text: `Continue`,
        nextText: 83,
        funcRun: `hulkPortrait`
      }
    ]
  },
  {
    id: 83,
    text: `You hear a loud wooshing sound over your head before you hear a large crash in front of you. As the dust settles you can barely make out the BEAST before you.`,
    options: [
      {
        text: `WTH`,
        nextText: 84,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 84,
    text: `WHAT THE F!#@ ??? WHO THE F!&@ ARE YOU??? AND HOW CAN SOMEONE SO MASSIVE JUMP OVER ME SO QUICKLY???`,
    options: [
      {
        text: `Continue`,
        nextText: 85,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 85,
    text: `???: "Are you the one who interrupt my dream?"`,
    options: [
      {
        text: `Yes`,
        nextText: 86,
        funcRun: `pass`
      },
      {
        text: `Who are you?`,
        nextText: 87,
        funcRun: `pass`
      },
      {
        text: `No`,
        nextText: 88,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 86,
    text: `???: "Do you know who I am?"`,
    options: [
      {
        text: `No`,
        nextText: 87,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 87,
    text: `I am Hulk Goblin, I am the strongest Goblin in the world, I will punch everyone who interrupt my dream!`,
    options: [
      {
        text: `Uhhhh, I'm sorry, but could you not punch my face to hard then?`,
        nextText: 89,
        funcRun: `pass`
      },
      {
        text: `DO YOU KNOW WHO I AM?`,
        nextText: 90,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 88,
    text: `Wasn't me! It was him! You point at Archie`,
    options: [
      {
        text: `Continue`,
        nextText: 91,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 89,
    text: `Right as you finish your sentence, a massive fist is sent hurling towards your head. The loud crash is heard by goblins around the world. Your vision slowly fades to black.`,
    options: [
      {
        text: `Continue`,
        nextText: 43,
        funcRun: `displayVisChar`
      }
    ]
  },
  {
    id: 90,
    text: `Hulk Goblin: "Who are you?"`,
    options: [
      {
        text: `I am your friendly neighborhood Spider gob!`,
        nextText: 89,
        funcRun: `pass`
      },
      {
        text: `I am going to be the King of the Gamblers someday.`,
        nextText: 92,
        funcRun: `pass`
      },
      {
        text: `I'm fine thank you and you?`,
        nextText: 93,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 91,
    text: `Hulk Goblin stares at Archie, then shouts "MOM!?"`,
    options: [
      {
        text: `??????`,
        nextText: 94,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 92,
    text: `Archie & Hulk Goblin "OK, and?"`,
    options: [
      {
        text: `So, could you please leave me alone?`,
        nextText: 89,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 93,
    text: `Archie & Hulk Goblin "??????"`,
    options: [
      {
        text: `:D`,
        nextText: 95,
        funcRun: `pass`
      },
      {
        text: `What is the matter?`,
        nextText: 96,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 94,
    text: `You stare at Archie in disbelief. This whole time she was a woman?!`,
    options: [
      {
        text: `!!!`,
        nextText: 97,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 95,
    text: `You smile at the both of them, they smile back to you.`,
    options: [
      {
        text: `Continue`,
        nextText: 98,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 96,
    text: `Archibald & Hulk Goblin "Nothing..."`,
    options: [
      {
        text: `What's next?`,
        nextText: 99,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 97,
    text: `You stare at Archie, and call out, "I'm so sorry ma'am, is this your son?" Archie shouts back, "It's SIR to you!"`,
    options: [
      {
        text: `Continue`,
        nextText: 100,
        funcRun: `speakerSwap`
      }
    ]
  },
  {
    id: 98,
    text: `You see a big fist fly towards your face, a huge punch sound is heard for miles. Your vision slowly fades to black.`,
    options: [
      {
        text: `Continue`,
        nextText: 43,
        funcRun: `displayVisChar`
      }
    ]
  },
  {
    id: 99,
    text: `Right as you finish your sentence, a massive fist is sent hurling towards your head. The loud crash is heard by goblins around the world. Your vision slowly fades to black.`,
    options: [
      {
        text: `Continue`,
        nextText: 43,
        funcRun: `displayVisChar`
      }
    ]
  },
  {
    id: 100,
    text: `Than why he call you mom?`,
    options: [
      {
        text: `Continue`,
        nextText: 101,
        funcRun: `archiePortrait2`
      }
    ]
  },
  {
    id: 101,
    text: `Archie: "I only adopted him 2 years ago. And I think his IQ was even less than that."`,
    options: [
      {
        text: `Oh↗`,
        nextText: 102,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 102,
    text: `Don't look at him like that! Right now his IQ is way more higher than I adopted him.`,
    options: [
      {
        text: `Oh↘`,
        nextText: 103,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 103,
    text: `Archibald said it quietly:"But still lower than normal goblin."`,
    options: [
      {
        text: `Oh↗`,
        nextText: 104,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 104,
    text: `Archibald"Caught! Sh-shh-shut up!"`,
    options: [
      {
        text: `Continue`,
        nextText: 105,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 105,
    text: `Archibald guilty face to Hulk Goblin. "Honey~ I didn't mean to ruin your dream, could you for give Mommy?"`,
    options: [
      {
        text: `???`,
        nextText: 106,
        funcRun: `hulkPortrait`
      }
    ]
  },
  {
    id: 106,
    text: `Hulk Goblin"I forgive you. Mom!"`,
    options: [
      {
        text: `...`,
        nextText: 107,
        funcRun: `archiePortrait2`
      }
    ]
  },
  {
    id: 107,
    text: `Archibald"It is time to shine???"`,
    options: [
      {
        text: ``,
        nextText: 0,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 86,
    text: ``,
    options: [
      {
        text: ``,
        nextText: 0,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 86,
    text: ``,
    options: [
      {
        text: ``,
        nextText: 0,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 86,
    text: ``,
    options: [
      {
        text: ``,
        nextText: 0,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 86,
    text: ``,
    options: [
      {
        text: ``,
        nextText: 0,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 86,
    text: ``,
    options: [
      {
        text: ``,
        nextText: 0,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 86,
    text: ``,
    options: [
      {
        text: ``,
        nextText: 0,
        funcRun: `pass`
      }
    ]
  },
  {
    id: 86,
    text: ``,
    options: [
      {
        text: ``,
        nextText: 0,
        funcRun: `pass`
      }
    ]
  }
];

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
  backgroundScene.style.backgroundRepeat = `no-repeat`;
  backgroundScene.style.backgroundPosition = `center`;
}



// Flip A Coin JS
let heads = 0;
let tails = 0;
let coin = document.querySelector(".coins");
let flipBtn = document.querySelector("#flip-button");
let cheatBtn = document.querySelector("#cheat-button");

flipBtn.addEventListener("click", () => {
  let i = Math.floor(Math.random() * 2);
  coin.style.animation = "none";
  if (i) {
    setTimeout(function () {
      coin.style.animation = "spin-heads 3s forwards";
    }, 100);
    heads++;
  } else {
    setTimeout(function () {
      coin.style.animation = "spin-tails 3s forwards";
    }, 100);
    tails++;
  }
  setTimeout(updateStats, 3000);
  disableButton();
});

function updateStats() {
  document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
  document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
}

function disableButton() {
  flipBtn.disabled = true;
  setTimeout(function () {
    flipBtn.disabled = false;
  }, 3000);
}

cheatBtn.addEventListener("click", () => {
  coin.style.animation = "none";
  tails = 0;
  updateStats();
});

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
  diceProgressBar();
  sceneChange(epiloguebg);
  displayVisiblity(`info`)
  displayVisiblity(`option`)
  displayVisiblity(`dialog`)
  displayVisiblity(`dialogCharacter`)
  displayVisiblity(`startButton`)
  displayVisiblity(`dice-container`)
  displayVisiblity(`loading`)
  setTimeout(startGame, 7000);
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
// window.onload = diceProgressBar;

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

// Main Combat System(its mess and might need to change it later with the dice system)
// Jack(Do this cra* at home)
// const playerHeartsElement = document.getElementById('player-hearts');
// const enemyHeartsElement = document.getElementById('enemy-hearts');
// const combatLogElement = document.getElementById('combat-log');
// const rollButton = document.getElementById('roll-btn');
// const cheatButton = document.getElementById('cheat-btn');
// const playerDice = document.getElementById('player-dice');
// const enemyDice = document.getElementById('enemy-dice');
// const gameOverElement = document.getElementById('game-over');
// const gameOverMessage = document.getElementById('game-over-message');

// let playerHearts = 3;
// let enemyHearts = 3;

// function logMessage(message) {
//     const paragraph = document.createElement('p');
//     paragraph.textContent = message;
//     combatLogElement.appendChild(paragraph);
//     combatLogElement.scrollTop = combatLogElement.scrollHeight;
// }

// function rollDice() {
//     animateDice();

//     setTimeout(() => {
//         const playerRoll = Math.floor(Math.random() * 6) + 1;
//         const enemyRoll = Math.floor(Math.random() * 6) + 1;

//         playerDice.textContent = `🎲 ${playerRoll}`;
//         enemyDice.textContent = `🎲 ${enemyRoll}`;

//         if (playerRoll > enemyRoll) {
//             enemyHearts--;
//             logMessage(`You win the roll! Enemy loses 1 heart.`);
//         } else if (enemyRoll > playerRoll) {
//             playerHearts--;
//             logMessage(`Enemy wins the roll! You lose 1 heart.`);
//         } else {
//             logMessage(`It's a tie! No hearts lost.`);
//         }

//         updateHearts();
//         checkGameOver();
//     }, 500);
// }

// function cheat() {
//     const playerRoll = prompt("Enter your desired dice roll (1-6):");
//     const enemyRoll = Math.floor(Math.random() * 6) + 1;

//     animateDice();

//     setTimeout(() => {
//         playerDice.textContent = `🎲 ${playerRoll}`;
//         enemyDice.textContent = `🎲 ${enemyRoll}`;

//         if (playerRoll > enemyRoll) {
//             enemyHearts--;
//             logMessage(`You cheated and won the roll! Enemy loses 1 heart.`);
//         } else if (enemyRoll > playerRoll) {
//             playerHearts--;
//             logMessage(`Enemy wins the roll! You lose 1 heart.`);
//         } else {
//             logMessage(`It's a tie! No hearts lost.`);
//         }

//         updateHearts();
//         checkGameOver();
//     }, 500);
// }

// function animateDice() {
//     playerDice.style.animation = 'rollDice 0.5s ease-in-out';
//     enemyDice.style.animation = 'rollDice 0.5s ease-in-out';

//     setTimeout(() => {
//         playerDice.style.animation = '';
//         enemyDice.style.animation = '';
//     }, 500);
// }

// function updateHearts() {
//     playerHeartsElement.textContent = '❤️'.repeat(playerHearts);
//     enemyHeartsElement.textContent = '❤️'.repeat(enemyHearts);
// }

// function checkGameOver() {
//     if (playerHearts === 0) {
//         showGameOver('You Lose! 💀');
//     }

//     if (enemyHearts === 0) {
//         showGameOver('You Win! 🎉');
//     }
// }

// function showGameOver(message) {
//     gameOverMessage.textContent = message;
//     gameOverElement.style.display = 'block';
//     rollButton.disabled = true;
//     cheatButton.disabled = true;
// }

// function restartGame() {
//     playerHearts = 3;
//     enemyHearts = 3;
//     updateHearts();
//     combatLogElement.innerHTML = '';
//     gameOverElement.style.display = 'none';
//     rollButton.disabled = false;
//     cheatButton.disabled = false;
// }

// rollButton.addEventListener('click', rollDice);
// cheatButton.addEventListener('click', cheat);

// Information review system
const descriptions = [
  {
    title: "Welcome",
    content:
      "Welcome to Risk and Ruin. A story game about goblins and their gambling issues. <span style='color: #FFD700;'>Unlock hidden secrets</span> along your journey.",
  },
  {
    title: "Cheat",
    content:
      "During combat, you can decide to cheat or to win the game, but <span style='color: #FF5733;'>I HATE</span> CHEATERS!",
  },
  {
    title: "Alliances",
    content:
      "Form <span style='color: #3498DB;'>alliances</span>, battle <span style='color: #E74C3C;'>powerful foes</span>, and pave your path to victory.",
  },
  {
    title: "Dice",
    content:
      "Dice, have 6 face, in a combat you might win by the <span style='color:rgb(25, 221, 67);'>lowest</span> number, or  <span style='color:rgb(216, 10, 10);'>highest </span> number to win",
  },
  {
    title: "Coin",
    content: "Decide the fates of both you and your enemy by the flip of a coin.",
  },
  {
    title: "Speed Up",
    content:
      "Clicking the <span style='color: #E74C3C;'> textbox</span> multiple times can speed up the typewriter effect! This is a <span style='color: #FF5733;'>FEATURE</span> not a <span style='color: #FF5733;'>BUG</span>!",
  },
];

let currentIndex = 0;

function showDescription() {
  currentIndex = 0; // Reset to the first description
  const popup = document.getElementById("description-popup");
  popup.style.display = "block";
  updateDescription();
}

function closeDescription() {
  const popup = document.getElementById("description-popup");
  popup.style.display = "none";
}

function updateDescription() {
  const descriptionTitle = document.getElementById("description-title");
  const descriptionText = document.getElementById("description-text");

  descriptionTitle.textContent = descriptions[currentIndex].title;
  descriptionText.innerHTML = descriptions[currentIndex].content;
}

function prevDescription() {
  if (currentIndex > 0) {
    currentIndex--;
    updateDescription();
  }
}

function nextDescription() {
  if (currentIndex < descriptions.length - 1) {
    currentIndex++;
    updateDescription();
  }
}


// preLoad();
// startGame();
