
console.log("FEATURES LOADED — v7 (win-lose bugfix)");




const STORY_TEXT =
    "You are a cartoon hero trapped in a magical maze.\n\n" +
    "Collect all the Enchanted Paintings and keys to escape!";

function showStoryIntro(onDone){

    // full-screen dark overlay 
    const overlay = document.createElement("div");
    overlay.id = "storyOverlay";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "radial-gradient(circle at center, #1a1033 0%, #000 80%)";
    overlay.style.zIndex = "99999";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.cursor = "pointer";
    overlay.style.fontFamily = "Arial, Helvetica, sans-serif";

   
    const textBox = document.createElement("div");
    textBox.style.color = "gold";
    textBox.style.fontSize = "34px";
    textBox.style.lineHeight = "1.6";
    textBox.style.textAlign = "center";
    textBox.style.maxWidth = "800px";
    textBox.style.whiteSpace = "pre-line";
    textBox.style.textShadow = "0 0 20px rgba(255, 215, 0, 0.6)";
    textBox.style.minHeight = "220px";

    // "i press any key" hint, revealed after the text finishes typing
    const hint = document.createElement("div");
    hint.textContent = "▶ Press any key to begin";
    hint.style.color = "white";
    hint.style.fontSize = "24px";
    hint.style.marginTop = "40px";
    hint.style.opacity = "0";
    hint.style.transition = "opacity 0.8s";
    hint.style.animation = "none";

    overlay.appendChild(textBox);
    overlay.appendChild(hint);
    document.body.appendChild(overlay);

    // ---- typewriter effect ----
    let charIndex = 0;
    let typingDone = false;

    const typer = setInterval(function(){
        charIndex++;
        textBox.textContent = STORY_TEXT.slice(0, charIndex);
        if (charIndex >= STORY_TEXT.length){
            finishTyping();
        }
    }, 45);

    function finishTyping(){
        clearInterval(typer);
        textBox.textContent = STORY_TEXT;
        typingDone = true;
        hint.style.opacity = "1";
    }


    function onInput(){
        if (!typingDone){
            finishTyping();
            return;
        }
        document.removeEventListener("keydown", onInput);
        overlay.removeEventListener("click", onInput);
        overlay.remove();
        if (typeof onDone === "function") onDone();
    }

    document.addEventListener("keydown", onInput);
    overlay.addEventListener("click", onInput);
}


(function(){
    const originalStart = button1.onclick;
    button1.onclick = function(){
        menu1.style.display = "none";
        showStoryIntro(originalStart);
    };
})();



const POINTS = {
    coin:    10,
    dog:     30,
    key:     50,
    cartoon: 100,
    gem:     250    // secret room bonus (Feature 10)
};

// secret room state — declared here so the scoring functions can use it
let secretFound = false;
let gemsFound = 0;


const MAX_SCORE =
    coins.length    * POINTS.coin +
    dogs.length     * POINTS.dog +
    keys.length     * POINTS.key +
    cartoons.length * POINTS.cartoon;

function calculateScore(){
    return coinsCollected    * POINTS.coin +
           dogsCollected     * POINTS.dog +
           keysCollected     * POINTS.key +
           cartoonsCollected * POINTS.cartoon +
           gemsFound         * POINTS.gem;
}

function getRank(score){
    if (score >= MAX_SCORE)                    return "🥇 GOLD RANK";
    if (score >= Math.floor(MAX_SCORE * 0.65)) return "🥈 SILVER RANK";
    return "🥉 BRONZE RANK";
}

updateScore = function(){
    document.getElementById("scoreBoard").innerHTML =
        "⭐ Score : " + calculateScore();
};

const __originalGameWon = gameWon;

gameWon = function(){

    __originalGameWon();   // confetti, sounds, timers — all unchanged

    const score = calculateScore();
    const rank  = getRank(score);

    document.getElementById("finalScore").innerHTML =
        "<span style='font-size:40px;'>" + rank + "</span>" +
        "<br><br>" +
        "⭐ Final Score : " + score + " / " + (MAX_SCORE + gemsFound * POINTS.gem) +
        "<br><br>" +
        "💰 Coins : "    + coinsCollected    + " × " + POINTS.coin +
        "<br>" +
        "🔑 Keys : "     + keysCollected     + " × " + POINTS.key +
        "<br>" +
        "🐶 Dogs : "     + dogsCollected     + " × " + POINTS.dog +
        "<br>" +
        "🎨 Paintings : " + cartoonsCollected + " × " + POINTS.cartoon +
        (gemsFound > 0 ? "<br>💎 Secret Gem : +" + POINTS.gem : "");
};

// --- upgrade the LOSE screen: weighted score --------------------------------
const __originalGameLost = gameLost;

gameLost = function(){

    __originalGameLost();

    document.getElementById("loseScore").innerHTML =
        "Final Score: " + calculateScore() + " / " + (MAX_SCORE + gemsFound * POINTS.gem);
};




const EXIT_DOOR = { x: 500, y: 0, z: 1000, width: 500, height: 200 };


const doorCollision =
    [EXIT_DOOR.x, 0, EXIT_DOOR.z, 0, 0, 0, EXIT_DOOR.width, EXIT_DOOR.height, "door"];
map.push(doorCollision);

let doorOpened = false;
let doorLeftPanel, doorRightPanel, doorLockIcon;

function makeDoorPanel(side){
    const panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.top = "0";
    panel.style[side] = "0";
    panel.style.width = "50%";
    panel.style.height = "100%";
    panel.style.boxSizing = "border-box";
    // wooden planks
    panel.style.background =
        "repeating-linear-gradient(90deg, #6b4423 0px, #6b4423 42px, #55351a 42px, #55351a 48px)";
    panel.style.border = "5px solid #3a2410";
    panel.style.boxShadow = "inset 0 0 40px rgba(0,0,0,0.55)";
    panel.style.transformOrigin = side + " center";
    panel.style.transition = "transform 1.8s ease-in-out";

    // golden handle near the middle edge
    const handle = document.createElement("div");
    handle.style.position = "absolute";
    handle.style.top = "50%";
    handle.style[side === "left" ? "right" : "left"] = "14px";
    handle.style.width = "16px";
    handle.style.height = "16px";
    handle.style.borderRadius = "50%";
    handle.style.background = "gold";
    handle.style.boxShadow = "0 0 10px gold";
    panel.appendChild(handle);

    return panel;
}

function createExitDoor(){

    const group = document.createElement("div");
    group.id = "exitDoor";
    group.style.position = "absolute";
    group.style.width  = EXIT_DOOR.width + "px";
    group.style.height = EXIT_DOOR.height + "px";
    group.style.transformStyle = "preserve-3d";
    group.style.transform =
        "translate3d(" + (600 - EXIT_DOOR.width / 2 + EXIT_DOOR.x) + "px," +
                         (400 - EXIT_DOOR.height / 2 + EXIT_DOOR.y) + "px," +
                         EXIT_DOOR.z + "px)";

    doorLeftPanel  = makeDoorPanel("left");
    doorRightPanel = makeDoorPanel("right");

    // glowing EXIT sign above the door
    const sign = document.createElement("div");
    sign.textContent = "🚪 EXIT";
    sign.style.position = "absolute";
    sign.style.top = "-46px";
    sign.style.left = "50%";
    sign.style.transform = "translateX(-50%)";
    sign.style.fontFamily = "Arial, sans-serif";
    sign.style.fontSize = "30px";
    sign.style.fontWeight = "bold";
    sign.style.color = "#00ff88";
    sign.style.textShadow = "0 0 15px #00ff88";
    sign.style.whiteSpace = "nowrap";

    // big lock in the centre — red glow while locked
    doorLockIcon = document.createElement("div");
    doorLockIcon.textContent = "🔒";
    doorLockIcon.style.position = "absolute";
    doorLockIcon.style.top = "50%";
    doorLockIcon.style.left = "50%";
    doorLockIcon.style.transform = "translate(-50%, -50%)";
    doorLockIcon.style.fontSize = "56px";
    doorLockIcon.style.filter = "drop-shadow(0 0 12px red)";
    doorLockIcon.style.transition = "opacity 1s";
    doorLockIcon.style.pointerEvents = "none";

    group.appendChild(doorLeftPanel);
    group.appendChild(doorRightPanel);
    group.appendChild(sign);
    group.appendChild(doorLockIcon);
    world.append(group);
}

function openExitDoor(){

    if (doorOpened) return;
    doorOpened = true;

    // remove the collision so the player can walk through
    doorCollision[0] = 100000;

    // unlock animation
    doorLockIcon.textContent = "🔓";
    doorLockIcon.style.filter = "drop-shadow(0 0 15px #00ff88)";
    setTimeout(function(){ doorLockIcon.style.opacity = "0"; }, 700);

    // both panels swing outward
    doorLeftPanel.style.transform  = "rotateY(-115deg)";
    doorRightPanel.style.transform = "rotateY(115deg)";

    // satisfying unlock sound (reuses the key sound from the engine)
    collectSound("keys");

    document.getElementById("mission").innerHTML =
        "🚪 The exit door is OPEN!<br>Escape now!";
}

// hook: run the engine's win-check, then react if it unlocked the escape
const __originalCheckWin = checkWin;
checkWin = function(){
    __originalCheckWin();
    if (canEscape) openExitDoor();
};

createExitDoor();




function makeWindow(leftPos){

    const win = document.createElement("div");
    win.style.position = "absolute";
    win.style.top = "50%";
    win.style.left = leftPos;
    win.style.transform = "translate(-50%, -50%)";
    win.style.width = "110px";
    win.style.height = "150px";
    win.style.borderRadius = "55px 55px 6px 6px";
    win.style.border = "7px solid #3a2410";
    win.style.boxSizing = "border-box";
    // starry night sky
    win.style.background =
        "radial-gradient(2px 2px at 25% 35%, white, transparent)," +
        "radial-gradient(2px 2px at 70% 22%, white, transparent)," +
        "radial-gradient(1.5px 1.5px at 45% 60%, white, transparent)," +
        "radial-gradient(1.5px 1.5px at 62% 75%, white, transparent)," +
        "linear-gradient(#0a1638, #2c528c)";
    win.style.boxShadow =
        "0 0 35px rgba(130, 190, 255, 0.75), inset 0 0 25px rgba(0,0,0,0.6)";

    // moon
    const moon = document.createElement("div");
    moon.textContent = "🌙";
    moon.style.position = "absolute";
    moon.style.top = "16px";
    moon.style.right = "12px";
    moon.style.fontSize = "26px";
    moon.style.filter = "drop-shadow(0 0 8px #cfe8ff)";
    win.appendChild(moon);

    // window frame cross bars
    const vBar = document.createElement("div");
    vBar.style.position = "absolute";
    vBar.style.left = "50%";
    vBar.style.top = "0";
    vBar.style.width = "6px";
    vBar.style.height = "100%";
    vBar.style.marginLeft = "-3px";
    vBar.style.background = "#3a2410";

    const hBar = document.createElement("div");
    hBar.style.position = "absolute";
    hBar.style.top = "52%";
    hBar.style.left = "0";
    hBar.style.width = "100%";
    hBar.style.height = "6px";
    hBar.style.background = "#3a2410";

    win.appendChild(vBar);
    win.appendChild(hBar);
    return win;
}

function addWindowsToWalls(){

    // outer boundary walls: map 1 = front, map 2 = left, map 3 = right
    const outerWalls = ["map 1", "map 2", "map 3"];

    outerWalls.forEach(function(id){
        const wall = document.getElementById(id);
        if (!wall) return;
        wall.appendChild(makeWindow("18%"));
        wall.appendChild(makeWindow("82%"));
    });
}

addWindowsToWalls();



const PARTICLE_SYMBOLS = ["✨", "⭐", "💫", "🌟"];

function spawnPickupParticles(){

    // the hero is always at the centre of the game container
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2 + 40;   // slightly down, at the hero

    for (let i = 0; i < 12; i++){

        const p = document.createElement("div");
        p.textContent = PARTICLE_SYMBOLS[i % PARTICLE_SYMBOLS.length];
        p.style.position = "fixed";
        p.style.left = cx + "px";
        p.style.top  = cy + "px";
        p.style.fontSize = (16 + Math.random() * 16) + "px";
        p.style.zIndex = "99999";
        p.style.pointerEvents = "none";
        p.style.transition = "transform 0.9s ease-out, opacity 0.9s ease-out";
        document.body.appendChild(p);

        // fly outward in a random direction, drifting slightly upward
        const angle = Math.random() * Math.PI * 2;
        const dist  = 80 + Math.random() * 130;

        setTimeout(function(){
            p.style.transform =
                "translate(" + (Math.cos(angle) * dist) + "px," +
                               (Math.sin(angle) * dist - 50) + "px)" +
                "rotate(" + (Math.random() * 540 - 270) + "deg)";
            p.style.opacity = "0";
        }, 10);

        setTimeout(function(){ p.remove(); }, 1000);
    }
}

// wrap the engine's grab-pop so particles fire on every single pickup
const __originalGrabPop = heroGrabPop;
heroGrabPop = function(){
    __originalGrabPop();
    spawnPickupParticles();
};

const magicStyle = document.createElement("style");
magicStyle.textContent =
    "@keyframes portalSpin  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }" +
    "@keyframes portalPulse { 0%,100% { box-shadow: 0 0 30px #a06bff, 0 0 70px rgba(160,107,255,.45); }" +
    "                         50%     { box-shadow: 0 0 60px #d3b6ff, 0 0 120px rgba(160,107,255,.75); } }" +
    "@keyframes wispFloat   { 0%,100% { transform: translate(-50%,-50%) translateY(-16px) scale(1); }" +
    "                         50%     { transform: translate(-50%,-50%) translateY(16px) scale(1.15); } }" +
    "@keyframes hueShift    { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(360deg); } }" +
    "@keyframes runeAlive   { 0%,100% { opacity: .95; transform: translate(-50%,-50%) scale(1); }" +
    "                         50%     { opacity: .55; transform: translate(-50%,-50%) scale(1.12); } }" +
    "@keyframes fireflyBlink{ 0%,100% { opacity: .1; } 50% { opacity: 1; } }";
document.head.appendChild(magicStyle);


// ---- swirling magic portals on the walls -----------------------------------

function makePortal(leftPos, delay){

    const portal = document.createElement("div");
    portal.style.position = "absolute";
    portal.style.top = "50%";
    portal.style.left = leftPos;
    portal.style.width = "130px";
    portal.style.height = "130px";
    portal.style.marginLeft = "-65px";
    portal.style.marginTop = "-65px";
    portal.style.borderRadius = "50%";
    portal.style.animation = "portalPulse 2.6s ease-in-out " + delay + "s infinite";
    portal.style.pointerEvents = "none";

    // the spinning vortex
    const vortex = document.createElement("div");
    vortex.style.position = "absolute";
    vortex.style.inset = "0";
    vortex.style.borderRadius = "50%";
    vortex.style.background =
        "conic-gradient(from 0deg, #1a0533, #7a2aff, #00e5ff, #ff2ad9, #1a0533)";
    vortex.style.animation = "portalSpin 5s linear " + delay + "s infinite";

    // dark void core
    const core = document.createElement("div");
    core.style.position = "absolute";
    core.style.top = "50%";
    core.style.left = "50%";
    core.style.transform = "translate(-50%, -50%)";
    core.style.width = "56px";
    core.style.height = "56px";
    core.style.borderRadius = "50%";
    core.style.background = "radial-gradient(circle, #000 40%, rgba(0,0,0,0) 100%)";
    core.style.boxShadow = "inset 0 0 25px #7a2aff";

    portal.appendChild(vortex);
    portal.appendChild(core);
    return portal;
}


// ---- floating wisp orbs -----------------------------------------------------

function makeWisp(leftPos, delay){

    const wisp = document.createElement("div");
    wisp.style.position = "absolute";
    wisp.style.top = "50%";
    wisp.style.left = leftPos;
    wisp.style.width = "36px";
    wisp.style.height = "36px";
    wisp.style.borderRadius = "50%";
    wisp.style.background =
        "radial-gradient(circle, #ffffff 0%, #7df9ff 35%, rgba(125,249,255,0) 75%)";
    wisp.style.boxShadow = "0 0 25px #7df9ff, 0 0 50px rgba(125,249,255,.5)";
    wisp.style.animation =
        "wispFloat 3.2s ease-in-out " + delay + "s infinite," +
        "hueShift 7s linear " + delay + "s infinite";
    wisp.style.pointerEvents = "none";
    return wisp;
}


// ---- fireflies drifting in the maze air -------------------------------------

function createFireflies(){

    for (let i = 0; i < 30; i++){

        // random spot inside the maze, floating at torch height
        const fx = Math.random() * 1900 - 950;
        const fz = Math.random() * 1900 - 950;
        const fy = -20 + Math.random() * 80;

        const fly = document.createElement("div");
        fly.className = "square";
        fly.style.width = "9px";
        fly.style.height = "9px";
        fly.style.transform =
            "translate3d(" + (600 - 4.5 + fx) + "px," +
                             (400 - 4.5 + fy) + "px," + fz + "px)";
        fly.style.pointerEvents = "none";

        const dot = document.createElement("div");
        dot.style.width = "100%";
        dot.style.height = "100%";
        dot.style.borderRadius = "50%";
        dot.style.background = "radial-gradient(circle, #fff8b0 0%, #ffd700 60%, transparent 100%)";
        dot.style.boxShadow = "0 0 12px #ffd700, 0 0 24px rgba(255,215,0,.6)";
        dot.style.animation =
            "fireflyBlink " + (1.5 + Math.random() * 2.5).toFixed(2) + "s ease-in-out " +
            (Math.random() * 3).toFixed(2) + "s infinite";

        fly.appendChild(dot);
        world.append(fly);
    }
}




function animateRunes(){

    const allDivs = document.querySelectorAll("#world .map > div");

    allDivs.forEach(function(div, idx){
        if (div.style.color === "rgb(0, 255, 204)"){
            div.style.animation =
                "runeAlive " + (2 + (idx % 4) * 0.5) + "s ease-in-out infinite," +
                "hueShift " + (9 + (idx % 3) * 3) + "s linear infinite";
        }
    });
}


// ---- hang everything on the walls -------------------------------------------

function decorateEnchantedWalls(){

    // portals on the inner ring walls (map 6..14), alternating sides
    for (let i = 6; i <= 14; i++){
        const wall = document.getElementById("map " + i);
        if (!wall) continue;
        wall.appendChild(makePortal(i % 2 === 0 ? "22%" : "78%", (i % 5) * 0.4));
        wall.appendChild(makeWisp(i % 2 === 0 ? "78%" : "22%", (i % 4) * 0.6));
    }

    // extra wisps on the outer walls, between the windows
    ["map 1", "map 2", "map 3"].forEach(function(id, k){
        const wall = document.getElementById(id);
        if (!wall) return;
        wall.appendChild(makeWisp("38%", k * 0.5));
        wall.appendChild(makeWisp("62%", k * 0.7 + 0.3));
    });
}

decorateEnchantedWalls();
createFireflies();
animateRunes();




let paused = false;
let gameActive = false;      // true once the timer starts, false after win/lose
let gameEnded = false;       // true after win OR lose — blocks the other one firing
let soundOn = true;

// mute hook: every collect/step sound goes through playSound()
const __originalPlaySound = playSound;
playSound = function(src){
    if (!soundOn) return;
    __originalPlaySound(src);
};

// (the visible ⏸ button was removed by request — I press Esc to pause)

// the pause overlay
let pauseOverlay = null;

function buildPauseOverlay(){

    pauseOverlay = document.createElement("div");
    pauseOverlay.style.cssText =
        "position:fixed; inset:0; z-index:99990; display:flex;" +
        "flex-direction:column; align-items:center; justify-content:center;" +
        "background:rgba(5, 2, 20, 0.88); font-family:Arial, sans-serif;" +
        "text-align:center;";

    const title = document.createElement("div");
    title.textContent = "⏸ PAUSED";
    title.style.cssText =
        "font-size:56px; font-weight:bold; color:gold;" +
        "text-shadow:0 0 25px orange; margin-bottom:30px;";
    pauseOverlay.appendChild(title);

    function makePauseButton(label, handler){
        const b = document.createElement("div");
        b.className = "button";               // reuses the theme.css style
        b.style.width = "340px";
        b.style.height = "68px";
        const t = document.createElement("p");
        t.textContent = label;
        b.appendChild(t);
        b.onclick = handler;
        pauseOverlay.appendChild(b);
        return b;
    }

    makePauseButton("▶ RESUME", function(){ togglePause(); });
    makePauseButton("🔄 RESTART", function(){ location.reload(); });

    // (user's custom button, merged in) return to the main menu without reload
    makePauseButton("🏠 HOMEPAGE", function(){

        if (pauseOverlay) pauseOverlay.style.display = "none";
        paused = false;
        gameActive = false;

        // BUGFIX: pausing cleared the game loop — restart it so the world
        // isn't frozen when the player presses START GAME again
        clearInterval(TimerGame);
        TimerGame = setInterval(repeat, 10);

        // Hide game UI
        document.getElementById("timer").style.display = "none";
        document.getElementById("mission").style.display = "none";
        document.getElementById("scoreBoard").style.display = "none";
        document.getElementById("objective").style.display = "none";

        // Show main menu again
        menu2.style.display = "none";
        menu1.style.display = "block";

        // Reset pointer lock
        if (document.pointerLockElement) document.exitPointerLock();
    });

    const soundButton = makePauseButton("🔊 SOUND : ON", function(){
        soundOn = !soundOn;
        soundButton.querySelector("p").textContent =
            soundOn ? "🔊 SOUND : ON" : "🔇 SOUND : OFF";
        winSound.volume = soundOn ? 1 : 0;
        if (!soundOn) backgroundMusic.pause();
    });

    const controls = document.createElement("div");
    controls.innerHTML =
        "⬆⬇⬅➡ Move &nbsp;•&nbsp; 🖱 Look &nbsp;•&nbsp; P Sprint &nbsp;•&nbsp; R Reset &nbsp;•&nbsp; Esc Pause";
    controls.style.cssText =
        "margin-top:35px; color:#aab4e8; font-size:19px;";
    pauseOverlay.appendChild(controls);

    document.body.appendChild(pauseOverlay);
}

function togglePause(){

    if (!gameActive) return;                 // nothing to pause yet / anymore

    paused = !paused;

    if (paused){
        clearInterval(TimerGame);            // freeze the game loop
        clearInterval(TimerClock);           // freeze the countdown
        backgroundMusic.pause();
        if (document.pointerLockElement) document.exitPointerLock();
        if (!pauseOverlay) buildPauseOverlay();
        pauseOverlay.style.display = "flex";
    }
    else {
        TimerGame = setInterval(repeat, 10); // resume the game loop
        startTimer();                        // resume the countdown
        if (soundOn) backgroundMusic.play().catch(function(){});
        pauseOverlay.style.display = "none";
    }
}

// Esc toggles pause (when the mouse is pointer-locked, Esc first exits the
// lock — the pointerlockchange hook below catches that case and auto-pauses)
document.addEventListener("keydown", function(e){
    if (e.key === "Escape") togglePause();
});

document.addEventListener("pointerlockchange", function(){
    if (!document.pointerLockElement && gameActive && !paused){
        togglePause();                       // auto-pause when lock is lost
    }
});




const SAVE_KEY = "lostMazeSave";

// mark the game as active whenever the timer starts (start, continue, resume)
const __originalStartTimer = startTimer;
startTimer = function(){
    __originalStartTimer();
    gameActive = true;
    // re-show the HUD (the HOMEPAGE button hides these when returning to menu)
    document.getElementById("mission").style.display = "block";
    document.getElementById("scoreBoard").style.display = "block";
    document.getElementById("objective").style.display = "block";
    maybeShowTutorial();     // Feature 9
};

function collectedIndices(squares){
    const out = [];
    for (let i = 0; i < squares.length; i++){
        if (squares[i][0] === 100000) out.push(i);
    }
    return out;
}

function saveProgress(){
    if (!gameActive || paused) return;
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify({
            coins:    collectedIndices(coins),
            keys:     collectedIndices(keys),
            dogs:     collectedIndices(dogs),
            cartoons: collectedIndices(cartoons),
            nextCartoon:   nextCartoon,
            timeRemaining: timeRemaining,
            pawn: { x: pawn.x, z: pawn.z, ry: pawn.ry }
        }));
    } catch (e) { /* storage unavailable — just play without saving */ }
}
setInterval(saveProgress, 3000);

function clearSave(){
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
}


const __rankedGameWon = gameWon;
gameWon = function(){
    if (gameEnded) return;
    gameEnded = true;
    clearInterval(TimerClock);       // stop the countdown for good
    __rankedGameWon();
    gameActive = false;
    clearSave();
};

const __rankedGameLost = gameLost;
gameLost = function(){
    if (gameEnded) return;
    gameEnded = true;
    clearInterval(TimerClock);
    __rankedGameLost();
    gameActive = false;
    clearSave();
};

function applySave(s){

    function restore(squares, ids, name){
        ids.forEach(function(i){
            squares[i][0] = 100000;
            const el = document.getElementById(name + " " + i);
            if (el) el.style.display = "none";
        });
    }
    restore(coins,    s.coins,    "coin");
    restore(keys,     s.keys,     "key");
    restore(dogs,     s.dogs,     "dog");
    restore(cartoons, s.cartoons, "cartoon");

    coinsCollected    = s.coins.length;
    keysCollected     = s.keys.length;
    dogsCollected     = s.dogs.length;
    cartoonsCollected = s.cartoons.length;

    // re-reveal cartoons that were visible but not yet collected
    nextCartoon = s.nextCartoon;
    for (let i = 0; i < nextCartoon; i++){
        if (s.cartoons.indexOf(i) === -1){
            const el = document.getElementById("cartoon " + i);
            if (el) el.style.display = "block";
        }
    }

    timeRemaining = s.timeRemaining;
    pawn.x  = s.pawn.x;
    pawn.z  = s.pawn.z;
    pawn.ry = s.pawn.ry;

    updateMission();
    updateScore();
    updateObjective();
    checkWin();     // reopens the exit door if everything was already found

    // show the restored time immediately (before the first tick)
    document.getElementById("timer").innerHTML =
        Math.floor(timeRemaining / 60) + ":" +
        String(timeRemaining % 60).padStart(2, "0");
}



const TUTORIAL_KEY = "lostMazeTutorialSeen";
let tutorialShownThisSession = false;

function maybeShowTutorial(){

    if (tutorialShownThisSession) return;
    tutorialShownThisSession = true;

    let seen = null;
    try { seen = localStorage.getItem(TUTORIAL_KEY); } catch (e) {}
    if (seen) return;

    try { localStorage.setItem(TUTORIAL_KEY, "1"); } catch (e) {}

    const hints = document.createElement("div");
    hints.style.cssText =
        "position:fixed; left:50%; bottom:90px; transform:translateX(-50%);" +
        "background:rgba(5,2,20,0.85); border:2px solid gold; border-radius:16px;" +
        "padding:22px 40px; z-index:9600; font-family:Arial, sans-serif;" +
        "color:white; font-size:24px; line-height:1.9; text-align:center;" +
        "transition:opacity 1.2s; pointer-events:none;";

    const isTouch = ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);

    hints.innerHTML = isTouch
        ? "🕹 <b>Joystick</b> — move<br>👆 <b>Drag right side</b> — look around<br>⚡ <b>Hold button</b> — sprint"
        : "⬆⬇⬅➡ <b>Arrow keys</b> — move<br>🖱 <b>Mouse</b> — look around<br><b>P</b> — sprint &nbsp;•&nbsp; <b>Esc</b> — pause";

    document.body.appendChild(hints);

    // fade out after 9 seconds, or as soon as the player starts moving
    let dismissed = false;
    function dismiss(){
        if (dismissed) return;
        dismissed = true;
        hints.style.opacity = "0";
        setTimeout(function(){ hints.remove(); }, 1300);
        document.removeEventListener("keydown", onFirstMove);
    }
    function onFirstMove(e){
        if (e.key && e.key.indexOf("Arrow") === 0) setTimeout(dismiss, 2500);
    }
    document.addEventListener("keydown", onFirstMove);
    setTimeout(dismiss, 9000);
}



map[2][2] = -350;
map[2][6] = 1300;
map.push([-1000, 0, 750, 0, 90, 0, 500, 200]);

// small engine-style square factory for my own world geometry
function makeWorldSquare(x, y, z, rx, ry, w, h){
    const el = document.createElement("div");
    el.className = "square";
    el.style.width  = w + "px";
    el.style.height = h + "px";
    el.style.transform =
        "translate3d(" + (600 - w / 2 + x) + "px," +
                         (400 - h / 2 + y) + "px," + z + "px)" +
        "rotateX(" + rx + "deg) rotateY(" + ry + "deg)";
    world.append(el);
    return el;
}

(function buildSecretRoom(){

    // floor of the hidden chamber
    const floor = makeWorldSquare(-1200, 100, 400, 90, 0, 400, 300);
    floor.style.background =
        "repeating-linear-gradient(45deg, #241c3a 0px, #241c3a 40px, #191330 40px, #191330 80px)";
    floor.style.boxShadow = "inset 0 0 90px rgba(255, 200, 60, 0.35)";

    // the three chamber walls (visual + collision)
    const roomWalls = [
        [-1400, 0, 400, 0, 90, 300, 200],   // far wall
        [-1200, 0, 250, 0,  0, 400, 200],   // north wall
        [-1200, 0, 550, 0,  0, 400, 200]    // south wall
    ];
    roomWalls.forEach(function(s){
        map.push([s[0], s[1], s[2], s[3], s[4], 0, s[5], s[6]]);
        const el = makeWorldSquare(s[0], s[1], s[2], s[3], s[4], s[5], s[6]);
        el.style.background =
            "linear-gradient(rgba(255, 215, 0, 0.14), rgba(0,0,0,0.45))," +
            "linear-gradient(#33285a, #1e1540)";
        el.style.border = "3px solid rgba(255, 215, 0, 0.45)";
        el.style.boxShadow = "inset 0 0 70px rgba(255, 200, 60, 0.30)";
    });

    // the treasure: a floating gem (gemBob animation lives in theme.css and
    // runs on the INNER div so it never disturbs the 3D placement transform)
    const gem = makeWorldSquare(-1250, 0, 400, 0, 90, 80, 90);
    gem.id = "secretGem";
    gem.innerHTML =
        "<div style='font-size:64px; text-align:center; line-height:90px;" +
        "filter: drop-shadow(0 0 20px #00e5ff) drop-shadow(0 0 40px #00e5ff);" +
        "animation: gemBob 2.4s ease-in-out infinite;'>💎</div>";

    // sparkle hints floating just inside the maze, near the fake wall section
    [360, 440].forEach(function(z, k){
        const hint = makeWorldSquare(-955, -10, z, 0, 90, 30, 40);
        hint.innerHTML =
            "<div style='font-size:22px; text-align:center; line-height:40px; opacity:0.75;" +
            "animation: gemBob " + (3 + k) + "s ease-in-out infinite;'>✨</div>";
        hint.style.pointerEvents = "none";
    });
})();

// discovery + gem pickup checker
setInterval(function(){

    if (!gameActive || paused) return;

    // stepping through the wall = discovery
    if (!secretFound && pawn.x < -1010 && pawn.z > 260 && pawn.z < 540){
        secretFound = true;
        showToast("🤫 SECRET ROOM DISCOVERED!", "There must be treasure here...");
    }

    // grab the gem
    if (gemsFound === 0){
        const d = Math.sqrt(
            Math.pow(pawn.x + 1250, 2) + Math.pow(pawn.z - 400, 2)
        );
        if (d < 75){
            gemsFound = 1;
            document.getElementById("secretGem").style.display = "none";
            heroGrabPop();                      // pop + particle burst
            collectSound("keys");
            updateScore();
            showToast("💎 SECRET GEM!", "+" + POINTS.gem + " points");
        }
    }
}, 60);



let p2Joined = false;
let p2 = { x: 0, z: 0 };
let p2F = 0, p2B = 0, p2L = 0, p2R = 0, p2Sprint = 0;
let p2El = null, p2Sprite = null, p2Cycle = 0;
const P2_TETHER = 700;   // max distance from player 1 (the camera)

function joinPlayer2(){

    p2Joined = true;
    p2.x = pawn.x;
    p2.z = pawn.z;

    p2El = document.createElement("div");
    p2El.style.position = "absolute";
    p2El.style.width = "80px";
    p2El.style.height = "110px";
    p2El.style.pointerEvents = "none";

    const tag = document.createElement("div");
    tag.textContent = "🔷 P2";
    tag.style.cssText =
        "position:absolute; top:-28px; left:50%; transform:translateX(-50%);" +
        "font-family:Arial, sans-serif; font-size:16px; font-weight:bold;" +
        "color:#4fd8ff; text-shadow:0 0 6px black, 0 0 6px black; white-space:nowrap;";

    const shadow = document.createElement("div");
    shadow.style.cssText =
        "position:absolute; bottom:-6px; left:50%; transform:translateX(-50%);" +
        "width:60px; height:14px; border-radius:50%;" +
        "background:radial-gradient(rgba(0,0,0,0.55), transparent 70%);";

    p2Sprite = document.createElement("div");
    p2Sprite.textContent = "🦸";
    p2Sprite.style.cssText =
        "position:absolute; left:0; right:0; bottom:0; text-align:center;" +
        "font-size:80px; line-height:1; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.6));";

    p2El.appendChild(shadow);
    p2El.appendChild(p2Sprite);
    p2El.appendChild(tag);
    world.append(p2El);

    showToast("🎮 PLAYER 2 JOINED!", "WASD to move • Shift to sprint");
}

document.addEventListener("keydown", function(e){
    const k = e.key.toLowerCase();
    if (k !== "w" && k !== "a" && k !== "s" && k !== "d" && k !== "shift") return;
    if (!gameActive || paused) return;
    if (!p2Joined && k !== "shift") joinPlayer2();
    if (k === "w") p2F = 1;
    if (k === "s") p2B = 1;
    if (k === "a") p2L = 1;
    if (k === "d") p2R = 1;
    if (k === "shift") p2Sprint = 1;
});

document.addEventListener("keyup", function(e){
    const k = e.key.toLowerCase();
    if (k === "w") p2F = 0;
    if (k === "s") p2B = 0;
    if (k === "a") p2L = 0;
    if (k === "d") p2R = 0;
    if (k === "shift") p2Sprint = 0;
});

// player 2 game loop (movement, rendering, pickups) — same speed math as P1
setInterval(function(){

    if (!p2Joined || !gameActive || paused) return;

    const sp = p2Sprint ? 5 : 1;
    const dx = ((p2R - p2L) * Math.cos(pawn.ry * deg) -
                (p2F - p2B) * Math.sin(pawn.ry * deg)) * sp;
    const dz = (-(p2R - p2L) * Math.sin(pawn.ry * deg) -
                (p2F - p2B) * Math.cos(pawn.ry * deg)) * sp;

    const nx = p2.x + dx;
    const nz = p2.z + dz;

    // walls block P2 too, and the tether keeps them near player 1's camera
    if (!isColliding(nx, p2.z) &&
        Math.sqrt(Math.pow(nx - pawn.x, 2) + Math.pow(p2.z - pawn.z, 2)) < P2_TETHER){
        p2.x = nx;
    }
    if (!isColliding(p2.x, nz) &&
        Math.sqrt(Math.pow(p2.x - pawn.x, 2) + Math.pow(nz - pawn.z, 2)) < P2_TETHER){
        p2.z = nz;
    }

    // render (billboard toward the camera, little hop while moving)
    const moving = p2F || p2B || p2L || p2R;
    if (moving) p2Cycle += p2Sprint ? 0.5 : 0.25;
    const hop = moving ? Math.abs(Math.sin(p2Cycle)) * 10 : 0;
    p2Sprite.textContent = moving ? "🏃" : "🦸";

    p2El.style.transform =
        "translate3d(" + (600 - 40 + p2.x) + "px," +
                         (400 - 55 + 45 - hop) + "px," +
                         p2.z + "px)" +
        "rotateY(" + pawn.ry + "deg)";

    // pickups & exit: borrow the engine's own logic by briefly standing
    // player 1's "pawn" on P2's spot, running the checks, then restoring it
    const ox = pawn.x, oz = pawn.z;
    pawn.x = p2.x; pawn.z = p2.z;
    interact(coins, "coin");
    interact(keys, "key");
    interact(dogs, "dog");
    interact(cartoons, "cartoon");
    checkExit();
    pawn.x = ox; pawn.z = oz;
}, 10);

// mention co-op on the instructions screen
(function(){
    const controlsText = document.querySelectorAll("#menu2 p")[1];
    if (controlsText){
        controlsText.innerHTML +=
            "<br>W A S D + Shift = Player 2 joins (co-op!)";
    }
})();



const ACH_KEY = "lostMazeAchievements";
let achUnlocked = {};
try { achUnlocked = JSON.parse(localStorage.getItem(ACH_KEY)) || {}; } catch (e) {}

// checked continuously during play
const ACHIEVEMENTS = [
    { id: "dogLover",  icon: "🐶", name: "Dog Lover",       test: function(){ return dogsCollected     >= dogs.length; } },
    { id: "treasure",  icon: "💰", name: "Treasure Hunter", test: function(){ return coinsCollected    >= coins.length; } },
    { id: "keymaster", icon: "🔑", name: "Keymaster",       test: function(){ return keysCollected     >= keys.length; } },
    { id: "artist",    icon: "🎨", name: "Art Collector",   test: function(){ return cartoonsCollected >= cartoons.length; } },
    { id: "secret",    icon: "🤫", name: "Secret Finder",   test: function(){ return secretFound; } },
    { id: "coop",      icon: "👥", name: "Better Together", test: function(){ return p2Joined; } }
];

// checked once, at the moment of victory
const WIN_ACHIEVEMENTS = [
    { id: "speed",   icon: "⚡", name: "Speedrunner",   test: function(){ return timeRemaining >= 90; } },
    { id: "perfect", icon: "🏆", name: "Perfectionist", test: function(){
        return coinsCollected    === coins.length &&
               keysCollected     === keys.length &&
               dogsCollected     === dogs.length &&
               cartoonsCollected === cartoons.length;
    } }
];

// ---- toast popups (queued so they never overlap) ----
let toastQueue = [];
let toastBusy = false;

function showToast(title, subtitle){
    toastQueue.push({ title: title, subtitle: subtitle });
    drainToasts();
}

function drainToasts(){

    if (toastBusy || toastQueue.length === 0) return;
    toastBusy = true;
    const t = toastQueue.shift();

    const el = document.createElement("div");
    el.style.cssText =
        "position:fixed; right:-420px; bottom:110px; width:340px;" +
        "background:linear-gradient(160deg, #241b4d, #120b2e);" +
        "border:3px solid gold; border-radius:14px; padding:16px 20px;" +
        "z-index:99995; font-family:Arial, sans-serif; color:white;" +
        "box-shadow:0 0 30px rgba(255,200,60,0.45);" +
        "transition:right 0.45s ease;";
    el.innerHTML =
        "<div style='font-size:20px; font-weight:bold; color:gold;'>" + t.title + "</div>" +
        (t.subtitle ? "<div style='font-size:16px; margin-top:6px; color:#cfd8ff;'>" + t.subtitle + "</div>" : "");
    document.body.appendChild(el);

    setTimeout(function(){ el.style.right = "20px"; }, 30);
    setTimeout(function(){ el.style.right = "-420px"; }, 3400);
    setTimeout(function(){
        el.remove();
        toastBusy = false;
        drainToasts();
    }, 3950);
}

function unlockAchievement(a){
    if (achUnlocked[a.id]) return;
    achUnlocked[a.id] = true;
    try { localStorage.setItem(ACH_KEY, JSON.stringify(achUnlocked)); } catch (e) {}
    showToast("🏆 ACHIEVEMENT UNLOCKED", a.icon + " " + a.name);
}

setInterval(function(){
    if (!gameActive) return;
    ACHIEVEMENTS.forEach(function(a){
        if (!achUnlocked[a.id] && a.test()) unlockAchievement(a);
    });
}, 700);

// evaluate win achievements at the moment of victory (before timers stop)
const __achGameWon = gameWon;
gameWon = function(){
    const earned = WIN_ACHIEVEMENTS.filter(function(a){
        return !achUnlocked[a.id] && a.test();
    });
    __achGameWon();
    earned.forEach(unlockAchievement);
};