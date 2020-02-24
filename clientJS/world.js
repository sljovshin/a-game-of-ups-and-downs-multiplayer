const socket = io('/');
let loaded_images = 0;
let starttile = new Image,
gateoverlap = new Image,
hall = new Image,
halldoor = new Image,
hallup = new Image,
halldown = new Image,
hallCampfire = new Image,
chestClosed = new Image,
chestOpen = new Image,
js_leftSprite = new Image,
js_rightSpirte = new Image,
js_heatedLeftSprite = new Image,
js_heatedRightSprtie = new Image,
js_chilledLeftSprite = new Image,
js_chilledRightSprite = new Image,
js_victorySprite = new Image,
dt_leftSprite = new Image,
dt_rightSprite = new Image,
dt_heatedLeftSprite = new Image,
dt_heatedRightSprite = new Image,
dt_chilledLeftSprite = new Image,
dt_chilledRightSprite = new Image,
dt_victorySprite= new Image,
nk_idleSprite = new Image,
nk_activeSprite = new Image;

let images = [
     starttile,
     gateoverlap,
     hall,
     halldoor,
     hallup,
     halldown,
     chestClosed,
     chestOpen,
     js_leftSprite,
     js_rightSpirte,
     js_heatedLeftSprite,
     js_heatedRightSprtie,
     js_chilledLeftSprite,
     js_chilledRightSprite,
     js_victorySprite,
     dt_leftSprite,
     dt_rightSprite,
     dt_heatedLeftSprite,
     dt_heatedRightSprite,
     dt_chilledLeftSprite,
     dt_chilledRightSprite,
     dt_victorySprite,
     nk_idleSprite,
     nk_activeSprite,
     hallCampfire
]
let image_sources = [
    '../clientAssets/start.png',   
    '../clientAssets/gateoverlap.png',
    '../clientAssets/hallway.png',
    '../clientAssets/hallwayClosedDoor.png',
    '../clientAssets/hallwayStairsUp.png',
    '../clientAssets/hallwayStairsDown.png',
    '../clientAssets/dragonglasschest.png',
    '../clientAssets/dragonglasschestopen.png',
    '../clientAssets/JonSnowL.png',
    '../clientAssets/JonSnowR.png',
    '../clientAssets/JonSnowHeatedL.png',
    '../clientAssets/JonSnowHeatedR.png',
    '../clientAssets/JonSnowColdL.png',
    '../clientAssets/JonSnowColdR.png',
    '../clientAssets/jonSnowVictory.png',
    '../clientAssets/DanerysL.png',
    '../clientAssets/DanerysR.png',
    '../clientAssets/DanerysHeatedL.png',
    '../clientAssets/DanerysHeatedR.png',
    '../clientAssets/DanerysColdL.png',
    '../clientAssets/DanerysColdR.png',
    '../clientAssets/dannyVictory.png',
    '../clientAssets/nightkingidle.png',
    '../clientAssets/nkactive.png',
    '../clientAssets/hallwayCampfire.png'
]
let screen = document.getElementById('main')
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

starttile = images[0];
gateoverlap = images[1];
hall = images[2];
halldoor = images[3];
hallup = images[4];
halldown = images[5];
hallCampfire = images[24];
chestClosed = images[6];
chestOpen = images[7];


let rooms= [];

let jon = {
    leftSprite: images[8],
    rightSprite: images[9],
    heatedLeftSprite: images[10],
    heatedRightSprite: images[11],
    chilledLeftSprite: images[12],
    chilledRightSprite: images[13],
    victorySprite: images[14],
    x: 190,
    y: 90,
    height: 110,
    width: 76,
    vx: 5,
    vy: 6,
};
let danny = {
    leftSprite: images[15],
    rightSprite: images[16],
    heatedLeftSprite: images[17],
    heatedRightSprite: images[18],
    chilledLeftSprite: images[19],
    chilledRightSprite: images[20],
    victorySprite: images[21],
    x: 160,
    y: 90,
    height: 110,
    width: 76,
    vx: 5,
    vy: 6,
}

let playerNumber = null; 
let player = jon;
let rival = danny;

socket.on('assignedHero', assignedHero);

function assignedHero(num) {   
    playerNumber = num
}
function assignHero (p1, p2, num) {
    return num === 1 ? p1 : p2;
  }
  function assignRival (p1, p2, num) {
    return num === 1 ? p2 : p1;
  }

const randomRoom = () => {
    return Math.floor(Math.random()*100);
};
function drawRoom(room, x, y, roomWidth, roomHeight) {
    return context.drawImage(room, x, y, roomWidth, roomHeight);
}

const levels = [
     {
        y: 0,
        yY: 249,
        level: 1,
    },
    {
        y: 250,
        yY: 499,
        level: 2,
    },
   {
        y: 500,
        yY: 749,
        level: 3,
    },
    {
        y: 750,
        yY: 999,
        level: 4,
    },
    {
        y: 1000,
        yY: 1249,
        level: 5,
    },
    {
        y: 1250,
        yY: 1499,
        level: 6,
    },
    {
        y: 1500,
        yY: 1749,
        level: 7,
    },
    {
        y: 1750,
        yY: 1999,
        level: 8,
    },
    {
        y: 2000,
        yY: 2249,
        level: 9,
    },
    {
        y: 2250,
        yY: 2499,
        level: 10,
    },
    {
        y: 2500,
        yY: 2749,
        level: 11,
    },
    {
        y: 2750,
        yY: 2999,
        level: 12,
    },
    {
        y: 3000,
        yY: 3249,
        level: 13,
    },
];

function drawBackground(context) {
    const roomWidth = 400;
    const roomHeight = 250;
    let roomsCount = 53;
    const doors = [4,10,19,28,34,41,48,51]

    let x = 0;
    let y = 0;
    
    for (let i = 0; i < roomsCount; i++) {  
        context.drawImage(hall, x, y, roomWidth, roomHeight);
        if (i === 0) {
            drawRoom(starttile, x, y, roomWidth, roomHeight);
        }
        if(i === 22) {
            drawRoom(hallCampfire, x, y, roomWidth, roomHeight);
        }
        doors.forEach(room => {
            if(i === room - 1) {
                drawRoom(halldoor, x, y, roomWidth, roomHeight);
            }
        })

        x = x + roomWidth;      
        if (x >= 4 * roomWidth) {
            y = y + roomHeight;
            x = 0;
        }
    }

}
const roomNumbers = [1,2,3,4,8,7,6,5,9,10,11,12,16,15,14,13,17,18,19,20,21,22,23,24,28,27,26,25,29,30,31,32,36,35,34,33,37,38,39,40,44,43,42,41,45,46,47,48,52,51,50,49]
function defineRooms() {
    let x = 0;
    let y = 0;
    const width = 400;
    const height = 250;
    let xX = x + width;
    let yY = y + height;
    let roomsCount = 52;

    for (let i = 0; i < roomsCount; i++) {
        rooms.push({
            roomNum: i + 1,
            x: x,
            y: y,
            xX: xX,
            yY: yY,
            roomDisplayNum: roomNumbers[i]
        })

        
        x = xX;
        xX = xX + (width); 

        if (x > 3 * width) {
            y = yY;
            yY = yY +(height);
            x = 0;
            xX = x + width
        }
    }

}




defineRooms();



