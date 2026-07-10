// Word variables
console.log("SCRIPT LOADED — v3 THIRD-PERSON HERO");
var deg = Math.PI / 180;
const exit = {
    x: 500,
    z: 1000,
    radius: 120
};

let canEscape = false;
let TimerGame;

let backgroundMusic = new Audio("sounds/background.mp3");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;


function playBackgroundMusic(){

    backgroundMusic.play().catch(function(error){

        console.log("Music waiting for user interaction");

    });

}


function stopBackgroundMusic(){

    backgroundMusic.pause();

    backgroundMusic.currentTime = 0;

}

function player(x, y, z, rx, ry) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.rx = rx;
  this.ry = ry;
}

var coins = [
  [800, 30, -800, 0, 0, 0, 50, 50, 'pattern/coin2.png'],
  [-600, 30, -100, 0, 0, 0, 50, 50, 'pattern/coin1.png'],
  [200, 30, 300, 0, 0, 0, 50, 50, 'pattern/coin2.png']
];

var keys = [
  [-900, 30, -100, 0, 0, 0, 50, 50, 'pattern/key2.png'],
  [-100, 30, -600, 0, 0, 0, 50, 50, 'pattern/key.png'],
  [200, 30, -600, 0, 0, 0, 50, 50, 'pattern/key2.png'],
];
var dogs = [
    [-500, 30, -600, 0, 180, 0, 120, 120, 'pattern/dog.png'],
    [600, 30, 400, 0, 90, 0, 120, 120, 'pattern/dog.png'],
];

// Cartoon collectibles — uses cartoon.jpg as the item image
var cartoons = [
  [600, 30, -300, 0, 0, 0, 80, 80, "pattern/cartoon.png"],
  [-400, 30, 600, 0, 0, 0, 80, 80,  "pattern/cartoon.png"],
];
var map = [
  // [x, y, z,       rx, ry, rz, width, height, color]
  //  coordination    rotation
  [0, 100, 0, 90, 0, 0, 2000, 2000, "#005500"], // ground


  // Outer boundary (back wall has a gap that is the maze exit)
  [0, 0, -1000, 0, 0, 0, 2000, 200, "#00fff2"], // front wall
  [-1000, 0, 0, 0, 90, 0, 2000, 200, "#0000ff"], // left wall
  [1000, 0, 0, 0, 90, 0, 2000, 200, "#fffb00"], // right wall
  [-375, 0, 1000, 0, 0, 0, 1250, 200, "#ff0000"], // back wall (left of exit)
  [875, 0, 1000, 0, 0, 0, 250, 200, "#ff0000"], // back wall (right of exit)

  // Ring 3 (750) - opening on the right side
  [0, 0, -750, 0, 0, 0, 1500, 200, "#ff7300"], // top
  [0, 0, 750, 0, 0, 0, 1500, 200, "#ff7300"], // bottom
  [-750, 0, 0, 0, 90, 0, 1500, 200, "#ff7300"], // left

  // Ring 2 (500) - opening on the top side
  [0, 0, 500, 0, 0, 0, 1000, 200, "#a200ff"], // bottom
  [-500, 0, 0, 0, 90, 0, 1000, 200, "#a200ff"], // left
  [500, 0, 0, 0, 90, 0, 1000, 200, "#a200ff"], // right

  // Ring 1 (250) - opening on the right side (exit from the start room)
  [0, 0, -250, 0, 0, 0, 500, 200, "#2bff00"], // top
  [0, 0, 250, 0, 0, 0, 500, 200, "#2bff00"], // bottom
  [-250, 0, 0, 0, 90, 0, 500, 200, "#2bff00"], // left
];
let coinsCollected = 0;
let keysCollected = 0;
let dogsCollected = 0;
let cartoonsCollected = 0;

let startTime = Date.now();

const TOTAL_KEYS = keys.length;
const TOTAL_CARTOONS = cartoons.length;

let movementSpeed = 1;
let initialPosition = 0;
let pawn = new player(0, 0, 0, 8, 0);
let world = document.getElementById("world");


// becomes "the hero collects the item".
const CAMERA_DISTANCE = 240;   // how far the camera sits behind the hero
const CAMERA_HEIGHT   = 40;    // just above the hero's shoulders

let heroEl, heroSprite;
let walkCycle = 0;

function createPlayerCharacter(){

    heroEl = document.createElement("div");
    heroEl.id = "hero";
    heroEl.style.position = "absolute";
    heroEl.style.width  = "80px";
    heroEl.style.height = "110px";
    heroEl.style.pointerEvents = "none";

    // soft round shadow under the feet
    let shadow = document.createElement("div");
    shadow.style.position = "absolute";
    shadow.style.bottom = "-6px";
    shadow.style.left = "50%";
    shadow.style.transform = "translateX(-50%)";
    shadow.style.width = "60px";
    shadow.style.height = "14px";
    shadow.style.borderRadius = "50%";
    shadow.style.background = "radial-gradient(rgba(0,0,0,0.55), transparent 70%)";

    // the hero sprite itself (emoji, swaps between idle / running)
    heroSprite = document.createElement("div");
    heroSprite.textContent = "🧍‍♀️";
    heroSprite.style.position = "absolute";
    heroSprite.style.left = "0";
    heroSprite.style.right = "0";
    heroSprite.style.bottom = "0";
    heroSprite.style.textAlign = "center";
    heroSprite.style.fontSize = "80px";
    heroSprite.style.lineHeight = "1";
    heroSprite.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.6))";

    // little name tag floating over the head
    let tag = document.createElement("div");
    tag.textContent = "⭐ YOU";
    tag.style.position = "absolute";
    tag.style.top = "-28px";
    tag.style.left = "50%";
    tag.style.transform = "translateX(-50%)";
    tag.style.fontFamily = "Arial, sans-serif";
    tag.style.fontSize = "16px";
    tag.style.fontWeight = "bold";
    tag.style.color = "gold";
    tag.style.textShadow = "0 0 6px black, 0 0 6px black";
    tag.style.whiteSpace = "nowrap";

    heroEl.appendChild(shadow);
    heroEl.appendChild(heroSprite);
    heroEl.appendChild(tag);
    world.append(heroEl);
}

// quick "pop" when the hero grabs an item (works together with the facing flip)
let heroPopUntil = 0;
let heroFacing = 1;    // 1 = facing left (emoji's natural side), -1 = facing right

function heroGrabPop(){
    if (!heroSprite) return;
    heroSprite.style.transition = "transform 0.12s ease-out";
    heroPopUntil = Date.now() + 140;
}

function updatePlayerCharacter(){

    let moving = pressLeft || pressRight || pressForward || pressBack;
    let sprinting = moving && pressPower;

    // face wherever the left/right arrows point
    if (pressRight) heroFacing = -1;
    if (pressLeft)  heroFacing = 1;

    if (moving){
        walkCycle += sprinting ? 0.5 : 0.25;
        heroSprite.textContent = "🏃‍♀️";
    } else {
        heroSprite.textContent = "🧍‍♀️";
    }

    // combine the facing flip with the grab-pop scale
    let pop = Date.now() < heroPopUntil ? 1.35 : 1;
    heroSprite.style.transform =
        "scaleX(" + (heroFacing * pop) + ") scaleY(" + pop + ")";

    // small hop while running so the hero feels alive
    let hop = moving ? Math.abs(Math.sin(walkCycle)) * 10 : 0;

  
    heroEl.style.transform =
        "translate3d(" + (600 - 40 + pawn.x) + "px," +
                         (400 - 55 + 45 - hop) + "px," +
                         pawn.z + "px)" +
        "rotateY(" + pawn.ry + "deg)";
}

// variables for movement
var pressLeft = 0;
var pressRight = 0;
var pressForward = 0;
var pressBack = 0;
var pressUp = 0;
var pressPower = 0;
var released = 0;
var mouseX = 0;
var mouseY = 0;
var lock = false;
var itemRotation = 0;
var container = document.getElementById("container");
var canlock = false;

//if the key is pressed
document.addEventListener("keydown", (event)=>{

    if (event.key == "ArrowLeft"){
       pressLeft = 1; 
    }
    if (event.key == "ArrowRight"){
       pressRight = 1; 
    }
    if (event.key == "ArrowUp"){
       pressForward = 1; 
    }
    if (event.key == "ArrowDown"){
       pressBack = 1; 
    }
    if(event.keyCode == 32){
        pressUp = -1;
    }
    if(event.key == "p"){
        pressPower = 1;
    }
    if (event.key == "r"){
        released = 1;
    }
})

//if the key is released
document.addEventListener("keyup", (event)=>{
    if (event.key == "ArrowLeft"){
       pressLeft = 0; 
    }
    if (event.key == "ArrowRight"){
       pressRight = 0; 
    }
    if (event.key == "ArrowUp"){
       pressForward = 0;         
    }
    if (event.key == "ArrowDown"){
       pressBack = 0; 
    }
    if(event.keyCode == 32){
        pressUp = 0;
    }
    if (event.key == "p"){
        pressPower = 0;
    }
    if (event.key == "r"){
        released = 0;
    }
})

//if the mouse is pressed
container.onclick = function () {
  if(canlock) {
    container.requestPointerLock();
  }
};


document.addEventListener("pointerlockchange", (event) =>{
    lock = !lock;
})

//mouse movement listener 
document.addEventListener("mousemove", (event)=>{
    mouseX = event.movementX;
    mouseY = event.movementY;
})


function isColliding(x, z) {
    let playerSize = 40;

    for (let i = 0; i < map.length; i++) {
        let wall = map[i];

        if (wall[3] == 90) {
            continue;
        }

        let wallX = wall[0];
        let wallZ = wall[2];
        let wallRY = wall[4];
        let wallLength = wall[6];

        // horizontal wall, along X axis
        if (wallRY == 0 || wallRY == 180) {
            if (
                x > wallX - wallLength / 2 - playerSize &&
                x < wallX + wallLength / 2 + playerSize &&
                z > wallZ - playerSize &&
                z < wallZ + playerSize
            ) {
                return true;
            }
        }

        // vertical wall, along Z axis
        if (wallRY == 90 || wallRY == -90) {
            if (
                x > wallX - playerSize &&
                x < wallX + playerSize &&
                z > wallZ - wallLength / 2 - playerSize &&
                z < wallZ + wallLength / 2 + playerSize
            ) {
                return true;
            }
        }
    }

    return false;
}


function update(){
    //count movement
    let speedMultiplier = pressPower ? 5: 1; 
    let dx = ((pressRight - pressLeft) * Math.cos(pawn.ry * deg) -
                (pressForward - pressBack) * Math.sin(pawn.ry * deg))* speedMultiplier;
    let dz = (-(pressRight - pressLeft) * Math.sin(pawn.ry * deg) -
                (pressForward - pressBack) * Math.cos(pawn.ry * deg))* speedMultiplier;
    let dy = pressUp * speedMultiplier;
    let drx = mouseY;
    let dry = - mouseX;
    mouseX = mouseY = 0; 

    // add movement to the coordinates
    let nextX = pawn.x + dx;
    let nextY = pawn.y + dy;
    let nextZ = pawn.z + dz;

    if (!isColliding(nextX, pawn.z)) {
        pawn.x = nextX;
    }

    if (!isColliding(pawn.x, nextZ)) {
        pawn.z = nextZ;
    }

pawn.y = nextY;

    if (lock) {
        pawn.rx = pawn.rx+ drx;
        pawn.ry = pawn.ry + dry;

        if (pawn.rx > 90) {
            pawn.rx = 90;
        }
        if (pawn.rx < -90) {
            pawn.rx = -90;
        }
    }
    

    if (released == 1)
    {
        pawn.x = 0;
        pawn.y = 0;
        pawn.z = 0;
        pawn.rx = 8;    // gentle third-person tilt
        pawn.ry = 0;
    }

   // keep the visible hero glued to the pawn position
    updatePlayerCharacter();

 
	world.style.transform ="translateZ(" + (600 - CAMERA_DISTANCE) + "px)" +
                            "rotateX(" + (-pawn.rx) + "deg)" + 
                            "rotateY(" + (-pawn.ry) + "deg)" +  
                            "translate3d(" + (-pawn.x) + "px," + (-pawn.y + CAMERA_HEIGHT) + "px," + (-pawn.z) + "px)";
}
function createNewWord() {
  createSquare(map, "map");
}




const wallFrames = [
  { ratio: 1, insetX: 0.16, insetY: 0.16 },
  { ratio: 1.5, insetX: 0.08, insetY: 0.15 },
];

const wallEmojis = ["🏺", "🛡️", "⚔️", "📜", "🌿", "🌸", "🦁", "👑", "🔮", "🕯️", "🐉", "🗺️"];

//function to transform array to rectangles

function createSquare(squares, string) {
  let wallIndex = 0; // counts decorated walls so patterns alternate
  for (let i = 0; i < squares.length; i++) {
    // create rectangles and styles
    let newElement = document.createElement("div");
    newElement.className = `${string} square`;
    newElement.id = `${string} ${i}`;
    newElement.style.width = `${squares[i][6]}px`;
    newElement.style.height = `${squares[i][7]}px`;
    newElement.style.transform = `translate3d(${600 - squares[i][6] / 2 + squares[i][0]}px,
    ${400 - squares[i][7] / 2 + squares[i][1]}px, ${squares[i][2]}px) rotateX(${squares[i][3]}deg) rotateY(${squares[i][4]}deg)
    rotateZ(${squares[i][5]}deg)`;

    if (string === "map") {
      if (i === 0) {
        // Ground texture
        newElement.style.backgroundImage = `url("https://thumb.photo-ac.com/73/732d0b61f93e4d8c5bdf2598e298c343_t.jpeg")`;
        newElement.style.backgroundRepeat = "repeat";
        newElement.style.backgroundSize = "200px 200px";
      } else {
        // Realistic stone wall decoration
                // Stone wall base
        newElement.style.backgroundColor = squares[i][8];
        newElement.style.backgroundImage = `url("https://www.transparenttextures.com/patterns/stone-wall.png")`;
        newElement.style.backgroundRepeat = "repeat";
        newElement.style.backgroundSize = "200px 200px";
        newElement.style.border = "4px solid rgba(0, 0, 0, 0.6)";
        newElement.style.boxShadow = "inset 0 0 60px rgba(0,0,0,0.7)";

        // === UNIQUE WALL DECORATION: Glowing Runes + Crystals ===
        let decor = document.createElement("div");
        decor.style.position = "absolute";
        decor.style.top = "50%";
        decor.style.left = "50%";
        decor.style.transform = "translate(-50%, -50%)";
        decor.style.width = "140px";
        decor.style.height = "160px";
        decor.style.display = "flex";
        decor.style.alignItems = "center";
        decor.style.justifyContent = "center";
        decor.style.fontSize = "52px";
        decor.style.color = "#00ffcc";
        decor.style.textShadow = "0 0 20px #00ffff, 0 0 40px #00ffff";
        decor.style.opacity = "0.95";
        
        // Different runes/symbols for variety
        const runes = ["𖦹", "⚶", "𖧁", "⟁", "𖤐", "☉", "𖦼", "⚝", "𖧆"];
        decor.textContent = runes[wallIndex % runes.length];

        // Add glowing crystal effect
        let crystal = document.createElement("div");
        crystal.style.position = "absolute";
        crystal.style.fontSize = "28px";
        crystal.style.bottom = "-15px";
        crystal.style.color = "#ff00ff";
        crystal.style.textShadow = "0 0 15px #ff00ff";
        crystal.textContent = "♦";
        
        decor.appendChild(crystal);
        newElement.appendChild(decor);
        
        wallIndex++;
      
      }
    } else {
      // Generic collectible — index [9] is either an emoji or an image filename
      newElement.style.backgroundColor = "transparent";

      let inner = document.createElement("div");
      inner.className = "item-inner";

      let itemValue = squares[i][8];
      // If it looks like an image file, render an <img> instead of text
      if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(itemValue)) {
        let img = document.createElement("img");
        img.src = itemValue;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.borderRadius = "50%";
        img.style.border = "3px solid gold";
        img.style.boxShadow = "0 0 12px rgba(255, 215, 0, 0.8)";
        inner.appendChild(img);
      } else {
        inner.textContent = itemValue;
      }

      newElement.appendChild(inner);
    }

    // insert rectangles into the world
    world.append(newElement);
  }
}

function playSound(src) {
  try {
    let audio = new Audio(src);
    audio.volume = 0.7;
    audio.play().catch(() => collectSoundFallback());
  } catch (e) { collectSoundFallback(); }
}

// Fallback: synthesised "ding" via Web Audio API
function collectSoundFallback() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) { /* audio not available */ }
}

// Map each collectible type to its mp3 file
const collectSounds = {
  coins:    "sounds/coin.mp3",
  keys:     "sounds/key.wav",
  dogs:     "sounds/dog.wav",
  cartoons: "sounds/cartoon.wav",
};
const winSound = new Audio(
"sounds/win.mp3"
);

function collectSound(type) {
  let src = collectSounds[type];
  if (src) {
    playSound(src);
  }
  else {
    collectSoundFallback();
  }
}

function interact(squares, string){
    for (let i = 0; i < squares.length; i++){

        let dis = Math.sqrt(
            Math.pow((pawn.x - squares[i][0]), 2) +
            Math.pow((pawn.y - squares[i][1]), 2) +
            Math.pow((pawn.z - squares[i][2]), 2)
        );

        if (dis < squares[i][6]) {

            document.getElementById(`${string} ${i}`).style.display = "none";

            heroGrabPop();

            // Play sound
            if (string === "coin") {
                coinsCollected++;
                collectSound("coins");
            }

            if (string === "key") {
                keysCollected++;
                collectSound("keys");
            }
             if (string === "dog") {
                dogsCollected++;
                collectSound("dogs");
            }

            if (string === "cartoon") {
                cartoonsCollected++;
                collectSound("cartoons");
                 
            }
             updateMission();
             updateScore();
             updateObjective();
                checkWin();
            if (string !== "cartoon") {
    showNextCartoon();
}

            squares[i][0] = 100000;
        }
    }
}
function checkWin(){

    if(
        keysCollected === TOTAL_KEYS &&
        cartoonsCollected === TOTAL_CARTOONS
    ){

        canEscape = true;

        // no browser alert
        document.getElementById("mission").innerHTML =
        "🚪 All items found! Find the exit!";

    }

}
function checkExit(){

    if(!canEscape) return;

    let distance = Math.sqrt(

        Math.pow(pawn.x - exit.x,2) +
        Math.pow(pawn.z - exit.z,2)

    );

    if(distance < exit.radius){

        gameWon();

    }

}
function updateMission(){

    document.getElementById("mission").innerHTML =

    "🔑 Keys: " +
    keysCollected + "/" + TOTAL_KEYS +

    "<br>🎨 Paintings: " +
    cartoonsCollected + "/" + TOTAL_CARTOONS;

}

function updateObjective(){

    let objective =
    document.getElementById("objective");


    if(keysCollected < TOTAL_KEYS){

        objective.innerHTML =
        "🎯 Objective:<br>Collect all the keys!";

    }

    else if(cartoonsCollected < TOTAL_CARTOONS){

        objective.innerHTML =
        "🎯 Objective:<br>Find the missing Enchanted Paintings!";

    }

    else{

        objective.innerHTML =
        "🚪 Objective:<br>Escape through the maze exit!";

    }

}
function gameWon(){

    clearInterval(TimerGame);
    stopBackgroundMusic();

if(document.pointerLockElement){
    document.exitPointerLock();
}
    let seconds =
        Math.floor((Date.now()-startTime)/1000);

    let score =
        coinsCollected +
        keysCollected +
        dogsCollected +
        cartoonsCollected;

    document.getElementById("finalScore").innerHTML =

"⭐ Final Score : " + score +

"<br><br>"

+

"🪙 Coins : " + coinsCollected +

"<br>"

+

"🔑 Keys : " + keysCollected +

"<br>"

+

"🐶 Dogs : " + dogsCollected +

"<br>"

+

"🎨 Cartoons : " + cartoonsCollected;

    document.getElementById("finalTime").innerHTML =
        "Time: " + seconds + " seconds";

    document.getElementById("winScreen").style.display =
        "flex";
document.getElementById("timer").style.display = "none";
backgroundMusic.pause();
winSound.play();
    createConfetti();

}

function createConfetti(){

    for(let i=0;i<250;i++){

        let confetti=document.createElement("div");

        confetti.style.position="fixed";

        confetti.style.left=Math.random()*100+"vw";

        confetti.style.top="-20px";

        confetti.style.width="8px";

        confetti.style.height="8px";

        confetti.style.background=
        `hsl(${Math.random()*360},100%,50%)`;

        confetti.style.pointerEvents="none";

        confetti.style.zIndex="99999";

        confetti.style.transition=
        "transform 4s linear";

        document.body.appendChild(confetti);

        setTimeout(()=>{

            confetti.style.transform=
            `translateY(120vh)
             rotate(${Math.random()*720}deg)`;

        },10);

    }

}
let timeRemaining = 180;
let TimerClock;

function startTimer(){

    TimerClock = setInterval(function(){

        timeRemaining--;

        let minutes = Math.floor(timeRemaining / 60);

        let seconds = timeRemaining % 60;


        document.getElementById("timer").innerHTML =
        minutes + ":" +
        String(seconds).padStart(2,"0");


        if(timeRemaining <= 0){

            clearInterval(TimerClock);

            gameLost();

        }


    },1000);

}
function gameLost(){

    clearInterval(TimerGame);

stopBackgroundMusic();
    if(document.pointerLockElement){

        if(document.pointerLockElement){
    document.exitPointerLock();
}

    }


    let score =
    coinsCollected +
    keysCollected +
    dogsCollected +
    cartoonsCollected;


    document.getElementById("loseScore").innerHTML =

    "Final Score: " + score;


    document.getElementById("loseScreen").style.display="block";


}
function restartGame(){

    timeRemaining = 180;

    location.reload();

}

function rotateItems(squares, string){
    itemRotation = itemRotation + 2;

    for (let i = 0; i < squares.length; i++){
let element = document.getElementById(`${string} ${i}`);
        if (element) {
            element.style.transform =
                "translate3d(" + (600 - squares[i][6]/2 + squares[i][0]) + "px," +
                                  (400 - squares[i][7]/2 + squares[i][1]) + "px," +
                                  squares[i][2] + "px)" +
                "rotateX(" + squares[i][3] + "deg)" +
                "rotateY(" + itemRotation + "deg)" +
                "rotateZ(" + squares[i][5] + "deg)";
        }
    }
}

let nextCartoon = 0;

function updateScore(){

    let score =
        coinsCollected +
        keysCollected +
        dogsCollected +
        cartoonsCollected;

    document.getElementById("scoreBoard").innerHTML =

        "⭐ Score : " + score;

}
function showNextCartoon() {

    if (nextCartoon >= cartoons.length) return;

    let cartoon = document.getElementById(`cartoon ${nextCartoon}`);

    if (cartoon) {
        cartoon.style.display = "block";
        nextCartoon++;
    }
}
createNewWord();
createPlayerCharacter();
createSquare(coins, "coin");
createSquare(keys, "key");
createSquare(dogs, "dog");
createSquare(cartoons, "cartoon");
// createNPC();
updateMission();
updateObjective();
updateScore();
for (let i = 0; i < cartoons.length; i++) {
    document.getElementById(`cartoon ${i}`).style.display = "none";
}
TimerGame = setInterval(repeat, 10);

function repeat() {
  update();
  
  interact(coins, "coin");
  interact(keys, "key");
  interact(dogs, "dog");
  interact(cartoons, "cartoon");
  rotateItems(coins, "coin");
  rotateItems(keys, "key");
  rotateItems(dogs, "dog");
  rotateItems(cartoons, "cartoon");
  checkExit();
}