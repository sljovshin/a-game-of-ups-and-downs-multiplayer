const stairsup = [{
                        room: 10,
                        x: 400,
                        y: levels[2].y,
                    },
                    {
                        room: 28,
                        x: 1200,
                        y: levels[6].y,
                    },
                    {
                        room: 41,
                        x: 0,
                        y: levels[10].y,
                    },
                    {
                        room: 51,
                        x: 800,
                        y: levels[12].y,
                    }]

const stairsdown = [{
                       room: 4,
                       x: 1200,
                       y: levels[0].y,
                    },
                    {
                        room: 19,
                        x: 800,
                        y: levels[4].y,
                    },
                    {
                        room: 34,
                        x: 400,
                        y: levels[8].y,
                    },
                    {
                        room: 48,
                        x: 1200,
                        y: levels[11].y,
                    }]


function playerOpenDoor(i) {
    stairsdown.forEach( room => {       
        if(rooms[i].roomNum === room.room) {
            drawRoom(halldown, rooms[i].x, rooms[i].y, 400, 250); 
            setTimeout(playerStairDown(stairsdown.indexOf(room)), 1000);
         }
    })
    stairsup.forEach( room => {
        if(rooms[i].roomNum === room.room) {
            drawRoom(hallup, rooms[i].x, rooms[i].y, 400, 250);        
            setTimeout(playerStairsUp(stairsup.indexOf(room)), 1000);
         }
    })
}
function rivalOpenDoor(i) {
    stairsdown.forEach( room => {       
        if(rooms[i].roomNum === room.room) {
            drawRoom(halldown, rooms[i].x, rooms[i].y, 400, 250); 
            setTimeout(rivalStairDown(stairsdown.indexOf(room)), 1000);
         }
    })
    stairsup.forEach( room => {
        if(rooms[i].roomNum === room.room) {
            drawRoom(hallup, rooms[i].x, rooms[i].y, 400, 250);        
            setTimeout(rivalStairsUp(stairsup.indexOf(room)), 1000);
         }
    })
}

function playerStairDown(i) {   
    if (!playerMoving && !playerWentUp && playerDoneMoving) {
        playerWentDown = true;       
        player.x = stairsup[i].x + 168;
        player.y = stairsup[i].y + 90;
        window.scroll({
            top: player.y,
            behavior: 'smooth'
          });
    }
}
function playerStairsUp(i) {
    if (!playerMoving && !playerWentDown && playerDoneMoving) {
        playerWentUp = true;
        player.x = stairsdown[i].x + 168;
        player.y = stairsdown[i].y + 90;
        window.scroll({
            top: player.y,
            behavior: 'smooth'
          });
    }
}
function rivalStairDown(i) {   
    if (!rivalMoving && !rivalWentUp && rivalDoneMoving) {
        rivalWentDown = true;       
        rival.x = stairsup[i].x + 168;
        rival.y = stairsup[i].y + 90;
    }
}
function rivalStairsUp(i) {
    if (!rivalMoving && !rivalWentDown && rivalDoneMoving) {
        rivalWentUp = true;
        rival.x = stairsdown[i].x + 168;
        rival.y = stairsdown[i].y + 90;
    }
}

function playerGetBuff() {   
    console.log('playerHeated: ' + playerHeated);
    if (player.x > 800 && player.x < 1200 && player.y > 1250 && player.y < 1500 && playerDoneMoving === true) {
        playerHeated = true;
    }
}
function rivalGetBuff() {
    console.log('rivalHeated: ' + rivalHeated);
    if (rival.x > 800 && rival.x < 1200 && rival.y > 1250 && rival.y < 1500 && rivalDoneMoving === true) {
        rivalHeated = true;
    }
}
function playerGetDebuff() {   
    if (player.x > 0 && player.x < 400 && player.y > 2750 && player.y < 3000 && playerDoneMoving === true) {
        if (playerHeated === true) {
            playerHeated === false;
        } else {
            playerChilled = true;
        }
    }
}
function rivalGetDebuff() {
    if (rival.x > 0 && rival.x < 400 && rival.y > 2750 && rival.y < 3000 && rivalDoneMoving === true) {
        if(rivalHeated === true) {
            rivalHeated === false;
        } else {
            rivalChilled === true;
        }
    }
}
function playerLocationDetection() {
    //console.log(player.y);
    for (let i = 0; i < rooms.length; i++) {
        if (player.x > rooms[i].x && player.x < rooms[i].xX && player.y > rooms[i].y && player.y < rooms[i].yY) {
            playerOpenDoor(i);
            document.getElementById('playerRoomDisplay').innerText = rooms[i].roomDisplayNum;
        }     
    }
    playerGetBuff();  
    if(player.x > 1200 && player.y > 3000 || rival.x > 1200 && rival.y > 3000) {
        context.drawImage(chestOpen, 1490, 3145, 90, 60);
    } else {
        context.drawImage(chestClosed, 1490, 3145, 90, 60);
    }
}
function rivalLocationDetection() {
    //console.log(player.y);
    for (let i = 0; i < rooms.length; i++) {
        if (rival.x > rooms[i].x && rival.x < rooms[i].xX && rival.y > rooms[i].y && rival.y < rooms[i].yY) {
            rivalOpenDoor(i);
            document.getElementById('opponentRoomDisplay').innerText = rooms[i].roomDisplayNum;                      
        }     
    }
    rivalGetBuff();
}

function playerDeterminFloor() {
    for (let i = 0; i < levels.length; i++) {
        if (player.y > levels[i].y && player.y < levels[i].yY) {
            document.getElementById('playerFloorDisplay').innerText = levels[i].level;
            if (levels[i].level % 2 === 1) {
                playerRight = true;
                playerLeft = false;
            } else {
                playerRight = false;
                playerLeft = true;
            }
           if (levels[i].level === 12) {
                bossIdle = false;
            } else {
                bossIdle = true;
            }
        }
    } 
}
function rivalDeterminFloor() {
    for (let i = 0; i < levels.length; i++) {
        if (rival.y > levels[i].y && rival.y < levels[i].yY) {
            document.getElementById('opponentFloorDisplay').innerText = levels[i].level;
            if (levels[i].level % 2 === 1) {
                rivalRight = true;
                rivalLeft = false;
            } else {
                rivalRight = false;
                rivalLeft = true;
            }
           if (levels[i].level === 12) {
                bossIdle = false;
            } else {
                bossIdle = true;
            }
        }
    } 
}



/**
 *     if(rooms[i].roomNum === 4) {

        drawRoom(halldown, rooms[i].x, rooms[i].y, 400, 250);        
     }
 */