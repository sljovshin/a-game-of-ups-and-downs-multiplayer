let playerRight = false;
let playerLeft = false;
let playerChilled = false;
let playerHeated = false;
let rivalRight = false; 
let rivalLeft = false;
let rivalChilled = false;
let rivalHeated = false;
let playerDoneMoving = true;
let rivalDoneMoving = true;
let playerMoving = false;
let rivalMoving = false;
let playerWentDown = false;
let playerWentUp = false;
let rivlWentDown = false;
let rivalWentUp = false;
let direction;

function drawCharacter(char, x, y, charW, CharH) {
    return context.drawImage(char, x, y, charW, CharH);
}

function playerMove() {
    if (playerRight && playerMoving){
        player.x += player.vx;
    }
    if (playerLeft && playerMoving){
        player.x -= player.vx;
    }
}
function rivalMove() {
    if (rivalRight && rivalMoving){
        rival.x += rival.vx;
    }
    if (rivalLeft && rivalMoving){
        rival.x -= rival.vx;
    }
}


function drawPlayer() {
    if (playerLeft && !playerChilled && !playerHeated) {
        drawCharacter(player.leftSprite, player.x, player.y, player.width, player.height)
    } else if (playerRight && !playerChilled && !playerHeated) {
        drawCharacter(player.rightSprite, player.x, player.y, player.width, player.height)
    } else if (playerRight && playerChilled) {
        drawCharacter(player.chilledRightSprite, player.x, player.y, player.width, player.height)
    } else if (playerLeft && playerChilled) {
        drawCharacter(player.chilledLeftSprite, player.x, player.y, player.width, player.height)
    } else if (playerRight && playerHeated) {
        drawCharacter(player.heatedRightSprite, player.x, player.y, player.width, player.height)
    } else if (playerLeft && playerHeated) {
        drawCharacter(player.heatedLeftSprite, player.x, player.y, player.width, player.height)
    }
}

function drawRival() {
    if (rivalLeft && !rivalChilled && !rivalHeated) {
        drawCharacter(rival.leftSprite, rival.x, rival.y, rival.width, rival.height)
    } else if (rivalRight && !rivalChilled && !rivalHeated) {
        drawCharacter(rival.rightSprite, rival.x, rival.y, rival.width, rival.height)
    } else if (rivalRight && rivalChilled) {
        drawCharacter(rival.chilledRightSprite, rival.x, rival.y, rival.width, rival.height)
    } else if (rivalLeft && rivalChilled) {
        drawCharacter(rival.chilledLeftSprite, rival.x, rival.y, rival.width, rival.height)
    } else if (rivalRight && rivalHeated) {
        drawCharacter(rival.heatedRightSprite, rival.x, rival.y, rival.width, rival.height)
    } else if (rivalLeft && rivalHeated) {
        drawCharacter(rival.heatedLeftSprite, rival.x, rival.y, rival.width, rival.height)
    }
}