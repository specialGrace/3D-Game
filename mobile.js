
console.log("MOBILE LOADED — v1");

const isTouchDevice =
    ("ontouchstart" in window) || (navigator.maxTouchPoints > 0);

// ---------------------------------------------------------------------------
//  FIT TO SCREEN (runs on every device — harmless on big desktop monitors)
// ---------------------------------------------------------------------------
function fitToScreen(){
    const scale = Math.min(window.innerWidth / 1210, window.innerHeight / 810, 1);
    container.style.transformOrigin = "top left";
    container.style.transform = "scale(" + scale + ")";
    // center the game on the page (the dark page background fills the rest)
    container.style.left = Math.max(0, (window.innerWidth  - 1200 * scale) / 2) + "px";
    container.style.top  = Math.max(0, (window.innerHeight -  800 * scale) / 2) + "px";
}
window.addEventListener("resize", fitToScreen);
fitToScreen();

// ---------------------------------------------------------------------------
//  TOUCH CONTROLS (built only when a touchscreen exists)
// ---------------------------------------------------------------------------
if (isTouchDevice) buildTouchControls();

function buildTouchControls(){

    // ---------- movement joystick (bottom-left) ----------
    const stickBase = document.createElement("div");
    stickBase.style.cssText =
        "position:fixed; left:25px; bottom:25px; width:140px; height:140px;" +
        "border-radius:50%; background:rgba(255,255,255,0.12);" +
        "border:3px solid rgba(255,255,255,0.35); z-index:9000;" +
        "touch-action:none;";

    const stickKnob = document.createElement("div");
    stickKnob.style.cssText =
        "position:absolute; left:50%; top:50%; width:60px; height:60px;" +
        "margin:-30px 0 0 -30px; border-radius:50%;" +
        "background:radial-gradient(circle at 35% 30%, #ffe488, #d98e00);" +
        "border:3px solid #8a5a00; box-shadow:0 0 15px rgba(0,0,0,0.5);";

    stickBase.appendChild(stickKnob);
    document.body.appendChild(stickBase);

    function moveKnob(touch){
        const rect = stickBase.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        let dx = touch.clientX - cx;
        let dy = touch.clientY - cy;

        // clamp the knob inside the base circle
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxR = 45;
        if (dist > maxR){ dx = dx / dist * maxR; dy = dy / dist * maxR; }

        stickKnob.style.transform = "translate(" + dx + "px," + dy + "px)";

        // convert knob position into the engine's press variables
        const t = 0.35 * maxR;   // dead-zone threshold
        pressForward = dy < -t ? 1 : 0;
        pressBack    = dy >  t ? 1 : 0;
        pressLeft    = dx < -t ? 1 : 0;
        pressRight   = dx >  t ? 1 : 0;
    }

    function releaseKnob(){
        stickKnob.style.transform = "translate(0px, 0px)";
        pressForward = pressBack = pressLeft = pressRight = 0;
    }

    stickBase.addEventListener("touchstart", e => { e.preventDefault(); moveKnob(e.touches[0]); });
    stickBase.addEventListener("touchmove",  e => { e.preventDefault(); moveKnob(e.touches[0]); });
    stickBase.addEventListener("touchend",   e => { e.preventDefault(); releaseKnob(); });
    stickBase.addEventListener("touchcancel", releaseKnob);

    // ---------- look control: drag anywhere on the right half ----------
    const lookPad = document.createElement("div");
    lookPad.style.cssText =
        "position:fixed; right:0; top:0; width:50%; height:100%;" +
        "z-index:800; touch-action:none;";   // below all buttons & menus
    document.body.appendChild(lookPad);

    let lastLookX = null, lastLookY = null;

    lookPad.addEventListener("touchstart", e => {
        lastLookX = e.touches[0].clientX;
        lastLookY = e.touches[0].clientY;
    });

    lookPad.addEventListener("touchmove", e => {
        e.preventDefault();
        const t = e.touches[0];
        if (lastLookX !== null){
            pawn.ry += (t.clientX - lastLookX) * 0.35;
            pawn.rx += (t.clientY - lastLookY) * 0.25;
            if (pawn.rx >  90) pawn.rx =  90;
            if (pawn.rx < -90) pawn.rx = -90;
        }
        lastLookX = t.clientX;
        lastLookY = t.clientY;
    });

    lookPad.addEventListener("touchend", () => { lastLookX = lastLookY = null; });

    // ---------- sprint button (bottom-right) ----------
    const sprintBtn = document.createElement("div");
    sprintBtn.textContent = "⚡";
    sprintBtn.style.cssText =
        "position:fixed; right:30px; bottom:45px; width:85px; height:85px;" +
        "border-radius:50%; background:rgba(255,215,0,0.25);" +
        "border:3px solid gold; color:gold; font-size:40px;" +
        "display:flex; align-items:center; justify-content:center;" +
        "z-index:9000; touch-action:none; user-select:none;";
    document.body.appendChild(sprintBtn);

    sprintBtn.addEventListener("touchstart", e => {
        e.preventDefault();
        pressPower = 1;
        sprintBtn.style.background = "rgba(255,215,0,0.6)";
    });
    sprintBtn.addEventListener("touchend", e => {
        e.preventDefault();
        pressPower = 0;
        sprintBtn.style.background = "rgba(255,215,0,0.25)";
    });
}