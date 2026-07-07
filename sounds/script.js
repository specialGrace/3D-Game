// //world variables
// var deg = Math.PI/180;
// function player(x, y, z, rx, ry){
//     this.x = x;
//     this.y = y;
//     this.z = z;
//     this.rx = rx;
//     this.ry = ry;
// }

// /***
// var map = [
//     // OUTER BOX
//     [0, 0, -1000, 0, 0, 0, 2000, 400, 'pattern/front.jpeg',1],      // outer front wall
//     [0, 0, 1000, 0, 180, 0, 2000, 200, 'pattern/back.jpeg',1],     // outer back wall
//     [1000, 0, 0, 0, 90, 0, 2000, 200, 'pattern/right.jpeg',1],      // outer right wall
//     [-1000, 0, 0, 0, -90, 0, 2000, 200, 'pattern/left.jpeg',1],    // outer left wall
//     [0, 100, 0, 90, 0, 0, 2000, 2000, 'pattern/ground.jpeg',1],        // outer ground

//     // INNER BOX
//     [0, 0, 600, 0, 180, 0, 1200, 200, '#6C7A89'],
//     [600, 0, 0, 0, 90, 0, 1200, 200, '#7D6B91'],
//     [-600, 0, 0, 0, -90, 0, 1200, 200, '#8A6F4D'],
//     [-400, 0, -600, 0, 0, 0, 400, 200, '#5D8AA8'],
//     [400, 0, -600, 0, 0, 0, 400, 200, '#5D8AA8']
// ]

// var coins = [
//     [800, 30, -800, 0, 0, 0, 50, 50, 'pattern/coin.png'],
//     [-600, 30, -100, 0, 0, 0, 50, 50, 'pattern/coin.png'],
//     [200, 30, 300, 0, 0, 0, 50, 50, 'pattern/coin.png']
// ];

// var keys = [
//     [-900, 30 , -900, 0, 0, 0, 50, 50, 'pattern/key.png'],
//     [-100, 30, 100, 0, 0, 0, 50, 50, 'pattern/key.png'],
//     [900, 30, 50, 0, 0, 0, 50, 50, 'pattern/key.png']
// ]; ***/

// var map = [
//     // ==================== OUTER WALLS (Nice Stone-Green) ====================
//     [0, 0, -1000, 0, 0, 0, 2000, 200, "#445A3F", 1],   // Outer Front
//     [0, 0, 1000, 0, 180, 0, 2000, 200, "#445A3F", 1],  // Outer Back
//     [1000, 0, 0, 0, 90, 0, 2000, 200, "#3A4F36", 1],   // Outer Right
//     [-1000, 0, 0, 0, -90, 0, 2000, 200, "#3A4F36", 1], // Outer Left

//     // ==================== GRASS GROUND ====================
//     [0, 100, 0, 90, 0, 0, 2000, 2000, 'pattern/ground4.jpeg', 1],

//     // ==================== INNER MAZE WALLS ====================
//     [200, 0, -300, 0, 0, 0, 200, 200, "#5A7A55", 1],   // Bright Grass Green
//     [-200, 0, -300, 0, 0, 0, 200, 200, "#5A7A55", 1],

//     [0, 0, 300, 0, 180, 0, 600, 200, "#48663F", 1],    // Rich Forest Green

//     [300, 0, 0, 0, 90, 0, 600, 200, "#2F4A32", 1],     // Deep Moss
//     [-300, 0, 0, 0, -90, 0, 600, 200, "#2F4A32", 1],
// // // ================= LABYRINTH WALLS =================

// // // Top section
// //  [-800,0,-800,0,0,0,400,200,'#6C7A89',1],
// // [-600,0,-600,0,90,0,400,200,'#6C7A89',1],
// // [-200,0,-600,0,0,0,800,200,'#6C7A89',1],
// // [200,0,-400,0,90,0,400,200,'#6C7A89',1],
// // [600,0,-600,0,0,0,400,200,'#6C7A89',1],
// // [800,0,-400,0,90,0,400,200,'#6C7A89',1],

// // // Upper middle
// // [-800,0,-200,0,90,0,400,200,'#7D6B91',1],
// // [-600,0,0,0,0,0,400,200,'#7D6B91',1],
// // [-200,0,-200,0,90,0,400,200,'#7D6B91',1],
// // [0,0,0,0,0,0,400,200,'#7D6B91',1],
// // [400,0,-200,0,90,0,400,200,'#7D6B91',1],
// // [600,0,0,0,0,0,400,200,'#7D6B91',1],

// // // Centre
// // [-800,0,400,0,0,0,400,200,'#8A6F4D',1],
// // [-600,0,200,0,90,0,400,200,'#8A6F4D',1],
// // [-200,0,200,0,0,0,800,200,'#8A6F4D',1],
// // [200,0,400,0,90,0,400,200,'#8A6F4D',1],
// // [600,0,200,0,0,0,400,200,'#8A6F4D',1],
// // [800,0,400,0,90,0,400,200,'#8A6F4D',1],

// // // Bottom
// // [-800,0,800,0,0,0,400,200,'#5D8AA8',1],
// // [-600,0,600,0,90,0,400,200,'#5D8AA8',1],
// // [-200,0,600,0,0,0,800,200,'#5D8AA8',1],
// // [200,0,800,0,90,0,400,200,'#5D8AA8',1],
// // [600,0,600,0,0,0,400,200,'#5D8AA8',1],
// // [800,0,800,0,90,0,400,200,'#5D8AA8',1],

// // // Extra branches
// // [-400,0,-400,0,90,0,400,200,'#9B7E46',1],
// // [0,0,-800,0,90,0,400,200,'#9B7E46',1],
// // [400,0,400,0,90,0,400,200,'#9B7E46',1],
// // [0,0,800,0,0,0,400,200,'#9B7E46',1],
// ]

// var coins = [
//     [-800, 30, -800, 0, 0, 0, 60, 60, 'pattern/coin2.png', 1],
//     [700, 30, -500, 0, 0, 0, 60, 60, 'pattern/coin1.png', 1],
//     [-700, 30, 700, 0, 0, 0, 60, 60, 'pattern/coin2.png', 1],
// ];

// var keys = [
//    [-900, 30, -900, 0, 0, 0, 50, 50, 'pattern/key2.png', 1],
//     [-100, 30, 100, 0, 0, 0, 50, 50, 'pattern/key.png', 1],
//     [900, 30, 50, 0, 0, 0, 50, 50, 'pattern/key2.png', 1]
// ];
// var dogs = [
//     [-500, 30, -600, 0, 180, 0, 120, 120, 'pattern/dog.png', 1],
//     [600, 30, 400, 0, 90, 0, 120, 120, 'pattern/dog.png', 1],
// ];

// var flowers = [
//     [-800, 10, 300, 0, 0, 0, 80, 80, 'pattern/flower.png', 1],
//     [700, 10, -700, 0, 0, 0, 80, 80, 'pattern/flower.png', 1],
//     [0, 10, 700, 0, 0, 0, 80, 80, 'pattern/flower.png', 1],
// ];

// var trees = [
//     [-900, 0, -300, 0, 0, 0, 180, 300, 'pattern/tree.png', 1],
//     [900, 0, 200, 0, 0, 0, 180, 300, 'pattern/tree.png', 1],
// ];

// var frames = [
//     [-100, 80, -980, 0, 0, 0, 180, 180, 'pattern/frame.png', 1],
//     [300, 80, 980, 0, 180, 0, 180, 180, 'pattern/frame.png', 1],
// ];
// //Variables for movement
// var pressLeft = 0;
// var pressRight = 0;
// var pressForward = 0;
// var pressBack = 0;
// var pressUp = 0;
// var pressPower = 0;
// var released = 0;
// var mouseX = 0;
// var mouseY = 0;
// var lock = false;
// var itemRotation = 0;
// var container = document.getElementById("container");
// var canlock = false;

// //if the key is pressed
// document.addEventListener("keydown", (event)=>{

//     if (event.key == "ArrowLeft"){
//        pressLeft = 1; 
//     }
//     if (event.key == "ArrowRight"){
//        pressRight = 1; 
//     }
//     if (event.key == "ArrowUp"){
//        pressForward = 1; 
//     }
//     if (event.key == "ArrowDown"){
//        pressBack = 1; 
//     }
//     if(event.keyCode == 32){
//         pressUp = -1;
//     }
//     if(event.key == "p"){
//         pressPower = 1;
//     }
//     if (event.key == "r"){
//         released = 1;
//     }
// })

// //if the key is released
// document.addEventListener("keyup", (event)=>{
//     if (event.key == "ArrowLeft"){
//        pressLeft = 0; 
//     }
//     if (event.key == "ArrowRight"){
//        pressRight = 0; 
//     }
//     if (event.key == "ArrowUp"){
//        pressForward = 0;         
//     }
//     if (event.key == "ArrowDown"){
//        pressBack = 0; 
//     }
//     if(event.keyCode == 32){
//         pressUp = 0;
//     }
//     if (event.key == "p"){
//         pressPower = 0;
//     }
//     if (event.key == "r"){
//         released = 0;
//     }
// })

// //if the mouse is pressed
// container.onclick = function () {
//   if(canlock) container.requestPointerLock();
// };


// document.addEventListener("pointerlockchange", (event) =>{
//     lock = !lock;
// })

// //mouse movement listener 
// document.addEventListener("mousemove", (event)=>{
//     mouseX = event.movementX;
//     mouseY = event.movementY;
// })

// var pawn = new player(0,0,0,0,0);
// var world = document.getElementById("world");

// function isColliding(x, z) {
//     let playerSize = 40;

//     for (let i = 0; i < map.length; i++) {
//         let wall = map[i];

//         if (wall[3] == 90) {
//             continue;
//         }

//         let wallX = wall[0];
//         let wallZ = wall[2];
//         let wallRY = wall[4];
//         let wallLength = wall[6];

//         // horizontal wall, along X axis
//         if (wallRY == 0 || wallRY == 180) {
//             if (
//                 x > wallX - wallLength / 2 - playerSize &&
//                 x < wallX + wallLength / 2 + playerSize &&
//                 z > wallZ - playerSize &&
//                 z < wallZ + playerSize
//             ) {
//                 return true;
//             }
//         }

//         // vertical wall, along Z axis
//         if (wallRY == 90 || wallRY == -90) {
//             if (
//                 x > wallX - playerSize &&
//                 x < wallX + playerSize &&
//                 z > wallZ - wallLength / 2 - playerSize &&
//                 z < wallZ + wallLength / 2 + playerSize
//             ) {
//                 return true;
//             }
//         }
//     }

//     return false;
// }

// function update(){
//     //count movement
//     let speedMultiplier = pressPower ? 5: 1; 
//     let dx = ((pressRight - pressLeft) * Math.cos(pawn.ry * deg) -
//                 (pressForward - pressBack) * Math.sin(pawn.ry * deg))* speedMultiplier;
//     let dz = (-(pressRight - pressLeft) * Math.sin(pawn.ry * deg) -
//                 (pressForward - pressBack) * Math.cos(pawn.ry * deg))* speedMultiplier;
//     let dy = pressUp * speedMultiplier;
//     let drx = mouseY;
//     let dry = - mouseX;
//     mouseX = mouseY = 0; 

//     // add movement to the coordinates
//     let nextX = pawn.x + dx;
//     let nextY = pawn.y + dy;
//     let nextZ = pawn.z + dz;

//     if (!isColliding(nextX, pawn.z)) {
//         pawn.x = nextX;
//     }

//     if (!isColliding(pawn.x, nextZ)) {
//         pawn.z = nextZ;
//     }

// pawn.y = nextY;

//     if (lock) {
//         pawn.rx = pawn.rx+ drx;
//         pawn.ry = pawn.ry + dry;

//         if (pawn.rx > 90) {
//             pawn.rx = 90;
//         }
//         if (pawn.rx < -90) {
//             pawn.rx = -90;
//         }
//     }
    

//     if (released == 1)
//     {
//         pawn.x = 0;
//         pawn.y = 0;
//         pawn.z = 0;
//         pawn.rx = 0;
//         pawn.ry = 0;
//     }

//    //change coordinates of the world
// 	world.style.transform ="translateZ(600px)" + "rotateX(" + (-pawn.rx) + "deg)" + 
//                             "rotateY(" + (-pawn.ry) + "deg)" +  
//                             "translate3d(" + (-pawn.x) + "px," + (-pawn.y) + "px," + (-pawn.z) + "px)";
// }

// function createNewWorld(){
//     createSquare(map, map);
// }

// function createSquare(squares, string){
//      for (let i = 0; i < squares.length; i++){

//         //create rectangle and styles
//        let newElement = document.createElement("div");
//        newElement.className = "square";
//        newElement.id = string + i;
//        newElement.style.width = squares[i][6] + "px";
//        newElement.style.height = squares[i][7] + "px";
//        if (squares[i][8].startsWith("#")) {
//             newElement.style.backgroundColor = squares[i][8];
//         } else {
//             newElement.style.backgroundImage = "url('" + squares[i][8] + "')";
//             newElement.style.backgroundSize = "cover";
//             newElement.style.backgroundPosition = "center";
//             newElement.style.backgroundRepeat = "no-repeat";
//         }
//        newElement.style.opacity = squares[i][9];
//        newElement.style.transform = "translate3d(" + (600 - squares[i][6]/2 + squares[i][0]) + "px," + 
//                                     (400 - squares[i][7]/2 + squares[i][1]) + "px," +   
//                                     (squares[i][2]) + "px)" +
//                                     "rotateX(" + squares[i][3] + "deg)" +
//                                     "rotateY(" + squares[i][4] + "deg)" +
//                                     "rotateZ(" + squares[i][5] + "deg)";
//         world.appendChild(newElement);
//     }

// }

// function interact(squares, string){
//     for (let i = 0; i < squares.length; i++){
//         let dis = Math.sqrt(Math.pow((pawn.x - squares[i][0]), 2) + 
//                   Math.pow((pawn.y - squares[i][1]), 2) + 
//                   Math.pow((pawn.z - squares[i][2]), 2));
//         let is = (squares[i][6]) ;
//         if (dis < is) {
//             document.getElementById(string + i).style.display = "none";
//             squares[i][0] = 100000;
//         }
//     }
// }

// function rotateItems(squares, string){
//     itemRotation = itemRotation + 2;

//     for (let i = 0; i < squares.length; i++){
//         let element = document.getElementById(string + i);

//         if (element) {
//             element.style.transform =
//                 "translate3d(" + (600 - squares[i][6]/2 + squares[i][0]) + "px," +
//                                   (400 - squares[i][7]/2 + squares[i][1]) + "px," +
//                                   squares[i][2] + "px)" +
//                 "rotateX(" + squares[i][3] + "deg)" +
//                 "rotateY(" + itemRotation + "deg)" +
//                 "rotateZ(" + squares[i][5] + "deg)";
//         }
//     }
// }

//   createNewWorld();
// createSquare(coins, "coin");
// createSquare(keys, "key");
// createSquare(dogs, "dog");
// // createSquare(flowers, "flower");
//  createSquare(trees, "tree");
// // createSquare(frames, "frame");
// TimerGame = setInterval(repeat, 10);
// function repeat(){
//     update();
//     interact(coins, "coin");
//     interact(keys, "key");
//     interact(dogs, "dog");
//     rotateItems(coins, "coin");
//     rotateItems(keys, "key");
//     // rotateItems(dogs, "dog");
// }





//world variables
var deg = Math.PI/180;
function player(x, y, z, rx, ry){
    this.x = x;
    this.y = y;
    this.z = z;
    this.rx = rx;
    this.ry = ry;
}

/***
var map = [
    // OUTER BOX
    [0, 0, -1000, 0, 0, 0, 2000, 200, 'pattern/front.jpeg',1],      // outer front wall
    [0, 0, 1000, 0, 180, 0, 2000, 200, 'pattern/back.jpeg',1],     // outer back wall
    [1000, 0, 0, 0, 90, 0, 2000, 200, 'pattern/right.jpeg',1],      // outer right wall
    [-1000, 0, 0, 0, -90, 0, 2000, 200, 'pattern/left.jpeg',1],    // outer left wall
    [0, 100, 0, 90, 0, 0, 2000, 2000, 'pattern/ground.jpeg',1],        // outer ground

    // INNER BOX
    [0, 0, 600, 0, 180, 0, 1200, 200, '#6C7A89'],
    [600, 0, 0, 0, 90, 0, 1200, 200, '#7D6B91'],
    [-600, 0, 0, 0, -90, 0, 1200, 200, '#8A6F4D'],
    [-400, 0, -600, 0, 0, 0, 400, 200, '#5D8AA8'],
    [400, 0, -600, 0, 0, 0, 400, 200, '#5D8AA8']
]

var coins = [
    [800, 30, -800, 0, 0, 0, 50, 50, 'pattern/coin.png'],
    [-600, 30, -100, 0, 0, 0, 50, 50, 'pattern/coin.png'],
    [200, 30, 300, 0, 0, 0, 50, 50, 'pattern/coin.png']
];

var keys = [
    [-900, 30 , -900, 0, 0, 0, 50, 50, 'pattern/key.png'],
    [-100, 30, 100, 0, 0, 0, 50, 50, 'pattern/key.png'],
    [900, 30, 50, 0, 0, 0, 50, 50, 'pattern/key.png']
]; ***/

var map = [
    // OUTER BOUNDARY
    [0, 0, -1000, 0, 0, 0, 2000, 200, 'pattern/front.jpeg', 1],
    [0, 0, 1000, 0, 180, 0, 2000, 200, 'pattern/back.jpeg', 1],
    [1000, 0, 0, 0, 90, 0, 2000, 200, 'pattern/right.jpeg', 1],
    [-1000, 0, 0, 0, -90, 0, 2000, 200, 'pattern/left.jpeg', 1],
    [0, 100, 0, 90, 0, 0, 2000, 2000, 'pattern/ground.jpeg', 1],

    // LABYRINTH WALLS
    [-750, 0, -720, 0, 90, 0, 560, 200, '#6C7A89', 1],
    [-420, 0, -760, 0, 0, 0, 420, 200, '#6C7A89', 1],
    [180, 0, -760, 0, 0, 0, 520, 200, '#6C7A89', 1],
    [620, 0, -700, 0, 90, 0, 480, 200, '#6C7A89', 1],

    [-760, 0, -260, 0, 0, 0, 480, 200, '#7D6B91', 1],
    [-360, 0, -420, 0, 90, 0, 520, 200, '#7D6B91', 1],
    [120, 0, -420, 0, 0, 0, 560, 200, '#7D6B91', 1],
    [440, 0, -220, 0, 90, 0, 520, 200, '#7D6B91', 1],
    [760, 0, -160, 0, 0, 0, 360, 200, '#7D6B91', 1],

    [-620, 0, 140, 0, 90, 0, 620, 200, '#8A6F4D', 1],
    [-300, 0, 80, 0, 0, 0, 440, 200, '#8A6F4D', 1],
    [120, 0, 160, 0, 90, 0, 520, 200, '#8A6F4D', 1],
    [520, 0, 140, 0, 0, 0, 520, 200, '#8A6F4D', 1],

    [-820, 0, 520, 0, 0, 0, 360, 200, '#5D8AA8', 1],
    [-520, 0, 620, 0, 90, 0, 520, 200, '#5D8AA8', 1],
    [-120, 0, 560, 0, 0, 0, 560, 200, '#5D8AA8', 1],
    [260, 0, 640, 0, 90, 0, 520, 200, '#5D8AA8', 1],
    [640, 0, 520, 0, 0, 0, 520, 200, '#5D8AA8', 1],

    [-120, 0, -120, 0, 90, 0, 320, 200, '#9B7E46', 1],
    [720, 0, 300, 0, 90, 0, 420, 200, '#9B7E46', 1],
    [-220, 0, 840, 0, 0, 0, 360, 200, '#9B7E46', 1],
]

var coins = [
    [-800, 30, -800, 0, 0, 0, 50, 50, 'pattern/coin.png', 1],
    [700, 30, -500, 0, 0, 0, 50, 50, 'pattern/coin.png', 1],
    [-700, 30, 700, 0, 0, 0, 50, 50, 'pattern/coin.png', 1],
];

var keys = [
    [800, 30, 800, 0, 0, 0, 50, 50, 'pattern/key.png', 1],
];

//Variables for movement
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
container.onclick = function(){
    container.requestPointerLock();
} 

document.addEventListener("pointerlockchange", (event) =>{
    lock = !lock;
})

//mouse movement listener 
document.addEventListener("mousemove", (event)=>{
    mouseX = event.movementX;
    mouseY = event.movementY;
})

var pawn = new player(0,0,0,0,0);
var world = document.getElementById("world");

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
        pawn.rx = 0;
        pawn.ry = 0;
    }

   //change coordinates of the world
	world.style.transform ="translateZ(600px)" + "rotateX(" + (-pawn.rx) + "deg)" + 
                            "rotateY(" + (-pawn.ry) + "deg)" +  
                            "translate3d(" + (-pawn.x) + "px," + (-pawn.y) + "px," + (-pawn.z) + "px)";
}

function createNewWorld(){
    createSquare(map, map);
}

function createSquare(squares, string){
     for (let i = 0; i < squares.length; i++){

        //create rectangle and styles
       let newElement = document.createElement("div");
       newElement.className = "square";
       newElement.id = string + i;
       newElement.style.width = squares[i][6] + "px";
       newElement.style.height = squares[i][7] + "px";
       if (squares[i][8].startsWith("#")) {
            newElement.style.backgroundColor = squares[i][8];
        } else {
            newElement.style.backgroundImage = "url('" + squares[i][8] + "')";
            newElement.style.backgroundSize = "cover";
            newElement.style.backgroundPosition = "center";
            newElement.style.backgroundRepeat = "no-repeat";
        }
       newElement.style.opacity = squares[i][9];
       newElement.style.transform = "translate3d(" + (600 - squares[i][6]/2 + squares[i][0]) + "px," + 
                                    (400 - squares[i][7]/2 + squares[i][1]) + "px," +   
                                    (squares[i][2]) + "px)" +
                                    "rotateX(" + squares[i][3] + "deg)" +
                                    "rotateY(" + squares[i][4] + "deg)" +
                                    "rotateZ(" + squares[i][5] + "deg)";
        world.appendChild(newElement);
    }

}

function interact(squares, string){
    for (let i = 0; i < squares.length; i++){
        let dis = Math.sqrt(Math.pow((pawn.x - squares[i][0]), 2) + 
                  Math.pow((pawn.y - squares[i][1]), 2) + 
                  Math.pow((pawn.z - squares[i][2]), 2));
        let is = (squares[i][6]) ;
        if (dis < is) {
            document.getElementById(string + i).style.display = "none";
            squares[i][0] = 100000;
        }
    }
}

function rotateItems(squares, string){
    itemRotation = itemRotation + 2;

    for (let i = 0; i < squares.length; i++){
        let element = document.getElementById(string + i);

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

createNewWorld();
createSquare(coins, "coin");
createSquare(keys, "key");
TimerGame = setInterval(repeat, 10);

function repeat(){
    update();
    interact(coins, "coin");
    interact(keys, "key");
    rotateItems(coins, "coin");
    rotateItems(keys, "key");
}
